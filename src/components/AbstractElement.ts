import {
    Button,
    By,
    Key,
    Locator,
    until,
    WebDriver,
    WebElement,
    WebElementPromise
} from 'selenium-webdriver';
import { repeat, StopRepeat } from '../conditions/Repeat';
import { ExtestUntil } from '../conditions/until';
import { getTimeout, SeleniumBrowser } from '../SeleniumBrowser';

/**
 * Default wrapper for webelement
 */
export abstract class AbstractElement extends WebElement {

    public static ctlKey = process.platform === 'darwin' ? Key.COMMAND : Key.CONTROL;
    protected static driver: WebDriver;
    protected static locators: Object;
    protected static versionInfo: { version: string, browser: string };
    protected enclosingItem!: WebElement;

    /**
     * Constructs a new element from a Locator or an existing WebElement
     * @param base WebDriver compatible Locator for the given element or a reference to an existing WebElement
     * @param enclosingItem Locator or a WebElement reference to an element containing the element being constructed
     * this will be used to narrow down the search for the underlying DOM element
     */
    constructor(base: Locator | WebElement, enclosingItem?: WebElement | Locator) {
        try {
            if (base instanceof WebElement) {
                super(SeleniumBrowser.instance.driver, base.getId());
                this.enclosingItem = findParent(enclosingItem);
            }
            else {
                super(
                    SeleniumBrowser.instance.driver,
                    findElement(enclosingItem, base)
                        .then(([id, parent]) => {
                            this.enclosingItem = parent;
                            return id;
                        })
                        .catch((e) => {
                            e.message = `${e.message}. Called from "${this.constructor.name}".`
                            throw e;
                        })
                );
            }
        }
        catch (e) {
            e.message = errorHelper(e, base, enclosingItem);
            throw e;
        }
    }

    /**
     * Wait for the element to become visible
     * @param timeout custom timeout for the wait
     * @returns thenable self reference
     */
    async wait(timeout?: number): Promise<this> {
        await this.getDriver().wait(until.elementIsVisible(this), getTimeout(timeout));
        return this;
    }

    async safeClick(button: string = Button.LEFT, timeout?: number): Promise<void> {
        await this.getDriver().wait(ExtestUntil.safeClick(this, button), getTimeout(timeout), `Could not perform safe click(${button}). Enabled: ${await this.isEnabled()}, Visible: ${await this.isDisplayed()}.`);
    }

    async safeDoubleClick(button: string = Button.LEFT, timeout?: number): Promise<void> {
        await this.getDriver().wait(ExtestUntil.elementInteractive(this), getTimeout(timeout)); 
        await this.getDriver().actions().doubleClick(this, button).perform();
    }

    async safeSendKeys(timeout?: number, ...var_args: (string | number | Promise<string | number>)[]): Promise<void> {
        await this.getDriver().wait(ExtestUntil.safeSendKeys(this, ...var_args), getTimeout(timeout));
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

function findParent(element?: WebElement | Locator): WebElement | WebElementPromise {
    const driver = SeleniumBrowser.instance.driver;
    const timeout = getTimeout();
    if (element == null) {
        if (timeout > 0) {
            return driver.wait(until.elementLocated(By.css('html')), timeout);
        }
        return driver.findElement(By.css('html'));
    }
    else if (element instanceof WebElement || element instanceof WebElementPromise) {
        return element;
    }
    else {
        if (timeout > 0) {
            return driver.wait(until.elementLocated(element), timeout);
        }
        return driver.findElement(element);
    }
}

async function findElement(parent: Locator | WebElement | undefined, base: Locator): Promise<[string, WebElement]> {
    let parentElement = await findParent(parent);

    const element = await repeat(async () => {
        try {
            return await parentElement.findElement(base);
        }
        catch (e) {
            if (e.name === 'StaleElementReferenceError') {
                if (parent instanceof WebElement) {
                    throw new Error(`StaleElementReferenceError of parent element. Try using locator.\n${e}`);
                }
                parentElement = await findParent(parent);
            }

            if (e.message.includes('Invalid locator')) {
                throw new StopRepeat(`Invalid locator: toString(${base.toString()}), class(${base?.constructor?.name}), keys(${Object.keys(base).join(', ')}}).`);
            }

            return undefined;
        }
    }, {
        timeout: getTimeout(),
        id: 'AbstractElement.findElement',
        message: errorHelper('Could not find element', base, parent)
    });
    return [await element!.getId(), parentElement];
}

function errorHelper(e: Error | string, base: WebElement | Locator, enclosingItem: WebElement | Locator | undefined): string {
    const message = e instanceof Error ? e.message : e;
    const baseMessage = base?.constructor?.name || `WebElement: ${base instanceof WebElement}`;
    const parentMessage = enclosingItem?.constructor?.name || `WebElement: ${enclosingItem instanceof WebElement}`;
    return `${message}: Base locator: ${baseMessage}, Parent locator: ${parentMessage}`;
}
