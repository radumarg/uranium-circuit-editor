
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

export function getUniqueValues(array){
  return array.filter((v, i, a) => a.indexOf(v) === i);
}

// Warning: arrays must have the same size
export function zipArrays(array1, array2){
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  return zip(array1, array2);
}

export function intersectArrays(array1, array2) {
  return array1.filter(value => array2.includes(value));
}

export function arraysHaveElementsInCommon(array1, array2) {
  const filteredArray = array1.filter(value => array2.includes(value));
  return (filteredArray.length > 0);
}

export function range(min, max) {
  const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return range(min, max);
}