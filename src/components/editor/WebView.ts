import { IEditor } from './Editor';
import { Locator, WebElement } from 'selenium-webdriver';

/**
 * Page object representing an open editor containing a web view
 */
export interface IWebView extends IEditor {
    /**
     * Search for an element inside the webview iframe.
     * Requires webdriver being switched to the webview iframe first.
     * (Will attempt to search from the main DOM root otherwise)
     * 
     * @param locator webdriver locator to search by
     * @returns promise resolving to WebElement when found
     */
    findWebElement(locator: Locator): Promise<WebElement>;

    /**
     * Search for all element inside the webview iframe by a given locator
     * Requires webdriver being switched to the webview iframe first.
     * (Will attempt to search from the main DOM root otherwise)
     * 
     * @param locator webdriver locator to search by
     * @returns promise resolving to a list of WebElement objects
     */
    findWebElements(locator: Locator): Promise<WebElement[]>;

    /**
     * Switch the underlying webdriver context to the webview iframe.
     * This allows using the findWebElement methods.
     * Note that only elements inside the webview iframe will be accessible.
     * Use the switchBack method to switch to the original context.
     */
    switchToFrame(): Promise<void>;

    /**
     * Switch the underlying webdriver back to the original window
     */
    switchBack(): Promise<void>;
}
