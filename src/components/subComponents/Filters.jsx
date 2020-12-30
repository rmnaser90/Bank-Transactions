import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBraille, faSync } from '@fortawesome/free-solid-svg-icons'
import '../style/filter.css'
import CheckBox from './Checkbox'

class Filters extends Component {
    constructor() {
        super()
        this.state = {
            dateInputs: {
                dateFrom: 0,
                dateTo: new Date()
            }
        }
    }

    resetFilters = () => {
        this.props.setDateFilters(0, Date.now())
        document.location.reload()
    }

    handleDateInput = (e) => {
        const { setDateFilters } = this.props
        const dateInputs = { ...this.state.dateInputs }
        const name = e.target.name
        const value = e.target.value
        dateInputs[name] = value
        this.setState({ dateInputs })
        const { dateFrom, dateTo } = dateInputs
        setDateFilters(Date.parse(dateFrom) - 9999999, Date.parse(dateTo) + 99999999)
    }

    render() {
        const { dateFrom, dateTo } = this.state.dateInputs
        const { categories, vendors, setFilters } = this.props
        const categoriesArr = []
        const vendorsArr = []
        for (const category in categories) {
            categoriesArr.push(category)
        }
        for (const vendor in vendors) {
            vendorsArr.push(vendor)
        }
        return <div className="filters">
            <h1 className="filterTitle">Filters</h1>
            <div className="resetFilters" onClick={this.resetFilters}><FontAwesomeIcon icon={faSync} />
            </div>
            <FontAwesomeIcon icon={faBraille} className="dotsIcon" />
            <div className="filtersContainer">
                <div className="dateFilters">
                    <h2 className="filterSubTitle">Filter Dates:</h2>
                    <div className="dateInputs">
                        <h3>From</h3>
                        <h3>To</h3>
                        <input type="date" placeholder="From" value={dateFrom} name="dateFrom" onChange={this.handleDateInput} />
                        <input type="date" placeholder="To" value={dateTo} name="dateTo" onChange={this.handleDateInput} />
                    </div>
                    <div className="categoryFilters">
                        <h2 className="filterSubTitle">Categories:</h2>
                        <div className="checkboxContainer">
                            {categoriesArr.map(c => <CheckBox key={c} property={"categories"} setFilters={setFilters} name={c} initial={categories[c]} />)}
                        </div>
                    </div>
                    <div className="vendorFilters">
                        <h2 className="filterSubTitle">vendors:</h2>
                        <div className="checkboxContainer">
                            {vendorsArr.map(v => <CheckBox key={v} property={"vendors"} setFilters={setFilters} name={v} initial={vendors[v]} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Filters