import { IMenuItem } from '../menu/MenuItem';

/**
 * Page object for a content assist item
 */
export interface IContentAssistItem extends IMenuItem {
    getLabel(): Promise<string>;
}
