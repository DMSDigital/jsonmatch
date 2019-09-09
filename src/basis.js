let _ = require("lodash")

let isCollection = value => _.isArrayLikeObject(value) || _.isString(value)

let findOp = (map, pred) => _.reduce(map, (acc, val, key) => {
  if (!_.isEmpty(acc)) return acc
  return pred(key, val) ? [key, val] : []
}, [])

let both = (f, g) => function _both() {
  return f.apply(this, arguments) && g.apply(this, arguments)
}

let either = (f, g) => function _either() {
  return f.apply(this, arguments) || g.apply(this, arguments)
}

module.exports = { isCollection, findOp, both, either }
