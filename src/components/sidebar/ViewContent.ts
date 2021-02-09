import { AbstractElement } from '../AbstractElement';
import { IViewSection } from './ViewSection';

/**
 * Page object representing the view container of a side bar view
 */
export interface IViewContent extends AbstractElement {
    /**
     * Finds whether a progress bar is active at the top of the view
     * @returns Promise resolving to true/false
     */
    hasProgress(): Promise<boolean>;

    /**
     * Retrieves a collapsible view content section by its title
     * @param title Title of the section
     * @returns Promise resolving to ViewSection object
     */
    getSection(title: string): Promise<IViewSection>;

    /**
     * Retrieves all the collapsible view content sections
     * @returns Promise resolving to array of ViewSection objects
     */
    getSections(): Promise<IViewSection[]>;
}
