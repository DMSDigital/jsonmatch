let _ = require("lodash")
let chevrotain = require("chevrotain")
let { Lexer } = chevrotain
let grammar = require("./grammar")

let type = val => {
  if (val === null) return "Null"
  if (val === undefined) return "Undefined"
  return Object.prototype.toString.call(val).slice(8, -1)
}

let identifierName = "Identifier"
let keywordGroup = "Keywords"

let isKeyword = categories => _.some(categories, { name: keywordGroup })

let identifierToken = chevrotain.createToken({
  name: identifierName,
  pattern: grammar[identifierName],
})

let createToken = categories => obj => {
  let config = { categories }
  if (isKeyword(categories)) {
    config.longer_alt = identifierToken
  }
  return chevrotain.createToken({
    ...obj,
    ...config,
  })
}

let getToken = categories => (value, name) => {
  let tokenOf = createToken(categories)

  if (type(value) === "Object" && !value.pattern) {
    let categoryToken = tokenOf({ name, pattern: Lexer.NA })
    let tokens = _.flatMap(value, getToken([...categories, categoryToken]))
    return [categoryToken, ...tokens]
  }

  if (name === identifierName) {
    return identifierToken
  }

  switch (type(value)) {
    case "String":
    case "RegExp":
      return tokenOf({ name, pattern: value })
    case "Object":
      return tokenOf({ ...value, name })
  }
}

let tokenList = _.flatMap(grammar, getToken([]))

let lexer = new Lexer(tokenList)
lexer.tokens = tokenList
lexer.map = _.keyBy(tokenList, "name")
module.exports = lexer
