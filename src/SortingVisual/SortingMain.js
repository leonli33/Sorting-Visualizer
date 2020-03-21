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
            numberOfElements: 50
        }
    };

    // returns a random number between 0 and max
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max + 1));
    };

    // updates width, height, and margin of bars depending on how many there are
    componentDidUpdate = () => {
        // width of screen
        let numElements = this.state.numberOfElements;
        let totalWidth = window.screen.width;
        // calculate margin between bars
        let margin = (numElements <= 40) ? 8 : 5;
        // calculate width of one bar
        let width = (numElements <= 30) ? 30 : (totalWidth / numElements) - margin - 10;
        if (numElements > 80) {
            width = 3;
        }
        // update bars
        for (let i = 0; i < numElements; i++) {
            let element = document.getElementById("Bar-" + i);
            element.style.height = this.state.elementsToSort[i] * 8 + "px";
            element.style.width = width + "px";
            element.style.margin = margin + "px";
        }
    };

    componentDidMount() {
        // initialize elements
        let algos = ["Merge Sort", "Quick Sort", "Insertion Sort", "Bubble Sort","Shell Sort",
                    "Heap Sort","Radix Sort","Bucket Sort"];
        let elements =[];
        // initialize the array with 50 elements of random values
        for(let i = 0; i < this.state.numberOfElements; i++) {
            let num = this.getRandomInt(50);
            elements.push(num);
        }
        this.setState({
            algorithms: algos,
            elementsToSort: elements
        });
    };

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
    };

    handleNumElementChange = (event) => {
        // set the number of elements in the array to the value on slider
        let numElements = event.target.value;
        let newElementsToSort = [];
        for (let i = 0; i < numElements; i++) {
            newElementsToSort.push(this.getRandomInt(50));
        }
        this.setState({
            numberOfElements: numElements,
            elementsToSort: newElementsToSort
        });
    };

    updateCurrentAlgo = (event) => {
        // set the current algo selected
        this.setState({
            currentAlgo: event.target.value
        })
    };

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
                    <label className="label">Number of elements:</label>
                    <input type="range" min="2" max="100" className="slider" onChange={this.handleNumElementChange}/>
                    <button className="button">Visualize Sorting</button>
                    <button className="button" onClick={this.handleRandomizeClick}>Randomize Elements</button>
                    <button className="button">Reset</button>
                    <label className="label">Control speed:</label>
                    <input type="range" min="2" max="100" className="slider"/>
                </div>
            </div>
        );
    }
}
  