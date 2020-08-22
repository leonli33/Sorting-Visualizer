// radix sort sorts the array based on the value of each digit in each index of the array. It uses counting sort
// to do this, stopping when it reaches the number of digits in the largest array

// radix sort
export function radixSort(arr) {
  // get the maximum number of digits
  let maxNum = getMax(arr);

  let positions = [];

  // for every digit:
  // note: Radix sort works because the elements in the original array are changing every
  //       iteration. This, combined with the fact that counting sort is stable, results in the correct
  //       ending array
  for (let i = 0; i < maxNum; i++) {
    // create 10 empty arrays
    let buckets = Array.from({ length: 10 }, () => []);

    // tracks the new index of every element
    let newIndexes = [];

    // for every number in the array:
    for (let j = 0; j < arr.length; j++) {
      let newPosition = {
        height: arr[j],
        index: j,
        row: null,
        col: null,
      };
      positions.push(newPosition);
      positions.push(newPosition);
      // get the digit at the ith place in every element
      let position = getPosition(arr[j], i);

      // push the new position of the first element so that
      // it can be animated first (animation will look cooler)

      // at this point, we dont know what the actual index of this element is,
      // we will need to calculate it after the loop terminates
      let newIndex = {
        height: arr[j],
        index: undefined,
        row: position,
        col: buckets[position].length,
      };
      newIndexes.push(newIndex);

      // push the element into the correct spot in the 10 arrays stored in bucket
      buckets[position].push(arr[j]);
    }

    // calculate how many elements come before the position of an index
    for (let i = 0; i < newIndexes.length; i++) {
      let currentIndex = newIndexes[i];
      let newIndex = 0;
      for (let j = 0; j <= currentIndex.row; j++) {
        for (let z = 0; z < buckets[j].length; z++) {
          if (j === currentIndex.row && z === currentIndex.col) {
            break;
          }
          newIndex++;
        }
      }
      currentIndex.index = newIndex;
    }

    // push the elements in newIndexes to be displated in the positions array
    for (let i = 0; i < newIndexes.length; i++) {
      // push animation twice (we need to display color and then remove color)
      positions.push(newIndexes[i]);
      positions.push(newIndexes[i]);
    }

    // set array equal to the non empty elements in buckets in the order they appear
    arr = [].concat(...buckets);
  }
  return positions;
}

// get the maximum number of digits in a number
function getMax(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (max < num.toString().length) {
      max = num.toString().length;
    }
  }
  return max;
}

// get the digit at a position in a number ( getPosition(231,1) = 3)
function getPosition(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
