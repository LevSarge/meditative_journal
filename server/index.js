const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { getEntries, addEntry, deleteEntry } = require('./services')
const port = 3000
/*To-Do for front-end requests

-Request to save user entries into an object (database file?)
*/
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/*-Grab public folder contents*/

app.use(express.json())
app.use('/', express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
// app.get(controller.getEntries)
// -Server request to grab entries that user may have already written
app.get('/api/entries', function(req, res) {
    const entries = getEntries()
    res.status(200).send(entries)
})
app.post('/api/entries/update', urlencodedParser, function(req, res) {
    const entry = req.body.entry
    console.log(entry)
    console.log(req.body)
    const isAdded = addEntry(entry)
    if (isAdded)
    res.status(200).send("Entry sent!")
    else res.status(400).send("Entry didn't fire")
})
// app.post(controller.createEntry)
// app.delete(controller.deleteEntry)
// app.put(controller.editEntry)
app.delete('/api/entries/delete', urlencodedParser, function(req, res) {
    const position = req.body.position
    console.log(position)
    deleteEntry(position)
    res.status(200).send("Entry baleted")
})
app.listen(port, () => console.log(`Server running on port ${port}`))
