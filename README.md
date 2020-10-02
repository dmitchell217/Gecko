# Welcome To Gecko
![rmbanner](https://github.com/dmitchell217/ProjectM/blob/master/public/images/Ment.png)
## Overview: 
Gecko is a platform that simplifies trading. Users can add funds, allocate new portfolios to US equities, and even share/copy their portfolio. All of the updating and automation of portfolio rebalancing is handled on the backend so users don't need to worry that their portfolios allocation percentages have changed due to dynamic market conditions. Gecko is great for users who want to profit from the US Equity market but may not want to actively manage themselves. Likewise, it's great for professional traders who want to share their money-making secrets, for free, fame, or fortune.

## The Author:
### David Mitchell: https://github.com/dmitchell217

## What I used:
### Languages:
- MongoDB
- Express
- JAVASCRIPT
- NODE.js
- REACT.js

### Other:
- Passport
- Bcrypt
- JWT

## MVP (Minimum Viable Product):
- User profiles that can setup and monitor portfolios
- Initial design and layout
- Basic user search queries
- portfolio performance measurement

## Stretch Goals Completed
- Fully implemented stock price updating, portfolio rebalancing, portfolio allocation/creation
- Portfolio copying/following
- Dynamic rendering
- Dynamic user profiles based on logged user

## Stretch Goals Future
- Adding robinhood API to interact with real money
- Be able to edit profile
- Dynamic social page to show featured leaders and followers
- Uploading video / images
- Chat
- Implementing online classes

## Code Snippets:
### This code allocates stock to a portfolio
``` javascript

const allocate = async (portfolioId, allocation, symbol) => {
    // determine if stock price is seeded, if not seeded
    const prices = await models.Prices.find()
    let p = await models.Portfolio.findById(portfolioId);
    if (!prices.find(price => price.ticker === symbol)) {
        await initializePrice(symbol)
    }
    let price = prices.find(price => price.ticker === symbol).currPrice // current price of the ticker
    let newCurrValue = allocation*.01*p.currentValue
    let newUnits = newCurrValue / price //fine with splitting units
    let currentPortfolioAllocation = sum(p.tickers.map(t=>t.allocation)) // another way of writing this is (p.currentValue - p.usableFunds) / p.currentValue
    // if stock is in portfolio
    if (p.tickers.filter(t => t.symbol === symbol).length) {
        let ticker = p.tickers.find(t=>t.symbol==symbol)
        let allocationDiff = (allocation - ticker.allocation)*.01
        let fundResult = p.usableFunds - (allocationDiff * p.currentValue)
        if (fundResult < 0) {console.log("not possible")}
    //     // reallocate
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...p.tickers.filter(t=>t.symbol!=symbol),
                {symbol : symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
            // update usableFunds
        await models.Portfolio.updateOne({ _id: portfolioId },
            { usableFunds: fundResult})
    }  
    else { // else add it to portfolio
        // check if value of the allocation is less than total usable funds
        let fundResult = p.usableFunds - allocation*.01*p.currentValue
        if (fundResult < 0) {console.log("not possible")}
        await models.Portfolio.updateOne({ _id: portfolioId },
            { tickers: [...p.tickers, 
                {symbol: symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
            // update usableFunds
        await models.Portfolio.updateOne({ _id: portfolioId },
            { usableFunds: fundResult})
        }
}

```
### This code determines the historical performance of a user
``` javascript
 const userPerformance = async (userId, days) => {
    let portfolios = await models.Portfolio.find()
    console.log(portfolios)
    let uPortfolios = portfolios.filter(p => p.user.toString() == userId.toString())
    // grab all the history array from each portfolio of this user
    let histories = uPortfolios.map(p => p.history)
    // reverse each of the arrays
    histories.forEach(arr => arr.reverse())
    // identify the longest by length,
    let maxVal = Number.MIN_VALUE
    for (let k = 0; k < histories.length; k++) {
        if (histories[k].length > maxVal) {
            maxVal = histories[k].length
            longestH = histories[k]
        }
    }
    // move it to the front of the histories array
    histories = [longestH, ...histories.filter(history => history != longestH)]
    performanceValues = longestH.map(history => history.value) // map its values
    dates = longestH.map(history => history.date) // map its dates

    // loop through all the subsequent histories and add their values to the already created values array
    for (let i = 0; i < performanceValues.length; i++) {
        for (let j=1; j < histories.length; j++) {
            if (histories[j].length > i) 
                {performanceValues[i] += histories[j][i].value}
        }
    }
    let interval = Math.min(performanceValues.length, days)
    let rv = performanceValues.slice(0, interval)
    return rv
}
```