import { IViewItem } from '../ViewItem';
import { IContextMenu } from '../../..';

/**
 * Page object representing an extension in the extensions view
 */
export interface IExtensionsViewItem extends IViewItem {
    /**
     * Get title of the extension
     */
    getTitle(): Promise<string>;

    /**
     * Get version of the extension
     * @returns Promise resolving to version string
     */
    getVersion(): Promise<string>;

    /**
     * Get the author of the extension
     * @returns Promise resolving to displayed author
     */
    getAuthor(): Promise<string>;

    /**
     * Get the description of the extension
     * @returns Promise resolving to description
     */
    getDescription(): Promise<string>;
    
    /**
     * Find if the extension is installed
     * @returns Promise resolving to true/false
     */
    isInstalled(): Promise<boolean>;

    /**
     * Open the management context menu if the extension is installed
     * @returns Promise resolving to ContextMenu object
     */
    manage(): Promise<IContextMenu>;

    /**
     * Install the extension if not installed already.
     * 
     * Will wait for the extension to finish installing. To skip the wait, set timeout to 0.
     * 
     * @param timeout timeout to wait for the installation in milliseconds, default unlimited, set to 0 to skip waiting
     * @returns Promise resolving when the installation finishes or is skipped
     */
    install(timeout: number): Promise<void>;
}
