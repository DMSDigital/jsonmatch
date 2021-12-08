let _ = require("lodash")
let chevrotain = require("chevrotain")
let { Lexer } = chevrotain
let grammar = require("./grammar")

let type = (val) => {
  return val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1);
}

let identifierName = "Identifier"
let keywordGroup = "Keywords"

let isKeyword = categories => _.some(categories, category => category.name === keywordGroup)

let createToken = (categories, identifier) => obj => {
  let config = obj
  if (isKeyword(categories)) {
    config.longer_alt = identifier
  }
  let token = chevrotain.createToken(config)
  _.forEach(categories, category => token.CATEGORIES.push(category))
  return token
}

let getToken = (categories, identifier) => (value, name) => {
  let tokenOf = createToken(categories, identifier)

  if (type(value) === "Object" && !value.pattern) {
    let categoryToken = tokenOf({ name, pattern: Lexer.NA })
    let tokens = _.flatMap(
      value,
      getToken([ ...categories, categoryToken ], identifier)
    )
    return [
      categoryToken,
      ...tokens,
    ]
  }

  if (name === identifierName) {
    return identifier || tokenOf({ name, pattern: value })
  }

  switch (type(value)) {
    case "String":
    case "RegExp":
      return tokenOf({ name, pattern: value })
    case "Object":
      return tokenOf({ ...value, name })
  }
}

let identifierToken = getToken([], null)(grammar[identifierName], identifierName)
// console.log(type(grammar[identifierName])identifierToken)
let mapFn = getToken([], identifierToken)
let tokenList = _.flatMap(grammar, mapFn)
// console.log(tokenList)

let lexer = new Lexer(tokenList)
lexer.tokens = tokenList
lexer.map = _.reduce(
  tokenList,
  (map, token) => _.assign(map, { [token.name]: token }),
  {}
)
module.exports = lexer
