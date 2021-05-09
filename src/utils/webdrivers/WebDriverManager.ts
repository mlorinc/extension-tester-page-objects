import * as download from "download";
import * as fs from "fs-extra";
import * as path from "path";
import * as extract from "extract-zip";
import * as url from "url";
import * as tar from "tar";
import { ChromeWebDriverManager, GeckoWebDriverManager, OperaWebDriverManager } from ".";

export interface IWebDriverManager {
    getBinaryPath(): Promise<string>;
    getBrowserName(): string;
    getDriverName(): string;
    getDriverVersion(): string;
    downloadDriver(options?: download.DownloadOptions): Promise<void>;
}

export abstract class WebDriverManager implements IWebDriverManager {
    protected driverDir: string;
    protected _version: string | undefined;
    protected platform: NodeJS.Platform;

    constructor(driverDir: string, version?: string, platform?: NodeJS.Platform) {
        this.driverDir = path.isAbsolute(driverDir) ? driverDir : path.resolve('.', driverDir);
        this._version = version;
        this.platform = platform ?? process.platform;
    }

    abstract getBrowserName(): string;
    abstract getDriverName(): string;
    protected abstract getDriverDownloadLocation(): Promise<string>;
    protected abstract fetchLatestVersion(options?: download.DownloadOptions): Promise<string>;


    public get version(): string | undefined {
        return this._version;
    }


    public set version(version: string | undefined) {
        if (version === undefined) {
            throw new Error('Cannot set version as undefined.');
        }

        this._version = WebDriverManager.sanitizeVersion(version);
    }

    protected static sanitizeVersion(version: string) {
        if (version.startsWith('v.')) {
            return version.slice(2);
        }
        else if (version.startsWith('v.')) {
            return version.slice(1);
        }
        else {
            return version;
        }
    }

    async getBinaryPath(): Promise<string> {
        if (this.version === undefined) {
            this.version = this.getLatestVersion();
        }
        const driver = path.join(this.getDriverLocation(), this.getDriverName());

        if (fs.existsSync(driver)) {
            return driver;
        }

        throw new Error(`Driver with path "${driver}" does not exist.`);
    }

    protected getLatestVersion(): string {
        if (fs.existsSync(this.getDriverStorage()) === false) {
            throw new Error('There are not drivers to use.');
        }

        const files = fs.readdirSync(this.getDriverStorage());

        if (files.length === 0) {
            throw new Error('There are not drivers to use.');
        }

        const file = files[files.length - 1];

        if (fs.statSync(file).isDirectory()) {
            return path.basename(file);
        }
        else {
            throw new Error(`There is normal file in driver storage. Delete "${file}".`);
        }
    }

    protected getDriverStorage(): string {
        return path.join(this.driverDir, this.platform, this.getBrowserName());
    }

    protected getDriverLocation(): string {
        return path.join(this.getDriverStorage(), this.getDriverVersion());
    }

    getDriverVersion(): string {
        if (this.version) {
            return this.version;
        }
        else {
            return this.getLatestVersion();
        }
    }

    protected async installDriver(archivePath: string): Promise<void> {
        if (archivePath.endsWith('.zip')) {
            await extract(archivePath, {
                dir: path.dirname(archivePath),
                defaultFileMode: 755
            });
        }
        else {
            await tar.extract({
                file: archivePath,
                cwd: path.dirname(archivePath)
            });
        }

        fs.removeSync(archivePath);
    }

    async downloadDriver(options?: download.DownloadOptions): Promise<void> {
        const location = await this.getDriverDownloadLocation();

        const saveLocation = this.getDriverLocation();
        fs.mkdirpSync(saveLocation);

        const driverBinaryFilename = path.join(saveLocation, this.getDriverName());
        const archive = path.join(saveLocation, path.basename(new url.URL(location).pathname));

        if (fs.existsSync(driverBinaryFilename)) {
            console.log(`Skipping download: driver "${driverBinaryFilename}" exists.`);
            return;
        }

        if (fs.existsSync(archive)) {
            console.log(`Found downloaded driver archive: ${archive}`);
            console.log(`Extracting driver archive...`);
            await this.installDriver(archive);
            console.log(`Driver ${this.getDriverName()} was successfully installed.`);
            return;
        }

        const stream = download(location, undefined, {
            ...options
        });
        console.log(`Downloading driver from "${location}".`);

        return new Promise((resolve, reject) => {
            stream.on('close', () => {
                console.log(`Successfully downloaded ${this.getDriverName()}.`);
            });

            stream.on('error', (e) => {
                fs.removeSync(saveLocation);
                reject(e);
            });

            stream.pipe((fs.createWriteStream(archive))).on('close', async () => {
                console.log(`Extracting downloaded ${this.getDriverName()}.`);
                await this.installDriver(archive);
                console.log(`Driver ${this.getDriverName()} was successfully installed.`);
                resolve();
            });

            stream.on('downloadProgress', (progress) => {
                const transferred = Math.ceil(progress.transferred);
                const total = progress.total ? Math.ceil(progress.total) : 'unknown';

                const message = `${this.getDriverName()}-${this.getDriverVersion()}: ${transferred} / ${total}.`;
                process.stdout.write(`\r${message}`);
            });
        });
    }
}

export function createWebDriverManager(browserName: string, driverDir: string, version?: string): WebDriverManager {
    switch (browserName.toLowerCase()) {
        case 'chrome':
            return new ChromeWebDriverManager(driverDir, version);
        case 'firefox':
            return new GeckoWebDriverManager(driverDir, version);
        case 'opera':
            return new OperaWebDriverManager(driverDir, version);
        case 'safari':
            throw new Error('Cannot create safari WebDriver manager. See Selenium documentation.');
        default:
            throw new Error(`Unknown browser name ${browserName}.`);
            break;
    }
}
