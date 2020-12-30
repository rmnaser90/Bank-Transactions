import { Component } from 'react'

class CheckBox extends Component {
    constructor() {
        super()
        this.state = {
            checked: true,

        }
    }

    handleInput = (e) => {
        const { property, name, setFilters } = this.props
        const checked = e.target.checked
        this.setState({ checked })
        setFilters(property, name, checked)
    }
    componentDidMount = () => {
        this.setState({
            checked: this.props.initial
        })
    }
    render() {
        const { name } = this.props
        return <div className="CheckBox">
            <input type="checkbox" onChange={this.handleInput} checked={this.state.checked} className="checkBoxInput" />
            <h4>{name}</h4>
        </div>
    }
}
export default CheckBox