/**
 * Merges enum and namesace to allow the support of functions
 */

class ErrorMessages {
    static readonly INVALID = "Invalid Instrution!"
    static unSupportedOrInvalidCommand(command: string): string{
        return `${command} is invalid or unsupported!`;
    }
}

export default ErrorMessages;
