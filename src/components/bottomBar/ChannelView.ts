import { IElementWithContextMenu } from "../ElementWithContextMenu";

/**
 * View with channel selector
 */
export interface IChannelView extends IElementWithContextMenu {
    /**
    * Get names of all selectable channels
    * @returns Promise resolving to array of strings - channel names
    */
    getChannelNames(): Promise<string[]>;

    /**
     * Get name of the current channel
     * @returns Promise resolving to the current channel name
     */
    getCurrentChannel(): Promise<string>;

    /**
     * Select a channel using the selector combo
     * @param name name of the channel to open
     */
    selectChannel(name: string): Promise<void>;
}
