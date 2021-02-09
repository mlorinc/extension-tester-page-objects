import { IDebugConsoleView } from './DebugConsoleView';
import { IOutputView } from './OutputView';
import { IProblemsView } from './ProblemsView';
import { ITerminalView } from './TerminalView';

/**
 * Page object for the bottom view panel
 */
export interface IBottomBarPanel {

    /**
     * Open/Close the bottom bar panel
     * @param open true to open. false to close
     * @returns Promise resolving when the view visibility is toggled
     */
    toggle(open: boolean): Promise<void>;

    /**
     * Open the Problems view in the bottom panel
     * @returns Promise resolving to a ProblemsView object
     */
    openProblemsView(): Promise<IProblemsView>;

    /**
     * Open the Output view in the bottom panel
     * @returns Promise resolving to OutputView object
     */
    openOutputView(): Promise<IOutputView>;

    /**
     * Open the Debug Console view in the bottom panel
     * @returns Promise resolving to DebugConsoleView object
     */
    openDebugConsoleView(): Promise<IDebugConsoleView>;

    /**
     * Open the Terminal view in the bottom panel
     * @returns Promise resolving to TerminalView object
     */
    openTerminalView(): Promise<ITerminalView>;

    /**
     * Maximize the the bottom panel if not maximized
     * @returns Promise resolving when the maximize button is pressed
     */
    maximize(): Promise<void>;

    /**
     * Restore the the bottom panel if maximized
     * @returns Promise resolving when the restore button is pressed
     */
    restore(): Promise<void>;
}
