// insertion sort runs in quadratic time. It works by comparing each element to the element before it,
// swapping if the element before is smaller

export function insertionSort(arr) {
    let animations = [];
    for(let i = 1; i < arr.length; i++) {
        let j = i;
        let comparedElements = {
            firstElement: i,
            secondElement: j,
            swap: false
        }
        animations.push(comparedElements);
        while(j > 0 && (arr[j-1] > arr[j])) {
            let comparedElement = {
                firstElement: j,
                firstElementHeight: arr[j],
                secondElement: j - 1,
                secondElementHeight: arr[j - 1],
                swap: true
            }
            animations.push(comparedElement);
            swap(arr,j,j-1);
            j--;                    
        }
    }
    return animations;
}

// took code from bubble sort
let swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
};