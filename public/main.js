//Save input data
// Grab previous entries and show in browser


async function grabEntries(){
    console.log("grabEntries")
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
    console.log("displayEntries")
    const entriesElement = document.getElementById('entries')
    const entries = await grabEntries()
    console.log(entries)
    entriesElement.innerHTML = "";
    entries.forEach(function(entry, position) {
        const newListElement = document.createElement("li")
        const newEntryElement = document.createElement("label")
        const newDeleteElement = document.createElement("div")

        newEntryElement.textContent = entry
        newDeleteElement.textContent = "Delete Entry"
        addDeleteEventToButton(newDeleteElement, position)
        newListElement.appendChild(newEntryElement)
        newListElement.appendChild(newDeleteElement)

        entriesElement.appendChild(newListElement)
    })
}

async function uploadEntry(){
    console.log("uploadEntry")
    const entry = document.querySelector("#entry").value
    await axios.post('/api/entries/update', {entry})
    await displayEntries();
}

function addEventListenerSubmit(){
    console.log("addEventListenerSubmit")
    const submitButton = document.getElementById('submitButton')
    submitButton.addEventListener("click", function (){
       Promise.resolve(uploadEntry())
    })
}
function ready(){
    displayEntries()
    addEventListenerSubmit()
}
document.addEventListener("DOMContentLoaded", ready)