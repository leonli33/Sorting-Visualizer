// Merge Sort. Merge sort is a divide and conquer way of sorting an array.
// It work by splitting an array down to smaller arrays, sorting the smaller arrays,
// then merging sorted arrays together. Its time complexity is O(nlog(n))


export function mergeSort(arr) {
    let length = arr.length;
    // if there is only one element in the array, it is already sorted
    if(length === 1) {
        return arr;
    } 
    // split the array into two smaller arrays
    let halfIndex = Math.ceil(length / 2); 
    let arr1 = arr.slice(0,halfIndex);
    let arr2 = arr.slice(halfIndex,length);

    // split arr1
    arr1 = mergeSort(arr1);
    // split arr2
    arr2 = mergeSort(arr2);

    // merge arrays together in sorted order
    return merge(arr1,arr2);
}

// merge two arrays together
function merge(arr1, arr2) {
    // sorted array
    let mergedArray = [];

    // add the smallest element in both arrays to the end of 'mergedArray'
    // this guarantees that mergedArray is sorted
    while(arr1.length !== 0 && arr2.length !== 0) {
        if(arr1[0] > arr2[0]) {
            mergedArray.push(arr2[0]);
            arr2.shift();
        } else {
            mergedArray.push(arr1[0]);
            arr1.shift();
        }
    }

    // at this point, either arr1 is empty or arr2 is empty.
    // add all elements of unempty array to the end of the sorted array
    while(arr1.length !== 0) {
        mergedArray.push(arr1[0]);
        arr1.shift();
    }

    while(arr2.length !== 0) {
        mergedArray.push(arr2[0]);
        arr2.shift();
    }

    // return the sorted array
    return mergedArray;
}