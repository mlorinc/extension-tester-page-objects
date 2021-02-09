import { IChannelView } from './ChannelView';

/**
 * Terminal view on the bottom panel
 */
export interface ITerminalView extends IChannelView {
    /**
     * Execute command in the internal terminal
     * @param command text of the command
     * @returns Promise resolving when the command is filled in and enter is pressed
     */
    executeCommand(command: string): Promise<void>;
    
    /**
     * Get all text from the internal terminal
     * Beware, no formatting.
     * @returns Promise resolving to all terminal text
     */
    getText(): Promise<string>;

    /**
     * Destroy the currently open terminal
     * @returns Promise resolving when Kill Terminal button is pressed
     */
    killTerminal(): Promise<void>;

    /**
     * Initiate new terminal creation
     * @returns Promise resolving when New Terminal button is pressed
     */
    newTerminal(): Promise<void>;
}
