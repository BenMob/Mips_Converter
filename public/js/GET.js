// Processes all internal get Requests
const get = (url = "", page ="") => {
    const types = {
        OPERATIONS: "operations",
        REGISTERS: "registers",
    }

    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        switch (data.type) {
            case types.OPERATIONS:
                if(page === PROCESSES.pages.index){
                    PROCESSES.processOperations(data.operations, PROCESSES.pages.index);
                }else if(page === PROCESSES.pages.codetable){
                    PROCESSES.processOperations(data.operations, PROCESSES.pages.codetable);
                }
                
                break;
            case types.REGISTERS:
                PROCESSES.processRegisters(data.registers, PROCESSES.pages.index);
                break;
            default:
                throw new Error("Failed to retrieve and/or parse data!")
        }
    })
    .catch(error => {
        console.warn(error);
    })
}