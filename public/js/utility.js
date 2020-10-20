import * as searchView from "./views/searchView.js";
import { addChatBtnListener } from "./controllers/index.js";

export const findByEmail = (email) => {
    // if (!sessionStorage.contactList) return undefined;
    const list = JSON.parse(sessionStorage.contactList);
    // console.log(list);
    const res = list.find((user) => {
        return user.email === email;
    })

    return res;
}

export const isValidUser = async (_id) => {
    try {
        const res = await axios.get("/isuser?_id=${_id}");
        console.log(res.data.validUser);
        return res.data.validUser;
    } catch (e) {
        console.log(e);
    }
}
export const findByID = (_id) => {
    const list = JSON.parse(sessionStorage.contactList);
    // console.log(list);
    // console.log(sessionStorage.contactList);
    // 
    const res = list.find((user) => {
        return user._id === _id;
    })

    return res;
}

export const addUser = (user) => {
    var list = JSON.parse(sessionStorage.contactList);
    list.push(user);
    sessionStorage.setItem("contactList", JSON.stringify(list));
}

export const highlightSelected = (_id) => {
    const resultArr = document.querySelectorAll(".friend");
    console.log(resultArr);
    resultArr.forEach((el) => {
        el.classList.remove("--active");
    });

    document
        .querySelector(`.friend[data-_id="${_id}"]`)
        .classList.add("--active");
};

export const renderHeader = () => {
    const user = JSON.parse(localStorage.user);
    if (!user) {
        return;
    }

    document.querySelector('.register').style.display = "none";
    document.querySelector('.loggedBox span').innerHTML = `Hi, ${user.username}`
    document.querySelector('.loggedBox').style.display = "flex";
}

export const setBasicCookies = () => {
    const user = JSON.parse(localStorage.user);

    if (!user) return;
    document.cookie = `userid=${user._id}; path=/login`;
}

export const externalMessaging = async (data) => {
    const sender_id = data.from;
    const user = findByID(sender_id);

    if (user) {
        const el = document.querySelector(`.friend[data-_id="${sender_id}"]`);
        el.parentElement.removeChild(el);
        searchView.renderUser(user, data.msg);
        const obj = document.querySelector(".chat-btn");
        addChatBtnListener(obj);
        // document.querySelector(`.friend[data-_id="${sender_id}"] .message-info`).style.display = "block";
    } else {
        try {
            const res = await axios.get(
                `/users?email=${this.query}`
            )
            const user = {
                ...res.data,
                image_url: `/users/${res.data._id}/avatar`
            }
            addUser(user);
            searchView.renderUser(user);
            document.querySelector(`.friend[data-_id="${sender_id}"] .message-info`).style.display = "block";
        } catch (e) {
            console.log(e);
        }
    }

}