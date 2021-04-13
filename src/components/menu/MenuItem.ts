import { AbstractElement } from "../AbstractElement";
import { IMenu } from "./Menu";

export interface IMenuItem extends AbstractElement {
    select(): Promise<IMenu | undefined>;
    /**
     * Return the Menu object representing the menu this item belongs to
     */
    getParent(): IMenu;

    /**
     * Returns the label of the menu item
     */
    getLabel(): Promise<string>;

    /**
     * Returns true if menu has sub menus.
     */
    isNesting(): Promise<boolean>
}
