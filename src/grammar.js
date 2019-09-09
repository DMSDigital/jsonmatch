let XRegExp = require("xregexp")
let { Lexer } = require("chevrotain")

let fragments = {}

let FRAGMENT = (name, def) => {
  fragments[name] = XRegExp.build(def, fragments)
}

let patternOf = (def, flags) => XRegExp.build(def, fragments, flags)

FRAGMENT("EscapedUnicode", "[0-9a-fA-F]{4}")
FRAGMENT("DoubleQuoteString", "\"(?:[^\\\\\"]|\\\\(?:[bfnrtv\"\\\\/]|u{{EscapedUnicode}}))*\"")
FRAGMENT("SingleQuoteString",  "'(?:[^\\\\\']|\\\\(?:[bfnrtv\'\\\\/]|u{{EscapedUnicode}}))*'")

let grammar = {
  WhiteSpace: {
    pattern: /[ ]+/,
    group: Lexer.SKIPPED,
  },

  LSquare: "[",
  RSquare: "]",
  Dot: ".",
  Attribute: "@",
  Comma: ",",
  LParen: "(",
  RParen: ")",

  Logical: {
    And: "&&",
    Or: "||",
  },

  Relational: {
    Eq: "==",
    Lte: "<=",
    Gte: ">=",
    Ne: "!=",
    Lt: "<",
    Gt: ">",
    RegexEq: "=~",
    Not: "!",
  },

  Keywords: {
    True: "true",
    False: "false",
    Null: "null",

    Nin: "nin",
    In: "in",
    Contains: "contains",
    All: "all",
    Size: "size",
    SubsetOf: "subsetof",
    AnyOf: "anyof",
    NoneOf: "noneof",
    Empty: "empty",
  },

  Identifier: /[_A-Za-z][_0-9A-Za-z]*/,

  StringLiteral: patternOf("{{DoubleQuoteString}}|{{SingleQuoteString}}"),
  NumberLiteral: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
  RegexLiteral: /\/(.*)?\/([igm]+)?/,
}

module.exports = grammar
