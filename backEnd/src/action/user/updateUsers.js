const { models } = require('../../models');

const sum = (array) => {
    let sum = array.reduce((a, b) => {
        return a + b;
    }, 0);
    return sum
}

const updateAllUsers = async () => {
    // Observe Each User Object
    const docs = await models.User.find()
    const result = docs.forEach( async (user)=> {
        await updateSpecificUser(user)
    })
}

const updateSpecificUser = async (u) => {
    // map through each portfolioid, find the corresponding model, and return its current value\
    const allPorts = await models.Portfolio.find()
    const userPorts = allPorts.filter(p=> p.user.toString() == u._id.toString())
    let newValues = userPorts.map(p => p.currentValue)
    let followerSum = userPorts.map(p => p.followers.length)
    let allFunds = sum(newValues)
    let allFollowers = sum(followerSum)
    // update user with summed portfolio values + unallocated funds
    await models.User.updateOne({ _id: u._id },
        { totalFunds: allFunds + u.usableFunds})
        // { totalFunds: getPortfolioValues(u)})
    await models.User.updateOne({ _id: u._id },
        { followers: allFollowers})
}
module.exports = updateAllUsers
