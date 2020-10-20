export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getUser() {
        try {
            const res = await axios.get(
                `/users?email=${this.query}`
            )
            const user = {
                ...res.data,
                image_url: `/users/${res.data._id}/avatar`
            }
            console.log(user);
            this.user = user;
        } catch (e) {
            alert(e);
        }
    }
}