import { IElementWithContextMenu } from '../ElementWithContextMenu';
import { WebElement } from 'selenium-webdriver';
import { AbstractElement } from '../AbstractElement';

/**
 * Problems view in the bottom panel
 */
export interface IProblemsView extends AbstractElement {
    /**
     * Set the filter using the input box on the problems view
     * @param pattern filter to use, prefferably a glob pattern
     * @returns Promise resolving when the filter pattern is filled in
     */
    setFilter(pattern: string): Promise<void>;

    /**
     * Clear all filters
     * @returns Promise resolving to the filter field WebElement 
     */
    clearFilter(): Promise<WebElement>;

    /**
     * Collapse all collapsible markers in the problems view
     * @returns Promise resolving when the collapse all button is pressed
     */
    collapseAll(): Promise<void>;

    /**
     * Get all markers from the problems view with the given type.
     * To get all markers regardless of type, use MarkerType.Any
     * @param type type of markers to retrieve
     * @returns Promise resolving to array of Marker objects
     */
    getAllMarkers(type: MarkerType): Promise<IMarker[]>;
}

/**
 * Page object for marker in problems view
 */
export interface IMarker extends IElementWithContextMenu {
    /**
     * Get the type of the marker
     * Possible types are: File, Error, Warning
     * @returns Promise resolving to a MarkerType
     */
    getType(): Promise<MarkerType>;

    /**
     * Get the full text of the marker
     * @returns Promise resolving to marker text
     */
    getText(): Promise<string>;

    /**
     * Expand/Collapse the marker if possible
     * @param expand true to expand, false to collapse
     * @returns Promise resolving when the expand/collapse twistie is clicked
     */
    toggleExpand(expand: boolean): Promise<void>;
}

/**
 * Possible types of markers
 *  - File = expandable item representing a file
 *  - Error = an error marker
 *  - Warning = a warning marker
 *  - Any = any of the above
 */
export enum MarkerType {
    File = 'file',
    Error = 'error',
    Warning = 'warning',
    Any = 'any'
}
