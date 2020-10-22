const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') // file system
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    res.render('home')
})

// -----> DINO INDEX ROUTE <-----
app.get('/dinosaurs', (req, res)=>{
    // take the text from dinosuars.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) // convert the string into an array
    
    // handle a query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){ // reassign dinoDatat to only be an array of dinos whose name matches the query string name (and make it ignore case)
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase === nameFilter.toLowerCase()
        })
    }


    res.render('index', {dinosaurs: dinoData})
})
// -----> DINO NEW ROUTE<-----
app.get('/dinosaurs/new', (req,res)=>{
    res.render('new')
})

// ----> DINO SHOW ROUTE <----
app.get('/dinosaurs/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) 
// get array index from url paramter
    let dinoIndex = req.params.idx
    res.render('show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})

})

// ----> DINO POST ROUTE <-----
app.post('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) // push the new dino to the array
    // save the new dinoData array to the dinosuars.json file
    // JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // rediret to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})

// ------> DINO GET EDIT ROUTE <-----
app.get('/edit/:idx', (req, res)=>{
    let dinosaursList = fs.readFileSync('.dinosaurs.json')
    let dinoData =  JSON.parse(dinosaurs)
    res.render('dinosaurs/edit.ejs', {dino: dinoData[req.params.idx], dinoId: req.params.idx})
})
app.put('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type= req.body.type
    fs.writeFileSync('.dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

app.delete('/dinosaurs/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData =JSON.parse(dinosaurs)

    // remove the deleted dinosaur from the dinosuars array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})



app.listen(8000, ()=>{
    console.log('You\'re listening to the smooth sounds of port 8000.')
})