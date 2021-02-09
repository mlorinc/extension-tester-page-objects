import { IElementWithContextMenu } from '../ElementWithContextMenu';

/**
 * Page object for editor view tab
 */
export interface IEditorTab extends IElementWithContextMenu {
    /**
     * Get the tab title as string
     */
    getTitle(): Promise<string>;

    /**
     * Select (click) the tab
     */
    select(): Promise<void>;
}
