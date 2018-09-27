import React, {Component} from 'react'
import './alert.less'

class Alert extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show) {
            this.setState({
                show: true
            })
        }
    }
    
    handleConfirm = () => {
        this.setState({
            show: false
        })
    }

    handlePrevent = (event) => {
        event.preventDefault();
    }

    render() {
        const {info} = this.props;
        const {show} = this.state;
        const alertClass = show ? 'alert-wrap show' : 'alert-wrap';
        return (
            <div className={alertClass} onTouchMove={this.handlePrevent}>
                <div className="alert-content">
                    <p className="alert-info">{info}</p>
                    <p className="alert-confirm" onClick={() => {this.handleConfirm()}}>确认</p>
                </div>
            </div>
        )
    }
}

export default Alert