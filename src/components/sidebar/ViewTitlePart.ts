import { AbstractElement } from '../AbstractElement';
import { IElementWithContextMenu } from '../ElementWithContextMenu';

/**
 * Page object representing the top (title) part of a side bar view
 */
export interface IViewTitlePart extends IElementWithContextMenu {
    /**
     * Returns the displayed title of the view
     * @returns Promise resolving to displayed title
     */
    getTitle(): Promise<string>;

    /**
     * Finds action buttons inside the view title part
     * @returns Promise resolving to array of TitleActionButton objects
     */
    getActions(): Promise<ITitleActionButton[]>;

    /**
     * Finds an action button by title
     * @param title title of the button to search for
     * @returns Promise resolving to TitleActionButton object
     */
    getAction(title: string): Promise<ITitleActionButton>;
 }

 /**
  * Page object representing a button inside the view title part
  */
 export interface ITitleActionButton extends AbstractElement {
    /**
     * Get title of the button
     */
    getTitle(): Promise<string>;
 }
