import { IContextMenu } from '..';
import { AbstractElement } from './AbstractElement';

/**
 * Abstract element that has a context menu
 */
export interface IElementWithContextMenu extends AbstractElement {

    /**
     * Open context menu on the element
     */
    openContextMenu(): Promise<IContextMenu>;
}
