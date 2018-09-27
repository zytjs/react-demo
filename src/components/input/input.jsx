import React, { Component } from 'react';
import './input.less';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            errorState: false
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.error) {
            this.setState({
                errorState: true
            })
        }
        if(nextProps.value) {
            this.setState({
                value: ''
            })
        }
    }

    handleInput = (event) => {
        let value = event.target.value;
        let type = this.props.type;
        switch(type) {
            case 'phone' :
                this.setState({
                    value: value.slice(0, 11),
                    errorState: !/^1[0-9]{10}$/.test(value.slice(0, 11))
                }, () => {
                    this.props.setVal(type, value, this.state.errorState) //需要校验的数据额外处理
                });
            break;
            default:
                this.setState({
                    value: value,
                    errorState: !value
                })
                this.props.setVal(type, value);
        }
    }

    render() {
        const {label, placeholder, errorInfo, inputType} = this.props;
        const {value, errorState} = this.state;

        let isError = errorState;

        return (
            <div className={isError ? 'error' : ''}>
                <div className="form-item">
                    <span className="form-span">{ label }</span>
                    <input className="form-input" value={value} onChange={this.handleInput} placeholder={ placeholder } type={inputType}/>
                </div>
                <i className="form-info">{isError ? errorInfo : ''}</i>
            </div>
        )
    }
}

export default Input;