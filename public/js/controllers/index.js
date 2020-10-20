import { elements, renderOthersMessage, renderOwnMessage, renderLoader, clearLoader, renderGoBack } from "../base.js";
import Search from "../models/Search.js";
import Contact from "../models/Contact.js";
import chatSpace from "../models/chatSpace.js";
import * as searchView from "../views/searchView.js";
import * as profileView from "../views/profileView.js";
import * as contactView from "../views/contactView.js";
import * as chatSpaceView from "../views/chatSpaceView.js";
import * as utility from "../utility.js";
import { sendMessage } from "../chat.js";

// state.search = {
//     createdAt: "2020-09-15T06:43:20.976Z",
//     email: "hell@gmail.com",
//     image_url: "/users/5f60628863616a308083c700/avatar",
//     updatedAt: "2020-09-15T06:48:45.456Z",
//     username: "Hell",
//     __v: 1,
//     _id: "5f60628863616a308083c700"
// }

const controlSearch = async () => {
    if (!localStorage.user) {
        searchView.clearResults();
        renderGoBack("Login to Search your friends");
        document.querySelector(".alert").style.backgroundColor = "blue";
        document.querySelector('.backBtn').style.display = "none";
        return;
    }
    // const loggedUser = JSON.parse(localStorage.user);
    // if (utility.isValidUser(loggedUser._id)) {
    //     return renderGoBack("Login to Search your friends");
    // }
    const query = searchView.getInput();

    renderLoader(elements.searchRes);
    if (query) {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(query) === false) {
            clearLoader();
            renderGoBack("Enter a Valid Email");
        } else {

            var search = new Search(query);
            searchView.clearInput();
            searchView.clearResults();

            const user = utility.findByEmail(search.query);

            if (user) {
                search.user = user;
                sessionStorage.setItem("search", JSON.stringify(search));
                clearLoader();
                searchView.renderUser(search.user);
                renderGoBack();
                const obj = document.querySelector(".chat-btn");
                addChatBtnListener(obj);
            } else {
                try {
                    await search.getUser();
                    if (search.user._id === undefined) {
                        clearLoader();
                        renderGoBack("User does not exist");
                    } else {
                        clearLoader();
                        sessionStorage.setItem("search", JSON.stringify(search));
                        searchView.renderUser(search.user);
                        renderGoBack();
                        const obj = document.querySelector(".chat-btn");
                        addChatBtnListener(obj);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        document.querySelector('.backBtn').addEventListener('click', (e) => {
            e.preventDefault();
            controlContact();
        })
    }

}

// const controlProflie = (query) => {
//     const user = utility.findByID(query);

//     profileView.clearSection();
//     profileView.renderProfile(user);
// }

export const addChatBtnListener = (obj) => {
    obj.addEventListener("click", async (e) => {
        const query = e.target.getAttribute('data-_id');
        const user = utility.findByID(query);
        if (!user) {
            utility.addUser(JSON.parse(sessionStorage.search).user);
            await axios.post("/users/contacts",
                {
                    _id: query
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`
                    }
                }
            )
        }
        controlOpenChat(query);
    })
}

const addChatFormListener = () => {
    document.querySelector('.chat-form button').addEventListener('click', (e) => {
        e.preventDefault();
        const msg = document.querySelector('.chat-form input').value;
        const data = {
            to: JSON.parse(sessionStorage.chatSpace)._id,
            from: JSON.parse(localStorage.user)._id,
            msg
        };
        renderOwnMessage(msg);
        sendMessage(data);
    })
}

export const parseMessage = (data) => {
    const sender = data.from;
    const curr_user = JSON.parse(sessionStorage.chatSpace)._id;
    // renderOthersMessage(data.msg);
    if (sender === curr_user) {
        return renderOthersMessage(data.msg);
    }
    utility.externalMessaging(data);
}

const controlContact = async () => {
    contactView.clearContact();
    var contact = new Contact();

    try {
        await contact.getList();
        // contact.list.forEach((user) => {
        //     connectToRoom(`${JSON.parse(localStorage.user)._id}:${user._id}`);
        // });
        sessionStorage.setItem("contactList", JSON.stringify(contact.list));
        contactView.renderContact(contact.list);

        const objs = document.querySelectorAll(".chat-btn");

        objs.forEach((obj) => {
            addChatBtnListener(obj);
        });

    } catch (e) {
        console.log(e);
    }

}

const controlOpenChat = async (query) => {
    // console.log("Coming from OpenChat");

    var Space = new chatSpace(query);
    const raw = utility.findByID(query);
    utility.highlightSelected(query);
    document.querySelector(`.friend[data-_id="${query}"] .message-info`).style.display = "none";

    // document.querySelector(`[data-_Id='${query}']`).style.backgroundColor = "red";
    // console.log(query);
    profileView.clearSection();
    profileView.renderProfile(raw);

    try {
        chatSpaceView.clearSpace();
        await Space.getOnlineData();
        const chatSpaceTemp = {
            ...raw,
            online: Space.online,
            lastSeen: Space.lastSeen
        }
        Space = chatSpaceTemp;
        sessionStorage.setItem("chatSpace", JSON.stringify(Space));
        chatSpaceView.renderChatSpace(Space);
        addChatFormListener();
    } catch (e) {
        console.log(e);
    }
}

elements.seachBtn.addEventListener('click', (e) => {
    e.preventDefault();
    controlSearch();
})

// elements.chatOpenBtn.addEventListener('click', async (e) => {
//     e.preventDefault();
//     console.log("yes did it");
//     const query = e.target.getAttribute('data-_id');
//     controlOpenChat(query);
// })

window.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    if (!utility.isValidUser()) {
        localStorage.clear();
        sessionStorage.clear();
        location.href = "/";
        return;
    };

    const data = {
        online: true
    }
    await axios.post("/users/online/", data, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    }
    );
    // utility.setBasicCookies();
    utility.renderHeader();
    await controlContact();
    const space = JSON.parse(sessionStorage.chatSpace);
    // console.log(space);
    // console.log(space._id);
    if (space) {
        const _id = space._id;
        controlOpenChat(_id);
    }

});


var val = 1;

document.querySelector('.dropdown').addEventListener('click', (e) => {

    if (val & 1) {
        document.querySelector('.logoutBox').style.display = "flex";
        val = 0;
        return
    }
    console.log("clicked", val);
    document.querySelector('.logoutBox').style.display = "none";
    val = 1;
})

document.querySelector('.logout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    location.href = "/";
})
