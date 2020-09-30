const { models } = require('../../models');


// check to see if the users id is already in the leaders portfolios follower array
// if so, return
// else, add user idea to follower array, and increment leader total follower count
const followLeader = (followerID, lPortfolioID) => {
    let lPortfolio = await models.Portfolio.findById(lPortfolioID)
    let leaderID = lPortfolio.user
    let leader = await models.User.findById(leaderID)
    if (lPortfolio.followers.filter(f => f.toString() == followerID.toString()).length) return
    await models.Portfolio.updateOne({ _id: lPortfolioID },
        { followers: [...lPortfolio.followers, followerID]})
    await models.Portfolio.updateOne({ _id: leaderID },
        { followers: leader.followers+1})
    
}
module.exports = followLeader