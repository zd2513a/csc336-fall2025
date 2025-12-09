// This is a function that makes an api call to the local route called '/world'.
// All the '/world' route does (defined in server.js) is load the file world.json,
// and then send that json over to the client (this file).
// 
// As a contrived demo, this function also displays the name of a notable person
// in by generating HTML to add to a div.
async function loadWorld() {
    const res = await fetch("/world");
    const data = await res.json();

    document.getElementById("worldDiv").innerHTML =
        `<ul><li>${data.regions[0].towns[0].notable_people[0].name}</li></ul>`;
}

// This function will run when the script is loaded
loadWorld();

// Get a reference to the form (defined in html)
let nameForm = document.querySelector("#nameForm");

// When the user clicks the button, this event listener will read the text in the
// form, construct an object and send it over to the server's 'excite' route using
// a post http request. On the server side, it loops through the world data, and
// if it finds someone with the name that it was given, it adds "!!!" to the data,
// writes it to a file, and then returns the data to the client (here). At this point,
// we can call loadWorld() again to refresh the data diplayed on the front end.
nameForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // FormData is a utility class that helps us access the data inside of forms
    // without needing to manually call 'document.querySelector' or for every input
    // in the form. After these two lines, we will have a single javascript object
    // where the keys are the "name" field of each input, and the values are the 
    // value of each input (e.g. the text written into a text input).
    let formData = new FormData(nameForm);
    let formDataInObjectForm = Object.fromEntries(formData.entries());

    // Tell the server to add excitement to a 
    const res = await fetch("/excite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataInObjectForm)
    });

    const updatedWorld = await res.json();
    // document.getElementById("worldDiv").innerHTML =
    //     `<ul><li>${updatedWorld.regions[0].towns[0].notable_people[0].name}</li></ul>`;
    loadWorld();
});