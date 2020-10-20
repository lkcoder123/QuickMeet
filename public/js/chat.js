import { parseMessage } from "./controllers/index.js";
const socket = io();

const user = JSON.parse(localStorage.user);

socket.emit("join", user._id, (error) => {
    console.log(error);
})

export const sendMessage = (data) => {
    socket.emit("sendMessage", data, (error) => {
        console.log(error);
    })
}

const data = {
    from: "5f65ea5ade8d1f52fcda7d64",
    msg: "kuchh nahi yrrr"
};

// setTimeout(parseMessage(data), 10000);

socket.on("message", (data) => {
    console.log("called");
    parseMessage(data);
})


// socket.emit("join", "hello", (error) => {
//     console.log(error);
// })

// socket.emit("join", "room2", (error) => {
//     console.log(error);
// })

// socket.emit("join", "room3", (error) => {
//     console.log(error);
// })

// const data = {
//     to: "hello",
//     from: "hello",
//     msg: "Hey there you lover here"
// }

// socket.emit("sendMessage", data);

// socket.on("message", (data) => {
//     console.log(data);
// })