// Merge Sort. Merge sort is a divide and conquer way of sorting an array.
// It works by splitting an array down to smaller arrays, sorting the smaller arrays,
// then merging sorted arrays together. Its time complexity is O(nlog(n))

export function mergeSort(arr) {
  const secondArray = arr.slice();
  const animations = [];
  executeMergeSort(arr, secondArray, 0, arr.length - 1, animations);
  return animations;
}

function executeMergeSort(
  mainArray,
  secondArray,
  startIndex,
  endIndex,
  animations
) {
  if (startIndex !== endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);
    executeMergeSort(
      secondArray,
      mainArray,
      startIndex,
      middleIndex,
      animations
    );
    executeMergeSort(
      secondArray,
      mainArray,
      middleIndex + 1,
      endIndex,
      animations
    );
    mergeTwoArrays(
      mainArray,
      secondArray,
      startIndex,
      middleIndex,
      endIndex,
      animations
    );
  }
}

function mergeTwoArrays(
  mainArray,
  secondArray,
  startIndex,
  middleIndex,
  endIndex,
  animations
) {
  let lower = startIndex;
  let insertionIndex = startIndex;
  let upper = middleIndex + 1;

  while (lower <= middleIndex && upper <= endIndex) {
    let objectsCompared = {
      indexOne: lower,
      indexTwo: upper,
    };
    animations.push(objectsCompared);
    animations.push(objectsCompared);

    if (secondArray[lower] > secondArray[upper]) {
      animations.push({ indexSwap: insertionIndex, value: secondArray[upper] });
      mainArray[insertionIndex] = secondArray[upper];
      insertionIndex++;
      upper++;
    } else {
      animations.push({ indexSwap: insertionIndex, value: secondArray[lower] });
      mainArray[insertionIndex] = secondArray[lower];
      insertionIndex++;
      lower++;
    }
  }

  while (lower <= middleIndex) {
    let objectsCompared = {
      indexOne: lower,
      indexTwo: lower,
    };
    animations.push(objectsCompared);
    animations.push(objectsCompared);
    animations.push({ indexSwap: insertionIndex, value: secondArray[lower] });
    mainArray[insertionIndex] = secondArray[lower];
    insertionIndex++;
    lower++;
  }

  while (upper <= endIndex) {
    let objectsCompared = {
      indexOne: upper,
      indexTwo: upper,
    };
    animations.push(objectsCompared);
    animations.push(objectsCompared);
    animations.push({ indexSwap: insertionIndex, value: secondArray[upper] });
    mainArray[insertionIndex] = secondArray[upper];
    insertionIndex++;
    upper++;
  }
}
