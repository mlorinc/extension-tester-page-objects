import { ITreeItem } from '../ViewItem';
import { IViewSection } from '../ViewSection';

/**
 * Abstract representation of a view section containing a tree
 */
export interface ITreeSection extends IViewSection {
    openItem(...path: string[]): Promise<ITreeItem[]>;
    findItem(label: string, maxLevel?: number): Promise<ITreeItem | undefined>
    getVisibleItems(): Promise<ITreeItem[]>
}
