import { IChannelView } from './ChannelView';

/**
 * View with channel selection and text area
 */
export interface ITextView extends IChannelView {
    /**
     * Get all text from the currently open channel
     * @returns Promise resolving to the view's text
     */
    getText(): Promise<string>;

    /**
     * Clear the text in the current channel
     * @returns Promise resolving when the clear text button is pressed
     */
    clearText(): Promise<void>;
}
