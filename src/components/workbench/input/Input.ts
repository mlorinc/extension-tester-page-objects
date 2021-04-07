import { AbstractElement } from '../../AbstractElement';

/**
 * page object for input fields
 */
export interface IInput extends AbstractElement {

    /**
     * Set (by selecting all and typing) text in the input field
     * @param text text to set into the input field
     * @returns Promise resolving when the text is typed in
     */
    setText(text: string): Promise<void>;

    /**
     * Get the placeholder text for the input field
     * @returns Promise resolving to input placeholder
     */
    getPlaceHolder(): Promise<string>;

    /**
     * Confirm the input field by pressing Enter
     * @returns Promise resolving when the input is confirmed
     */
    confirm(): Promise<void>;

    /**
     * Cancel the input field by pressing Escape
     * @returns Promise resolving when the input is cancelled
     */
    cancel(): Promise<void>;

    /**
     * Clear the inpur field
     * @returns Promise resolving when the field is cleared
     */
    clear(): Promise<void>;

    /**
     * Select (click) a quick pick option. Will scroll through the quick picks to find the item.
     * Search for the item can be done by its text, or index in the quick pick menu.
     * Note that scrolling does not affect the item's index, but it will
     * replace some items in the DOM (thus they become unreachable)
     * 
     * @param indexOrText index (number) or text (string) of the item to search by
     * @returns Promise resolving when the given quick pick is selected
     */
    selectQuickPick(indexOrText: string | number): Promise<void>;

    /**
     * Select/Deselect all quick picks using the 'select all' checkbox
     * If multiple selection is disabled on the input box, no action is performed
     * 
     * @param state true to select all, false to deselect all
     * @returns Promise resolving when all quick picks have been toggled to desired state
     */
    toggleAllQuickPicks(state: boolean): Promise<void>;

    /**
     * Scroll through the quick picks to find an item by the name or index
     * @param indexOrText index (number) or text (string) of the item to search by
     * @returns Promise resolvnig to QuickPickItem if found, to undefined otherwise
     */
    findQuickPick(indexOrText: string | number): Promise<IQuickPickItem | undefined>;

    /**
     * Retrieve the title of an input box if it has one
     * @returns Promise resolving to title if it exists, to undefined otherwise
     */
    getTitle(): Promise<string | undefined>;

    /**
     * Click on the back button if it exists
     * @returns Promise resolving to true if a button was clicked, to false otherwise
     */
    back(): Promise<boolean>;

    /**
     * Find whether the input box has an active progress bar
     * @returns Promise resolving to true/false
     */
    hasProgress(): Promise<boolean>

    /**
     * Retrieve the quick pick items currently available in the DOM
     * (visible in the quick pick menu)
     * @returns Promise resolving to array of QuickPickItem objects
     */
    getQuickPicks(): Promise<IQuickPickItem[]>;
}

/**
 * Page object representing a quick pick option in the input box
 */
export interface IQuickPickItem extends AbstractElement {
    /**
     * Get the label of the quick pick item
     */
    getLabel(): Promise<string>;

    /**
     * Get the description of the quick pick item
     */
    getDescription(): Promise<string | undefined>;

    /**
     * Get the index of the quick pick item
     */
    getIndex(): Promise<number>;

    /**
     * Select (click) the quick pick item
     * @returns Promise resolving when the item has been clicked
     */
    select(): Promise<void>;
}
