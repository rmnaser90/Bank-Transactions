import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component } from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import './style/operation.css'
import Snackbar from './subComponents/Snackbar'
class Operation extends Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            vendor: "",
            category: "",
            date: Date.now(),
            errorMessage: "",
        }
        this.timer = {}
    }

    handleInput = (e) => {
        const state = { ...this.state }
        const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value
        const name = e.target.name
        state[name] = value
        this.setState(state)
    }

    emptyInput = () => {
        this.setState({
            amount: 0,
            vendor: "",
            category: "",
            date: Date.now()
        })
    }

    resetMsg = () => {

        this.setState({
            errorMessage: ""
        })
    }

    showMsg = (message) => {
        this.setState({
            errorMessage: ""
        }, () => {

            this.setState({
                errorMessage: message
            })
        })
    }

    transaction = async (type) => {
        const { amount, vendor, category, date} = this.state
        const { balance } = this.props.state
        if (amount && vendor && category) {
            await this.props.postTransaction({
                amount: amount * type,
                vendor,
                category,
                date
            })
            this.showMsg(`Transaction was successfuly added, your current balance is ${balance + amount * type}`)
            this.emptyInput()
        } else {
            let missingInput = ""
            if (!amount) {
                missingInput += " Amount,"
            }
            if (!vendor) {
                missingInput += " Vendor,"
            }
            if (!category) {
                missingInput += " Category,"
            }
            this.showMsg(`${missingInput} are missing!`)
        }
    }

    withdraw = () => {
        const { balance } = this.props.state
        if ((balance - this.state.amount) > -500) {
            this.transaction(-1)
        } else {
            this.showMsg("insufficant funds, you've reached your limit of -500 ₪")
        }
    }

    deposit = () => {
        this.transaction(1)
    }

    render() {
        const { errorMessage } = this.state
        return <div className="operation">
            {errorMessage && <Snackbar resetMsg={this.resetMsg} msg={errorMessage} />}
            <Link to="/" className="backButton"><FontAwesomeIcon icon={faArrowLeft} /></Link>
            <h1 className="title">Operations</h1>
            <div className="form">
                <input onChange={this.handleInput} placeholder="Category" type="text" className="categoryInput" name="category" value={this.state.category} />
                <input onChange={this.handleInput} placeholder="Vendor" type="text" className="vendorInput" name="vendor" value={this.state.vendor} />
                <input onChange={this.handleInput} placeholder="Amount" type="number" className="amountInput" name="amount" value={this.state.amount} />
                <input onChange={this.handleInput} placeholder="Date" type="date" className="dateInput" name="date" value={this.state.date} />
                <div className="btnContainer">
                    <div className="btn" onClick={this.withdraw}>Withdraw</div>
                    <div className="btn" onClick={this.deposit}>Deposit</div>
                </div>
            </div>
        </div>
    }
}
export default Operation