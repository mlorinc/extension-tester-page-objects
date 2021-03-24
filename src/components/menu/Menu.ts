import { AbstractElement } from '../AbstractElement';

/**
 * Abstract element representing a menu
 */
export interface IMenu extends AbstractElement {
    
    /**
     * Find whether the menu has an item of a given name
     * @param name name of the item to search for
     * @returns true if menu has an item with the given name, false otherwise
     */
    hasItem(name: string): Promise<boolean>;

    /**
     * Return a menu item of a given name, undefined if not found
     * @param name name of the item to search for
     */
    getItem(name: string): Promise<IMenu>;

    /**
     * Get all items of a menu
     * @returns array of MenuItem object representing the menu items
     */
    getItems(): Promise<IMenu[]>;

    /**
     * Recursively select an item with a given path.
     * 
     * E.g. calling select('File', 'Preferences', 'Settings') will
     * open the 'File' -> 'Preferences' submenus and then click on 'Settings'.
     * 
     * Selection happens in order of the arguments, if one of the items in the middle
     * of the path has no children, the consequent path arguments will be ignored.
     * 
     * 
     * @param path path to the item to select, represented by a sequence of strings
     * @returns void if the last clicked item is a leaf, Menu item representing
     * its submenu otherwise
     */
    select(...path: string[]): Promise<IMenu | undefined>;

    getLabel(): Promise<string>;

    close(): Promise<void>;
}
