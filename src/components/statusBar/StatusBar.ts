import { AbstractElement } from '../AbstractElement';
import { INotificationsCenter } from '../workbench/NotificationsCenter';

/**
 * Page object for the status bar at the bottom
 */
export interface IStatusBar extends AbstractElement {
    /**
     * Open the notifications center
     * @returns Promise resolving to NotificationsCenter object
     */
    openNotificationsCenter(): Promise<INotificationsCenter>;

    /**
     * Close the notifications center
     * @returns Promise resolving when the notifications center is closed
     */
    closeNotificationsCenter(): Promise<void>;

    /**
     * Open the language selection quick pick
     * Only works with an open editor
     * @returns Promise resolving when the language selection is opened
     */
    openLanguageSelection(): Promise<void>;

    /**
     * Get the current language label text
     * Only works with an open editor
     * @returns Promise resolving to string representation of current language
     */
    getCurrentLanguage(): Promise<string>;

    /**
     * Open the quick pick for line endings selection
     * Only works with an open editor
     * @returns Promise resolving when the line ending selection is opened
     */
    openLineEndingSelection(): Promise<void>;

    /**
     * Get the currently selected line ending as text
     * Only works with an open editor
     * @returns Promise resolving to string representation of current line ending
     */
    getCurrentLineEnding(): Promise<string>;

    /**
     * Open the encoding selection quick pick
     * Only works with an open editor
     * @returns Promise resolving when the encoding selection is opened
     */
    openEncodingSelection(): Promise<void>;

    /**
     * Get the name of the current encoding as text
     * Only works with an open editor
     * @returns Promise resolving to string representation of current encoding
     */
    getCurrentEncoding(): Promise<string>;

    /**
     * Open the indentation selection quick pick
     * Only works with an open editor
     * @returns Promise resolving when the indentation selection is opened
     */
    openIndentationSelection(): Promise<void>;

    /**
     * Get the current indentation option label as text
     * Only works with an open editor
     * @returns Promise resolving to string representation of current indentation
     */
    getCurrentIndentation(): Promise<string>;

    /**
     * Open the line selection input box
     * Only works with an open editor
     * @returns Promise resolving when the line selection is opened
     */
    openLineSelection(): Promise<void>;

    /**
     * Get the current editor coordinates as text
     * Only works with an open editor
     * @returns Promise resolving to string representation of current position in the editor
     */
    getCurrentPosition(): Promise<string>;
}
