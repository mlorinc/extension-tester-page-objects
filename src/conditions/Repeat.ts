import { Rejecter, Resolver, TimeoutError, TimeoutPromise } from './TimeoutPromise';

export interface RepeatArguments {
	/**
	 * Repeat function <count> times. If undefined function will be repeated infinitely or until time outs.
	 */
	count?: number;
	/**
	 * Repeat timeout after promise is rejected. If undefined function will be repeated <count> times or infinitely.
	 */
	timeout?: number;

	/**
	 * Do not resolve repeat operation immediately. Wait until truthy value is returned consequently for <threshold> milliseconds.
	 */
	threshold?: number;

	/**
	 * Error message when repeat time outs.
	 */
	message?: string;

	log?: boolean;

	// Repeat identification. For log purposes.
	id?: string;
}

export class StopRepeat extends Error {
	constructor(error: string | Error) {
		super(error instanceof Error ? error.message : error);
	}
}

class FalseValue extends Error {
}

/**
 * Repeat function until it returns truthy value.
 * 
 * @param func function to repeat
 * @param options repeat options
 */
export async function repeat<T>(func: (() => T | PromiseLike<T>), options?: RepeatArguments): Promise<T> {
	let { count, timeout } = options || { count: undefined, timeout: undefined };
	let run = true;
	let start = 0;
	const id = options?.id || "anonymous";
	const threshold = options?.threshold || 0;
	const log = options?.log ? (message: string, loggerFunction: (message: string) => void = console.log) => {
		loggerFunction(`[${id}] ${message}`);
	} : () => { };

	if (count !== undefined && count <= 0) {
		throw new Error("Count must be larger than 0");
	}

	if (timeout === 0 && count === undefined) {
		count = 1;
		timeout = undefined;
	}

	async function closure(cnt: number | undefined, resolve: Resolver<T>, reject: Rejecter) {
		if (cnt !== undefined && cnt === 0) {
			reject(new TimeoutError(`[${id}] Cannot repeat function more than ${count} times.`));
			return;
		}
		try {
			const value = await func();
			if (value && ((start !== 0 && Date.now() - start >= threshold) || (threshold === 0))) {
				resolve(value);
				log("Threshold reached");
				return;
			}
			else if (value) {
				if (start === 0) {
					start = Date.now();
				}
				log("Threshold not reached");
				setImmediate(closure, cnt, resolve, reject);
				return;
			}
			else {
				start = 0;
				throw new FalseValue(`Value does not have truthy value - ${value}`);
			}
		}
		catch (e) {
			if (e instanceof StopRepeat) {
				reject(e);
				return;
			}

			if ((e instanceof FalseValue) === false) {
				log(e, console.error);
			}

			if (run) {
				setImmediate(closure, cnt !== undefined ? cnt - 1 : undefined, resolve, reject);
			}
		}
	}

	return new TimeoutPromise<T>((resolve, reject) => {
		setImmediate(closure, count, resolve, reject);
	}, timeout, {
		onTimeout: () => run = false,
		id: options?.id,
		message: options?.message
	});
}
