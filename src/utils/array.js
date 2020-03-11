export function moveInArray(array, indFrom, indTo) {
  const newArray = [...array];

  if (indTo === indFrom) {
    return newArray;
  }

  const increment = indTo < indFrom ? -1 : 1;

  for (let k = indFrom; k !== indTo; k += increment) {
    newArray[k] = array[k + increment];
  }

  newArray[indTo] = array[indFrom];

  return newArray;
}
