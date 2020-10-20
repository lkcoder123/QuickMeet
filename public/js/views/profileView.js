import { elements } from "../base.js";

export const clearSection = () => { elements.profileSection.innerHTML = ""; }

export const renderProfile = (user) => {
    const markup = `
        <div class="image-section">
            <img src="${user.image_url}" onerror=this.src="img/man.png" alt="Avatar">
        </div>

        <div class="detail-section">
                <h4><b>${user.username}</b></h4>
        </div>
        <div class="contact-section">
                <a href="#"><img src="./img/facebook.png" alt=""></a>
                <a href="#"><img src="./img/twitter.png" alt=""></a>
                <a href="#"><img src="./img/linkedin.png" alt=""></a>
                <a href="#"><img src="./img/instagram-sketched.png" alt=""></a>
        </div>
        <button class="btn btn-profile">
                view profile
        </button>
    `;

    elements.profileSection.insertAdjacentHTML("afterbegin", markup);
} 