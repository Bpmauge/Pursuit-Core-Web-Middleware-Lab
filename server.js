const express = require('express');
const port = 1002;
const app = express();

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

const returnAnimal = (req, res, next) =>{
    let newAnimal = req.params.type;
    res.json({
        status: 'success',
        message: true
    })
}
app.get("/animal/:type", isAnimal, returnAnimal)


app.listen(port, (res, req) => {
    console.log(`http://localhost:${port}`);
})