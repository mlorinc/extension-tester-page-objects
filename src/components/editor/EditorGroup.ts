import { WebElement } from '../..';
import { AbstractElement } from '../AbstractElement';
import { IEditor } from './Editor';
import { IEditorTab } from './EditorTab';

/**
 * Page object representing an editor group
 */
export interface IEditorGroup extends AbstractElement {
    /**
     * Switch to an editor tab with the given title
     * @param title title of the tab
     * @returns Promise resolving to Editor object
     */
    openEditor(title: string): Promise<IEditor>;

    /**
     * Close an editor tab with the given title
     * @param title title of the tab
     * @returns Promise resolving when the tab's close button is pressed
     */
    closeEditor(title: string): Promise<void>;

    /**
     * Close all open editor tabs
     * @returns Promise resolving once all tabs have had their close button pressed
     */
    closeAllEditors(): Promise<void>;

    /**
     * Retrieve all open editor tab titles in an array
     * @returns Promise resolving to array of editor titles
     */
    getOpenEditorTitles(): Promise<string[]>;

    /**
     * Retrieve an editor tab by title
     * @param title title of the tab
     * @returns promise resolving to EditorTab object
     */
    getTabByTitle(title: string): Promise<IEditorTab>;

    /**
     * Retrieve all open editor tabs
     * @returns promise resolving to EditorTab list
     */
    getOpenTabs(): Promise<IEditorTab[]>;

    /**
     * Retrieve the active editor tab
     * @returns promise resolving to EditorTab object, undefined if no tab is active
     */
    getActiveTab(): Promise<IEditorTab | undefined>;

    /**
     * Retrieve the editor action buttons as WebElements
     * @returns promise resolving to list of WebElement objects
     */
    getActions(): Promise<WebElement[]>;

    /**
     * Find an editor action button by title
     * @param title title of the button
     * @returns promise resolving to WebElement representing the button if found, undefined otherwise
     */
    getAction(title: string): Promise<WebElement | undefined>;
}
