const express = require('express');
const port = 1002;
const app = express();

//Valid Animal Tester: Middleware
const isAnimal = (req, res, next) => {
    const animals = [
        'cheetah',
        'hawk',
        'eagle',
        'zebra',
        'bear',
        'alligator',
        'crocodile',
        'lion',
        'dog',
        'cat',
        'monkey',
        'raccoon',
        'dolphins',
        'tiger'
    ]

    let newAnimal = req.params.type;
    console.log(newAnimal)
    console.log(animals)
    for (let animal of animals) {
        if (animal.includes(newAnimal)) {
            next()
        }
    }
    res.json({
        status: "failed",
        message: false
    })
}

const returnAnimal = (req, res, next) => {
    let newAnimal = req.params.type;
    res.json({
        status: 'success',
        message: true
    })
}
app.get("/animal/:type", isAnimal, returnAnimal);

//Random Number picker: Middleware
const generateSpread = (req, res, next) => {
    let floor = req.query.floor;
    let ceil = req.query.ceil;
    if (parseInt(floor) > parseInt(ceil)) {
        res.json({
            status: 'failed',
            message: 'Starting number must be smaller than ending number'
        })
        return
    } 
 
     next();
}
const getRandomNumber = (req, res, next) => {
    let floor = req.query.floor;
    let ceil = req.query.ceil;
   
    let numbers = [];
    for (let i = parseInt(floor); i <= parseInt(ceil); i++) {
        numbers.push(parseInt(i))
    }
  
    let randomNumber = Math.floor(Math.random() * (ceil - floor +1) + floor);
    res.json({
        status: 'success',
        range: `[${floor}, ${ceil}]`,
        randPick: `${numbers[randomNumber]}`
    })
   
}
app.get('/random', generateSpread, getRandomNumber);

// //Queue Manager: Middleware

app.listen(port, (res, req) => {
    console.log(`http://localhost:${port}`);
})