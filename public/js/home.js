window.onload = function(){
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
            console.log(data);
        }).catch(err => {
            console.warn(err)
        })
    }

    const submit = () => {
        const instruction = document.querySelector("#input").value;
        const url = "http://localhost:8080/convert";
        post(url, {instruction});
    }

    const form = document.querySelector("#form");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submit();
    })

}