const router = require('express').Router();
let Calculations = require('../models/calculations.model.js');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
    Calculations.find().sort({ _id: -1 }).limit(10)
        .then(calculations => {
            res.json(calculations);

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const operand1 = Number(req.body.operand1);
    const operand2 = Number(req.body.operand2);
    const operator = req.body.operator;
    var result;
    if (operator == ("+")) {
        result = operand1 + operand2;
    }
    else if (operator == ("-")) {
        result = operand1 - operand2;
    }
    else if (operator == ("*")) {
        result = operand1 * operand2;
    }
    else if (operator == ("/")) {
        if (operand2 != 0) {
            result = operand1 / operand2;
        }
    }
    if (operator == ("/") && operand2 == 0) {
        return;
    }
    const newCalculation = new Calculations({
        _id: new mongoose.Types.ObjectId(), operand1: operand1, operand2: operand2,
        operator: operator, result: result
    });
    newCalculation.save()
        .then(() => {
            res.json('Calculation added!');

        })
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;


