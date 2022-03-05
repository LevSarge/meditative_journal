//Save input data
// Grab previous entries and show in browser


async function grabEntries(){
    const res = await axios.get('/api/entries/')
    console.log(res)
    return res.data
}
function addDeleteEventToButton(newDeleteElement, position){
    newDeleteElement.addEventListener("click", () => {
        axios.delete('/api/entries/delete',{
            data:{position}
        }).then((message)=> console.log(message)).then(()=>{
            Promise.resolve(displayEntries()) 
        })
    })
}
async function displayEntries(){
    const entriesElement = document.querySelector("#entries")
    const entries = await grabEntries()
    console.log(entries)
    entriesElement.innerHTML = "";
    entries.forEach(function(entry, position) {
        const newListElement = document.createElement("li")
        const newEntryElement = document.createElement("label")
        const newDeleteElement = document.createElement("div")

        newEntryElement.textContent = entry
        newDeleteElement.textContent = "X"
        addDeleteEventToButton(newDeleteElement, position)
        newListElement.appendChild(newEntryElement)
        newListElement.appendChild(newDeleteElement)

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