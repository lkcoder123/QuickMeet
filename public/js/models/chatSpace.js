export default class chatSpace {
    constructor(query) {
        this.query = query;
    }

    async getOnlineData() {

        try {
            const res = await axios.get(`/users/${this.query}/online`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`
                    }
                }
            );

            const data = res.data;
            this.online = data.online;
            this.lastSeen = data.lastSeen;

        } catch (e) {
            console.log(e);
        }
    }

}