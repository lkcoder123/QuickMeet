export const elements = {
    searchInput: document.querySelector('.search .search-field'),
    seachBtn: document.querySelector('.search .btn'),
    searchRes: document.querySelector('.friends-section'),
    profileBtn: document.querySelector('.friend .profile-btn'),
    profileSection: document.querySelector('.profile-section'),
    refreshBtn: document.querySelector('.content .search-section .refresh .refresh-btn'),
    refreshSection: document.querySelector('.content .search-section .refresh'),
    chatOpenBtn: document.querySelector('.friend .chat-btn'),
    chatSpace: document.querySelector('.chat-section')
}

export const renderLoader = (parent) => {
    parent.innerHTML = '';

    const loader = `
        <div class="loader"></div>   
    `;

    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(".loader");

    if (loader) {
        loader.parentElement.removeChild(loader);
    }

}

export const renderOthersMessage = (msg) => {

    const markup = `
        <div class="msg-container friend-msg">
            <div class="msg-data">
                        <span class="sender">Aman</span>
                        <span class="time">19 : 20 </span>
            </div>
             <div class="msg">
                 ${msg}
             </div>
        </div>
    `;

    document.querySelector('.chat-main').insertAdjacentHTML('beforeend', markup);
}

export const renderOwnMessage = (msg) => {

    const markup = `
        <div class="msg-container your-msg">
            <div class="msg-data">
                        <span class="sender">Lal Krishna</span>
                        <span class="time">19 : 20 </span>
            </div>
            <div class="msg">
                 ${msg}
            </div>
        </div>
    `;

    document.querySelector('.chat-main').insertAdjacentHTML('beforeend', markup);
}

export const renderGoBack = (msg, error) => {
    console.log("yes man");
    const markup = `
       <div class="back">
             <div class="alert ${(msg) ? "" : "success"}">
                 <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                 <strong>${(msg) ? 'Danger' : 'Success'}</strong> ${(msg) ? msg : 'User Found'}
            </div> 
            
            <i class="fa fa-arrow-circle-left backBtn" style=" font-size:50px;"></i> 
             
       </div>
    `;
    elements.searchRes.insertAdjacentHTML("beforeend", markup);
}

//  <p class="search-error">${(msg === undefined) ? '' : msg}</p>
            //  <i class="fa fa-arrow-circle-left backBtn" style=" font-size: 50px;"></i>