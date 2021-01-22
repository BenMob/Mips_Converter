
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