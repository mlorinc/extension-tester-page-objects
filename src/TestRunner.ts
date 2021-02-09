export interface TestRunner {
    runTests: (files: string[]) => Promise<number>;
}
