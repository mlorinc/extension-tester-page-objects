import { IElementWithContextMenu } from "../ElementWithContextMenu";

/**
 * Page object representing the global action controls on the bottom of the action bar
 */
export interface IActionsControl extends IElementWithContextMenu {
    /**
     * Returns the title of the associated action
     */
    getTitle(): string;
}
