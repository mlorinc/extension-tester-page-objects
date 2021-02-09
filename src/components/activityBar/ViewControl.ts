import { IElementWithContextMenu } from '../ElementWithContextMenu';
import { ISideBarView } from '../sidebar/SideBarView';

/**
 * Page object representing a view container item in the activity bar
 */
export interface IViewControl extends IElementWithContextMenu {
    /**
     * Opens the associated view if not already open
     * @returns Promise resolving to SideBarView object representing the opened view
     */
    openView(): Promise<ISideBarView>;

    /**
     * Closes the associated view if not already closed
     * @returns Promise resolving when the view closes
     */
    closeView(): Promise<void>;

    /**
     * Returns the title of the associated view
     */
    getTitle(): string;
}
