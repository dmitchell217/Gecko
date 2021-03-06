const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const port = 8000;
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const bcrypt = require("bcryptjs");
// functions
// const test = require('./src/action/portfolio/updatePortfolioStocks').test
const fetchPrice = require('./src/action/stock/returnPrice').fetchPrice
const addStock = require('./src/action/prices/seedPrices').addStock
const seedPrices = require('./src/action/prices/seedPrices').seedPrices
const scheduledUpdate = require('./src/action/scheduledUpdate')


// db
const {connectDb, models} = require('./src/models/index.js');

// router
const routes = require('./src/routes/index.js')

// const eS = require('express-session')
// const expressSession = eS(secretInfo().secret)

// cors middlware
app.use(cors());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
//   app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, ".", "site")));
// app.use(express.urlencoded({extended: true}))

// Express Session
app.use(
    session({
        secret: "very secret this is", // change this?
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
// // Passport middleware
app.use(passport.initialize()); 
app.use(passport.session()); 

// pass models to every route
app.use(async (req, res, next) => {
    req.context = {
      models,
      currentUser: await models.User.findByLogin('bob'),
    };
    next();
  });

// JWT Passport config
// require("./config/passport")(passport);
// passport.serializeUser(models.User.serializeUser()); 
// passport.deserializeUser(models.User.deserializeUser()); 
// const LocalStrategy = require('passport-local').Strategy; 
// passport.use(new LocalStrategy(models.User.authenticate()));

// app.use("/authentication", routes.Authentication);
app.use("/auth", routes.Auth);
app.use('/session', routes.Session);
app.use('/users', routes.User);
app.use('/portfolios', routes.Portfolio);
app.use('/stocks', routes.Stock);
app.use('/test', routes.Test);
app.use('/history', routes.History)
app.use('/prices', routes.Prices)

// error handling
app.get('*', function (req, res, next) {
    res.status(301).redirect('/not-found');
  });
app.use((error, req, res, next) => {
return res.status(500).json({ error: error.toString() });
});

// DB Config
connectDb().then(async () => {
    app.listen(port, () =>
      console.log(`Listening on port ${port}!`),
    );
  });

  // update pricing
//   updatePricing() 

//   const message = await req.context.models.Message.create({
//     text: req.body.text,
//     user: req.context.me.id,
//   });
// seed DB
// const createPricesHistory =  async ()=> {
//     const prices = new models.User({
//         name: 'David',
//         email: 'd@gmail.com',
//         password: pswrd,
//         leader: true,
//         followers: 0
//       });
//       await user2.save();
// }

const createPortfoliosAndUsers = async () => {
  console.log("created")
    await Promise.all([
        models.User.deleteMany({}),
        models.Portfolio.deleteMany({})
    ])
    let pswrd = await bcrypt.hash('1234', 10)
    const user1 = new models.User({
        name: 'David',
        email: 'd@gmail.com',
        password: pswrd,
        leader: true,
        followers: 0,
        totalFunds: 4179.99,
        usableFunds: 500,
        portfolios: []
      });
      await user1.save();
    const user2 = new models.User({
        name: 'Rashad',
        email: 'r@gmail.com',
        password: pswrd,
        leader: false,
        followers: 0,
        totalFunds: 1000,
        usableFunds: 0,
        portfolios: []
    });
    await user2.save();
    
    const portfolio = new models.Portfolio({
        name: 'Davids portfolio',
        active: true,
        usableFunds: 0,
        startingValue: 1500,
        currentValue: 3179.99,
        tickers: [{symbol : 'TSLA', allocation: 0, desiredAllocation: 33, currValue: 0, units: 0}, {symbol : 'AMZN', allocation: 100, desiredAllocation: 33, currValue: 3179.99, units: 1}],
        followers: [],
        history: [{date : new Date("2016-05-18T16:00:00Z"), value: 1500}, {date : new Date("2016-05-19T16:00:00Z"), value: 3179.99}],
        user: user1.id,
      });
    await portfolio.save()

    const portfolio2 = new models.Portfolio({
        name: 'Rashads portfolio',
        active: true,
        usableFunds: 500,
        startingValue: 1000,
        currentValue: 1000,
        tickers: [{symbol : 'AAPL', allocation: 50, desiredAllocation: 50, currValue: 500, units: 4.5314482509}],
        followers: [],
        history: [{date : new Date("2016-05-18T16:00:00Z"), value: 1000}, {date : new Date("2016-05-19T16:00:00Z"), value: 1000}],
        user: user2.id,
      });
    await portfolio2.save()

    const portfolio3 = new models.Portfolio({
      name: 'Davids-inActive-portfolio',
      active: false,
      usableFunds: 500,
      startingValue: 500,
      currentValue: 500,
      tickers: [],
      followers: [],
      history: [],
      user: user1.id,
    });
  await portfolio3.save()

    await models.User.updateOne({ _id: user1._id },
        { portfolios: [portfolio._id, portfolio3._id] })
    await models.User.updateOne({ _id: user2._id },
        { portfolios: portfolio2._id })
    await models.Portfolio.updateOne({ _id: portfolio._id },
        { followers: portfolio2._id })

    // let p = await models.Portfolio.findById(portfolio._id);
    // let currentTickers = p.tickers
    // await models.Portfolio.updateOne({ _id: portfolio._id },
    //     { tickers: [...currentTickers.filter(t=>t.symbol!="TSLA"),{symbol : 'TSLA', allocation: 66.6, desiredAllocation:66.6, currValue: 1000, units: 20}]})
}


const createUser = async () => {
    let pswrd = await bcrypt.hash('1234', 10)
    const user2 = new models.User({
        name: 'David',
        email: 'd@gmail.com',
        password: pswrd,
        leader: false,
        followers: 0
      });
      await user2.save();
}
// createUser()

// installed packages
// bcryptjs: used to hash passwords before we store them in our database
// body-parser: used to parse incoming request bodies in a middleware
// concurrently: allows us to run our backend and frontend concurrently and on different ports
// express: sits on top of Node to make the routing, request handling, and responding easier to write
// is-empty: global function that will come in handy when we use validator
// jsonwebtoken: used for authorization
// mongoose: used to interact with MongoDB
// passport: used to authenticate requests, which it does through an extensible set of plugins known as strategies
// passport-jwt: passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT
// validator: used to validate inputs (e.g. check for valid email format, confirming passwords match)

// createPortfoliosAndUsers()
// scheduledUpdate()
// test()