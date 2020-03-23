import React, {Component} from 'react'
import './Bar.css';

export default class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.size
        };
    }
    render() {
        return (
        <div className="bar" id={`Bar-${this.props.index}`}>
        {"a"}
        </div>
        );
    }
}