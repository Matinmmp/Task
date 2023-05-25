class Task {
    constructor(options = {}) {
        this._baseURL = options.baseURL || "";
        this._headers = options.headers || {}
    }


    async _fetchJSON(endpoint = "", options = {}) {
        try {
            const resualt = await fetch(this._baseURL + endpoint, {
                ...options,
                headers: this._headers
            });
            return await resualt.json();
        } catch (error) {
            console.log(error);
        }
    }

   async get(endpoint = "", options = {}) {
        return await this._fetchJSON(endpoint, {
            ...options,
            method: "GET"
        });
    }

   async post(endpoint = "", body, options = {}) {
        try {
            await this._fetchJSON(endpoint, {
                method: 'POST',
                ...options,
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.log(error);
        }
    }

   async delete(endpoint = '',options={}){
        try {
            await this._fetchJSON(endpoint,{
                method:'DELETE',
                ...options,
            })
        } catch (error) {
            console.log(error);
        }
    }

    async edit(endpoint = "", body, options = {}) {
        try {
            await this._fetchJSON(endpoint, {
                method: 'PUT',
                ...options,
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default Task;