import { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home';
import Operation from './components/Operation';
import ApiManager from './utilities/ApiManager'
const apiManager = new ApiManager()

class App extends Component {
  constructor() {
    super()
    this.state = {
      sorting: {
        amount: 1,
        vendor: 1,
        category: 1,
        date: -1,
        currentSorting: ""
      }, filters: {
        dateFrom: 0,
        dateTo: Date.now()

      },
      transactions: [],
      filteredTransactions: [],
      stringFilters: { categories: {}, vendors: {} },
      balance: 0
    }
  }


  updateTransactions = async () => {
    const transactions = await apiManager.getTransactions()
    let balance = 0
    const stringFilters = { categories: {}, vendors: {} }
    transactions.data.forEach(t => {
      balance += t.amount
      stringFilters.categories[t.category] = true
      stringFilters.vendors[t.vendor] = true
    })
    const filteredTransactions = transactions.data
    this.setState({ transactions: transactions.data, balance, filteredTransactions, stringFilters })
  }

  deleteTransaction = async (transactionId) => {

    if (window.confirm("are you sure you want to delete this transaction?")) {

      await apiManager.deleteTransaction(transactionId)
      await this.updateTransactions()
    }

  }

  postTransaction = async (transaction) => {
    await apiManager.postTransaction(transaction)
    await this.updateTransactions()
    const sorting = {
      amount: 1,
      vendor: 1,
      category: 1,
      date: -1,
      currentSorting: ""
    }
    this.setState({ sorting }, () => this.sort("date"))
  }
  setFilters = (property, name, checked) => {
    const stringFilters = { ...this.state.stringFilters }
    stringFilters[property][name] = checked
    this.setState({ stringFilters })
  }

  filterDates = () => {
    const { transactions, filters } = this.state
    const filteredTransactions = transactions.filter(t => Date.parse(t.date) >= filters.dateFrom && Date.parse(t.date) <= filters.dateTo)
    this.setState({
      filteredTransactions
    })
  }

  setDateFilters = (dateFrom, dateTo) => {
    const filters = { ...this.state.filters }
    filters.dateFrom = dateFrom
    filters.dateTo = dateTo
    this.setState({ filters }, this.filterDates)
  }

  sort = (property) => {
    const filteredTransactions = [...this.state.filteredTransactions]
    const { sorting } = this.state
    filteredTransactions.sort(function (a, b) {
      const nameA = property === "amount" ? Math.abs(a[property]) : property === "date" ? Date.parse(a[property]) : a[property].toLowerCase()
      const nameB = property === "amount" ? Math.abs(b[property]) : property === "date" ? Date.parse(b[property]) : b[property].toLowerCase()
      if (nameA > nameB) {
        return 1 * sorting[property]
      }
      if (nameA < nameB) {
        return -1 * sorting[property]
      }
      return 0
    })
    sorting[property] = sorting[property] * -1
    sorting.currentSorting = property
    this.setState({
      filteredTransactions, sorting
    })
  }

  componentDidMount = async () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    console.log(vh);
    window.document.getElementsByClassName('filters')[0].style.top = 0.95 * vh
    window.document.getElementsByTagName('body')[0].style.width = vw
    window.addEventListener('resize', () => {
      const vhh = window.innerHeight;
      const vw = window.innerWidth;
      window.document.getElementsByClassName('filters')[0].style.top = 0.95 * vhh
      window.document.getElementsByTagName('body')[0].style.width = vw
      console.log(vw, vhh);
    })
    await this.updateTransactions()
    this.sort("date")
  }

  render() {
    const { deleteTransaction, postTransaction } = this

    return <Router>

      <Route path="/" exact render={() => <Home
        state={this.state} setFilters={this.setFilters}
        setDateFilters={this.setDateFilters}
        sort={this.sort}
        deleteTransaction={deleteTransaction} />} />

      <Route path="/operation" exact render={() => <Operation
        postTransaction={postTransaction}
        state={this.state} />} />

    </Router>
  }
}

export default App;
