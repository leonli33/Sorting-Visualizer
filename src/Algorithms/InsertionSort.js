// insertion sort runs in quadratic time. It works by comparing each element to the element before it,
// swapping if the element before is smaller

export function insertionSort(arr) {
    let animations = [];
    for(let i = 1; i < arr.length; i++) {
        let swapped = false;
        let j = i;
        while(j > 0 && (arr[j-1] > arr[j])) {
            swapped = true;
            let comparedElement = {
                firstElement: j,
                firstElementHeight: arr[j],
                secondElement: j - 1,
                secondElementHeight: arr[j - 1],
                swap: true
            }
            animations.push(comparedElement);
            animations.push(comparedElement);
            swap(arr,j,j-1);
            j--;                    
        }
        if(!swapped) {
            let comparedElements = {
                firstElement: i,
                secondElement: j,
                swap: false
            }
            animations.push(comparedElements);
            animations.push(comparedElements);
        }
        swapped = false;
    }
    return animations;
}

// took code from bubble sort
function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}