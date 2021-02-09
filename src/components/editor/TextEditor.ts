import { IContentAssist } from './ContentAssist';
import { IEditor } from './Editor';

/**
 * Page object representing the active text editor
 */
export interface ITextEditor extends IEditor {

    /**
     * Find whether the active editor has unsaved changes
     * @returns Promise resolving to true/false
     */
    isDirty(): Promise<boolean>;

    /**
     * Saves the active editor
     * @returns Promise resolving when ctrl+s is invoked
     */
    save(): Promise<void>;

    /**
     * Retrieve the Uri of the file opened in the active editor
     * @returns Promise resolving to editor's underlying Uri
     */
    getFileUri(): Promise<string>;

    /**
     * Retrieve the path to the file opened in the active editor
     * @returns Promise resolving to editor's underlying file path
     */
    getFilePath(): Promise<string>;

    /**
     * Open/Close the content assistant at the current position in the editor by sending the default
     * keyboard shortcut signal
     * @param open true to open, false to close
     * @returns Promise resolving to ContentAssist object when opening, void otherwise
     */
    toggleContentAssist(open: boolean): Promise<IContentAssist | void>;

    /**
     * Get all text from the editor
     * @returns Promise resolving to editor text
     */
    getText(): Promise<string>;

    /**
     * Replace the contents of the editor with a given text
     * @param text text to type into the editor
     * @param formatText format the new text, default false
     * @returns Promise resolving once the new text is copied over
     */
    setText(text: string, formatText: boolean): Promise<void>;

    /**
     * Deletes all text within the editor
     * @returns Promise resolving once the text is deleted
     */
    clearText(): Promise<void>;

    /**
     * Get text from a given line
     * @param line number of the line to retrieve
     * @returns Promise resolving to text at the given line number
     */
    getTextAtLine(line: number): Promise<string>;

    /**
     * Replace the contents of a line with a given text
     * @param line number of the line to edit
     * @param text text to set at the line
     * @returns Promise resolving when the text is typed in
     */
    setTextAtLine(line: number, text: string): Promise<void>;

    /**
     * Add the given text to the given coordinates
     * @param line number of the line to type into
     * @param column number of the column to start typing at
     * @param text text to add
     * @returns Promise resolving when the text is typed in
     */
    typeText(line: number, column: number, text: string): Promise<void>;

    /**
     * Move the cursor to the given coordinates
     * @param line line number to move to
     * @param column column number to move to
     * @returns Promise resolving when the cursor has reached the given coordinates
     */
    moveCursor(line: number, column: number): Promise<void>;

    /**
     * Get number of lines in the editor
     * @returns Promise resolving to number of lines
     */
    getNumberOfLines(): Promise<number>;

    /**
     * Use the built-in 'Format Document' option to format the text
     * @returns Promise resolving when the Format Document command is invoked
     */
    formatDocument(): Promise<void>;
}
