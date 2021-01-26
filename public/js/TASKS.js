
/**
 * 
 * @param {*} error 
 */
const displayError = (error) => {
    let errorContainer = document.querySelector("#error");
    errorContainer.innerHTML = "";
    errorContainer.innerHTML = error;
}

/**
 * Clear the entire output section
 */
const clearAll = () => {
    document.querySelector("#error").innerHTML = "";
    document.querySelector("#format").innerHTML = "";
    document.querySelector("#table").innerHTML = "";
}

/**
 * Clears the error message
 */
const clearError = () => {
    document.querySelector("#error").innerHTML = "";
}

/**
 * Display Rtype Table 
 * @param {data} data 
 */
const displayTable = (data) => {
    // Collect data & creates rows
    const format = `${data.assembly}: ${data.type.format} type instruction`;
    let labelRow = DOM.getTr();
    let decimalRow = DOM.getTr();
    let binaryRow = DOM.getTr();
    let labelName = DOM.getTd();
    let decimalName = DOM.getTd();
    let binaryName = DOM.getTd();

    // Add labels
    DOM.write(labelName, "");
    DOM.addClass(labelName, CLASSES.tableTopLeftFieldClasses);
    labelRow.appendChild(labelName);
    data.decimal.forEach(dec => {
        const field = DOM.getTd();
        if(dec.name === "shiftAmount"){
            DOM.write(field, "shift");
        }else{
            DOM.write(field, dec.name);
        }
        
        DOM.addClass(field, CLASSES.tableHeaderRowFieldClasses);
        labelRow.appendChild(field);
    })

    // Adds decimal
    DOM.write(decimalName, "Decimal");
    DOM.addClass(decimalName, CLASSES.tableHeaderColFieldClasses);
    decimalRow.appendChild(decimalName);
    data.decimal.forEach(dec => {
        const field = DOM.getTd();
        DOM.write(field, dec.value);
        DOM.addClass(field, CLASSES.tableBodyRowFieldClasses);
        decimalRow.appendChild(field);
    })

    // Adds Binary
    DOM.write(binaryName, "Machine");
    DOM.addClass(binaryName, CLASSES.tableHeaderColFieldClasses);
    binaryRow.appendChild(binaryName);
    data.binary.forEach(bin => {
        const field = DOM.getTd();
        DOM.write(field, bin.value);
        DOM.addClass(field, CLASSES.tableBodyRowFieldClasses);
        binaryRow.appendChild(field);
    })    

    // Create the layout
    const formatContainter = document.querySelector("#format");
    const tableContainer = document.querySelector("#table");

    // Display data on layout
    formatContainter.innerHTML = format;
    tableContainer.appendChild(labelRow);
    tableContainer.appendChild(decimalRow);
    tableContainer.appendChild(binaryRow);
}

/**
 * Displays operations in the support section on the home page
 * @param {*} operations 
 */
const displayOperations = (operations) => {
    const operationsContainer = document.querySelector("#operations");
    operations.forEach(operation => {
        const p = DOM.getP();
        DOM.addClass(p, ["p-1"])
        p.innerHTML = operation.instruction;
        operationsContainer.appendChild(p);
    })
}

/**
 * Displays registers in the support section on the home page
 * @param {*} registers 
 */
const displayRegisters = (registers) => {
    const registersContainer = document.querySelector("#registers");
    registers.forEach(register => {
        const p = DOM.getP();
        DOM.addClass(p, ["p-1"]);
        p.innerHTML = register.assembly_name;
        registersContainer.appendChild(p);
    })
}

/**
 * 
 * @param {*} registers 
 */
const displayCodeTable = (registers) => {
    console.table(registers)
    const table = document.querySelector("#codetable");
    const columnList = ["Instruction", "Format", "op","rs","rt","rd", "ShiftAmount", "Function"];
    const columns = {
        "INSTRUCTION" : columnList[0],
        "FORMAT": columnList[1],
        "OP": columnList[2],
        "RS": columnList[3],
        "RT": columnList[4],
        "RD": columnList[5],
        "SHIFTAMOUNT": columnList[6],
        "FUNCTION": columnList[7]
    }


    const header = DOM.getTr();

    columnList.forEach(columnName => {
        const td = DOM.getTd();
        DOM.addClass(td, ["p-2", "text-xl", "text-center" ,"font-bold" , "border","border-gray-400"])
        td.innerHTML = columnName;
        header.appendChild(td);
    })

    // First row
    table.appendChild(header);

    registers.forEach(register => {
        const tr = DOM.getTr();

        let td = DOM.getTd();
        td.innerHTML = register.instruction;
        DOM.addClass(td, ["px-4", "border","border-gray-400", "text-center"]);
        tr.appendChild(td);
        
        td = DOM.getTd();
        td.innerHTML = register.format;
        DOM.addClass(td, ["px-4", "border","border-gray-400" , "text-center"]);
        tr.appendChild(td);

        td = DOM.getTd();
        td.innerHTML = register.op;
        DOM.addClass(td, ["px-4", "border","border-gray-400" , "text-center"]);
        tr.appendChild(td);
    
        switch (register.format) {
            case "R":
                ["rs", "rt" , "rd"].forEach(reg => {
                    td = DOM.getTd();
                    td.innerHTML = "register"    
                    DOM.addClass(td, ["px-4", "border","border-gray-400"]);
                    tr.appendChild(td);
                })

                td = DOM.getTd();
                td.innerHTML = register.shiftAmount;
                DOM.addClass(td, ["px-4","border","border-gray-400" , "text-center"]);
                tr.appendChild(td);

                td = DOM.getTd();
                td.innerHTML = register.func;
                DOM.addClass(td, ["px-4","border","border-gray-400", "text-center"]);
                tr.appendChild(td);

                break;
            case "I":
                for(let i  = 0; i < 2; i++){
                    td = DOM.getTd();
                    td.innerHTML = "register";
                    DOM.addClass(td, ["px-4", "border", "border-gray-400", "text-center"]);
                    tr.appendChild(td);
                }

                td = DOM.getTd();
                td.innerHTML = "immediate";
                DOM.addClass(td, ["px-4", "border","border-gray-400", "text-center"]);
                DOM.setColSpan(td, 3);
                tr.appendChild(td)

                break;
            case "J":

                td = DOM.getTd();
                td.innerHTML = "address (label)";
                DOM.addClass(td, ["px-4", "border","border-gray-400", "text-center"]);
                DOM.setColSpan(td, 5);
                tr.appendChild(td)

                break;
            default:
                break;
        }

        // Table Row
        table.appendChild(tr);
    })




}