/*
BUBBLE SORT ALGORITHM.
Iterate through the array and swap adjacent elements if they are in the wrong order.
 */

export function bubbleSort(arr) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                sorted = false;
            }
        }
    }
    return arr;
}

let swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
};