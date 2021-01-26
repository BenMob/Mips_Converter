/**
 * Define processes in which functions 
 */

 class PROCESSES{
     /**
      * List of pages names
      */
     static pages = {
         index: "index",
         codetable: "codetable" 
     }
    
     /**
      * Processes Mips Instruction
      */
     static processSubmission(){
        const instruction = document.querySelector("#input").value;
        const url = "http://localhost:8080/convert";
        post(url, {instruction});
     }

     /**
      * Queries supported operations and registers
      */
     static getOperationsAndRegisters(){
         const operationsURL = "http://localhost:8080/operations";
         const registersURL = "http://localhost:8080/registers";
         get(operationsURL, this.pages.index);
         get(registersURL, this.pages.index);
     }

     /**
      * Queries operations
      */
     static getOperations(){
        const operationsURL = "http://localhost:8080/operations";
        get(operationsURL, this.pages.codetable);
     }

     /**
      * Displays supporetd operations on the page 
      * @param {*} data 
      * @param {*} page 
      */
     static processOperations(operations, page){
        if(page === this.pages.index){
            displayOperations(operations);
        }else if(page === this.pages.codetable){
            displayCodeTable(operations);
        }else{
            console.warn("Failed to process operations")
        }
     }

     /**
      * Displays supported registers 
      * @param {*} data 
      * @param {*} page 
      */
     static processRegisters(registers, page = ""){
        if(page === this.pages.index){
            displayRegisters(registers);
        }else{
            console.warn("Failed to process registers")
        }
     }
 }