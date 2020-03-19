import React, {Component} from 'react'
import './SortingMain.css';
import Bar from './Bar'

export default class SortingMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAlgo: "Merge Sort",
            algorithms: [],
            elementsToSort: []
        }
    }

    // returns a random number between 0 and max
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    componentDidUpdate() {
        for(let i = 0; i < 30;i++) {
            let element = document.getElementById("Bar-" + i);
            element.style.height = this.state.elementsToSort[i] * 8 + "px";
        }
    }

    componentDidMount() {
        let algos = ["Merge Sort", "Quick Sort", "Insertion Sort", "Bubble Sort","Shell Sort",
                    "Tim Sort","Radix Sort","Tree Sort"];
        let elements =[];
        // initialize the array with 30 elements of random value
        for(let i = 0; i < 30; i++) {
            let num = this.getRandomInt(50) + 5;
            elements.push(num);
        }
        this.setState({
            algorithms: algos,
            elementsToSort: elements
        });
    }

    handleRandomizeClick = () => {
        let elements = [];
        for(let i = 0; i < 30; i++) {
            let num = this.getRandomInt(50) + 5;
            elements.push(num);
        }
        this.setState({
            elementsToSort: elements
        });
    }

    updateCurrentAlgo = (event) => {
        this.setState({
            currentAlgo: event.target.value
        })
    }

    render() {
        return (
            <div className="page">
                <div className="top-banner">
                    <h1 className="header">Sorting Visualized</h1>
                </div>
                <div className="bars">
                    {this.state.elementsToSort.map((n,index) => {
                        return (
                            <Bar
                            size={n}
                            key={index}
                            index={index}
                            >
                            </Bar>
                        )   
                    })}
                </div>
                <div className="footer">
                    <label className="label">Sort with: </label>
                    <select className="DropDown" value={this.state.currentAlgo} onChange={this.updateCurrentAlgo}>
                        {this.state.algorithms.map(algorithms => (
                            <option key={algorithms} value={algorithms}>
                                {algorithms}
                            </option>
                        ))}
                    </select>
                    <label className="label">Number of Elements: (implement slider bar here)</label>
                    <button className="button">Visualize Sorting</button>
                    <button className="button" onClick={this.handleRandomizeClick}>Randomize Elements</button>
                    <button className="button">Reset</button>
                    <label className="label">Control speed (implement slider bar here)</label>
                </div>
            </div>
        );
    }
}
  