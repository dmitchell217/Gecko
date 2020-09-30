// import { Router } from 'express';
const { Router } = require('express');
const returnPrice = require('../action/stock/returnPrice').fetchPrice

 
const router = Router();
//  return all prices saved in the database
router.get('/', async (req, res) => {
  const prices = await req.context.models.Prices.find();
  return res.send(prices);
});
//  return a price by id
router.get('/return/:priceId', async (req, res) => {
  const price = await req.context.models.Prices.findById(
    req.params.priceId,
  );
  return res.send(price);
});
router.get('/assets', async (req, res)=> {
  // all of the seeded stocks in price table
  // map through all stocks and get symbol, the 24hr change, and the current price
  const prices = await req.context.models.Prices.find()
  let result = prices.map(price => {
    return {symbol: price.ticker, change: ((price.currPrice - price.prevPrice) / price.prevPrice*100).toFixed(2), price: price.currPrice}
  })
  return res.send({"rv": result})
})

//  return a price by ticker
router.get('/:ticker', async (req, res) => {
    const price = await req.context.models.Prices.find(
      req.params.ticker,
    );
    return res.send(price);
  });

//  return a price by ticker and date
router.get('/:ticker/:date', async (req, res) => {
    const prices = await req.context.models.Prices.findById(
      req.params.ticker,
    );
    var priceAtDate = prices.filter(price => price.lastUpdate == req.params.date);
    return res.send(priceAtDate);
  });
// //  create a new price
// router.post('/', async (req, res) => {
//     // get curr price
//     returnPrice(req.body.ticker, (response) => {
//         getPrice(response.o)
//     })
//     const getPrice = (open) => {
//         return open
//     }
//     // grab previous price
    
//   const price = await req.context.models.Prices.create({
//     ticker: req.body.ticker,
//     prevPrice: 0, // db fetch command
//     // pseudo logic -
//     // find prices by id 
//     // if there are prices for this id, grab last one
//     // else prevPrice is current Price
//     if 
//     currPrice: getPrice(req.body.ticker), // api call
//     // 
//     last_update: new Date(),
//   });
 
//   return res.send(price);
// });
// export default router;
module.exports = router;