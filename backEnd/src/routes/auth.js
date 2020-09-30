const express = require("express");
const router = express.Router();
const passport = require("../../config/passport_local_strategy");


router.post("/register_login", (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local',(err, user, info) => {
        console.log(err, user)
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: {id: user.id, leader: user.leader}});
        });
    })(req, res, next);
});

module.exports = router;