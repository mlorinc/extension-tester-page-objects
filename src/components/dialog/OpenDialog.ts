/**
 * General open native dialog
 */
 export interface IOpenDialog {
    /**
     * Confirms the dialog
     */
     confirm(): void | Promise<void>;

     /**
      * Cancels the dialog
      */
     cancel(): void | Promise<void>;

    /**
     * Enters the given path into the dialog selection
     * @param path path to select
     */
    selectPath(path: string): void | Promise<void>;
}
