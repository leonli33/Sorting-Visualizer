// Merge Sort. Merge sort is a divide and conquer way of sorting an array.
// It work by splitting an array down to smaller arrays, sorting the smaller arrays,
// then merging sorted arrays together. Its time complexity is O(nlog(n))


// non recursive implementation
export function mergeSort(arr) {
    let arrayCopy = [...arr];
    let animations = mergesort(arr);
    return animations;
}

function mergesort(arr) {
    let animations = [];
    let length = arr.length;
    let m = 1;
    while(m < length) {
        let i = 0;
        while(i < (length - m)) {
            merge(arr,i,i + m - 1, i + m, Math.min(i + (2*m) - 1, length - 1), animations);
            i = i + (2 * m);
        }
        m *= 2;
    }
    return animations;
    
}

// merge two arrays together
function merge(arr1, startIndexLeft,endIndexLeft,startIndexRight,endIndexRight,animations) {
    let mergedArray = [];   
    let subArrayOne = [...arr1];
    let subArrayTwo = [...arr1];
    subArrayOne = subArrayOne.slice(startIndexLeft, endIndexLeft + 1);
    subArrayTwo = subArrayTwo.slice(startIndexRight,endIndexRight + 1);

    let indexCompareOne = startIndexLeft;
    let indexCompareTwo = startIndexRight

    // add the smallest element in both arrays to the end of 'mergedArray'
    // this guarantees that mergedArray is sorted

    // this doesnt work because the subArrays are not being edited. Need to cut elements off of the arrays,
    // should be okay since integers are prim types
    while(subArrayOne.length !== 0 && subArrayTwo.length !== 0) {
        let objectsCompared = {
            indexOne : indexCompareOne,
            indexTwo : indexCompareTwo,
            end: false
        }
        animations.push(objectsCompared);
        if(subArrayOne[0] > subArrayTwo[0]) {
            mergedArray.push(subArrayTwo[0]);
            subArrayTwo.shift();
            indexCompareTwo++;
        } else {
            mergedArray.push(subArrayOne[0]);
            subArrayOne.shift();
            indexCompareOne++;
        }
    }

    // at this point, either arr1 is empty or arr2 is empty.
    // add all elements of unempty array to the end of the sorted array
    while(subArrayOne.length !== 0) {
        mergedArray.push(subArrayOne[0]);
        subArrayOne.shift();
        indexCompareOne++;
        let objectsCompared = {
            indexOne: indexCompareOne,
            indexTwo: indexCompareTwo,
            end:false
        }
        animations.push(objectsCompared);
    }
    while(subArrayTwo.length !== 0) {
        mergedArray.push(subArrayTwo[0]);
        subArrayTwo.shift();
        indexCompareTwo++;
        let objectsCompared = {
            indexOne: indexCompareOne,
            indexTwo: indexCompareTwo,
            end:false
        }
        animations.push(objectsCompared);    
    }
    console.log(indexCompareOne + "," +  indexCompareTwo)
    let objectsCompared = {
        startIndex: startIndexLeft,
        endIndex: endIndexRight + 1,
        end: true,
        mergedarray: mergedArray
    }
    animations.push(objectsCompared);
    let z = 0;
    for(let i = startIndexLeft; i < endIndexRight + 1; i++) {
        arr1[i] = mergedArray[z];
        z++;
    }
}