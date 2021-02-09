import { AbstractElement } from './AbstractElement';
import { IMenu } from './menu/Menu';

/**
 * Abstract element that has a context menu
 */
export interface IElementWithContextMenu extends AbstractElement {

    /**
     * Open context menu on the element
     */
    openContextMenu(): Promise<IMenu>;
}
