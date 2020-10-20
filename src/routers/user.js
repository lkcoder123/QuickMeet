const express = require("express");
const User = require("../models/user");
const multer = require("multer");
const auth = require("../middleware/auth");
const Contact = require("../models/contact");

const router = new express.Router();

router.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        const temp1 = await User.findOne({ email: user.email });

        if (temp1) {
            return res.status(400).send({ emailError: "Email is already in use" });
        }

        const temp2 = await User.findOne({ username: user.username })
        if (temp2) {
            return res.status(400).send({ usernameError: "Username is already taken" });
        }

        await user.save();
        const contact = new Contact({ owner: user._id });
        contact.save();
        // sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.sendStatus(400).send(e);
    }
})

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findByCredentials(
            email,
            password
        );
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
            return cb(new Error("upload jpg or jpeg or png only"));
        }

        cb(undefined, true);
    },
});

router.post(
    "/users/me/avatar",
    auth,
    upload.single("avatar"),
    async (req, res) => {
        req.user.avatar = req.file.buffer;
        await req.user.save();
        res.status(200).send();
    },
    (error, req, res, next) => {
        res.status(400).send({ Error: error.message });
    }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send();
});

router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set("content-type", "image/jpg");
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;
