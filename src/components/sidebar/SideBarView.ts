import { AbstractElement } from '../AbstractElement';
import { IViewContent } from './ViewContent';
import { IViewTitlePart } from './ViewTitlePart';

/**
 * Page object for the side bar view
 */
export interface ISideBarView extends AbstractElement {
    /**
     * Get the top part of the open view (contains title and possibly some buttons)
     * @returns ViewTitlePart object
     */
    getTitlePart(): IViewTitlePart;

    /**
     * Get the content part of the open view
     * @returns ViewContent object
     */
    getContent(): IViewContent;
}
