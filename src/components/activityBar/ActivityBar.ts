import { IActionsControl } from './ActionsControl';
import { IElementWithContextMenu } from '../ElementWithContextMenu';
import { IViewControl } from './ViewControl';

/**
 * Page object representing the left side activity bar in VS Code
 */
export interface IActivityBar extends IElementWithContextMenu {

    /**
     * Find all view containers displayed in the activity bar
     * @returns Promise resolving to array of ViewControl objects
     */
    getViewControls(): Promise<IViewControl[]>;

    /**
     * Find a view container with a given title
     * @param name title of the view
     * @returns ViewControl object representing the view selector
     */
    getViewControl(name: string): IViewControl;

    /**
     * Find all global action controls displayed on the bottom of the activity bar
     * @returns Promise resolving to array of ActionsControl objects
     */
    getGlobalActions(): Promise<IActionsControl[]>;

    /**
     * Find an action control with a given title
     * @param name title of the global action
     * @returns ActionsControl object representing the action selector
     */
    getGlobalAction(name: string): IActionsControl;
}
