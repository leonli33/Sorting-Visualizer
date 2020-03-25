/*
BUCKET SORT ALGORITHM.
- best case: O(n+k)
- worst case: O(n^2)
- average: O(n+k)
Separate the elements of the array into "buckets" that hold a specific range
of values. Individually sort the buckets using insertion sort, then recombine them.
 */

import {insertionSort} from './InsertionSort';

export function bucketSort(arr) {
    let animations = [];
    // make a copy of original array (for animation purposes)
    let originalArr = arr.slice();
    animations.push(originalArr);

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
    // create buckets of size 5
    let range = max - min;
    let buckets = [];
    for (let i = 0; i <= Math.floor(range / BUCKET_SIZE); i++) {
        buckets.push([]);
    }
    // add values to buckets
    for (let value of arr) {
        buckets[Math.floor((value - min) / BUCKET_SIZE)].push(value);
    }

    // group the buckets together in order (for animation purposes)
    let groupedArr = [];
    for (let bucket of buckets) {
        groupedArr = groupedArr.concat(bucket);
    }
    animations.push(groupedArr);

    // sort each bucket and recombine them
    arr = [];
    for (let bucket of buckets) {
        if (bucket.length > 1) {
            insertionSort(bucket);
        }
        if (bucket.length > 0) {
            arr = arr.concat(bucket);
        }
    }
    return animations;
}
