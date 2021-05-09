import { FileBasedDriverManager } from ".";

export class ChromeWebDriverManager extends FileBasedDriverManager {
    protected getRoot(): string {
        return 'https://chromedriver.storage.googleapis.com';
    }
    protected getLatestVersionUrl(): string {
        return `${this.getRoot()}/LATEST_RELEASE`;
    }

    getBrowserName(): string {
        return 'Chrome';
    }
    getDriverName(): string {
        return 'chromedriver';
    }

    async getDriverDownloadLocation(): Promise<string> {
        if (this.version === undefined) {
            this.version = await this.fetchLatestVersion();
        }
        
        let platform = '';
        if (this.platform === 'win32') {
            platform = 'win32';
        }
        else if (this.platform === 'darwin') {
            platform = 'mac64';
        }
        else if (this.platform === 'linux') {
            platform = 'linux64';
        }
        else {
            throw new Error(`Unsupported platform ${this.platform}`);
        }

        return `${this.getRoot()}/${this.version}/${this.getDriverName()}_${platform}.zip`;
    }
}
