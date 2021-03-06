export type Resolver<T> = (value: T | PromiseLike<T>) => void;
export type Rejecter = (reason?: any) => void;
type Executor<T> = (resolve: Resolver<T>, reject: Rejecter) => void;

export interface TimeoutPromiseOptions {
	onTimeout?: () => any;
	message?: string;
	id?: string;
	callStack?: string;
}

export class TimeoutError extends Error {
	constructor(message?: string, callStack?: string, id?: string) {
		if (message) {
			super(message + `\n${callStack}`);
		}
		else {
			super(`Promise(id=${id}) timed out after 1 cycle (zero timeout).\n${callStack}`)
		}
		this.name = 'TimeoutError';
	}
}

class TimeoutPromise<T> extends Promise<T> {

	public constructor(executor: Executor<T>, timeout?: number, options?: TimeoutPromiseOptions) {
		super(TimeoutPromise.create(executor, timeout, options));
	}

	private static decorateResolver<T>(resolver: Resolver<T> | Rejecter, timer: NodeJS.Timeout | null): Resolver<T> {
		return (value: T | PromiseLike<T>) => {
			if (timer) {
				clearTimeout(timer);
			}
			resolver(value);
		};
	}

	private static create<T>(executor: Executor<T>, timeout?: number, options?: TimeoutPromiseOptions): Executor<T> {
		return async (resolve: (value: T | PromiseLike<T>) => void,
			reject: (reason?: any) => void) => {

			let timer: NodeJS.Timeout | null = null;
			const id = options?.id || "anonymous";

			if (typeof timeout === 'number' && timeout < 0) {
				throw new Error('Timeout cannot be negative.');
			}

			if (timeout !== undefined && timeout !== 0) {
				const start = Date.now();

				// get call stack
				let callStack: string | undefined = options?.callStack;
				try {
					if (callStack === undefined) {
						throw new Error();
					}
				}
				catch (e) {
					callStack = (e as Error).stack;
					callStack = callStack?.split('\n\t').join('\t\n');
				}

				timer = setTimeout(() => {
					let message = `Promise(id=${id}) timed out after ${Date.now() - start}ms.`;
					if (options?.message) {
						message += ` Reason: ${options.message}`;
					}

					reject(new TimeoutError(message, callStack, id));
					if (options?.onTimeout) {
						options?.onTimeout();
					}
				}, timeout);
			}

			resolve = this.decorateResolver(resolve, timer);
			reject = this.decorateResolver(reject, timer);

			try {
				executor(resolve, reject);
			}
			catch (e) {
				reject(e);
			}
		};
	}
}

export { TimeoutPromise };
