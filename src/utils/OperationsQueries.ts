import operations from "../data/operations.json";

/**
 * Methods to query operations
 */
export class OperationsQueries{
    /**
     *
     * @param instruction
     */
    static getOperationByInstruction(instruction: string): any {
        return operations.find(operation => operation.instruction === instruction);
    }

    /**
     *
     * @param func
     */
    static getOperationByFunc(func: number): any {
        return operations.find(operation => operation.func === func);
    }
}
