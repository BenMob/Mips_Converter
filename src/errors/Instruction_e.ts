/**
 * Merges enum and namesace to allow the support of functions
 */
import addresses from "../data/addresses.json";

class ErrorMessages {
    static readonly INVALID = "Invalid Instrution!";
    static readonly MISSING_REGISTER = "Invalid or missing 'register(s)' in parameters!";
    static readonly MISSING_OPERATION = "Invalid or missing 'operation' at the beginning of the instruction!";
    static readonly IMMEDIATE_OUT_OF_RANGE = `Immediates must be between ${addresses.MIN} and ${addresses.MAX}`;

    static unSupportedOrInvalidCommand(command: string): string{
        return `${command} is an invalid or unsupported command!`;
    }

    static unSupportedOrInvalidRegister(register: string): string{
        return `${register} is an invalid or unsupported register!`
    }

    static invalidImmediate(immediate: string): string{
        return `${immediate} is an invalid value for an immediate or an address!`
    }

    static invalidRegisterForJR(register: string){
        return `Invalid source register ${register} on instruction 'jr', source register must be '$ra'`
    }
}

export default ErrorMessages;
