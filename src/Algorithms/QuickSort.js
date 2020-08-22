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

// partitions the array between the given start and end indexes. chooses a pivot and rearranges the array so the
// elements on the left side of the pivot are less than the pivot and the elements on the right side are greater
// than or equal to the pivot. continues to partition sections of the array until it is sorted.
function quickSortHelper(arr, animations, start, end) {
  // choose a pivot
  let pivot = arr[start];
  // all the elements lower than the pivot
  let lower = [];
  // all the elements greater than the pivot
  let higher = [];

  // partition the elements (less than the pivot -> lower, greater than or equal to the pivot -> higher)
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      lower.push(arr[i]);
    } else {
      higher.push(arr[i]);
    }
  }

  // the correct index of the pivot
  let pivotIndex = start + lower.length;

  // store information about the pivot and lower/higher elements (for animation purposes)
  let info = {
    start: start,
    end: end,
    pivot: pivot,
    pivotIndex: pivotIndex,
    oldPivotIndexValue: arr[pivotIndex],
    lower: lower,
    higher: higher,
  };
  animations.push(info);

  // rearrange array so the elements less than the pivot are on the left side, the pivot is in the
  // correct location, and the elements greater than or equal to the pivot are on the right side
  for (let i = start; i < pivotIndex; i++) {
    arr[i] = lower[i - start];
  }
  arr[pivotIndex] = pivot;
  for (let i = pivotIndex + 1; i <= end; i++) {
    arr[i] = higher[i - pivotIndex - 1];
  }

  // as long as there is more than one element, partition the left and right sides of the pivot
  if (lower.length > 1) {
    quickSortHelper(arr, animations, start, pivotIndex - 1);
  }
  if (higher.length > 1) {
    quickSortHelper(arr, animations, pivotIndex + 1, end);
  }
}
