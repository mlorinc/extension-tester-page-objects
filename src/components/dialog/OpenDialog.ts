/**
 * General open native dialog
 */
 export interface IOpenDialog {
    /**
     * Confirms the dialog
     */
    confirm(): Promise<void>;

    /**
     * Cancels the dialog
     */
    cancel(): Promise<void>;

    /**
     * Enters the given path into the dialog selection
     * @param path path to select
     */
    selectPath(path: string): Promise<void>;
}
