import { AbstractElement } from '../AbstractElement';
import { IViewItem } from './ViewItem';

/**
 * Page object representing a collapsible content section of the side bar view
 */
export interface IViewSection extends AbstractElement {
    /**
     * Get the title of the section as string
     * @returns Promise resolving to section title
     */
    getTitle(): Promise<string>;

    /**
     * Expand the section if collapsed
     * @returns Promise resolving when the section is expanded
     */
    expand(): Promise<void>;

    /**
     * Collapse the section if expanded
     * @returns Promise resolving when the section is collapsed
     */
    collapse(): Promise<void>;

    /**
     * Finds whether the section is expanded
     * @returns Promise resolving to true/false
     */
    isExpanded(): Promise<boolean>;

    /**
     * Retrieve all items currently visible in the view section.
     * Note that any item currently beyond the visible list, i.e. not scrolled to, will not be retrieved.
     * @returns Promise resolving to array of ViewItem objects
     */
    getVisibleItems(): Promise<IViewItem[]>;

    /**
     * Find an item in this view section by label. Does not perform recursive search through the whole tree.
     * Does however scroll through all the expanded content. Will find items beyond the current scroll range.
     * @param label Label of the item to search for.
     * @param maxLevel Limit how deep the algorithm should look into any expanded items, default unlimited (0)
     * @returns Promise resolving to ViewItem object is such item exists, undefined otherwise
     */
    findItem(label: string, maxLevel?: number): Promise<IViewItem | undefined>;

    /**
     * Open an item with a given path represented by a sequence of labels
     * 
     * e.g to open 'file' inside 'folder', call
     * openItem('folder', 'file')
     * 
     * The first item is only searched for directly within the root element (depth 1).
     * The label sequence is handled in order. If a leaf item (a file for example) is found in the middle
     * of the sequence, the rest is ignored.
     * 
     * If the item structure is flat, use the item's title to search by.
     * 
     * @param path Sequence of labels that make up the path to a given item.
     * @returns Promise resolving to array of ViewItem objects representing the last item's children.
     * If the last item is a leaf, empty array is returned.
     */
    openItem(...path: string[]): Promise<IViewItem[]>;

    /**
     * Retrieve the action buttons on the section's header
     * @returns Promise resolving to array of ViewPanelAction objects
     */
    getActions(): Promise<IViewPanelAction[]>;

    /**
     * Retrieve an action button on the sections's header by its label
     * @param label label/title of the button
     * @returns ViewPanelAction object
     */
    getAction(label: string): Promise<IViewPanelAction>;
}

/**
 * Action button on the header of a view section
 */
export interface IViewPanelAction extends AbstractElement {
    /**
     * Get label of the action button
     */
    getLabel(): Promise<string>;
}
