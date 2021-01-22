window.onload = function(){
    /********************
     * Submits the form
     */
    const submit = () => {
        const instruction = document.querySelector("#input").value;
        const url = "http://localhost:8080/convert";
        post(url, {instruction});
    }

    /***************************************
     * Listens to the form for submissions
     */
    const form = document.querySelector("#form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submit();
    })
}