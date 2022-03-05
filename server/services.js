const { json } = require('express/lib/response')
const fs = require('fs')
function getEntries() {
    const entries = getJournalBookEntries()
    return entries
}

function addEntry(entry) {
    const previousEntries = getJournalBookEntries()
    const newEntries = [entry, ...previousEntries]
    saveToFile(newEntries)
    return true;
}
function saveToFile(newEntries){
    const textInFile = JSON.stringify(newEntries)
    fs.writeFileSync('./journalBook', textInFile, {encoding:'utf-8', flag:'w'})
}
function getJournalBookEntries(){
    const textInFile = fs.readFileSync('./journalBook', {encoding:'utf-8', flag:'r'})
    console.log(textInFile)
    return JSON.parse(textInFile)
}

async function deleteEntry(position){
    const previousEntries = getJournalBookEntries()
    const newEntries = previousEntries.filter(function(entry, positionB){
        return position != positionB
    })
    saveToFile(newEntries)
}

module.exports = {
    getEntries, addEntry, deleteEntry
}