import { GithubDriverManager } from ".";

export class GeckoWebDriverManager extends GithubDriverManager {
    getVersionKey(): string {
        return 'tag_name';
    }
    getRepository(): string {
        return 'geckodriver';
    }
    getUser(): string {
        return 'mozilla';
    }

    getBrowserName(): string {
        return 'Firefox';
    }
    getDriverName(): string {
        return 'geckodriver';
    }

    async getDriverDownloadLocation(): Promise<string> {
        if (this.version === undefined) {
            this.version = await this.fetchLatestVersion();
        }

        let platform = '';
        if (this.platform === 'win32') {
            platform = 'win64';
        }
        else if (this.platform === 'darwin') {
            platform = 'macos-aarch64'
        }
        else if (this.platform === 'linux') {
            platform = 'linux64';
        }
        else {
            throw new Error(`Unsupported platform ${this.platform}`);
        }

        return await this.findUrl(this.version, platform);
    }
}
