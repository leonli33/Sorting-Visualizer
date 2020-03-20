/*
QUICK SORT ALGORITHM.
- best case: O(nlog(n))
- worse case: O(n^2)
- average: O(nlog(n))
If x is the pivot: put x at its correct spot in the array, put smaller elements
before x and greater elements after x. Sort left and right sides recursively.
 */

export function quickSort(arr) {
    // base case: if the array has length 0 or 1, return the array.
    if (arr.length < 2) {
        return arr;
    }
    // recursive case: the pivot is the first element of the array.
    let pivot = arr[0];
    // all the elements lower than the pivot
    let lower = [];
    // all the elements greater than the pivot
    let higher = [];
    // sort arr into lower and higher (equal to pivot -> higher)
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            lower.push(arr[i]);
        } else {
            higher.push(arr[i]);
        }
    }
    // recurse: sorted lower + pivot + sorted higher
    return quickSort(lower).concat(pivot).concat(quickSort(higher));
}