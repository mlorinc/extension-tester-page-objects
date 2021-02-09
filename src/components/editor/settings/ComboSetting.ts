import { ISetting } from './Setting';

/**
 * Setting with a combo box 
 */
export interface IComboSetting extends ISetting {
    /**
     * Get the labels of all options from the combo
     * @returns Promise resolving to array of string values
     */
    getValues(): Promise<string[]>;
}
