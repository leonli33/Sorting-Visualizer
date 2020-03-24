// insertion sort runs in quadratic time. It works by comparing each element to the element before it,
// swapping if the element before is smaller

export function insertionSort(arr) {
    let animations = [];
    for(let i = 1; i < arr.length; i++) {
        // determines if two elements were swapped or not
        let swapped = false;
        let j = i;
        while(j > 0 && (arr[j-1] > arr[j])) {
            // indicate that elements were swapped
            swapped = true;
            let comparedElement = {
                firstElement: j,
                firstElementHeight: arr[j],
                secondElement: j - 1,
                secondElementHeight: arr[j - 1],
                swap: true
            }
            // push animation twice (we need to display color and then remove color)
            animations.push(comparedElement);
            animations.push(comparedElement);
            // swap the two elements being compared
            swap(arr,j,j-1);
            j--;                    
        }
        // if the elements were not swapped, indicate so
        if(!swapped) {
            let comparedElements = {
                firstElement: i,
                secondElement: j,
                swap: false
            }
            // push animation twice (we need to display color and then remove color)
            animations.push(comparedElements);
            animations.push(comparedElements);
        }
        swapped = false;
    }
    // return all the animations made in the runtime of algorithm
    return animations;
}

// took code from bubble sort
function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}