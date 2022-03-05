//Save input data
// Grab previous entries and show in browser

async function grabEntries(){
    const res = await axios.get('/api/entries/')
    console.log(res)
    return res.data
}

async function displayEntries(){
    const entriesElement = document.querySelector("#entries")
    const entries = await grabEntries()
    console.log(entries)
    entriesElement.innerHTML = "";
    entries.forEach(function(entry) {
        const newListElement = document.createElement("li")
        newListElement.textContent = entry
        entriesElement.appendChild(newListElement)
    })
}

async function uploadEntry(){
    const entry = document.querySelector("#entry").value
    await axios.post('/api/entries/update', {entry})
    await displayEntries();
}

function addEventListenerSubmit(){
    const submitButton = document.querySelector("#submitButton")
    submitButton.addEventListener("click", function (){
       Promise.resolve(uploadEntry())
    })
}
function ready(){
    Promise.resolve(displayEntries())
    addEventListenerSubmit()
}
document.addEventListener("DOMContentLoaded", ready)