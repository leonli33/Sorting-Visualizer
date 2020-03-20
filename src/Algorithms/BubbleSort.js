/*
BUBBLE SORT ALGORITHM.
- best case: O(n)
- worst case: O(n^2)
- average: O(n^2)
Iterate through the array and swap adjacent elements if they are in the wrong order.
 */

export function bubbleSort(arr) {
    let sorted = false;
    // check if the array is fully sorted (if the algorithm makes a complete iteration
    // without making any swaps)
    while (!sorted) {
        sorted = true;
        // iterate through array
        for (let i = 0; i < arr.length - 1; i++) {
            // if two adjacent elements are out of order, swap them
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                sorted = false;
            }
        }
    }
    return arr;
}

// helper method: swap the elements at the given indexes in the given array
let swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
};