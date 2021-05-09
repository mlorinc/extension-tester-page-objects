import * as download from "download";
import { WebDriverManager } from ".";

export abstract class FileBasedDriverManager extends WebDriverManager {
    protected abstract getRoot(): string;
    protected abstract getLatestVersionUrl(): string;

    protected async fetchLatestVersion(options?: download.DownloadOptions): Promise<string> {
        const encoding = options?.encoding ?? 'utf8';
        const version = await download(this.getLatestVersionUrl(), undefined, {
            encoding,
            ...options
        });
        return WebDriverManager.sanitizeVersion(version.toString(encoding as BufferEncoding));
    }
}
