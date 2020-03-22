import React, {Component} from 'react'
import './SortingMain.css';
import Bar from './Bar';
import {bubbleSort} from '../Algorithms/BubbleSort';
import {bucketSort} from '../Algorithms/BucketSort';
import {heapSort} from '../Algorithms/HeapSort';
import {insertionSort} from '../Algorithms/InsertionSort';
import {mergeSort} from '../Algorithms/MergeSort';
import {quickSort} from '../Algorithms/QuickSort';
import {radixSort} from '../Algorithms/RadixSort';
import {shellSort} from '../Algorithms/ShellSort';

// message to Grev: Happy coding! YOU CAN DO IT
// message to Leon: You're a QUEEN!


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

    // returns a random number between 1 and max, inclusive
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max) + 1);
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
        let elements = this.loadArray(this.state.numberOfElements);
        this.setState({
            algorithms: algos,
            elementsToSort: elements
        });
    };

    // randomizes the values of the bars (elements to be sorted)
    handleRandomizeClick = () => {
        // randomize elements
        let elements = this.loadArray(this.state.numberOfElements);
        this.setState({
            elementsToSort: elements
        });
    };

    // initialize values of bars (elements to be sorted) to the given number of random values
    loadArray = (numBars) => {
        let elements = [];
        for(let i = 0; i < numBars; i++) {
            let num = this.getRandomInt(50);
            elements.push(num);
        }
        return elements;
    };

    // changes the number of elements to be sorted
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

    // updates the selected sorting algorithm
    updateCurrentAlgo = (event) => {
        // set the current algo selected
        this.setState({
            currentAlgo: event.target.value
        });
    };

    // sorts the elements using the current selected algorithm
    // (NOT ANIMATED)
    // this is probably not the most efficient way to do it, so please make it better if you know how to!
    // also heapSort doesn't work, i need to fix that :/
    sortElements = () => {
        let elements = this.state.elementsToSort;
        let algo = this.state.currentAlgo;
        if (algo === "Bubble Sort") {
            elements = bubbleSort(elements);
        } else if (algo === "Bucket Sort") {
            elements = bucketSort(elements);
        } else if (algo === "Heap Sort") {
            elements = heapSort(elements);
        } else if (algo === "Insertion Sort") {
            elements = insertionSort(elements);
        } else if (algo === "Merge Sort") {
            elements = mergeSort(elements);
        } else if (algo === "Quick Sort") {
            elements = quickSort(elements);
        } else if (algo === "Radix Sort") {
            elements = radixSort(elements);
        } else if (algo === "Shell Sort") {
            elements = shellSort(elements);
        }
        this.setState({
            elementsToSort: elements
        });
    };

    reset = () => {
        let elements = this.loadArray(50);
        this.setState({
            numberOfElements: 50,
            elementsToSort: elements
        });
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
                    <label className="label">Number of elements:</label>
                    <input type="range" min="2" max="100" className="slider" onChange={this.handleNumElementChange}/>
                    <button className="button" onClick={this.handleRandomizeClick}>Randomize Elements</button>
                    <label className="label">Sort with: </label>
                    <select className="dropDown" value={this.state.currentAlgo} onChange={this.updateCurrentAlgo}>
                        {this.state.algorithms.map(algorithms => (
                            <option key={algorithms} value={algorithms}>
                                {algorithms}
                            </option>
                        ))}
                    </select>
                    <label className="label">Sorting speed:</label>
                    <input type="range" min="1" max="100" className="slider"/>
                    <button className="button" onClick={this.sortElements}>VISUALIZE SORTING</button>
                    <button className="button" onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    }
}
  