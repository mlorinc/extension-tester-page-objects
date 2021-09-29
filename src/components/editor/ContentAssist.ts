import { IContextMenu } from '../..';
import { IMenuItem } from '../menu/MenuItem';

/**
 * Page object representing the content assistant
 */
export interface IContentAssist extends IContextMenu {
    /**
     * Get content assist item by name/text
     * @param name name/text to search by
     * @returns Promise resolving to ContentAssistItem object
     */
    getItem(name: string): Promise<IMenuItem | undefined>;

    /**
     * Get all visible content assist items
     * @returns Promise resolving to array of ContentAssistItem objects
     */
    getItems(): Promise<IMenuItem[]>;

    /**
     * Find if the content assist is still loading the suggestions
     * @returns promise that resolves to true when suggestions are done loading,
     * to false otherwise
     */
    isLoaded(): Promise<boolean>;
}
