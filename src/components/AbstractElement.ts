import {
    By,
    Key,
    Locator,
    until,
    WebDriver,
    WebElement
} from 'selenium-webdriver';
import { SeleniumBrowser } from '../SeleniumBrowser';

/**
 * Default wrapper for webelement
 */
export abstract class AbstractElement extends WebElement {

    public static ctlKey = process.platform === 'darwin' ? Key.COMMAND : Key.CONTROL;
    protected static driver: WebDriver;
    protected static locators: Object;
    protected static versionInfo: { version: string, browser: string };
    protected enclosingItem: WebElement;

    /**
     * Constructs a new element from a Locator or an existing WebElement
     * @param base WebDriver compatible Locator for the given element or a reference to an existing WeBelement
     * @param enclosingItem Locator or a WebElement reference to an element containing the element being constructed
     * this will be used to narrow down the search for the underlying DOM element
     */
    constructor(base: Locator | WebElement, enclosingItem?: WebElement | Locator) {
        try {
        let item: WebElement = AbstractElement.driver.findElement(By.css('html'));
        if (!enclosingItem) {
            enclosingItem = item;
        }

        if (enclosingItem instanceof WebElement) {
            item = enclosingItem;
        } else {
            item = AbstractElement.driver.findElement(enclosingItem);
        }

        if (base instanceof WebElement) {
            super(AbstractElement.driver, base.getId());
        } else {
            super(
                AbstractElement.driver,
                item.findElement(base).getId()
            );
        }
        this.enclosingItem = item;
        }
        catch (e) {
            throw new Error(`${e} - ${base?.constructor?.name || null}(WebElement:${base instanceof WebElement}) | ${enclosingItem?.constructor?.name || null}(WebElement:${enclosingItem instanceof WebElement})`);
        }
    }

    /**
     * Wait for the element to become visible
     * @param timeout custom timeout for the wait
     * @returns thenable self reference
     */
    async wait(timeout?: number): Promise<this> {
        await this.getDriver().wait(until.elementIsVisible(this), timeout || await SeleniumBrowser.instance.getImplicitTimeout());
        return this;
    }

    async waitInteractive(timeout?: number): Promise<this> {
        await this.getDriver().wait(async () => {
            try {
                return await this.isDisplayed() && await this.isEnabled();
            }
            catch {
                return false;
            }
        }, timeout || await SeleniumBrowser.instance.getImplicitTimeout(), `${this.constructor.name} interactivity wait check timed out.`);
        return this;
    }

    async click(timeout?: number): Promise<void> {
        await this.waitInteractive(timeout);
        await this.getDriver().wait(async () => {
            try {
                await super.click();
                return true;
            }
            catch (e) {
                if(e.name === 'ElementClickInterceptedError' || (e.name === 'WebDriverError' && e.message.includes('element click intercepted: Element'))) {
                    return false;
                }
                throw e;
            }
        }, timeout);
    }

    async sendKeys(...var_args: (string | number | Promise<string | number>)[]): Promise<void> {
        await this.waitInteractive();
        await super.sendKeys(...var_args);
    }

    /**
     * Return a reference to the WebElement containing this element
     */
    getEnclosingElement(): WebElement {
        return this.enclosingItem;
    }

    static init(locators: Object, driver: WebDriver, browser: string, version: string) {
        AbstractElement.locators = locators;
        AbstractElement.driver = driver;
        AbstractElement.versionInfo = { version: version, browser: browser };
    }
}
