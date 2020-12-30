const axios = require('axios')

class ApiManager {
    constructor() {
        this.url = '/'
    }
    async getTransactions() {
        return await axios.get(`${this.url}/transactions`)
    }
    async postTransaction(transaction) {
        return await axios.post(`${this.url}/transaction`, transaction)
    }
    async deleteTransaction(transactionId) {
        return await axios.put(`${this.url}/transaction/${transactionId}`)
    }
}
export default ApiManager