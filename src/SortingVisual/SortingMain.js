import React, {Component} from 'react'
import './SortingMain.css';
import Bar from './Bar'
// message to Grev: Happy coding! YOU CAN DO IT 


export default class SortingMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAlgo: "Merge Sort",
            algorithms: [],
            elementsToSort: [],
            numberOfElements: 55
        }
    }

    // returns a random number between 0 and max
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // i am trying to update the width and height of bar being displayed based on how many
    // elements there are. This code is not functional. Feel free to change any of it or delete
    // it if there is a better way to do it :)
    componentDidUpdate() {
        let totalWidth = window.screen.width;
        let width = (totalWidth - (this.state.numberOfElements * 16))/this.state.numberOfElements;
        for(let i = 0; i < this.state.numberOfElements;i++) {
            let element = document.getElementById("Bar-" + i);
            element.style.height = this.state.elementsToSort[i] * 8 + "px";
            element.style.width = width + "px";
        }
    }

    handleNumElementChange = (event) => {
        // set the number of elements in the array to the value on slider
        this.setState({
            numberOfElements: event.target.value
        });
    }

    componentDidMount() {
        // initialize elements
        let algos = ["Merge Sort", "Quick Sort", "Insertion Sort", "Bubble Sort","Shell Sort",
                    "Tim Sort","Radix Sort","Tree Sort"];
        let elements =[];
        // initialize the array with 30 elements of random values
        for(let i = 0; i < this.state.numberOfElements; i++) {
            let num = this.getRandomInt(50);
            elements.push(num);
        }
        this.setState({
            algorithms: algos,
            elementsToSort: elements
        });
    }

    handleRandomizeClick = () => {
        // randomize elements
        let elements = [];
        for(let i = 0; i < this.state.numberOfElements; i++) {
            let num = this.getRandomInt(50);
            elements.push(num);
        }
        this.setState({
            elementsToSort: elements
        });
    }

    updateCurrentAlgo = (event) => {
        // set the current algo selected
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
                    <select className="dropDown" value={this.state.currentAlgo} onChange={this.updateCurrentAlgo}>
                        {this.state.algorithms.map(algorithms => (
                            <option key={algorithms} value={algorithms}>
                                {algorithms}
                            </option>
                        ))}
                    </select>
                    <label className="label">Number of Elements:</label>
                    <input type="range" min="0" max="100" className="slider" onChange={this.handleNumElementChange}></input>
                    <button className="button">Visualize Sorting</button>
                    <button className="button" onClick={this.handleRandomizeClick}>Randomize Elements</button>
                    <button className="button">Reset</button>
                    <label className="label">Control speed (implement slider bar here)</label>
                </div>
            </div>
        );
    }
}
  