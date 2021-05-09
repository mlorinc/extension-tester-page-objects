import * as download from "download";
import { WebDriverManager } from ".";

export abstract class GithubDriverManager extends WebDriverManager {
    private requestCache: any[] | undefined;

    abstract getRepository(): string;
    abstract getUser(): string;
    abstract getVersionKey(): string;
    
    private getEndpoint(): string {
        return `https://api.github.com/repos/${this.getUser()}/${this.getRepository()}/releases`;
    }

    protected async fetch(options?: download.DownloadOptions): Promise<any[]> {
        if (this.requestCache) {
            return this.requestCache;
        }

        const encoding = options?.encoding ?? 'utf8';
        const version = await download(this.getEndpoint(), undefined, {
            encoding,
            ...options
        });

        this.requestCache = JSON.parse(version.toString(encoding as BufferEncoding));

        if (this.requestCache === undefined) {
            throw new Error('Unexpected error. Response is undefined.');
        }

        if (this.requestCache.length === 0) {
            throw new Error('Unexpected error. API response is empty.');
        }

        return this.requestCache;
    }

    async fetchLatestVersion(options?: download.DownloadOptions): Promise<string> {
        const releases = await this.fetch(options);
        return releases[0][this.getVersionKey()] as string;
    }

    async findUrl(wantedVersion: string, platform: string): Promise<string> {
        const releases = await this.fetch();
        for (const release of releases) {
            let version = WebDriverManager.sanitizeVersion(release[this.getVersionKey()] as string);

            if (version === wantedVersion) {
                for (const asset of release.assets) {
                    const filename = asset.name as string;
                    if (filename.includes(platform) && filename.endsWith('asc') === false) {
                        return asset['browser_download_url'];
                    }
                }
            }
        }

        throw new Error(`Could not get download URL for gecko driver of version ${this.version}`);
    }
}
