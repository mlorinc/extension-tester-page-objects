import { IMenu } from '../menu/Menu';

/**
 * Page object for a content assist item
 */
export interface IContentAssistItem extends IMenu {
    getLabel(): Promise<string>;
}
