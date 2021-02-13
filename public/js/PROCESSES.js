/**
 * Define processes in which functions 
 */
 
 const devPath = "http://localhost:3000/"
 const appPath = "https://mips-converter.herokuapp.com/"

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
        const url = `${appPath}convert`;
        post(url, {instruction});
     }

     /**
      * Queries supported operations and registers
      */
     static getOperationsAndRegisters(){
         const operationsURL = `${appPath}operations`;
         const registersURL = `${appPath}registers`
         get(operationsURL, this.pages.index);
         get(registersURL, this.pages.index);
     }

     /**
      * Queries operations
      */
     static getOperations(){
        const operationsURL = `${appPath}operations`;
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