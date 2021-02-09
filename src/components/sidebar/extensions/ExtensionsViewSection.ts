import { IExtensionsViewItem } from './ExtensionsViewItem';
import { IViewSection } from '../ViewSection';

/**
 * View section containing extensions
 */
export interface IExtensionsViewSection extends IViewSection {
    getVisibleItems(): Promise<IExtensionsViewItem[]>;

    /**
     * Search for an extension by title. This utilizes the search bar
     * in the Extensions view, which switches the perspective to the
     * section representing the chosen category and temporarily hides all other sections.
     * If you wish to continue working with the initial view section
     * (i.e. Enabled), use the clearSearch method to reset it back to default
     * 
     * @param title title to search for in '@category name' format,
     * e.g '@installed extension'. If no @category is present, marketplace will be searched
     * 
     * @returns Promise resolving to ExtensionsViewItem if such item exists, undefined otherwise
     */
    findItem(title: string): Promise<IExtensionsViewItem | undefined>;

    /**
     * Clears the search bar on top of the view
     * @returns Promise resolving when the search box is cleared
     */
    clearSearch(): Promise<void>;

    /**
     * Find and open an extension item
     * @param title title of the extension
     * @returns Promise resolving when the item is clicked
     */
    openItem(title: string): Promise<never[]>;
}
