const express = require('express');
const http = require("http");
const socketio = require('socket.io');
require("./db/mongoose");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require('cookie-parser');
const basicRouter = require("./routers/basic");
const userRouter = require("./routers/user");
const queryRouter = require("./routers/query");
const User = require('./models/user');
const Contact = require("./models/contact");
const auth = require("./middleware/auth");
const { query } = require('express');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;


const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

console.log(partialsPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

//To parse incoming json object passed in 
//body request
app.use(express.json());
app.use(cookieParser());

//List of all the routers
app.use(basicRouter);
app.use(userRouter);
app.use(queryRouter);

io.on("connection", (socket) => {
    console.log("new websocket connection");

    socket.on("join", (room, callback) => {
        console.log(room);
        socket.join(room);
        socket.user_id = room;
    })

    socket.on("sendMessage", (data) => {
        socket.to(data.to).emit("message", {
            from: data.from,
            msg: data.msg
        });
    })

    socket.on("disconnect", async () => {

        console.log("disconnected");
        // const user = await User.findOne({ _id: socket.user_id });
        // const data = {
        //     online: false
        // };
        // await user.markOnline(data);
    })
})




server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})