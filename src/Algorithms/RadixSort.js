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
        let buckets = Array.from({length: 10}, () => []);

        // for every number in the array:
        for (let j = 0; j < arr.length; j++) {
            let newPosition = {
                height: arr[j],
                index: j
            }
            positions.push(newPosition);
            positions.push(newPosition);
            // get the digit at the ith place in every element
            let position = getPosition(arr[j], i);
            // push the element into the correct spot in the 10 arrays stored in bucket
            buckets[position].push(arr[j]);
        }

        let count = 0;
        for(let j = 0; j < 10; j++) {
            for(let z = 0; z < buckets[j].length; z++) {
                let newPosition = {
                    height: buckets[j][z],
                    index: count
                }
                count++;
                positions.push(newPosition);
                positions.push(newPosition);
            }
        }

        // set array equal to the non empty elements in buckets in the order they appear
        arr = [].concat(...buckets);
    }
    return positions;
}

// get the maximum number of digits in a number
function getMax(arr) {
    let max = 0;
    for (let i = 0; i <arr.length;i++) {
        let num = arr[i];
        if (max < num.toString().length) {
            max = num.toString().length
        }
    }
    return max
}

// get the digit at a position in a number ( getPosition(231,1) = 3)
function getPosition(num, place){
    return Math.floor(Math.abs(num)/Math.pow(10,place)) % 10;
}