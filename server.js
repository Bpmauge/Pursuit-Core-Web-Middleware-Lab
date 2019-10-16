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
const validNumbers = (req, res, next) => {
    let floor = parseInt(req.query.floor);
    let ceil = parseInt(req.query.ceil);
    if (isNaN(floor) || isNaN(ceil)) {
        res.json({
            status: 'failed',
            message: 'Make sure to use numbers only!'
        })
        return
    } 
 
     next();

}
const generateSpread = (req, res, next) => {
    let floor = parseInt(req.query.floor);
    let ceil = parseInt(req.query.ceil);
    if (floor > ceil) {
        res.json({
            status: 'failed',
            message: 'Starting number must be smaller than ending number'
        })
        return
    } 
 
     next();
}
const getRandomNumber = (req, res, next) => {
    let floor = parseInt(req.query.floor);
    let ceil = parseInt(req.query.ceil);
   
    let numbers = [];
    for(let i = floor; i<= ceil; i++){
        numbers.push(i)
    }

  let randomNumber = Math.floor(Math.random() * (numbers.length))

    res.json({
        status: 'success',
        range: `[${floor} to ${ceil}]`,
        randPick: numbers[randomNumber]
    })
   
}
app.get('/random', validNumbers, generateSpread, getRandomNumber);

// //Queue Manager: Middleware

app.listen(port, (res, req) => {
    console.log(`http://localhost:${port}`);
})