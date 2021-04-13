import { AbstractElement } from '../AbstractElement';
import { IActivityBar } from '../activityBar/ActivityBar';
import { IBottomBarPanel } from '../bottomBar/BottomBarPanel';
import { IEditorView } from '../editor/EditorView';
import { IInput } from './input/Input';
import { INotification } from './Notification';
import { INotificationsCenter } from './NotificationsCenter';
import { ISettingsEditor } from '../editor/settings/SettingsEditor';
import { ISideBarView } from '../sidebar/SideBarView';
import { IStatusBar } from '../statusBar/StatusBar';
import { ITitleBar } from '../menu/TitleBar';
import { IOpenDialog } from '../dialog/OpenDialog';

/**
 * Handler for general workbench related actions
 */
export interface IWorkbench extends AbstractElement {

    /**
     * Get path of open folder/workspace
     */
    getOpenFolderPath(): Promise<string>;

    /**
     * Get name of open folder/workspace
     */
    getOpenFolderName(): Promise<string | undefined>;

    /**
     * Get a title bar handle
     */
    getTitleBar(): ITitleBar;

    /**
     * Get a side bar handle
     */
    getSideBar(): ISideBarView;

    /**
     * Get an activity bar handle
     */
    getActivityBar(): IActivityBar;

    /**
     * Get a status bar handle
     */
    getStatusBar(): IStatusBar;

    /**
     * Get a bottom bar handle
     */
    getBottomBar(): IBottomBarPanel;

    /**
     * Get a handle for the editor view
     */
    getEditorView(): IEditorView;

    /**
     * Get all standalone notifications (notifications outside the notifications center)
     * @returns Promise resolving to array of Notification objects
     */
    getNotifications(): Promise<INotification[]>;

    /**
     * Opens the notifications center
     * @returns Promise resolving to NotificationsCenter object
     */
    openNotificationsCenter(): Promise<INotificationsCenter>;

    /**
     * Opens the settings editor
     *
     * @returns promise that resolves to a SettingsEditor instance
     */
    openSettings(): Promise<ISettingsEditor>;

    /**
     * Open folder. Relative paths are resolved to absolute paths based on current open folder.
     * @param folderPath path to folder
     * @returns promise which is resolved when workbench is ready
     */
    openFolder(folderPath: string): Promise<void>;

    /**
     * Close open folder.
     * @returns promise which is resolved when folder is closed
     */
    closeFolder(): Promise<void>;

    /**
     * Open the VS Code command line prompt
     * @returns Promise resolving to InputBox (vscode 1.44+) or QuickOpenBox (vscode up to 1.43) object
     */
    openCommandPrompt(): Promise<IInput>;

    /**
     * Open the command prompt, type in a command and execute
     * @param command text of the command to be executed
     * @returns Promise resolving when the command prompt is confirmed
     */
    executeCommand(command: string): Promise<void>;

    /**
     * Return existing open dialog object.
     */
    getOpenDialog(): Promise<IOpenDialog>;
}
