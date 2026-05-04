// Guess a number between 1 and 100
const express = require("express");
const app = express();

app.use(express.json());

let secretNumber = Math.floor(Math.random() * 100) + 1;

app.get("/", (req, res) => {
    res.send("Number Guessing Game API running");
})

app.post("/guess", (req, res) => {
    const {guess} = req.body;

    if(guess === undefined || guess === null){
        return res.json({ message: "Please send a guess"});
    }

    if(typeof(guess) === "string" && guess.trim() === ""){
        return res.json({ message: "Guess must be a number"});
    }

    const numGuess = Number(guess);

    if(isNaN(numGuess)){
        return res.json({ message: "Guess must be a number"});
    }

    if(numGuess < 1  || numGuess > 100){
        return res.json({ message: "Guess must be between 1 and 100"});
    }

    if(numGuess > secretNumber){
        res.json({ message: "Too high"});
    }
    else if(numGuess < secretNumber){
        res.json({ message: "Too low"});
    }
    else{
        res.json({ message: "Correct! You guessed it!" });

        secretNumber = Math.floor(Math.random() * 100) + 1;
    }
});

app.listen(3000, () => {
    console.log("server running");
})