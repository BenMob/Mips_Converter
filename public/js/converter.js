window.onload = function(){

    // TODO: use local storage for faster retrievial of this data
    PROCESSES.getOperationsAndRegisters();
    // PROCESSES.listenForSubmissions();
    
    const form = document.querySelector("#form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        PROCESSES.processSubmission();
    })
}