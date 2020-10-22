const express = require('express')
const router = express.Router()

router.get('/new', (req,res)=>{
    res.render('dinos/new.ejs')
})

router.get('/:id', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.id
    res.render('dinos/show.ejs', {dino: dinoData[dinoIndex], dinoID: req.params.id})
})

module.exports = router