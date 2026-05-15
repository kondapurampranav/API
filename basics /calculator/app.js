// Calculator API:
// use add for addition, sub for subtraction, multiply for multiplication and div for division
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Calculator API working");
});

app.post("/calculator", (req, res) => {
    const {a, b, operation} = req.body;
    const validOperations = ["add", "sub", "multiply", "div"];

    if(a === undefined || b === undefined || operation === undefined){
        return res.json({ message: "All feilds are required"});
    }

    if (a == null || b == null || operation == null) {
        return res.json({ message: "All fields are required" });
    }
    const numA = Number(a);
    const numB = Number(b);

    if(isNaN(numA) || isNaN(numB)){
        return res.json({ message: "a and b must be numbers"});
    }

    if(typeof(operation) !== "string" || operation.trim() === ""){
        return res.json({ message: "Invalid operation. Allowed values: add, sub, multiply, div"});
    }

    if(!validOperations.includes(operation)){
        return res.json({ message: "Invalid operation. Use add, sub, multiply, or div"});
    }
    if(operation === "add"){
        return res.json({
            answer: numA + numB
        });
    }
    else if(operation === "sub"){
        return res.json({
            answer: numA - numB
        });
    }
    else if(operation === "multiply"){
        return res.json({
            answer: numA * numB
        });
    }
    else if(operation === "div"){
        if(numB === 0){
            return res.json({ message: "Cannot divide by 0"});
        }
        return res.json({
            answer: numA / numB
        });
    }
})

app.listen(3000, () => {
    console.log("server running");
});