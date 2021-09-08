import * as fs from 'fs-extra';
import * as path from 'path';
import { WebDriver } from 'selenium-webdriver';

export abstract class SeleniumBrowser {
    public static instance: SeleniumBrowser;

    public abstract get driver(): WebDriver;

    public abstract get name(): string;

    public abstract get storagePath(): string;

    public abstract get screenshotsStoragePath(): string;

    public abstract get version(): string;
    
    abstract start(): Promise<this>;
    abstract quit(): Promise<void>;

    /**
     * Waits until parts of the workbench are loaded
     */
    abstract waitForWorkbench(): Promise<void>;

    /**
     * Take a screenshot of the browser
     * @param name file name of the screenshot without extension
     */
    async takeScreenshot(name: string): Promise<void> {
        const data = await this.driver.takeScreenshot();
        const dir = path.join(this.storagePath, 'screenshots');
        fs.mkdirpSync(dir);
        fs.writeFileSync(path.join(dir, `${name}.png`), data, 'base64');
    }
}
