import React, { Component } from "react";
import "./SortingMain.css";
import Bar from "./Bar";
import { bubbleSort } from "../Algorithms/BubbleSort";
import { bucketSort } from "../Algorithms/BucketSort";
import { heapSort } from "../Algorithms/HeapSort";
import { insertionSort } from "../Algorithms/InsertionSort";
import { mergeSort } from "../Algorithms/MergeSort";
import { quickSort } from "../Algorithms/QuickSort";
import { radixSort } from "../Algorithms/RadixSort";
import { shellSort } from "../Algorithms/ShellSort";

export default class SortingMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlgo: "Merge Sort",
      algorithms: [],
      elementsToSort: [],
      elementsToSortSizes: [],
      numberOfElements: 50,
      sortSpeed: ["Slow", "Regular", "Fast"],
      sortSpeedSelected: "Regular",
      currentSpeed: 25,
      gridBeingUsed: false,
    };
  }

  // returns a random number between 1 and max, inclusive
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
  }

  // updates width, height, and margin of bars depending on how many there are
  componentDidUpdate = () => {
    // width of screen
    let numElements = this.state.numberOfElements;
    let totalWidth = window.screen.width;
    // calculate margin between bars
    let margin = numElements <= 40 ? 8 : 5;
    // calculate width of one bar
    let width = numElements <= 26 ? 30 : totalWidth / numElements - margin - 10;
    if (numElements > 70) {
      width = 3;
    }
    // update bars
    for (let i = 0; i < numElements; i++) {
      let element = document.getElementById("Bar-" + i);
      element.style.height = this.state.elementsToSort[i].size * 8 + "px";
      element.style.width = width + "px";
      element.style.margin = margin + "px";
    }
  };

  componentDidMount() {
    // initialize elements
    let algos = [
      "Merge Sort",
      "Quick Sort",
      "Insertion Sort",
      "Bubble Sort",
      "Shell Sort",
      "Heap Sort",
      "Radix Sort",
      "Bucket Sort",
    ];
    let bars = this.loadArray(this.state.numberOfElements);
    this.setState({
      algorithms: algos,
      elementsToSort: bars.elementObjects,
      elementsToSortSizes: bars.elementSize,
    });
  }

  // randomizes the values of the bars (elements to be sorted)
  handleRandomizeClick = () => {
    // randomize elements
    let elements = this.loadArray();
    this.setState({
      elementsToSortSizes: elements.elementSize,
      elementsToSort: elements.elementObjects,
    });
  };

  // initialize values of bars (elements to be sorted) to the given number of random values
  loadArray = (num) => {
    let elementObjects = [];
    let elementSizes = [];
    let size = num ? num : this.state.numberOfElements;
    for (let i = 0; i < size; i++) {
      let num = this.getRandomInt(50);
      elementSizes.push(num);
      elementObjects.push(this.createBar(num));
    }
    return { elementObjects: elementObjects, elementSize: elementSizes };
  };

  createBar = (size) => {
    return {
      size: size,
      isDoneBeingSorted: false,
      isBeingCompared: false,
      isCurrentlyInCorrectOrder: false,
    };
  };

  // changes the number of elements to be sorted
  handleNumElementChange = (event) => {
    // set the number of elements in the array to the value on slider
    let numElements = event.target.value;
    let newElementsToSortSizes = [];
    let newElementsToSortBars = [];
    for (let i = 0; i < numElements; i++) {
      let num = this.getRandomInt(50);
      newElementsToSortSizes.push(num);
      newElementsToSortBars.push(this.createBar(num));
    }
    this.setState({
      numberOfElements: numElements,
      elementsToSort: newElementsToSortBars,
      elementsToSortSizes: newElementsToSortSizes,
    });
  };

  // updates the selected sorting algorithm
  updateCurrentAlgo = (event) => {
    // set the current algo selected
    this.setState({
      currentAlgo: event.target.value,
    });
  };

  setBarBeingCompared = (index) => {
    let currentElements = this.state.elementsToSort.slice();
    currentElements[index].isBeingCompared = true;
    this.setState({
      elementsToSort: currentElements,
    });
  };

  setBarNotBeingCompared = (index) => {
    let currentElements = this.state.elementsToSort.slice();
    currentElements[index].isBeingCompared = false;
    this.setState({
      elementsToSort: currentElements,
    });
  };

  changeBarSize = (index, size) => {
    let currentElements = this.state.elementsToSort.slice();
    currentElements[index].size = size;
    this.setState({
      elementsToSort: currentElements,
    });
  };

  // sorts the elements using the current selected algorithm
  sortElements = () => {
    this.setState({
      gridBeingUsed: true,
    });
    let currentSpeed = this.state.currentSpeed;
    let elements = this.state.elementsToSortSizes;
    let algo = this.state.currentAlgo;
    if (algo === "Bubble Sort") {
      this.animateBubbleSort(bubbleSort(elements), currentSpeed);
    } else if (algo === "Bucket Sort") {
      this.animateBucketSort(bucketSort(elements), currentSpeed);
    } else if (algo === "Heap Sort") {
      this.animateHeapSort(heapSort(elements), currentSpeed);
    } else if (algo === "Insertion Sort") {
      this.animateInsertionSort(insertionSort(elements), currentSpeed);
    } else if (algo === "Merge Sort") {
      this.animateMergeSort(mergeSort(elements), currentSpeed);
    } else if (algo === "Quick Sort") {
      this.animateQuickSort(quickSort(elements), currentSpeed);
    } else if (algo === "Radix Sort") {
      this.animateRadixSort(radixSort(elements), currentSpeed);
    } else if (algo === "Shell Sort") {
      this.animateShellSort(shellSort(elements), currentSpeed);
    }
  };

  // animate the merge sort algorithm
  animateMergeSort(animations, currentSpeed) {
    let length = animations.length;
    // the index that the set timeout will be relative to
    for (let i = 0; i <= length; i++) {
      // if we have reached the end of the animations, display ending animation
      if (i === length) {
        setTimeout(() => {
          this.animationDone();
        }, i * currentSpeed);
      } else {
        let currentAnimation = animations[i];
        // if we do not need to merge, we should only animate the two bars we are comparing
        if (i % 3 === 0) {
          setTimeout(() => {
            this.setBarBeingCompared(currentAnimation.indexOne);
            this.setBarBeingCompared(currentAnimation.indexTwo);
          }, i * currentSpeed);
        } else if (i % 3 == 1) {
          // this is the second time we have seen the animation, so remove the color from bars
          setTimeout(() => {
            this.setBarNotBeingCompared(currentAnimation.indexOne);
            this.setBarNotBeingCompared(currentAnimation.indexTwo);
          }, i * currentSpeed);
        } else {
          setTimeout(() => {
            this.changeBarSize(
              currentAnimation.indexSwap,
              currentAnimation.value
            );
          }, i * currentSpeed);
        }
      }
    }
  }

  // animate the radix sort algorithm
  animateRadixSort(animations, currentSpeed) {
    // get the number of animations
    let length = animations.length;
    for (let i = 0; i <= length; i++) {
      // if we have reached the end of the animations, display the ending animation
      if (i === length) {
        setTimeout(() => {
          this.animationDone();
        }, i * currentSpeed);
      } else {
        // get the current animation
        let currentAnimation = animations[i];
        // if it an even index, it is the first time we have seen the animation, color the bar in appopriately
        if (i % 2 === 0) {
          setTimeout(() => {
            this.setBarBeingCompared(currentAnimation.index);
          }, i * currentSpeed);
        } else {
          // take color out of bar and set its height appropriately
          setTimeout(() => {
            this.setBarNotBeingCompared(currentAnimation.index);
            this.changeBarSize(currentAnimation.index, currentAnimation.height);
          }, i * currentSpeed);
        }
      }
    }
  }

  // animate the shell sort algorithm
  animateShellSort(animations, currentSpeed) {
    let length = animations.length;
    for (let i = 0; i <= length; i++) {
      // if we have reached the end of the animations, display the ending animation
      if (i === length) {
        setTimeout(() => {
          this.animationDone();
        }, i * currentSpeed);
      } else {
        let currentAnimation = animations[i];
        // if the index is even, it is the first time we have seen the animation, color in the
        // bars being compared
        if (i % 2 === 0) {
          setTimeout(() => {
            this.setBarBeingCompared(currentAnimation.firstElement);
            this.setBarBeingCompared(currentAnimation.secondElement);
          }, i * currentSpeed);
        } else {
          // take colors out of bars and set the height of bar appropriately
          setTimeout(() => {
            this.setBarNotBeingCompared(currentAnimation.firstElement);
            this.setBarNotBeingCompared(currentAnimation.secondElement);
            this.changeBarSize(
              currentAnimation.firstElement,
              currentAnimation.secondElementHeight
            );
          }, i * currentSpeed);
        }
      }
    }
  }

  // animate the insertion sort algorithm
  animateInsertionSort(animations, currentSpeed) {
    let length = animations.length;
    for (let i = 0; i <= length; i++) {
      // if we have reached the end of the animations, display the ending animation
      if (i === length) {
        setTimeout(() => {
          this.animationDone();
        }, i * currentSpeed);
      } else {
        let currentAnimation = animations[i];
        // if the index is even, it is the first time we have seen the animation, color in the
        // bars being compared
        if (i % 2 === 0) {
          setTimeout(() => {
            this.setBarBeingCompared(currentAnimation.firstElement);
            this.setBarBeingCompared(currentAnimation.secondElement);
          }, i * currentSpeed);
        } else {
          if (!currentAnimation.swap) {
            // if the bars have not been swapped, remove the color
            setTimeout(() => {
              this.setBarNotBeingCompared(currentAnimation.firstElement);
              this.setBarNotBeingCompared(currentAnimation.secondElement);
            }, i * currentSpeed);
          } else {
            // if bars have been swapped, take colors out of bars and set the height of bars appropriately
            setTimeout(() => {
              this.setBarNotBeingCompared(currentAnimation.firstElement);
              this.setBarNotBeingCompared(currentAnimation.secondElement);
              this.changeBarSize(
                currentAnimation.firstElement,
                currentAnimation.secondElementHeight
              );
              this.changeBarSize(
                currentAnimation.secondElement,
                currentAnimation.firstElementHeight
              );
            }, i * currentSpeed);
          }
        }
      }
    }
  }

  // animate the bubble sort algorithm
  animateBubbleSort(animations, currentSpeed) {
    let length = animations.length;
    for (let i = 0; i <= length; i++) {
      // display ending animation
      if (i === length) {
        setTimeout(() => {
          this.animationDone();
        }, i * currentSpeed);
      } else {
        let current = animations[i];
        // add color to the two bars being compared
        setTimeout(() => {
          this.setBarBeingCompared(current.first);
          this.setBarBeingCompared(current.second);
        }, i * currentSpeed);
        if (!current.swap) {
          // if they are not swapped, remove color
          setTimeout(() => {
            this.setBarNotBeingCompared(current.first);
            this.setBarNotBeingCompared(current.second);
          }, (i + 1) * currentSpeed);
        } else {
          // if they are swapped, remove color and swap their heights
          setTimeout(() => {
            this.setBarNotBeingCompared(current.first);
            this.setBarNotBeingCompared(current.second);
            this.changeBarSize(current.first, current.secondHeight);
            this.changeBarSize(current.second, current.firstHeight);
          }, (i + 1) * currentSpeed);
        }
      }
    }
  }

  // animate the bucket sort algorithm
  animateBucketSort(animations, currentSpeed) {
    // the original array
    let original = animations[0];
    // the array after being grouped into buckets
    let grouped = animations[1];
    // iterate through the original array
    for (let j = 0; j < original.length; j++) {
      setTimeout(() => {
        this.setBarBeingCompared(j);
      }, j * currentSpeed);
      setTimeout(() => {
        this.setBarNotBeingCompared(j);
      }, (j + 1) * currentSpeed);
    }
    // group the array into buckets
    setTimeout(() => {
      for (let j = 0; j < grouped.length; j++) {
        // add color
        setTimeout(() => {
          this.setBarBeingCompared(j);
        }, j * currentSpeed);
        // remove color and change height
        setTimeout(() => {
          this.setBarNotBeingCompared(j);
          this.changeBarSize(j, grouped[j]);
        }, (j + 1) * currentSpeed);
      }
    }, original.length * currentSpeed);
    // insertion sort the grouped array
    setTimeout(() => {
      this.animateInsertionSort(insertionSort(grouped), currentSpeed);
    }, original.length * 2 * currentSpeed);
  }

  setMultipleBarsToBeingCompared = (index) => {
    let currentElements = this.state.elementsToSort.slice();
    for (let i = 0; i < index.length; i++) {
      currentElements[index[i]].isBeingCompared = true;
    }
    this.setState({
      elementsToSort: currentElements,
    });
  };

  setMultipleBarToNotBeingCompared = (index) => {
    let currentElements = this.state.elementsToSort.slice();
    for (let i = 0; i < index.length; i++) {
      currentElements[index[i]].isBeingCompared = false;
    }
    this.setState({
      elementsToSort: currentElements,
    });
  };

  // animate the heap sort algorithm
  animateHeapSort(animations, currentSpeed) {
    let length = animations.length;
    for (let i = 0; i <= length; i++) {
      // display ending animation
      if (i === length) {
        setTimeout(() => {
          this.animationDone();
        }, i * currentSpeed);
      } else {
        let current = animations[i];
        if (current.maxHeap) {
          // building a max heap
          // add color to the parent and children elements
          setTimeout(() => {
            document
              .getElementById("Bar-" + current.parent)
              .classList.add("comparedElement");
            document
              .getElementById("Bar-" + current.left)
              .classList.add("comparedElement");
            document
              .getElementById("Bar-" + current.right)
              .classList.add("comparedElement");
          }, i * currentSpeed);
          if (current.swapped) {
            // if two elements need to be swapped, remove color and swap the two elements
            if (current.swappedLeft) {
              // swap parent with left child
              setTimeout(() => {
                document
                  .getElementById("Bar-" + current.right)
                  .classList.remove("comparedElement");
                document.getElementById("Bar-" + current.parent).style.height =
                  current.leftHeight * 8 + "px";
                document.getElementById("Bar-" + current.left).style.height =
                  current.parentHeight * 8 + "px";
                document
                  .getElementById("Bar-" + current.parent)
                  .classList.remove("comparedElement");
                document
                  .getElementById("Bar-" + current.left)
                  .classList.remove("comparedElement");
              }, (i + 1) * currentSpeed);
            } else {
              // swap parent with right child
              setTimeout(() => {
                document
                  .getElementById("Bar-" + current.left)
                  .classList.remove("comparedElement");
                document.getElementById("Bar-" + current.parent).style.height =
                  current.rightHeight * 8 + "px";
                document.getElementById("Bar-" + current.right).style.height =
                  current.parentHeight * 8 + "px";
                document
                  .getElementById("Bar-" + current.parent)
                  .classList.remove("comparedElement");
                document
                  .getElementById("Bar-" + current.right)
                  .classList.remove("comparedElement");
              }, (i + 1) * currentSpeed);
            }
          } else {
            // if nothing needs to be swapped, remove color
            setTimeout(() => {
              document
                .getElementById("Bar-" + current.parent)
                .classList.remove("comparedElement");
              document
                .getElementById("Bar-" + current.left)
                .classList.remove("comparedElement");
              document
                .getElementById("Bar-" + current.right)
                .classList.remove("comparedElement");
            }, (i + 1) * currentSpeed);
          }
        } else {
          // if it is already a max heap, swap first and last elements
          // add color to first and last elements
          setTimeout(() => {
            document
              .getElementById("Bar-" + current.first)
              .classList.add("comparedElement");
            document
              .getElementById("Bar-" + current.last)
              .classList.add("comparedElement");
          }, i * currentSpeed);
          // remove color and swap first and last elements
          setTimeout(() => {
            document
              .getElementById("Bar-" + current.first)
              .classList.remove("comparedElement");
            document
              .getElementById("Bar-" + current.last)
              .classList.remove("comparedElement");
            document.getElementById("Bar-" + current.first).style.height =
              current.lastHeight * 8 + "px";
            document.getElementById("Bar-" + current.last).style.height =
              current.firstHeight * 8 + "px";
          }, (i + 1) * currentSpeed);
        }
      }
    }
  }

  // animate the quick sort algorithm
  animateQuickSort(animations, currentSpeed) {
    let length = animations.length;
    let nextTime = 0;
    for (let i = 0; i <= length; i++) {
      if (i === length) {
        // display ending animation
        setTimeout(() => {
          this.animationDone();
        }, (i + nextTime) * currentSpeed);
      } else {
        let current = animations[i];
        // move pivot to correct location
        // add color to pivot
        setTimeout(() => {
          this.setBarBeingCompared(current.start);
          this.setBarBeingCompared(current.pivotIndex);
        }, (i + nextTime) * currentSpeed);
        // remove color to pivot and swap places with the bar at its correct location
        setTimeout(() => {
          this.setBarNotBeingCompared(current.start);
          this.setBarNotBeingCompared(current.pivotIndex);
          this.changeBarSize(current.start, current.oldPivotIndexValue);
          this.changeBarSize(current.pivotIndex, current.pivot);
        }, (i + nextTime + 1) * currentSpeed);

        // partition the rest of the elements around the pivot
        setTimeout(() => {
          // move all the elements less than the pivot to the left side
          let time1 = 0;
          for (let j = current.start; j < current.pivotIndex; j++) {
            setTimeout(() => {
              this.setBarBeingCompared(j);
            }, time1 * currentSpeed);
            let newHeight = current.lower[j - current.start];
            setTimeout(() => {
              this.setBarNotBeingCompared(j);
              this.changeBarSize(j, newHeight);
            }, (time1 + 1) * currentSpeed);
            time1++;
          }
          // move all the elements greater than the pivot to the right side
          let time2 = 0;
          for (let j = current.end; j >= current.pivotIndex + 1; j--) {
            setTimeout(() => {
              this.setBarBeingCompared(j);
            }, time2 * currentSpeed);
            let newHeight = current.higher[j - current.pivotIndex - 1];
            setTimeout(() => {
              this.setBarNotBeingCompared(j);
              this.changeBarSize(j, newHeight);
            }, (time2 + 1) * currentSpeed);
            time2++;
          }
        }, (i + nextTime + 1) * currentSpeed);
        nextTime =
          3 + nextTime + Math.max(current.lower.length, current.higher.length);
      }
    }
  }

  // determines how fast the sorting algorithms are running
  updateSortSpeed = (event) => {
    // fast = 5, medium = 15, slow = 100
    let speed;
    if (event.target.value === "Slow") {
      speed = 100;
    } else if (event.target.value === "Regular") {
      speed = 30;
    } else {
      speed = 20;
    }
    this.setState({
      sortSpeedSelected: event.target.value,
      currentSpeed: speed,
    });
  };

  // reset all elements to initial state
  reset = () => {
    let elements = this.loadArray(50);
    this.setState({
      numberOfElements: 50,
      elementsToSortSizes: elements.elementSize,
      currentAlgo: "Merge Sort",
      sortSpeedSelected: "Regular",
      currentSpeed: 15,
      gridBeingUsed: false,
      elementsToSort: elements.elementObjects,
    });
  };

  setBarToDone = (index) => {
    let currentElements = this.state.elementsToSort.slice();
    currentElements[index].isDoneBeingSorted = true;
    this.setState({
      elementsToSort: currentElements,
    });
  };

  setAllBarsToNotDone = () => {
    let currentElements = this.state.elementsToSort.slice();
    for (let i = 0; i < currentElements.length; i++) {
      currentElements[i].isDoneBeingSorted = false;
    }
    this.setState({
      elementsToSort: currentElements,
    });
  };

  // this animation happens when algorithms are done
  animationDone() {
    for (let i = 0; i <= this.state.numberOfElements; i++) {
      if (i < this.state.numberOfElements) {
        setTimeout(() => {
          this.setBarToDone(i);
        }, i * this.state.currentSpeed);
      } else {
        setTimeout(() => {
          let currentElements = this.state.elementsToSort.slice();
          for (let i = 0; i < currentElements.length; i++) {
            currentElements[i].isDoneBeingSorted = false;
          }
          this.setState({
            elementsToSort: currentElements,
            gridBeingUsed: false,
          });
        }, i * this.state.currentSpeed + 1000);
      }
    }
  }

  render() {
    return (
      <div className="page">
        <div className="top-banner">
          <h1 className="header">Sorting algorithm visualizer</h1>
        </div>
        <div className="bars">
          {this.state.elementsToSort.map((bar, index) => {
            const {
              size,
              isDoneBeingSorted,
              isBeingCompared,
              isCurrentlyInCorrectOrder,
            } = bar;
            return (
              <Bar
                size={size}
                isBeingCompared={isBeingCompared}
                isDoneBeingSorted={isDoneBeingSorted}
                isCurrentlyInCorrectOrder={isCurrentlyInCorrectOrder}
                key={index}
                index={index}
                showSize={this.state.numberOfElements <= 25}
              />
            );
          })}
        </div>
        <div className="footer">
          <label className="label">Number of elements:</label>
          <input
            id="sliderNumElements"
            type="range"
            min="2"
            max="96"
            className="slider"
            value={this.state.numberOfElements}
            onChange={this.handleNumElementChange}
            disabled={this.state.gridBeingUsed ? true : false}
          />
          <label className="minorLabel">{this.state.numberOfElements}</label>
          <button
            id="buttonRandomize"
            className="button"
            onClick={this.handleRandomizeClick}
            disabled={this.state.gridBeingUsed ? true : false}
          >
            Randomize Elements
          </button>
          <label className="label">Sort with: </label>
          <select
            id="sliderAlgo"
            className="dropDown"
            value={this.state.currentAlgo}
            onChange={this.updateCurrentAlgo}
            disabled={this.state.gridBeingUsed ? true : false}
          >
            {this.state.algorithms.map((algorithms) => (
              <option key={algorithms} value={algorithms}>
                {algorithms}
              </option>
            ))}
          </select>
          <label className="label">Sorting speed:</label>
          <select
            id="sliderAlgoSpeed"
            className="dropDownSpeed"
            value={this.state.sortSpeedSelected}
            onChange={this.updateSortSpeed}
            disabled={this.state.gridBeingUsed ? true : false}
          >
            {this.state.sortSpeed.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
          <button
            id="buttonVisualize"
            className="button"
            onClick={this.sortElements}
            disabled={this.state.gridBeingUsed ? true : false}
          >
            VISUALIZE SORTING
          </button>
          <button
            id="buttonReset"
            className="button"
            onClick={this.reset}
            disabled={this.state.gridBeingUsed ? true : false}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}
