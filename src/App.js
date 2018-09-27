import React, {Component} from 'react';
import './App.less';

//组件配置
import config from './config.json'

import Input from '@/components/input/input';
import List from '@/components/list/list';
import Result from '@/components/result/result';
import Alert from '@/components/alert/alert';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			values: {}, // 获取到的值
			errorInfo: {}, // 各组件错误信息
			data: [], // 统计数据
			clear: false // 是否清除数据标识
		}
	}

	// 获取值时无需更新
	shouldComponentUpdate(nextProps, nextState) {
		if(!nextState.isUpdate){
			return false
		} else {
			return true
		}
	}

	//获取组件值
	setVal = (type, val, error) => {
		let values = {...this.state.values};
		values[type] = error || val;
		this.setState({
			values: values,
			isUpdate: false
		});
	}

	//数据检查并提交
	handleSubmit = () => {
		let values = this.state.values;
		let errorInfo = {...this.state.errorInfo};
		// 获取每个组件errorInfo
		config.forEach(k => {
			errorInfo[k.error] = !values[k.type] || values[k.type] === true;
			this.setState({
				errorInfo: errorInfo,
				isUpdate: true
			});
		})
		// 检测是否全部正确
		let isAllTrue = config.every(k => {
			return errorInfo[k.error] === false;
		})
		if (isAllTrue) {
			let data = this.state.data;
			data.push(values);
			this.setState({
				values: {},
				errorInfo: {},
				data: data,
				clear: true,
				showAlert: true,
				alertInfo: '添加成功'
			});
		} else {
			this.setState({
				clear: false,
				showAlert: false
			})
		}
	}

	render() {
		const {errorInfo, clear, data, showAlert, alertInfo} = this.state;
		return (
			<div>
				<header className="form-title">信息录入</header>
				<div className="form-wrap">
					{
						config.map((k, i) => {
							if (k.components === 'input') {
								return (
									<Input inputType={k.inputType} type={k.type} label={k.label} placeholder={k.placeholder} value = {clear} setVal={this.setVal} error={errorInfo[k.error]} errorInfo={k.errorInfo} key={i} />
								)
							} else if(k.components === 'list') {
								return (
									<List setVal={this.setVal}  error={errorInfo[k.error]} errorInfo={k.errorInfo} text={clear} key={i} />
								)
							}
						})
					}
					<input className="form-btn" onClick={this.handleSubmit} type="button" value="提交" />
				</div>
				<Result data={data}/>
				<Alert show={showAlert} info={alertInfo}/>
			</div>
		);
	}
}

export default App;
