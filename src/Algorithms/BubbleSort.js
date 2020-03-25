/*
BUBBLE SORT ALGORITHM.
- best case: O(n)
- worst case: O(n^2)
- average: O(n^2)
Iterate through the array and swap adjacent elements if they are in the wrong order.
 */

export function bubbleSort(arr) {
    let animations = [];
    let sorted = false;
    // check if the array is fully sorted (if the algorithm makes a complete iteration
    // without making any swaps)
    while (!sorted) {
        sorted = true;
        // iterate through array
        for (let i = 0; i < arr.length - 1; i++) {
            // if two adjacent elements are out of order, swap them
            if (arr[i] > arr[i + 1]) {
                // store the two elements being compared if they are swapped
                let comparedElements = {
                    first: i,
                    firstHeight: arr[i],
                    second: i + 1,
                    secondHeight: arr[i + 1],
                    swap: true
                };
                animations.push(comparedElements);
                // swap
                swap(arr, i, i + 1);
                sorted = false;
            } else {
                // store the two elements being compared if they are not swapped
                let comparedElements = {
                    first: i,
                    second: i + 1,
                    swap: false
                };
                animations.push(comparedElements);
            }
        }
    }
    return animations;
}

// helper method: swap the elements at the given indexes in the given array
let swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
};