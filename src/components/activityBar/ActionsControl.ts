import { IContextMenu } from "../..";
import { IElementWithContextMenu } from "../ElementWithContextMenu";

/**
 * Page object representing the global action controls on the bottom of the action bar
 */
export interface IActionsControl extends IElementWithContextMenu {
    /**
    * Open the context menu bound to this global action
    * @returns Promise resolving to ContextMenu object representing the action's menu
    */
    openActionMenu(): Promise<IContextMenu>;
    /**
     * Returns the title of the associated action
     */
    getTitle(): Promise<string>;
}
