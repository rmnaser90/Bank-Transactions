import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

class Snackbar extends Component {


    render() {
        const { msg, resetMsg } = this.props
        return <div className="snackBar" onAnimationEnd={resetMsg}>
            <div className="snackBarClose" onClick={resetMsg}><FontAwesomeIcon icon={faTimes}/> </div>
            <p className="snackBarMsg"> {msg}</p> 
          
            <Link to="/" className="snackBarBtn">Return</Link>
           


        </div>
    }
}
export default Snackbar