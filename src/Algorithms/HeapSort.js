/*
HEAP SORT ALGORITHM.
- best case: O(nlog(n))
- worst case: O(nlog(n))
- average: O(nlog(n))
Create a max heap, swap the first and last elements, "delete" the last element, and then reform the max heap.
Repeat until there are no more elements to sort.
 */

export function heapSort(arr) {
    let animations = [];
    // turn the array into a max heap
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        maxHeap(arr, i, arr.length - 1, animations);
    }
    // swap first and last element
    // "delete" last element by decrementing the size
    // fix the remaining heap so it is a max heap again
    let size = arr.length - 1;
    for (let i = size; i > 0; i--) {
        let compared = {
            maxHeap: false,
            first: 0,
            firstHeight: arr[0],
            last: i,
            lastHeight: arr[i],
        };
        animations.push(compared);
        swap(arr, 0, i);
        size--;
        maxHeap(arr, 0, size, animations);
    }
    return animations;
}

// create a max heap
let maxHeap = (arr, parent, size, animations) => {
    // low = index of parent node
    let leftChild = 2 * parent;
    let rightChild = 2 * parent + 1;

    // figure out max (the index of the maximum value between the parent and children nodes)
    let max;
    if (leftChild <= size && arr[leftChild] > arr[parent]) {
        max = leftChild;
    } else {
        max = parent;
    }
    if (rightChild <= size && arr[rightChild] > arr[max]) {
        max = rightChild;
    }

    // if max is not the parent:
    // swap the parent and child so the parent now holds a greater value than its children
    // keep figuring out the max heap with the new parent node
    if (max !== parent) {
        let compared = {
            maxHeap: true,
            parent: parent,
            parentHeight: arr[parent],
            left: leftChild,
            leftHeight: arr[leftChild],
            right: rightChild,
            rightHeight: arr[rightChild],
            swapped: true,
            swappedLeft: false
        };
        if (max === leftChild) {
            compared.swappedLeft = true;
        }
        animations.push(compared);
        console.log("before swap:");
        console.log(arr);
        swap(arr, parent, max);
        console.log("after swap:");
        console.log(arr);
        maxHeap(arr, max, size, animations);
    } else if (leftChild <= size && rightChild <= size) {
        let compared = {
            maxHeap: true,
            parent: parent,
            left: leftChild,
            right: rightChild,
            swapped: false
        };
        animations.push(compared);
    }
};

// helper method: swap the elements at the given indexes in the given array
let swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
};