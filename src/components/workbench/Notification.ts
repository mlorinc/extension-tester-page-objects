import { AbstractElement } from '../AbstractElement';
import { IElementWithContextMenu } from '../ElementWithContextMenu';

/**
 * Available types of notifications
 */
 export enum NotificationType {
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
    Any = 'any'
}

/**
 * Abstract element representing a notification
 */
export interface INotification extends IElementWithContextMenu {

    /**
     * Get the message of the notification
     * @returns Promise resolving to notification message
     */
    getMessage(): Promise<string>;

    /**
     * Get the type of the notification
     * @returns Promise resolving to NotificationType
     */
    getType(): Promise<NotificationType>;

    /**
     * Get the source of the notification as text
     * @returns Promise resolving to notification source
     */
    getSource(): Promise<string>;

    /**
     * Find whether the notification has an active progress bar
     * @returns Promise resolving to true/false
     */
    hasProgress(): Promise<boolean>;

    /**
     * Dismiss the notification
     * @returns Promise resolving when notification is dismissed
     */
    dismiss(): Promise<void>;

    /**
     * Get the action buttons of the notification as an array
     * of NotificationButton objects
     * @returns Promise resolving to array of NotificationButton objects
     */
    getActions(): Promise<INotificationButton[]>;

    /**
     * Click on an action button with the given title
     * @param title title of the action/button
     * @returns Promise resolving when the select button is pressed
     */
    takeAction(title: string): Promise<void>;
}

/**
 * Notification displayed on its own in the notifications-toasts container
 */
export interface IStandaloneNotification extends INotification {
}

/**
 * Notification displayed within the notifications center
 */
export interface ICenterNotification extends INotification {
}

/**
 * Notification button
 */
export interface INotificationButton extends AbstractElement {
    getTitle(): Promise<string>;
}
