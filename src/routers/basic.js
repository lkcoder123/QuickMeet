const express = require("express");
const router = new express.Router();
const User = require('../models/user');
const hbs = require("hbs");

router.get("/", (req, res) => {
    // res.cookie('name', 'express');
    console.log(req.cookies);
    res.render("index");
})

router.get("/login", async (req, res) => {
    // console.log(req.cookies.userid);
    // const user = await User.findById(req.cookies.userid);
    // // console.log(user);
    // if (user) {
    //     return res.render("login");
    // }
    // res.redirect("/");
    res.render("login");
})

router.get("/signup", async (req, res) => {
    // console.log(req.cookies);
    const user = await User.findById(req.cookies.userid);
    if (!user) {
        return res.render("signup");
    }
    res.redirect("/");
})

module.exports = router;