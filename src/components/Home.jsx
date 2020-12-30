import { Component } from 'react'
import Transaction from './subComponents/transaction'
// import { Link } from 'react-router-dom'
import './style/home.css'
import './style/homeMobile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faPlusCircle, faSync } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Filters from './subComponents/Filters'
class Home extends Component {
    constructor() {
        super()
        this.state = {
            categories: [""],
            vendors: [""]
        }
    }

    checkFilter = (transaction) => {
        const { categories, vendors } = this.state
        if (categories[0] === "" && vendors[0] === "") {
            return true
        }

        for (const category of categories) {
            if (transaction.category === category) {
                console.log(`${transaction.category}= ${category}`);
                return true
            }
        }
        for (const vendor of vendors) {
            if (transaction.vendor === vendor) {
                console.log(`${transaction.vendor}= ${vendor}`);
                return true
            }
        }
        return false

    }
    sortingIcon = (property) => {
        const { sorting } = this.props.state
        if (sorting.currentSorting === property) {
            if (sorting[property] > 0) {
                return <FontAwesomeIcon icon={faArrowUp} />
            } else {
                return <FontAwesomeIcon icon={faArrowDown} />
            }
        }
    }

    
    resetStringFilters = (checked) => {
        const { setFilters } = this.props
        const { categories, vendors } = this.props.state.stringFilters

        for (const category in categories) {
            setFilters("categories", category, checked)
        }
        for (const vendor in vendors) {
            setFilters("vendors", vendor, checked)
        }
        
    }
    resetFilters = () => {
        this.props.setDateFilters(0, Date.now())
        this.resetStringFilters(true)
        document.location.reload()
    }

    getTransactions = () => {
        const { filteredTransactions, stringFilters } = this.props.state
        const { categories, vendors } = stringFilters
        let withdrawels = 0
        let deposites = 0
        filteredTransactions.forEach(t => {
            if (categories[t.category] || vendors[t.vendor]) {

                if (t.amount > 0) {
                    deposites += t.amount
                } else {
                    withdrawels += t.amount
                }
            }
        })
        return { filteredTransactions, withdrawels, deposites }

    }

    render() {
        const { deleteTransaction, sort, setDateFilters, setFilters, state } = this.props
        const { balance, filteredTransactions, stringFilters } = state
        const { deposites, withdrawels } = this.getTransactions()
        const { categories, vendors } = stringFilters
        return <div className="home">
            <Filters setDateFilters={setDateFilters} categories={categories} vendors={vendors} setFilters={setFilters}/>
            <h1 className="title">Transactions</h1>
            <div className="transactionsContainer">
                <div className="accountStatus">
                    <div className="balanceContainer">
                        <span> Balance: </span>
                        <span className={`balance ${balance < 0 ? "redTxt" : "greenTxt"}`}> {balance} ₪</span>
                    </div>
                    <div className="balanceContainer Withdrawels">
                        <span> Withdrawels: </span>
                        <span className={`balance redTxt `}> {withdrawels} ₪</span>
                    </div>
                    <div className="balanceContainer">
                        <span> Deposits: </span>
                        <span className={`balance greenTxt`}> {deposites} ₪</span>
                    </div>
                </div>
                <div className="headers">
                    <div title="click to sort" className="property" onClick={() => sort("date")}>
                        Date  {this.sortingIcon("date")}
                    </div>
                    <div title="click to sort" className="property" onClick={() => sort("vendor")}>
                        Vendor  {this.sortingIcon("vendor")}
                    </div>
                    <div title="click to sort" className="property" onClick={() => sort("category")}>
                        Category  {this.sortingIcon("category")}
                    </div>
                    <div title="click to sort" className="property " onClick={() => sort("amount")}>
                        Amount  {this.sortingIcon("amount")}
                    </div>
                    <div className="tableBtns">
                        <Link to="/operation" className="newTransactionBtn" title="Add transaction">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </Link>
                        <FontAwesomeIcon icon={faSync} className="resetFiltersHome" onClick={this.resetFilters} />
                    </div>
                </div>
                <div className="filtertransactionsContainer">

                {!(filteredTransactions.length === 0) ?
                    filteredTransactions.map(t => (categories[t.category] || vendors[t.vendor]) && <Transaction key={t._id} transaction={t} deleteTransaction={deleteTransaction} />) :
                    <div className="nothingTOSshow"> No transactions to show</div>
                }
                </div>
            </div>
        </div>
    }
}
export default Home