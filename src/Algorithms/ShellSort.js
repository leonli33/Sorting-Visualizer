// shell sort is an extended version of insertion sort, where a particulat
// element in an array is not being compared to the elements next to it but a certain
// gap distance away

export function shellSort(arr) {
    // if there is only one element, the array is sorted
    if(arr.length === 1) {
        return arr;
    }

    let animations = [];

    // get the length of the array
    let length = arr.length;
    // the gap is first set to half the length of the array
    let gap = Math.floor(length/2);

    // while the gap is not zero
    while(gap > 0) {
        // go through every element starting at the gap index
        for(let i = gap; i < arr.length; i++) {
            // temp variable that is swapped later
            let temp = arr[i];
            // refers to the index of element swapped
            let last = i;

            // if the element to the left of j that is gap distance away is greater than the current element
            for(let j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                let comparedElements = {
                    firstElement: j,
                    secondElementHeight: arr[j - gap],
                }
                animations.push(comparedElements);
                // swap the elements
                arr[j] = arr[j - gap];
                last -= gap;
            }
            
            let comparedElements = {
                firstElement: last,
                secondElementHeight: temp
            }
            animations.push(comparedElements);

            arr[last] = temp;
        }
        // gap is cut in half each time (eventually becoming insertion sort when it is 1)
        gap = Math.floor(gap/2);
    }

    return animations;
}