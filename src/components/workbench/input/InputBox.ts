import { IInput } from './Input';

/**
 * Plain input box variation of the input page object
 */
export interface IInputBox extends IInput {
    /**
     * Get the message below the input field
     */
    getMessage(): Promise<string>;

    /**
     * Find whether the input is showing an error
     * @returns Promise resolving to notification message
     */
    hasError(): Promise<boolean>;

    /**
     * Check if the input field is masked (input type password)
     * @returns Promise resolving to notification message
     */
    isPassword(): Promise<boolean>;
}
