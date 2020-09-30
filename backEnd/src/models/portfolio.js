const mongoose = require('mongoose')
let portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    active: {
        type: Boolean,
    },
    usableFunds: {
        type: Number,
    },
    startingValue: { // What
        type: Number,
    },
    currentValue: { // changes of all of the stocks accounted for. Sum of all tickerCurrValues
        type: Number,
    },
    // Array of all the tickers: [{symbol : 'TSLA', allocation: 21, currValue: 20}, {symbol : 'AMZN', allocation: 79, currValue: 80}]
    tickers: [{
        symbol: String,
        allocation: Number,
        desiredAllocation: Number,
        currValue: Number,
        units: Number,
    }],
    followers: { 
        type: Array,
    },
    history: [{
        date: Date,
        value: Number
    }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }, { timestamps: true }
    )
    const Portfolio = mongoose.model("Portfolio", portfolioSchema);
exports.Portfolio = Portfolio;