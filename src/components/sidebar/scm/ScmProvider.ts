import { AbstractElement } from '../../AbstractElement';
import { IScmChange } from './ScmChange';
import { IContextMenu } from '../../..';

/**
 * Page object representing a repository in the source control view
 * Maps roughly to a view section of the source control view
 */
export interface IScmProvider extends AbstractElement {
    /**
     * Get title of the scm provider
     */
    getTitle(): Promise<string>;

    /**
     * Get type of the scm provider (e.g. Git)
     */
    getType(): Promise<string>;

    /**
     * Find an action button for the SCM provider by title and click it. (e.g 'Commit')
     * @param title Title of the action button to click
     * @returns true if the given action could be performed, false if the button doesn't exist
     */
    takeAction(title: string): Promise<boolean>;

    /**
     * Open a context menu using the 'More Actions...' button
     * @returns Promise resolving to a ContextMenu object
     */
    openMoreActions(): Promise<IContextMenu>;

    /**
     * Fill in the message field and send ctrl/cmd + enter to commit the changes
     * @param message the commit message to use
     * @returns promise resolving once the keypresses are sent
     */
    commitChanges(message: string): Promise<void>;

    /**
     * Get page objects for all tree items representing individual changes
     * @param staged when true, finds staged changes; otherwise finds unstaged changes
     * @returns promise resolving to ScmChange object array
     */
    getChanges(staged: boolean): Promise<IScmChange[]>;

    /**
     * Get the number of changes for a given section
     * @param staged when true, counts the staged changes, unstaged otherwise
     * @returns promise resolving to number of changes in the given subsection
     */
    getChangeCount(staged: boolean): Promise<number>;
}
