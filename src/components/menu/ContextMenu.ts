import { IMenu } from "./Menu";

export interface IContextMenu extends IMenu
{
    /**
     * Close the context menu
     * @returns Promise resolving when the menu is closed
     */
    close(): Promise<void>;
}