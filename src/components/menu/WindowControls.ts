import { AbstractElement } from '../AbstractElement';

/**
 * Page object for the windows controls part of the title bar
 */
export interface IWindowControls extends AbstractElement {
    /**
     * Use the minimize window button
     * @returns Promise resolving when minimize button is pressed
     */
    minimize(): Promise<void>;

    /**
     * Use the maximize window button if the window is not maximized
     * @returns Promise resolving when maximize button is pressed
     */
    maximize(): Promise<void>;

    /**
     * Use the restore window button if the window is maximized
     * @returns Promise resolving when restore button is pressed
     */
    restore(): Promise<void>;

    /**
     * Use the window close button. Use at your own risk.
     * @returns Promise resolving when close button is pressed
     */
    close(): Promise<void>;
}
