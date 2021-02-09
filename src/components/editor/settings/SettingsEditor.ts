import { IEditor } from '../Editor';
import { ISetting } from './Setting';
import { IMenu } from '../../menu/Menu';

/**
 * Page object representing the internal VSCode settings editor
 */
export interface ISettingsEditor extends IEditor {
    
    /**
     * Search for a setting with a particular title and category.
     * Returns an appropriate Setting object if the label is found,
     * undefined otherwise.
     *
     * If your setting has nested categories (i.e `example.general.test`),
     * pass in each category as a separate string.
     *
     * @param title title of the setting
     * @param categories category of the setting
     * @returns Promise resolving to a Setting object if found, undefined otherwise
     */
    findSetting(title: string, ...categories: string[]): Promise<ISetting>;
    
    /**
     * Switch between settings perspectives
     * Works only if your vscode instance has both user and workspace settings available
     * 
     * @param perspective User or Workspace
     * @returns Promise that resolves when the appropriate button is clicked
     */
    switchToPerspective(perspective: 'User' | 'Workspace'): Promise<void>;

    /**
     * Context menu is disabled in this editor, throw an error
     */
    openContextMenu(): Promise<IMenu>;
}
