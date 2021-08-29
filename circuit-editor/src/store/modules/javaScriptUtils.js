
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