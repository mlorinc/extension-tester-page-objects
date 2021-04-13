import { IEditor } from '../../../editor/Editor';
import { ITreeSection } from '../TreeSection';
import { IDefaultTreeItem } from './DefaultTreeItem';

/**
 * Default view section
 */
export interface IDefaultTreeSection extends ITreeSection<IDefaultTreeItem> {
    /**
     * Create a new file in file tree.
     * @param filePath File path to be created. The path must be relative
     * or absolute (however absolute path must start with workspace path).
     * @param timeout Timeout for internal waiting conditions.
     * @returns Promise which resolves to open editor of new created file.
     */
    createFile(filePath: string, timeout?: number): Promise<IEditor>;

    /**
     * Create a new folder in file tree.
     * @param filePath Folder path to be created. The path must be relative
     * or absolute (however absolute path must start with workspace path).
     * @param timeout Timeout for internal waiting conditions.
     * @returns Promise which resolves when folder is created.
     */
    createFolder(folderPath: string, timeout?: number): Promise<void>;

    /**
     * Delete a file in file tree.
     * @param filePath File path to be deleted. The path must be relative
     * or absolute (however absolute path must start with workspace path).
     * @param timeout Timeout for internal waiting conditions.
     * @returns Promise which resolves when file is deleted.
     */
    deleteFile(filePath: string, timeout?: number): Promise<void>;

    /**
     * Delete a folder in file tree.
     * @param filePath Folder path to be deleted. The path must be relative
     * or absolute (however absolute path must start with workspace path).
     * @param timeout Timeout for internal waiting conditions.
     * @returns Promise which resolves when folder is deleted.     */
    deleteFolder(folderPath: string, timeout?: number): Promise<void>;

    /**
     * Open file located in file tree.
     * @param filePath File path to be open. The path must be relative
     * or absolute (however absolute path must start with workspace path).
     * @param timeout Timeout for internal waiting conditions.
     * @returns Promise which resolves to open editor of selected file;
     */
    openFile(filePath: string, timeout?: number): Promise<IEditor>;

    /**
     * Perform file check on tree.
     * @param filePath File path to be checked. The path must be relative
     * or absolute (however absolute path must start with workspace path).
     * @param timeout Timeout after promise is resolved to false.
     * @returns Promise which resolves to boolean.
     */
    existsFile(filePath: string, timeout?: number): Promise<boolean>;


    /**
     * Perform folder check on tree.
     * @param folderPath Folder path to be checked. The path must be relative
     * or absolute (however absolute path must start with workspace path).
     * @param timeout Timeout after promise is resolved to false.
     * @returns Promise which resolves to boolean.
     */
    existsFolder(folderPath: string, timeout?: number): Promise<boolean>;
}
