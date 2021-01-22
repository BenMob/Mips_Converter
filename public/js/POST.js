/**
 * Fetch function that sends a post request to the server 
 * with a Mips Instrucion and receives its conversion  
 * @param {*} url 
 * @param {*} data 
 */
const post = (url = "", data = {}) => {
        fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
               "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            if(data.error){
                clearAll();
                displayError(data.errorMessage);
            }else{
                clearAll();
                displayTable(data);
            }
        }).catch(err => {
            console.warn(err)
        })
    }