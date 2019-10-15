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
    let floor = req.params.floor;
    let ceil = req.params.ceil;
    if (parseInt(floor) > parseInt(ceil)) {
        res.json({
            status: 'failed',
            message: 'Starting number must be smaller than ending number'
        })
        return
    } 
    console.log(floor)
    console.log(ceil)
     next();
}

const getRandomNumber = (req, res, next) => {
    let floor = req.params.floor;
    let ceil = req.params.ceil;
    let numbers = [];
    console.log(floor)
    console.log(ceil)
    for (let i = floor; i <= ceil; i++) {
        numbers.push(i)
    }
    console.log(floor)
    console.log(ceil)
    console.log(numbers)

    let randomNumber = Math.floor(Math.random() * (ceil - floor +1) + floor);
    res.json({
        status: 'success',
        range: `[${floor}, ${ceil}]`,
        randPick: numbers[randomNumber]
    })
    console.log(randomNumber)

}
app.get('/random/:floor/:ceil', generateSpread, getRandomNumber);

app.listen(port, (res, req) => {
    console.log(`http://localhost:${port}`);
})