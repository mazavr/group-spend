export function updateObject(...objects) {
  return Object.assign({}, ...objects);
}

export function updateObjectInArray(array, values, cb) {
  return array.map(item => item.id === values.id
    ? updateObject(item, cb ? cb(item) : values)
    : item);
}

export function deleteObjectFromArray(array, id) {
  return array.filter(item => item.id !== id);
}
