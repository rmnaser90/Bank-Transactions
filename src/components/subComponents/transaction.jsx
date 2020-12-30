import { Component } from 'react'
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'react-router-dom'

class Transaction extends Component {

    deleteTransaction = ()=>{
        const transactionId = this.props.transaction._id
        this.props.deleteTransaction(transactionId)
    }

    render() {
        const { transaction } = this.props
        const formatedDate = `${ new Date(transaction.date).toLocaleString()}`
        

        return <div className="transaction ">

            <div className="Date">{formatedDate}</div>
            <div className="vendor">{transaction.vendor}</div>
            <div className="category">{transaction.category}</div>
            <div className={`amount ${transaction.amount < 0? "red" : "green"} `}>{transaction.amount} ₪</div>
            <div className="deleteBtn" title="Delete transaction"> <FontAwesomeIcon icon={faTrashAlt} onClick={this.deleteTransaction}/></div>
        </div>
    }
}
export default Transaction