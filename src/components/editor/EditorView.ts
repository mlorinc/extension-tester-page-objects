import { AbstractElement } from '../AbstractElement';
import { IEditor } from './Editor';
import { IEditorGroup } from './EditorGroup';
import { IEditorTab } from './EditorTab';

/**
 * View handling the open editors
 */
export interface IEditorView extends AbstractElement {

    /**
     * Switch to an editor tab with the given title
     * @param title title of the tab
     * @param groupIndex zero based index for the editor group (0 for the left most group)
     * @returns Promise resolving to Editor object
     */
    openEditor(title: string, groupIndex: number): Promise<IEditor>;

    /**
     * Close an editor tab with the given title
     * @param title title of the tab
     * @param groupIndex zero based index for the editor group (0 for the left most group)
     * @returns Promise resolving when the tab's close button is pressed
     */
    closeEditor(title: string, groupIndex: number): Promise<void>;

    /**
     * Close all open editor tabs
     * @param groupIndex optional index to specify an editor group
     * @returns Promise resolving once all tabs have had their close button pressed
     */
    closeAllEditors(groupIndex?: number): Promise<void>;

    /**
     * Retrieve all open editor tab titles in an array
     * @param groupIndex optional index to specify an editor group, if left empty will search all groups
     * @returns Promise resolving to array of editor titles
     */
    getOpenEditorTitles(groupIndex?: number): Promise<string[]>;

    /**
     * Retrieve an editor tab from a given group by title
     * @param title title of the tab
     * @param groupIndex zero based index of the editor group, default 0 (leftmost one)
     * @returns promise resolving to EditorTab object
     */
    getTabByTitle(title: string, groupIndex: number): Promise<IEditorTab>;

    /**
     * Retrieve all open editor tabs
     * @param groupIndex index of group to search for tabs, if left undefined, all groups are searched
     * @returns promise resolving to EditorTab list
     */
    getOpenTabs(groupIndex?: number): Promise<IEditorTab[]>;

    /**
     * Retrieve the active editor tab
     * @returns promise resolving to EditorTab object, undefined if no tab is active
     */
    getActiveTab(): Promise<IEditorTab | undefined>;

    /**
     * Retrieve all editor groups in a list, sorted left to right
     * @returns promise resolving to an array of EditorGroup objects
     */
    getEditorGroups(): Promise<IEditorGroup[]>;

    /**
     * Retrieve an editor group with a given index (counting from left to right)
     * @param index zero based index of the editor group (leftmost group has index 0)
     * @returns promise resolving to an EditorGroup object
     */
    getEditorGroup(index: number): Promise<IEditorGroup>;
}
