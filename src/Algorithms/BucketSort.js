/*
BUCKET SORT ALGORITHM.
- best case: O(n+k)
- worst case: O(n^2)
- average: O(n+k)
Separate the elements of the array into "buckets" that hold a specific range
of values. Individually sort the buckets using insertion sort, then recombine them.
 */

export function bucketSort(arr) {
    // default bucket size
    const BUCKET_SIZE = 5;
    // find min and max values in array
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    // create buckets
    let range = max - min;
    let buckets = [];
    for (let i = 0; i <= Math.floor(range / BUCKET_SIZE); i++) {
        buckets.push([]);
    }
    // add to buckets
    for (let value of arr) {
        buckets[Math.floor((value - min) / BUCKET_SIZE)].push(value);
    }
    // sort each bucket and recombine them
    arr.length = 0;
    for (let bucket of buckets) {
        if (bucket.length > 1) {
            insertionSort(bucket);
        }
        if (bucket.length > 0) {
            arr = arr.concat(bucket);
        }
    }
    return arr;
}

// helper method: insertion sort to sort the buckets
let insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i];
        let j = i - 1;
        for (j; j >= 0 && arr[j] > value; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = value;
    }
};

