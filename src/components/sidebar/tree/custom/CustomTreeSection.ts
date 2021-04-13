import { ITreeSection } from "../TreeSection";
import { ICustomTreeItem } from "./CustomTreeItem";

/**
 * Custom tree view, e.g. contributed by an extension
 */
export interface ICustomTreeSection extends ITreeSection<ICustomTreeItem> {
}
