import { elements } from "../base.js";
import { renderUser } from "./searchView.js";

export const clearContact = () => { elements.searchRes.innerHTML = ''; }

export const renderContact = (list) => {
    list.forEach(element => {
        renderUser(element);
    });
} 