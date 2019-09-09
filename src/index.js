let lexer = require("./lexer")
let parser = require("./parser")
let interpreter = require("./interpreter")

let parse = (text) => {
  let lexResult = lexer.tokenize(text)
  parser.input = lexResult.tokens
  let cst = parser.match()

  return {
    cst: cst,
    errors: [ ...lexResult.errors, ...parser.errors ]
  }
}

let match = (text) => (obj) => {
  let { cst, errors } = parse(text)
  if (errors.length > 0) {
    let error = Object.assign(
      new Error(errors[0].message || "Unexpected exception"),
      errors[0],
    )
    throw error
  }
  return interpreter.visit(cst)(obj)
}

module.exports = { parse, match }
