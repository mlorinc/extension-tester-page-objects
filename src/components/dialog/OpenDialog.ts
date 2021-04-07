import { INativeDialog } from "./NativeDialog";

/**
 * General open native dialog
 */
 export interface IOpenDialog extends INativeDialog {
    /**
     * Enters the given path into the dialog selection
     * @param path path to select
     */
    selectPath(path: string): void | Promise<void>;
}
