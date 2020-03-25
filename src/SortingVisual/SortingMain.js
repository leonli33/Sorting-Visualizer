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


let gridClear = true;

export default class SortingMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAlgo: "Merge Sort",
            algorithms: [],
            elementsToSort: [],
            numberOfElements: 50,
            sortSpeed: ["Slow","Regular","Fast"],
            sortSpeedSelected: "Regular",
            currentSpeed: 15
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
        let width = (numElements <= 26) ? 30 : (totalWidth / numElements) - margin - 10;
        if (numElements > 70) {
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
        gridClear = false;
        let currentSpeed = this.state.currentSpeed;
        let elements = this.state.elementsToSort;
        let algo = this.state.currentAlgo;
        this.disableElements();
        if (algo === "Bubble Sort") {
            elements = bubbleSort(elements);
        } else if (algo === "Bucket Sort") {
            elements = bucketSort(elements);
        } else if (algo === "Heap Sort") {
            elements = heapSort(elements);
        } else if (algo === "Insertion Sort") {
            this.animateInsertionSort(insertionSort(elements),currentSpeed);
        } else if (algo === "Merge Sort") {
            this.animateMergeSort(mergeSort(elements),currentSpeed);
        } else if (algo === "Quick Sort") {
            elements = quickSort(elements);
        } else if (algo === "Radix Sort") {
            this.animateRadixSort(radixSort(elements),currentSpeed);
        } else if (algo === "Shell Sort") {
            this.animateShellSort(shellSort(elements),currentSpeed);
        }
    };

    // animate the merge sort algorithm
    animateMergeSort(animations,currentSpeed) {
        let length = animations.length;
        // the index that the set timeout will be relative to
        let time = 0;
        for(let i = 0; i <= length; i++) {
            // if we have reached the end of the animations, display ending animation
            if(i === length) {
                setTimeout(() => {
                    this.animationDone();
                }, time * currentSpeed)
            } else {
                // get the current animation to be displayed
                let currentAnimation = animations[i];
                // if the animation's end property is true, we know that we need to animate a merge
                if(currentAnimation.end) {
                    let mergeIndex = 0;
                    // manipuate bars at index 'startIndex' to index 'endIndex
                    for(let j = currentAnimation.startIndex; j < currentAnimation.endIndex; j++) {
                        // get the merged array
                        let mergedArray = currentAnimation.mergedarray;
                        // animate the merged array
                        this.animateMerging(time,j,mergedArray[mergeIndex],currentSpeed,i);
                        // increment the time of setTimout
                        mergeIndex++;
                        time++
                    }
                } else {
                    // if we do not need to merge, we should only animate the two bars we are comparing
                    this.animateComparison(time, currentAnimation.indexOne, currentAnimation.indexTwo - 1, i,currentSpeed);
                }
                time++;
            }
        }
    }

    // animate a comparison between two bars in the array
    animateComparison(time, indexStart,indexEnd, indexInLoop,currentSpeed) {
        // if the index is even, we know that it is the first time we are seeing this animation,
        // thus only color the two bars in red
        if(indexInLoop % 2 === 0) {
            setTimeout(()=> {
                document.getElementById("Bar-" + indexStart).classList.add("comparedElement");
                document.getElementById("Bar-" + indexEnd).classList.add("comparedElement");
            }, time * currentSpeed);
        } else {
            // this is the second time we have seen the animation, so remove the color from bars
            setTimeout(()=> {
                document.getElementById("Bar-" + indexStart).classList.remove("comparedElement");
                document.getElementById("Bar-" + indexEnd).classList.remove("comparedElement");
            }, time * currentSpeed);
        }
    }

    // animate a merge between a set of bars in the array
    animateMerging(time,index,height,currentSpeed,indexInLoop) {
        // if the index is even, it is the first time we have encountered this merge
        // color all of the bars to merge in red
        if(indexInLoop % 2 == 0) {
            setTimeout(()=> {
                document.getElementById("Bar-" + index).classList.add("comparedElement");
            }, time * currentSpeed);
        } else {
            // if it is odd, it is the second time we have seen the animation, remove the color from the bar and
            // set it to the appropriate height
            setTimeout(()=> {
                document.getElementById("Bar-" + index).classList.remove("comparedElement");
                document.getElementById("Bar-" + index).style.height = height * 8 + "px";
            }, time * currentSpeed);
        }        
    }

    // animate the radix sort algorithm
    animateRadixSort(animations,currentSpeed) {
        // get the number of animations
        let length = animations.length;
        for(let i = 0; i <= length; i++) {
            // if we have reached the end of the animations, display the ending animation
            if(i === length) {
                setTimeout(() => {
                    this.animationDone();
                }, i * currentSpeed)
            } else {
                // get the current animation
                let currentAnimation = animations[i];
                // if it an even index, it is the first time we have seen the animation, color the bar in appopriately
                if(i % 2 === 0) {
                    setTimeout(()=> {
                        document.getElementById("Bar-" + currentAnimation.index).classList.add("comparedElement");
                    }, i * currentSpeed);
                } else {
                    // take color out of bar and set its height appropriately
                    setTimeout(()=> {
                        document.getElementById("Bar-" + currentAnimation.index).classList.remove("comparedElement");
                        document.getElementById("Bar-" + currentAnimation.index).style.height = currentAnimation.height * 8 + "px";
                    }, i * currentSpeed)
                }
            }
        }
    }

    // animate the shell sort algorithm
    animateShellSort(animations,currentSpeed) {
        let length = animations.length;
        for(let i = 0;i <= length; i++) {
            // if we have reached the end of the animations, display the ending animation
            if(i === length) {
                setTimeout(() => {
                    this.animationDone();
                }, i * currentSpeed)
            } else {
                let currentAnimation = animations[i];
                // if the index is even, it is the first time we have seen the animation, color in the 
                // bars being compared
                if(i % 2 == 0) {
                    setTimeout(() => {
                        document.getElementById("Bar-" + currentAnimation.firstElement).classList.add("comparedElement");
                        document.getElementById("Bar-" + currentAnimation.secondElement).classList.add("comparedElement");
                    }, i * currentSpeed)
                } else {
                    // take colors out of bars and set the height of bar appropriately
                    setTimeout(() => {
                        document.getElementById("Bar-" + currentAnimation.firstElement).classList.remove("comparedElement");
                        document.getElementById("Bar-" + currentAnimation.secondElement).classList.remove("comparedElement");
                        document.getElementById("Bar-" + currentAnimation.firstElement).style.height = currentAnimation.secondElementHeight * 8 + "px";
                    }, i * currentSpeed)
                }    
            }
        }
    }

    // animate the insertion sort algorithm
    animateInsertionSort(animations,currentSpeed) {
        let length = animations.length;
        for(let i = 0; i <= length; i++) {
            // if we have reached the end of the animations, display the ending animation
            if(i === length) {
                setTimeout(() => {
                    this.animationDone()
                }, i * currentSpeed)
            } else {
                let currentAnimation = animations[i];
                // if the index is even, it is the first time we have seen the animation, color in the 
                // bars being compared
                if(i % 2 === 0) {
                    setTimeout(() => {
                        document.getElementById("Bar-" + currentAnimation.firstElement).classList.add("comparedElement");
                        document.getElementById("Bar-" + currentAnimation.secondElement).classList.add("comparedElement");
                    }, i * currentSpeed);
                } 
                else {
                    if(!currentAnimation.swap) {
                        // if the bars have not been swapped, remove the color
                        setTimeout(() => {
                            document.getElementById("Bar-" + currentAnimation.firstElement).classList.remove("comparedElement");
                            document.getElementById("Bar-" + currentAnimation.secondElement).classList.remove("comparedElement");
                        }, (i * currentSpeed))
                    } else {
                        // if bars have been swapped, take colors out of bars and set the height of bars appropriately
                        setTimeout(() => {
                            document.getElementById("Bar-" + currentAnimation.firstElement).classList.remove("comparedElement");
                            document.getElementById("Bar-" + currentAnimation.secondElement).classList.remove("comparedElement");
                            document.getElementById("Bar-" + currentAnimation.firstElement).style.height = currentAnimation.secondElementHeight * 8 + "px";
                            document.getElementById("Bar-" + currentAnimation.secondElement).style.height = currentAnimation.firstElementHeight * 8 + "px";
                        }, (i * currentSpeed))
                    }
                }
            }
            
        }
    }

    // determines how fast the sorting algorithms are running
    updateSortSpeed = (event) => {
        // fast = 5, medium = 15, slow = 100
        let speed;
        if(event.target.value === "Slow") {
            speed = 100;
        } else if(event.target.value === "Regular") {
            speed = 15;
        } else {
            speed = 5;
        }
        this.setState({
            sortSpeedSelected: event.target.value,
            currentSpeed: speed
        });
    }

    // reset all elements to initial state
    reset = () => {
        let elements = this.loadArray(50);
        gridClear = true;
        this.setState({
            numberOfElements: 50,
            elementsToSort: elements,
            currentAlgo: "Merge Sort",
            sortSpeedSelected: "Regular",
            currentSpeed: 15

        });
    };

    // this animation happens when algorithms are done
    animationDone() {
        for(let i = 0; i <= this.state.numberOfElements; i++) {
            if(i < this.state.numberOfElements) {
                setTimeout(() => {
                    document.getElementById("Bar-" + i).classList.add("doneElement");
                },i * this.state.currentSpeed);
            } else {
                setTimeout(() => {
                    for(let j = 0; j < this.state.numberOfElements; j++) {
                        document.getElementById("Bar-" + j).classList.remove("doneElement");
                    }
                    this.enableElements();
                },(i * this.state.currentSpeed) + 1000);
            }
        }
    }

    // disable all elements for user interaction
    disableElements() {
        document.getElementById(`sliderNumElements`).setAttribute("disabled","disabled");
        document.getElementById(`buttonRandomize`).setAttribute("disabled","disabled");
        document.getElementById(`sliderAlgo`).setAttribute("disabled","disabled");
        document.getElementById(`sliderAlgoSpeed`).setAttribute("disabled","disabled");
        document.getElementById(`buttonVisualize`).setAttribute("disabled","disabled");
        document.getElementById(`buttonReset`).setAttribute("disabled","disabled");
    }

    // enable all elements for user interaction
    enableElements() {
        console.log("called!")
        document.getElementById(`sliderNumElements`).removeAttribute("disabled");
        document.getElementById(`buttonRandomize`).removeAttribute("disabled");
        document.getElementById(`sliderAlgo`).removeAttribute("disabled");
        document.getElementById(`sliderAlgoSpeed`).removeAttribute("disabled");
        document.getElementById(`buttonVisualize`).removeAttribute("disabled");
        document.getElementById(`buttonReset`).removeAttribute("disabled");
    }



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
                    <input id="sliderNumElements" type="range" min="2" max="96" className="slider" value={this.state.numberOfElements}
                           onChange={this.handleNumElementChange}/>
                    <label className="minorLabel">{this.state.numberOfElements}</label>
                    <button id="buttonRandomize" className="button" onClick={this.handleRandomizeClick}>Randomize Elements</button>
                    <label className="label">Sort with: </label>
                    <select id="sliderAlgo" className="dropDown" value={this.state.currentAlgo} onChange={this.updateCurrentAlgo}>
                        {this.state.algorithms.map(algorithms => (
                            <option key={algorithms} value={algorithms}>
                                {algorithms}
                            </option>
                        ))}
                    </select>
                    <label className="label">Sorting speed:</label>
                    <select id="sliderAlgoSpeed" className="dropDownSpeed" value={this.state.sortSpeedSelected} onChange={this.updateSortSpeed}>
                        {this.state.sortSpeed.map(element => (
                            <option key={element} value={element}>
                                {element}
                            </option>
                        ))}
                    </select>
                    <button id="buttonVisualize" className="button" onClick={this.sortElements}>VISUALIZE SORTING</button>
                    <button id="buttonReset" className="button" onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    }
}
  