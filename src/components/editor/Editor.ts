import { IEditorTab } from './EditorTab';
import { IElementWithContextMenu } from '../ElementWithContextMenu';

/**
 * Abstract representation of an editor tab
 */
export interface IEditor extends IElementWithContextMenu {
    /**
     * Get title/name of the open editor
     */
    getTitle(): Promise<string>;

    /**
     * Get the corresponding editor tab
     */
    getTab(): Promise<IEditorTab>;
}
