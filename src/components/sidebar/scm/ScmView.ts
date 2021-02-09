import { IElementWithContextMenu } from '../../ElementWithContextMenu';
import { IScmProvider } from './ScmProvider';
import { ISideBarView } from '../SideBarView';
import { IMenu } from '../../menu/Menu';

/**
 * Page object representing the Source Control view
 */
export interface IScmView extends ISideBarView {

    /**
     * Get SCM provider (repository) by title
     * @param title name of the repository
     * @returns promise resolving to ScmProvider object
     */
    getProvider(title?: string): Promise<IScmProvider | undefined>;

    /**
     * Get all SCM providers
     * @returns promise resolving to ScmProvider array
     */
    getProviders(): Promise<IScmProvider[]>;

    /**
     * Initialize repository in the current folder if no SCM provider is found
     * @returns true if the action was completed succesfully, false if a provider already exists
     */
    initializeRepository(): Promise<boolean>;
}

export interface IMoreAction extends IElementWithContextMenu {
    openContextMenu(): Promise<IMenu>;
}
