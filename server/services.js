const { json } = require('express/lib/response')
const fs = require('fs')
function getEntries() {
    const entries = getJournalBookEntries()
    return entries
}

function addEntry(entry) {
    const previousEntries = getJournalBookEntries()
    const newEntries = [entry, ...previousEntries]
    const textInFile = JSON.stringify(newEntries)
    fs.writeFileSync('./journalBook', textInFile, {encoding:'utf-8', flag:'w'})
    return true;
}

function getJournalBookEntries(){
    const textInFile = fs.readFileSync('./journalBook', {encoding:'utf-8', flag:'r'})
    console.log(textInFile)
    return JSON.parse(textInFile)
}

module.exports = {
    getEntries, addEntry
}