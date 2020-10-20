import { elements } from "../base.js";

export const clearSpace = () => { document.querySelector('.chat-section').innerHTML = ""; }

const fn = (data) => {
    const lastSeen = new Date(data);
    const currDate = new Date();

    if (currDate.getFullYear() - lastSeen.getFullYear() > 1) {
        return `last seen ${currDate.getFullYear() - lastSeen.getFullYear()} years ago`;

    } else if (currDate.getFullYear() - lastSeen.getFullYear() === 1) {
        return `last seen ${currDate.getFullYear() - lastSeen.getFullYear()} year ago`;
    } else if (currDate.getMonth() - lastSeen.getMonth() > 1) {
        return `last seen ${currDate.getMonth() - lastSeen.getMonth()} months ago`;
    } else if (currDate.getMonth() - lastSeen.getMonth() === 1) {
        return `last seen ${currDate.getMonth() - lastSeen.getMonth()} month ago`;
    } else if (currDate.getDate() - lastSeen.getDate() > 1) {
        return `last seen ${currDate.getDate() - lastSeen.getDate()} days ago`;
    } else if (currDate.getDate() - lastSeen.getDate() === 1) {
        return `last seen yesterday at ${lastSeen.getHours()} : ${lastSeen.getMinutes()}`;
    } else {
        return `last seen today at ${lastSeen.getHours()} : ${lastSeen.getMinutes()}`;
    }
}
export const renderChatSpace = (chatSpace) => {
    const markup = `
           <div class="chat-header">
                <img src="${chatSpace.image_url}" onerror=this.src="img/man.png" alt="user">
                <div class="user-data">
                    <span class="friend-name">${chatSpace.username}</span>
                   <span class="online-seen">${(chatSpace.online === true) ? "Online" : fn(chatSpace.lastSeen)}</span>
                </div>
            </div>
            <div class="chat-main">
            </div>
            <div class="chat-form">
                <input type="text" placeholder="type your message......">
                <button class="test1"><i class="fa fa-paper-plane"></i></button>
            </div>
     `;
    // <img src="./img/send.png" class="abc" alt="">
    elements.chatSpace.insertAdjacentHTML("afterbegin", markup);
}