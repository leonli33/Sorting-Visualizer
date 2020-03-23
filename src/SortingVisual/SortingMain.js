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
// message to Grev: NO! I am a princess :)


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
            this.animateInsertionSort(insertionSort(elements));
            //elements = insertionSort(elements);
        } else if (algo === "Merge Sort") {
            this.animateMergeSort(mergeSort(elements));
           // elements = mergeSort(elements);
           // this.animateMergeSort();
        } else if (algo === "Quick Sort") {
            elements = quickSort(elements);
        } else if (algo === "Radix Sort") {
            this.animateRadixSort(radixSort(elements));
         //   elements = radixSort(elements);
        } else if (algo === "Shell Sort") {
            this.animateShellSort(shellSort(elements));
           // elements = shellSort(elements);
        }
        /*
        this.setState({
            elementsToSort: elements
        });
        */
        
    };

    animateMergeSort(animations) {
        let length = animations.length;
        let time = 0;
        for(let i = 0; i < length; i++) {
            let currentAnimation = animations[i];
            if(currentAnimation.end) {
                let mergeIndex = 0;
                for(let j = currentAnimation.startIndex; j < currentAnimation.endIndex; j++) {
                    let mergedArray = currentAnimation.mergedarray;
                    this.animateMerging(time,j,mergedArray[mergeIndex])
                    //    document.getElementById("Bar-" + j).style.height = mergedArray[mergeIndex] * 8 + "px";
                    mergeIndex++;
                    time++
                }
            } else {
                this.animateComparison(time, currentAnimation.indexOne, currentAnimation.indexTwo - 1);
            }
            time++;
        }

    }

    animateComparison(time, indexStart,indexEnd) {
        console.log(indexStart+"," + indexEnd)
        setTimeout(()=> {
            document.getElementById("Bar-" + indexStart).classList.add("comparedElement");
            document.getElementById("Bar-" + indexEnd).classList.add("comparedElement");
        }, time * 15);
        setTimeout(()=> {
            document.getElementById("Bar-" + indexStart).classList.remove("comparedElement");
            document.getElementById("Bar-" + indexEnd).classList.remove("comparedElement");
        }, (time * 15) + 20);
    }

    animateMerging(time,index,height) {
        setTimeout(()=> {
            document.getElementById("Bar-" + index).style.height = height * 8 + "px";
        }, time * 15);
    }

    animateRadixSort(animations) {
        console.log(animations);
        let length = animations.length;
        let currentArrayIndex = -1;
        for(let i = 0; i < length; i++) {
            let currentAnimation = animations[i];
            currentArrayIndex++;
            if(currentArrayIndex === this.state.numberOfElements) {
                currentArrayIndex = 0;
            }
            
            setTimeout(()=> {
                console.log(currentArrayIndex);
                document.getElementById("Bar-" + currentAnimation.index).classList.add("comparedElement");
            }, i * 10);
            setTimeout(()=> {
                document.getElementById("Bar-" + currentAnimation.index).classList.remove("comparedElement");
                document.getElementById("Bar-" + currentAnimation.index).style.height = currentAnimation.height * 8 + "px";
            }, (i * 10) + 50)

            currentArrayIndex = currentArrayIndex + 1;    
        }
    }

    animateShellSort(animations) {
        let length = animations.length;
        for(let i = 0;i < length; i++) {
            let currentAnimation = animations[i];
            setTimeout(() => {
                document.getElementById("Bar-" + currentAnimation.firstElement).classList.add("comparedElement");
              //  document.getElementById("Bar-" + currentAnimation.secondElement).classList.add("comparedElement");
            }, i * 10)

            setTimeout(() => {
                document.getElementById("Bar-" + currentAnimation.firstElement).classList.remove("comparedElement");
                document.getElementById("Bar-" + currentAnimation.firstElement).style.height = currentAnimation.secondElementHeight * 8 + "px";
            }, (i * 10) + 20)
        }
    }

    animateInsertionSort(animations) {
        let length = animations.length;
        for(let i = 0; i < length; i++) {
            let currentAnimation = animations[i];
            setTimeout(() => {
                document.getElementById("Bar-" + currentAnimation.firstElement).classList.add("comparedElement");
                document.getElementById("Bar-" + currentAnimation.secondElement).classList.add("comparedElement");
            }, i * 10)
            if(!currentAnimation.swap) {
                setTimeout(() => {
                    document.getElementById("Bar-" + currentAnimation.firstElement).classList.remove("comparedElement");
                    document.getElementById("Bar-" + currentAnimation.secondElement).classList.remove("comparedElement");
                }, (i * 10) + 50)
            } else {
                setTimeout(() => {
                    document.getElementById("Bar-" + currentAnimation.firstElement).classList.remove("comparedElement");
                    document.getElementById("Bar-" + currentAnimation.secondElement).classList.remove("comparedElement");
                    document.getElementById("Bar-" + currentAnimation.firstElement).style.height = currentAnimation.secondElementHeight * 8 + "px";
                    document.getElementById("Bar-" + currentAnimation.secondElement).style.height = currentAnimation.firstElementHeight * 8 + "px";
                }, (i * 10) + 50)
            }
        }

    }

    reset = () => {
        let elements = this.loadArray(50);
        this.setState({
            numberOfElements: 50,
            elementsToSort: elements,
            currentAlgo: "Merge Sort"
        });
    };

    render() {
        return (
            <div className="page">
                <div className="top-banner">
                    <h1 className="header">Sorting algorithm visualizer</h1>
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
                    <input type="range" min="2" max="100" className="slider" value={this.state.numberOfElements}
                           onChange={this.handleNumElementChange}/>
                    <label className="minorLabel">{this.state.numberOfElements}</label>
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
  