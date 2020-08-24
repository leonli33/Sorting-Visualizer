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
      currentAlgo: "Algorithms",
      algorithms: [],
      elementsToSort: [],
      elementsToSortSizes: [],
      numberOfElements: 50,
      sortSpeed: ["Slow", "Regular", "Fast"],
      sortSpeedSelected: "Sorting Speed",
      currentSpeed: 0,
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
    if (!this.state.gridBeingUsed) {
      let elements = this.loadArray();
      this.setState({
        elementsToSortSizes: elements.elementSize,
        elementsToSort: elements.elementObjects,
      });
    }
  };

  // initialize values of bars (elements to be sorted) to the given number of random values
  loadArray = (num) => {
    let elementObjects = [];
    let elementSizes = [];
    let size = num ? num : this.state.numberOfElements;
    for (let i = 0; i < size; i++) {
      let num = this.getRandomInt(60);
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
      let num = this.getRandomInt(60);
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
  updateCurrentAlgo = (algorithm) => {
    // set the current algo selected
    this.setState({
      currentAlgo: algorithm,
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

  // If we use setState to change the color of every bar individually, there will be lag with the heap sort algorithm.
  setMultipleBarsToBeingCompared = (indexes) => {
    let currentElements = this.state.elementsToSort.slice();
    for (let i = 0; i < indexes.length; i++) {
      if (currentElements[indexes[i]]) {
        currentElements[indexes[i]].isBeingCompared = true;
      }
    }
    this.setState({
      elementsToSort: currentElements,
    });
  };

  // If we use setState to change the color of every bar individually, there will be lag with the heap sort algorithm.
  setMultipleBarToNotBeingCompared = (index) => {
    let currentElements = this.state.elementsToSort.slice();
    for (let i = 0; i < index.length; i++) {
      if (currentElements[index[i]]) {
        currentElements[index[i]].isBeingCompared = false;
      }
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
            this.setMultipleBarsToBeingCompared([
              current.parent,
              current.left,
              current.right,
            ]);
          }, i * currentSpeed);
          if (current.swapped) {
            // if two elements need to be swapped, remove color and swap the two elements
            if (current.swappedLeft) {
              // swap parent with left child
              setTimeout(() => {
                this.setMultipleBarToNotBeingCompared([
                  current.parent,
                  current.left,
                  current.right,
                ]);
                this.changeBarSize(current.parent, current.leftHeight);
                this.changeBarSize(current.left, current.parentHeight);
              }, (i + 1) * currentSpeed);
            } else {
              // swap parent with right child
              setTimeout(() => {
                this.setMultipleBarToNotBeingCompared([
                  current.left,
                  current.parent,
                  current.right,
                ]);
                this.changeBarSize(current.parent, current.rightHeight);
                this.changeBarSize(current.right, current.parentHeight);
              }, (i + 1) * currentSpeed);
            }
          } else {
            // if nothing needs to be swapped, remove color
            setTimeout(() => {
              this.setMultipleBarToNotBeingCompared([
                current.left,
                current.parent,
                current.right,
              ]);
            }, (i + 1) * currentSpeed);
          }
        } else {
          // if it is already a max heap, swap first and last elements
          // add color to first and last elements
          setTimeout(() => {
            this.setMultipleBarsToBeingCompared([current.first, current.last]);
          }, i * currentSpeed);
          // remove color and swap first and last elements
          setTimeout(() => {
            this.setMultipleBarToNotBeingCompared([
              current.first,
              current.last,
            ]);
            this.changeBarSize(current.first, current.lastHeight);
            this.changeBarSize(current.last, current.firstHeight);
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
  updateSortSpeed = (speed) => {
    // fast = 5, medium = 15, slow = 100
    let speed_value_ms;
    if (speed === "Slow") {
      speed_value_ms = 100;
    } else if (speed === "Regular") {
      speed_value_ms = 30;
    } else {
      speed_value_ms = 20;
    }
    this.setState({
      sortSpeedSelected: speed,
      currentSpeed: speed_value_ms,
    });
  };

  // reset all elements to initial state
  reset = () => {
    if (!this.state.gridBeingUsed) {
      let elements = this.loadArray(50);
      this.setState({
        numberOfElements: 50,
        elementsToSortSizes: elements.elementSize,
        currentAlgo: "Algorithms",
        sortSpeedSelected: "Sorting Speed",
        currentSpeed: 0,
        elementsToSort: elements.elementObjects,
      });
    }
  };

  setBarToDone = (index) => {
    let currentElements = this.state.elementsToSort.slice();
    currentElements[index].isDoneBeingSorted = true;
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

  // sorts the elements using the current selected algorithm
  sortElements = () => {
    if (
      !this.state.gridBeingUsed &&
      this.state.currentAlgo !== "Algorithms" &&
      this.state.sortSpeedSelected !== "Sorting Speed"
    ) {
      document.getElementById("check").checked = false;
      this.setState({
        gridBeingUsed: true,
      });
      setTimeout(() => {
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
      }, 600);
    }
  };

  changingNumberOfElements = () => {
    let sidebar = document.getElementById("left-sidebar");
    sidebar.style.opacity = 0.5;
  };

  stoppedChangingNumberOfElements = () => {
    let sidebar = document.getElementById("left-sidebar");
    sidebar.style.opacity = 1;
  };

  dropDownSpeedPressed = () => {
    if (!this.state.gridBeingUsed) {
      document
        .getElementById("speed-options")
        .classList.toggle("speed-options-show");
    }
  };

  dropDownAlgorithmsPressed = () => {
    if (!this.state.gridBeingUsed) {
      document
        .getElementById("algorithm-options")
        .classList.toggle("algorithm-options-show");
    }
  };

  render() {
    return (
      <div className="page">
        <input type="checkbox" id="check" />
        <label for="check">
          <i class="fas fa-bars" id="btn"></i>
          <i class="fas fa-times" id="cancel"></i>
        </label>
        <div class="sidebar" id="left-sidebar">
          <header>Options</header>
          <ul>
            <li
              onClick={this.dropDownAlgorithmsPressed}
              disabled={this.state.gridBeingUsed ? true : false}
            >
              <a
                class={`${
                  this.state.gridBeingUsed
                    ? "drop-down-algo-running"
                    : "drop-down"
                }`}
              >
                {this.state.currentAlgo}
                <span class="fa fa-caret-right expand caret"></span>
              </a>
              <ul id="algorithm-options" class="speed-options-dont-show">
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Merge Sort")}
                >
                  <a class="drop-down-option">Merge Sort</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Quick Sort")}
                >
                  <a class="drop-down-option">Quick Sort</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Insertion Sort")}
                >
                  <a class="drop-down-option">Insertion Sort</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Bubble Sort")}
                >
                  <a class="drop-down-option">Bubble Sort</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Shell Sort")}
                >
                  <a class="drop-down-option">Shell Sort</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Heap Sort")}
                >
                  <a class="drop-down-option">Heap Sort</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Radix Sort")}
                >
                  <a class="drop-down-option">Radix Sort</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateCurrentAlgo("Bucket Sort")}
                >
                  <a class="drop-down-option">Bucket Sort</a>
                </li>
              </ul>
            </li>

            <li
              onClick={this.dropDownSpeedPressed}
              disabled={this.state.gridBeingUsed ? true : false}
            >
              <a
                class={`${
                  this.state.gridBeingUsed
                    ? "drop-down-algo-running"
                    : "drop-down"
                }`}
              >
                {this.state.sortSpeedSelected}
                <span class="fa fa-caret-right expand caret"></span>
              </a>

              <ul id="speed-options" class="speed-options-dont-show">
                <li class="item" onClick={() => this.updateSortSpeed("Slow")}>
                  <a class="drop-down-option">Slow</a>
                </li>
                <li
                  class="item"
                  onClick={() => this.updateSortSpeed("Regular")}
                >
                  <a class="drop-down-option">Regular</a>
                </li>
                <li class="item" onClick={() => this.updateSortSpeed("Fast")}>
                  <a class="drop-down-option">Fast</a>
                </li>
              </ul>
            </li>

            <li
              class={
                this.state.gridBeingUsed ? "button-algo-running" : "button"
              }
              onClick={this.handleRandomizeClick}
            >
              <a>Randomize Elements</a>
            </li>
            <li
              class={
                this.state.gridBeingUsed ? "button-algo-running" : "button"
              }
              onClick={this.reset}
            >
              <a>Reset</a>
            </li>
            <li>
              <a>
                <input
                  id="sliderNumElements"
                  type="range"
                  min="2"
                  max="96"
                  className="slider"
                  value={this.state.numberOfElements}
                  onChange={this.handleNumElementChange}
                  onMouseDown={this.changingNumberOfElements}
                  onMouseUp={this.stoppedChangingNumberOfElements}
                  disabled={this.state.gridBeingUsed ? true : false}
                />
                <label className="minorLabel">
                  {this.state.numberOfElements}
                </label>
              </a>
            </li>
            <li
              onClick={this.sortElements}
              class={
                this.state.gridBeingUsed ||
                this.state.currentAlgo === "Algorithms" ||
                this.state.sortSpeedSelected === "Sorting Speed"
                  ? "button-algo-running"
                  : "start-button"
              }
            >
              <a>Start</a>
            </li>
          </ul>
        </div>
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
      </div>
    );
  }
}

/*
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


        CSS:

        .button {
  border-radius: 8px;
  background: whitesmoke;
  border: 2px solid darkslategray;
  color: darkslategray;
  padding: 10px;
  margin-left: 15px;
  font-size: 14px;
  outline: none;
  font-weight: bold;
}

.button:hover {
  background: lavender;
}

.dropDownSpeed {
  border: 2px solid darkslategray;
  height: 42px;
  width: 7%;
  margin-left: 10px;
  outline: none;
  font-size: 14px;
  color: darkslategray;
  font-weight: bold;
}

.dropDownSpeed:hover {
  background: lavender;
}

.dropDown {
  border: 2px solid darkslategray;
  height: 42px;
  width: 10%;
  margin-left: 10px;
  outline: none;
  font-size: 14px;
  color: darkslategray;
  font-weight: bold;
}

.dropDown:hover {
  background: lavender;
}

.footer {
  position: fixed;
  bottom: 0;
  display: inline-block;
  width: 100%;
  height: 90px;
  background-color: whitesmoke;
  text-align: center;
}


.label {
  text-align: center;
  font-weight: bold;
  color: darkslategray;
  line-height: 90px;
  margin-left: 15px;
}
    */
