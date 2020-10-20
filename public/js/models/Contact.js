export default class Contact {
    constructor() {
    }

    async getList() {

        try {
            const list = await axios.get("/users/contacts", {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            }
            )
            this.list = list.data;
            localStorage.setItem("contact", JSON.stringify(list.data));
        } catch (e) {
            console.log(e);
        }
    }
}