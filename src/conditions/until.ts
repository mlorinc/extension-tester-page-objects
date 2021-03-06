import { Button, WebDriver, WebElement, WebElementCondition } from "selenium-webdriver";

export namespace ExtestUntil {
    export function elementInteractive(element: WebElement): WebElementCondition {
        const fn = async function (driver: WebDriver): Promise<WebElement | undefined> {
            try {
                if (await isInteractive(element)) {
                    return element;
                }
            }
            catch (e) {
                if (e.name === 'StaleElementReferenceError') {
                    throw e;
                }
            }
            return undefined;
        };

        return new WebElementCondition('for element to be interactive (visible + enabled).', fn);
    }

    export function safeClick(element: WebElement, button: string = Button.LEFT): WebElementCondition {
        const fn = async function (driver: WebDriver): Promise<WebElement | undefined> {
            try {
                if (await isInteractive(element)) {
                    if (button === Button.LEFT) {
                        await element.click();
                    }
                    else {
                        await driver.actions().click(element, button).perform();
                    }
                    return element;
                }
                else {
                    return undefined;
                }
            }
            catch (e) {
                if ((e.name === 'ElementClickInterceptedError') ||
                    (e.name === 'WebDriverError' && e.message.includes('element click intercepted: Element'))
                ) {
                    console.warn(e.message);
                    return undefined;
                }
                throw e;
            }
        };

        return new WebElementCondition('for element to be clicked. Make sure the elements is enabled, visible and not covered by other element.', fn);
    }

    export function safeSendKeys(element: WebElement, ...var_args: (string | number | Promise<string | number>)[]): WebElementCondition {
        const fn = async function (driver: WebDriver): Promise<WebElement | undefined> {
            try {
                if (await isInteractive(element)) {
                    await element.sendKeys(...var_args);
                    return element;
                }
                else {
                    return undefined;
                }
            }
            catch {
                return undefined;
            }
        };

        return new WebElementCondition('for element to be clicked. Make sure the elements is enabled, visible and not covered by other element.', fn);
    }
}

async function isInteractive(element: WebElement): Promise<boolean> {
    return new Promise((resolve) => {
        let resolveCount = 0;

        element.isDisplayed()
            .then((value) => {
                if (value === false) {
                    resolve(false);
                    return;
                }
                else {
                    resolveCount += 1;

                    if (resolveCount === 2) {
                        resolve(true);
                    }
                }
            });

        element.isEnabled()
            .then((value) => {
                if (value === false) {
                    resolve(false);
                    return;
                }
                else {
                    resolveCount += 1;

                    if (resolveCount === 2) {
                        resolve(true);
                    }
                }
            });
    });
}
