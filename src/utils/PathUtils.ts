import * as path from 'path';
import * as os from 'os';

export module PathUtils {
    export function trimPath(filePath: string): string {
        let start = 0;
        let end = filePath.length;

        if (filePath.startsWith(path.sep)) {
            start = 1;
        }
        if (filePath.endsWith(path.sep)) {
            end = -1;
        }

        return filePath.slice(start, end);
    }

    export function splitPath(filePath: string): string[] {
        return trimPath(filePath).split(path.sep);
    }

    export function convertToTreePath(filePath: string): string[] {
        filePath = normalizePath(filePath);
        const segments: string[] = [];
        if (path.isAbsolute(filePath)) {
            segments.push('/');
        }
        return splitPath(filePath);
    }

    export function getRelativePath(filePath: string, root: string) {
        root = normalizePath(root);
        filePath = normalizePath(filePath);

        if (!path.isAbsolute(root)) {
            throw new Error(`Root path must be absolute. Got: "${root}".`);
        }

        if (!path.isAbsolute(filePath)) {
            return filePath;
        }

        if (root === filePath) {
            throw new Error('Cannot create relative path. Paths are equal.');
        }

        const relativePath = path.relative(root, filePath);

        if (relativePath.startsWith('..' + path.sep)) {
            throw new Error(`Could not create relative path. Got: "${filePath}". Root path: "${root}".`);
        }

        return relativePath;
    }

    export function normalizePath(filePath: string): string {
        filePath = filePath.trim();
        if (filePath.startsWith('~/') || filePath === '~') {
            filePath = filePath.replace('~', os.homedir());
        }
        filePath = path.normalize(filePath);

        let end = filePath.length;
        if (filePath.endsWith(path.sep)) {
            end = -1;
        }
        return filePath.slice(0, end);
    }
}
