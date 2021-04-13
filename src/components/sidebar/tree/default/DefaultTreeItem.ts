import { ITreeItem } from '../../ViewItem';

/**
 * Default tree item base on the items in explorer view
 */
export interface IDefaultTreeItem extends ITreeItem {
    /**
     * Perform file check.
     * @returns Promise which resolves to true if tree item is file.
     */
    isFile(): Promise<boolean>;

    /**
     * Perform folder check.
     * @returns Promise which resolves to true if tree item is folder.
     */
    isFolder(): Promise<boolean>;
}
