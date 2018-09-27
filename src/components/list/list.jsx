import React, { Component } from 'react';
import './list.less'

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: ['运动', '读书','爬山','旅游', '户外运动', '读书','爬山','旅游', '运动', '读书','爬山','旅游', '运动', '读书','爬山','旅游'],
            indexs: [],
            text: '请选择',
            isChooseShow: false,
            errorState: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.error) {
            this.setState({
                errorState: true
            })
        }
        if(nextProps.text){
            this.setState({
                text: '请选择',
                indexs: []
            })
        }
    }

    handleClick = (i) => {
        let indexs = this.state.indexs;
        let index = indexs.indexOf(i);
        index > -1 ? indexs.splice(index, 1) : indexs.push(i);
        this.setState({indexs})
    }

    handleChoose = () => {
        this.setState({
            isChooseShow: true
        })
    }

    handleConfirm = () => {
        let result = [];
        this.state.indexs.forEach(k => {
            result.push(this.state.items[k]);
        })
        let text = result.join(',');
        this.setState({
            text: text,
            isChooseShow: false,
            errorState: false
        });
        this.props.setVal('interest', text);
    }

    handlePrevent = (event) => {
        event.preventDefault();
    }
    
    render() {
        const {errorInfo} = this.props;
        const {items, indexs, text, isChooseShow, errorState} = this.state;

        const ulClass = isChooseShow ? 'form-ul' : 'form-ul none';
        const confirmClass = indexs.length > 0 ? 'form-confirm' : 'form-confirm disabled';
        const chooseClass = indexs.length > 0 ? 'form-choose selected' : 'form-choose';

        return (
            <div className={errorState ? 'error' : ''}>
                <div className="form-interest">
                    <span className="form-span">兴趣爱好：</span>
                    <span className={chooseClass} onClick={() => {this.handleChoose()}}>{text}</span>
                    <div className={ulClass} onTouchMove={this.handlePrevent}>
                        <ul className="clear">
                            {
                                items.map( (k, i) => {
                                    return (
                                        <li className={indexs.indexOf(i) > -1 ? 'li active' : 'li'} onClick={() => {this.handleClick(i)}} key={i}>{k}</li>
                                    )
                                })
                            }
                        </ul>
                        <input className={confirmClass} disabled={indexs.length > 0 ? '' : '1'} onClick={() => {this.handleConfirm()}} type="button" value="确认"/>
                    </div>
                </div>
                <i className="form-info">{errorInfo}</i>
            </div>
        )
    }
}

export default List;