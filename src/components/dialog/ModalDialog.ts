import { AbstractElement } from '../AbstractElement';
import { WebElement } from 'selenium-webdriver';

/**
 * Page Object for Custom Style Modal Dialogs (non-native)
 */
export interface IModalDialog extends AbstractElement {
    /**
     * Get the dialog's message in a Promise
     */
    getMessage(): Promise<string>;

    /**
     * Get the details message in a Promise
     */
    getDetails(): Promise<string>;

    /**
     * Get the list of buttons as WebElements
     * 
     * @returns Promise resolving to Array of WebElement items representing the buttons
     */
    getButtons(): Promise<WebElement[]>;

    /**
     * Push a button with given title if it exists
     * 
     * @param title title/text of the button
     */
    pushButton(title: string): Promise<void>;

    /**
     * Close the dialog using the 'cross' button
     */
    close(): Promise<void>;
}
