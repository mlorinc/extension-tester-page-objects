import { IMenu } from '../menu/Menu';

/**
 * Page object representing the content assistant
 */
export interface IContentAssist extends IMenu {
    /**
     * Get content assist item by name/text
     * @param name name/text to search by
     * @returns Promise resolving to ContentAssistItem object
     */
    getItem(name: string): Promise<IMenu>;

    /**
     * Get all visible content assist items
     * @returns Promise resolving to array of ContentAssistItem objects
     */
    getItems(): Promise<IMenu[]>;

    /**
     * Find if the content assist is still loading the suggestions
     * @returns promise that resolves to true when suggestions are done loading,
     * to false otherwise
     */
    isLoaded(): Promise<boolean>;
}
