/**
 * General purpose native dialog
 */
 export interface INativeDialog {
    /**
     * Confirms the dialog
     */
    confirm(): void | Promise<void>;

    /**
     * Cancels the dialog
     */
    cancel(): void | Promise<void>;
}
