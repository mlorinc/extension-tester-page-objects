import {
    WebElement
} from 'selenium-webdriver';

/**
 * Default wrapper for webelement
 */
export interface AbstractElement extends WebElement {
    /**
     * Wait for the element to become visible
     * @param timeout custom timeout for the wait
     * @returns thenable self reference
     */
    wait(timeout?: number): Promise<this>;

    /**
     * Return a reference to the WebElement containing this element
     */
    getEnclosingElement(): WebElement;
}