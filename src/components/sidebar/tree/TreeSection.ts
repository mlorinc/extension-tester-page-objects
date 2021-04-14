import { ITreeItem } from '../ViewItem';
import { IViewSection } from '../ViewSection';

/**
 * Abstract representation of a view section containing a tree
 */
export interface ITreeSection<T extends ITreeItem> extends IViewSection {
    openItem(...path: string[]): Promise<T[]>;
    findItem(label: string, maxLevel?: number): Promise<T | undefined>;
    findItemByPath(...path: string[]): Promise<T>;
    getVisibleItems(): Promise<T[]>;
}

export class TreeItemNotFound extends Error {
    constructor(path: string[], message ?: string) {
        message = `Could not find tree item with path "${path.join('/')}". ${message}`
        super(message.trimEnd());
        this.name = 'TreeItemNotFound';
    }
}
