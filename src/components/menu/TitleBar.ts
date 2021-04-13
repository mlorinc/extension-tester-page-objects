import { IMenu } from './Menu';
import { IMenuItem } from './MenuItem';
import { IWindowControls } from './WindowControls';

/**
 * Page object representing the custom VSCode title bar
 */
export interface ITitleBar extends IMenu {
    /**
     * Get title bar item by name
     * @param name name of the item to search by
     * @returns Promise resolving to TitleBarItem object
     */
    getItem(name: string): Promise<IMenuItem | undefined>;

    /**
     * Get all title bar items
     * @returns Promise resolving to array of TitleBarItem objects
     */
    getItems(): Promise<IMenuItem[]>;

    /**
     * Get the window title
     * @returns Promise resolving to the window title
     */
    getTitle(): Promise<string>;

    /**
     * Get a reference to the WindowControls
     */
    getWindowControls(): IWindowControls;
}
