/*
QUICK SORT ALGORITHM.
- best case: O(nlog(n))
- worse case: O(n^2)
- average: O(nlog(n))
If x is the pivot: put x at its correct spot in the array, put smaller elements
before x and greater elements after x. Sort left and right sides recursively.
 */

export function quickSort(arr) {
    let animations = [];
    quickSortHelper(arr, animations, 0, arr.length - 1);
    return animations;
}

function quickSortHelper(arr, animations, start, end) {
    // choose a pivot
    let pivot = arr[start];
    // all the elements lower than the pivot
    let lower = [];
    // all the elements greater than the pivot
    let higher = [];

    // sort arr into lower and higher (equal to pivot -> higher)
    for (let i = start + 1; i <= end; i++) {
        if (arr[i] < pivot) {
            lower.push(arr[i]);
        } else {
            higher.push(arr[i]);
        }
    }
    let pivotIndex = start + lower.length;

    // information for animations
    let info = {
        start: start,
        end: end,
        pivot: pivot,
        pivotIndex: pivotIndex,
        oldPivotIndexValue: arr[pivotIndex],
        lower: lower,
        higher: higher
    };
    animations.push(info);

    // rearrange array
    for (let i = start; i < pivotIndex; i++) {
        arr[i] = lower[i - start];
    }
    arr[pivotIndex] = pivot;
    for (let i = pivotIndex + 1; i <= end; i++) {
        arr[i] = higher[i - pivotIndex - 1];
    }

    if (lower.length >= 2) {
        quickSortHelper(arr, animations, start, pivotIndex - 1);
    }
    if (higher.length >= 2) {
        quickSortHelper(arr, animations, pivotIndex + 1, end);
    }
}