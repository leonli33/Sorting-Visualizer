/*
HEAP SORT ALGORITHM.
- best case: O(nlog(n))
- worst case: O(nlog(n))
- average: O(nlog(n))
It's hard to explain. TODO: add this comment later!
 */

export function heapSort(arr) {
    // turn the array into a max heap
    for (let i = (arr.length - 1) / 2; i >= 0; i--) {
        maxHeap(arr, i, arr.length - 1);
    }
    // swap first and last element
    // "delete" last element by decrementing the size
    // fix the remaining heap so it is a max heap again
    let size = arr.length - 1;
    for (let i = size; i > 0; i--) {
        swap(arr, 0, i);
        size--;
        maxHeap(arr, 0, size);
    }
    return arr;
}

// create a max heap
let maxHeap = (arr, low, high) => {
    // low = index of parent node
    let leftChild = 2 * low + 1;
    let rightChild = 2 * low + 2;

    // figure out max (the index of the maximum value between the parent and children nodes)
    let max;
    if (leftChild <= high && arr[leftChild] > arr[low]) {
        max = leftChild;
    } else {
        max = low;
    }
    if (rightChild <= high && arr[rightChild] > arr[max]) {
        max = rightChild;
    }

    // if max is not the parent:
    // swap the parent and child so the parent now holds a greater value than its children
    // keep figuring out the max heap with the new parent node
    if (max !== low) {
        swap(arr, low, max);
        maxHeap(arr, max, high);
    }
};

// helper method: swap the elements at the given indexes in the given array
let swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
};