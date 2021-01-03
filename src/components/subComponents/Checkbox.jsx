import { Component } from 'react'

class CheckBox extends Component {

    handleInput = (e) => {
        const { property, name, setFilters } = this.props
        const checked = e.target.checked
        setFilters(property, name, checked)
        this.setState({ checked })
    }

    render() {
        const { name,initial } = this.props
        return <div className="CheckBox">
            <input type="checkbox" onChange={this.handleInput} checked={initial} className="checkBoxInput" />
            <h4>{name}</h4>
        </div>
    }
}
export default CheckBox