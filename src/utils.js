export const mapValues = (obj, mapper) => Object.keys(obj).map((key) => mapper(obj[key], key))
