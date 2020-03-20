// insertion sort runs in quadratic time. It works by comparing each element to the element before it,
// swapping if the element before is smaller

export function insertionSort(arr) {
    for(let i = 1; i < arr.length; i++) {
        let j = i;
        while(j > 0 && (arr[j-1] > arr[j])) {
            swap(arr,j,j-1);
            j--;
        }
    }
    return arr;
}

// took code from bubble sort
let swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
};