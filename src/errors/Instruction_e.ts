/**
 * Merges enum and namesace to allow the support of functions
 */

class ErrorMessages {
    static readonly INVALID = "Invalid Instrution!"
    static unSupportedOrInvalidCommand(command: string): string{
        return `${command} is invalid or unsupported!`;
    }

    static unSuppotedOrInvalidRegister(register: string): string{
        return `${register} is invalid or unsupported!`
    }

    static invalidImmediate(immediate: string): string{
        return `${immediate} is in invalid value for an immediate or an address!`
    }
}

export default ErrorMessages;
