const express = require("express");
const User = require("../models/user");
const Contact = require("../models/contact");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/users", async (req, res) => {
    const email = req.query.email;

    try {
        const user = await User.findOne({ email });
        res.status(201).send(user);
    } catch (e) {
        res.status(404);
    }
})

router.get("/users/contacts", auth, async (req, res) => {
    try {
        const data = {
            online: true
        };
        await req.user.markOnline(data);
        const id = req.user._id;
        const contactList = await Contact.findOne({ owner: id });
        // console.log(contactList);
        let userList = [];

        await Promise.all(contactList.contact.map(async (e) => {
            const user_id = e.user_id;
            const user = await User.findOne({ _id: user_id });
            userList.push(user);
        }));
        res.status(200).send(userList);
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
})

router.post("/users/contacts", auth, async (req, res) => {
    try {
        const data = {
            online: true
        };
        await req.user.markOnline(data);
        const contactList = await Contact.findOne({ owner: req.user._id });
        contactList.contact = contactList.contact.concat({ user_id: req.body._id });
        await contactList.save();
        res.status(200).send();
    } catch (e) {
        res.status(400);
    }
})

router.get("/users/:id/online", auth, async (req, res) => {
    try {
        const data = {
            online: true
        };
        await req.user.markOnline(data);
        const user = await User.findOne({ _id: req.params.id });
        return res.status(200).send({
            online: user.online,
            lastSeen: user.lastSeen,
        });
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
})

router.post("/users/online", auth, async (req, res) => {
    try {
        console.log(req.body);
        console.log("abc");
        await req.user.markOnline(req.body);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
})

router.get("/users/profile", (req, res) => {
    res.render("profile");
});

router.get("/isuser/", async (req, res) => {
    try {
        const id = req.query._id;
        const user = await User.findOne({ _id: id });

        if (user) {
            return res.send({
                validUser: true
            })
        }
        res.send({
            validUser: false
        })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;