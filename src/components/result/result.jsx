import React, {Component} from 'react'
import './result.less'

class Result extends Component {
    render() {
        return(
            <div className="result-wrap">
                <header className="result-title">后台数据</header>
                <ul>
                    {
                        this.props.data.length > 0 ?
                        this.props.data.map((k, i) => {
                            return (
                                <li className="result-users" key={i}>
                                    <p className="result-item">姓名：<span>{k.name}</span></p>
                                    <p className="result-item">电话：<span>{k.phone}</span></p>
                                    <p className="result-item">住址：<span>{k.address}</span></p>
                                    <p className="result-item">兴趣：<span>{k.interest}</span></p>
                                </li>
                            )
                        }) :
                        <li className="result-users">空</li>
                    }
                </ul>
            </div>
        )
    }
}

export default Result