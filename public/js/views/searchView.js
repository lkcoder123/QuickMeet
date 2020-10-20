import { elements } from "../base.js";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { elements.searchInput.value = ""; }

export const clearResults = () => {
    elements.searchRes.innerHTML = "";
}

export const renderUser = (user, msg) => {
    // console.log(isNewMsg);
    const markup = `
        <div class="friend " id="first" data-_id="${user._id}">
            <img src=${user.image_url} alt="User" onerror=this.src="img/man.png">
            <div class="detail-section">
                <div class="data-section">
                    <span class="friend-name">${user.username}</span>
                </div>
                <div class="message-info" style="display:${(msg) ? 'flex' : 'none'}">
                    <span class="info" style="display:block"> ${msg}</span >
                    <i class="fa fa-circle" style="display:block;"></i>
                </div >
                <div class="feature-section">
                    <a href="#" class="chat-btn" data-_id="${user._id}">Chat</a>
                    <a href="#" class="profile-btn">Profile</a>
                </div>
            </div >
        </div >
    `;
    // ${ (msg) ? 'flex' : 'none' }
    elements.searchRes.insertAdjacentHTML("afterbegin", markup);
}

export const renderError = (error) => {
    const markup = `
    < span class="search-error" > ${error}</span >
        `;

    elements.searchRes.insertAdjacentHTML("afterbegin", markup);
}

