import { AbstractElement } from '../../AbstractElement';

/**
 * item representing a Setting with title, description and
 * an input element (combo/textbox/checkbox/link)
 */
export interface ISetting extends AbstractElement {
    /**
     * Get the value of the setting based on its input type
     * 
     * @returns promise that resolves to the current value of the setting
     */
    getValue(): Promise<string | boolean>
    
    /**
     * Set the value of the setting based on its input type
     *
     * @param value boolean for checkboxes, string otherwise
     */
    setValue(value: string | boolean): Promise<void>

    /**
     * Get the category of the setting
     * All settings are labeled as Category: Title
     */
    getCategory(): string;

    /**
     * Get description of the setting
     * @returns Promise resolving to setting description
     */
    getDescription(): Promise<string>;

    /**
     * Get title of the setting
     */
    getTitle(): string;
}
