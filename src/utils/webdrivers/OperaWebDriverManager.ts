import { GithubDriverManager } from ".";
import * as fs from "fs-extra";
import * as path from "path";


export class OperaWebDriverManager extends GithubDriverManager {
    getRepository(): string {
        return 'operachromiumdriver';
    }
    getUser(): string {
        return 'operasoftware';
    }
    getVersionKey(): string {
        return 'tag_name';
    }
    getBrowserName(): string {
        return 'Opera';
    }
    getDriverName(): string {
        return 'operadriver';
    }
    protected async getDriverDownloadLocation(): Promise<string> {
        if (this.version === undefined) {
            this.version = await this.fetchLatestVersion();
        }

        let platform = '';
        if (this.platform === 'win32') {
            platform = 'win64';
        }
        else if (this.platform === 'darwin') {
            platform = 'mac64'
        }
        else if (this.platform === 'linux') {
            platform = 'linux64';
        }
        else {
            throw new Error(`Unsupported platform ${this.platform}`);
        }

        return await this.findUrl(this.version, platform);
    }
    
    protected async installDriver(archivePath: string): Promise<void> {
        await super.installDriver(archivePath);

        const parent = path.dirname(archivePath);
        const files = fs.readdirSync(parent);
        
        // remove redundant directory
        if (files.length === 1) {
            const folder = path.join(parent, files[0]);
            fs.moveSync(path.join(folder, this.getDriverName()), path.join(parent, this.getDriverName()));
            fs.removeSync(folder);
        }
        else {
            throw new Error('Unexpected number of folders.');
        }
    }
}
