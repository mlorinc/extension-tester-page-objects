import { IElementWithContextMenu } from '../../ElementWithContextMenu';

/**
 * Page object representing a SCM change tree item
 */
export interface IScmChange extends IElementWithContextMenu {
    /**
     * Get label as a string
     */
    getLabel(): Promise<string>;

    /**
     * Get description as a string
     */
    getDescription(): Promise<string>;

    /**
     * Get the status string (e.g. 'Modified')
     */
    getStatus(): Promise<string>;

    /**
     * Find if the item is expanded
     * @returns promise resolving to true if change is expanded, to false otherwise
     */
    isExpanded(): Promise<boolean>;

    /**
     * Expand or collapse a change item if possible, only works for folders in hierarchical view mode
     * @param expand true to expand the item, false to collapse
     * @returns promise resolving to true if the item changed state, to false otherwise
     */
    toggleExpand(expand: boolean): Promise<boolean>;

    /**
     * Find and click an action button available to a given change tree item
     * @param title title of the action button (e.g 'Stage Changes')
     * @returns promise resolving to true if the action was performed successfully,
     * false if the given button does not exist
     */
    takeAction(title: string): Promise<boolean>;
}
