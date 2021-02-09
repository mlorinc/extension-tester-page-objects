import { ISetting } from './Setting';

/**
 * Setting with no value, with a link to settings.json instead
 */
export interface ILinkSetting extends ISetting {
    /**
     * Open the link that leads to the value in settings.json
     * @returns Promise resolving when the link has been clicked
     */
    openLink(): Promise<void>;
}
