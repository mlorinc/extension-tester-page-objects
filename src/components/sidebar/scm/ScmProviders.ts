import { IMenu } from '../../menu/Menu';
import { IScmChange } from './ScmChange';
import { IScmProvider } from './ScmProvider';

/**
 * Implementation for a single SCM provider
 */
export interface ISingleScmProvider extends IScmProvider {
    getTitle(): Promise<string>;
    getType(): Promise<string>;
    takeAction(title: string): Promise<boolean>;
    openMoreActions(): Promise<IMenu>;
    getChanges(staged: boolean): Promise<IScmChange[]>;
}

/**
 * Implementation of an SCM provider when multiple providers are available
 */
export interface IMultiScmProvider extends IScmProvider {
    takeAction(title: string): Promise<boolean>;
    openMoreActions(): Promise<IMenu>;
    commitChanges(message: string): Promise<void>;
    getChanges(staged: boolean): Promise<IScmChange[]>;
    getChangeCount(staged: boolean): Promise<number>;
}
