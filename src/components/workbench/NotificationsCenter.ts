import { AbstractElement } from '../AbstractElement';
import { INotification } from './Notification';

/**
 * Notifications center page object
 */
export interface INotificationsCenter extends AbstractElement {
    /**
     * Close the notifications center
     * @returns Promise resolving when the center is closed
     */
    close(): Promise<void>;

    /**
     * Clear all notifications in the notifications center
     * Note that this will also hide the notifications center
     * @returns Promise resolving when the clear all button is pressed
     */
    clearAllNotifications(): Promise<void>;

    /**
     * Get all notifications of a given type
     * @param type type of the notifications to look for,
     * NotificationType.Any will retrieve all notifications
     * 
     * @returns Promise resolving to array of Notification objects
     */
    getNotifications<T>(type: T): Promise<INotification[]>;
}
