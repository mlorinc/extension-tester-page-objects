import { AbstractElement } from '../AbstractElement';
import { By, WebElement } from 'selenium-webdriver';
import { IElementWithContextMenu } from '../ElementWithContextMenu';

/**
 * Arbitrary item in the side bar view
 */
export interface IViewItem extends IElementWithContextMenu {
    /**
     * Select the item in the view.
     * Note that selecting the item will toggle its expand state when applicable.
     * @returns Promise resolving when the item has been clicked
     */    
    select(): Promise<void>;
}


/**
 * representation of a row in the tree inside a view content section
 */
export interface ITreeItem extends IViewItem {
    /**
     * Retrieves the label of this view item
     */
    getLabel(): Promise<string>;

    /**
     * Finds whether the item has children (whether it is collapsible)
     * @returns Promise resolving to true/false
     */
    hasChildren(): Promise<boolean>

    /**
     * Finds whether the item is expanded. Always returns false if item has no children.
     * @returns Promise resolving to true/false
     */
    isExpanded(): Promise<boolean>

    /**
     * Find children of an item, will try to expand the item in the process
     * @returns Promise resolving to array of TreeItem objects, empty array if item has no children
     */
    getChildren(): Promise<ITreeItem[]>

    /**
     * Find a child item with the given name
     * @returns Promise resolving to TreeItem object if the child item exists, undefined otherwise
     */
    findChildItem(name: string): Promise<ITreeItem | undefined>;

    /**
     * Collapse the item if expanded
     */
    collapse(): Promise<void>;

    /**
     * Find all action buttons bound to the view item
     * 
     * @returns array of ViewItemAction objects, empty array if item has no
     * actions associated
     */
    getActionButtons(): Promise<IViewItemAction[]>;

    /**
     * Find action button for view item by label
     * @param label label of the button to search by
     * 
     * @returns ViewItemAction object if such button exists, undefined otherwise
     */
    getActionButton(label: string): Promise<IViewItemAction | undefined>;

    /**
     * Find all child elements of a tree item
     * @param locator locator of a given type of tree item
     */
    getChildItems(locator: By): Promise<WebElement[]>;
}

/**
 * Action button bound to a view item
 */
export interface IViewItemAction extends AbstractElement {
    /**
     * Get label of the action button
     */
    getLabel(): string;
}
