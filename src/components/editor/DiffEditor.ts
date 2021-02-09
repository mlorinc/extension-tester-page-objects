import { IEditor } from './Editor';
import { ITextEditor } from './TextEditor';

/**
 * Page object representing a diff editor
 */
export interface IDiffEditor extends IEditor {

    /**
     * Gets the text editor corresponding to the originalside.
     * (The left side of the diff editor)
     * @returns Promise resolving to TextEditor object
     */
    getOriginalEditor(): Promise<ITextEditor>;

    /**
     * Gets the text editor corresponding to the modified side.
     * (The right side of the diff editor)
     * @returns Promise resolving to TextEditor object
     */
    getModifiedEditor(): Promise<ITextEditor>;
}
