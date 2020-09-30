const { models } = require('../../models');
const copyLeader = require('./copyLeader')

const updateFollowerPortfolios = async () => {
    let portfolios = await models.Portfolio.find() // all portfolios
    let lPortfolios = portfolios.filter(p => p.followers.length > 0) // leader portfolios
    lPortfolios.forEach( async (portfolio) => {
        portfolio.followers.forEach( async (pID) => {
            await copyLeader(pID, portfolio._id)
        })
    })
    // console.log(lPortfolios)
    // console.log(lPortfolios[0])
    // console.log(lPortfolios[0].followers)
    // console.log(lPortfolios[0].followers.length)
    // console.log(lPortfolios[0].followers[0])
    // for (let i =0; i < lPortfolios.length; i++) {
    //     for (let j = 0; j < lPortfolios[i].followers.length; j++) {
    //         await copyLeader(lPortfolios[i].followers[j], lPortfolios._id)
    //     }
    // }
}

module.exports = updateFollowerPortfolios