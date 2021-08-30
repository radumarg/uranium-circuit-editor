
/* 
  General JavaScript utilities
*/

export function arraysAreEqual(a, b) {
  return a.every(item => b.includes(item)) && b.every(item => a.includes(item));
}

export function getDuplicateValues(array){
  const findDuplicatesArrow = array => array.filter((item, index) => array.indexOf(item) !== index)
  return findDuplicatesArrow(array);
}

// arrays must have the same size
export function zipArrays(array1, array2){
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  return zip(array1, array2);
}