let { CstParser } = require("chevrotain")
let { tokens, map } = require("./lexer")

class Parser extends CstParser {
  constructor() {
    super(tokens)

    let $ = this

    $.RULE("match", () => {
      $.SUBRULE($.either)
    })

    $.RULE("either", () => {
      $.SUBRULE($.both, { LABEL: "head" })
      $.MANY(() => {
        $.CONSUME(map.Or)
        $.SUBRULE2($.both, { LABEL: "tail" })
      })
    })

    $.RULE("both", () => {
      $.SUBRULE($.atomic, { LABEL: "head" })
      $.MANY(() => {
        $.CONSUME(map.And)
        $.SUBRULE2($.atomic, { LABEL: "tail" })
      })
    })

    $.RULE("atomic", () => {
      $.OPTION(() => {
        $.CONSUME(map.Not)
      })
      $.OR([
        { ALT: () => $.SUBRULE($.parenGroup) },
        { ALT: () => $.SUBRULE($.filter) },
      ])
    })

    $.RULE("parenGroup", () => {
      $.CONSUME(map.LParen)
      $.SUBRULE($.match)
      $.CONSUME(map.RParen)
    })

    $.RULE("filter", () => {
      $.SUBRULE($.path)
      $.OPTION(() => {
        $.OR2([
          { ALT: () => $.SUBRULE($.matchBoolean) },
          { ALT: () => $.SUBRULE($.matchValue) },
          { ALT: () => $.SUBRULE($.matchSet) },
          { ALT: () => $.SUBRULE($.matchRegex) },
        ])
      })
    })

    $.RULE("matchBoolean", () => {
      $.SUBRULE($.booleanFilter)
      $.SUBRULE($.boolean)
    })

    $.RULE("matchValue", () => {
      $.SUBRULE($.valueFilter)
      $.SUBRULE($.value)
    })

    $.RULE("matchSet", () => {
      $.SUBRULE($.setFilter)
      $.SUBRULE($.array)
    })

    $.RULE("matchRegex", () => {
      $.CONSUME(map.RegexEq)
      $.CONSUME(map.RegexLiteral)
    })

    $.RULE("path", () => {
      $.CONSUME(map.Attribute)
      $.AT_LEAST_ONE(() => $.SUBRULE($.pathElement))
    })

    $.RULE("pathElement", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(map.Dot)
            $.CONSUME(map.Identifier)
          }
        },
        {
          ALT: () => {
            $.CONSUME(map.LSquare)
            $.SUBRULE($.literal)
            $.CONSUME(map.RSquare)
          }
        },
      ])
    })

    $.RULE("booleanFilter", () => {
      $.CONSUME(map.Empty)
    })

    $.RULE("valueFilter", () => {
      $.OR([
        { ALT: () => $.CONSUME(map.Eq) },
        { ALT: () => $.CONSUME(map.Lte) },
        { ALT: () => $.CONSUME(map.Gte) },
        { ALT: () => $.CONSUME(map.Ne) },
        { ALT: () => $.CONSUME(map.Lt) },
        { ALT: () => $.CONSUME(map.Gt) },
        { ALT: () => $.CONSUME(map.Contains) },
        { ALT: () => $.CONSUME(map.Size) },
      ])
    })

    $.RULE("setFilter", () => {
      $.OR([
        { ALT: () => $.CONSUME(map.Nin) },
        { ALT: () => $.CONSUME(map.In) },
        { ALT: () => $.CONSUME(map.All) },
        { ALT: () => $.CONSUME(map.SubsetOf) },
        { ALT: () => $.CONSUME(map.AnyOf) },
        { ALT: () => $.CONSUME(map.NoneOf) },
      ])
    })

    $.RULE("logical", () => {
      $.OR([
        { ALT: () => $.CONSUME(map.And) },
        { ALT: () => $.CONSUME(map.Or) },
      ])
    })

    $.RULE("value", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.literal) },
        { ALT: () => $.SUBRULE($.boolean) },
        { ALT: () => $.SUBRULE($.array) },
        { ALT: () => $.CONSUME(map.Null) },
      ])
    })

    $.RULE("literal", () => {
      $.OR([
        { ALT: () => $.CONSUME(map.StringLiteral) },
        { ALT: () => $.CONSUME(map.NumberLiteral) },
      ])
    })

    $.RULE("boolean", () => {
      $.OR([
        { ALT: () => $.CONSUME(map.True) },
        { ALT: () => $.CONSUME(map.False) },
      ])
    })

    $.RULE("array", () => {
      $.CONSUME(map.LSquare)
      $.MANY_SEP({
        SEP: map.Comma,
        DEF: () => {
          $.SUBRULE($.value, { LABEL: "item" })
        }
      })
      $.CONSUME(map.RSquare)
    })

    $.performSelfAnalysis()
  }
}

let parser = new Parser()
// parser.Visitor = parser.getBaseCstVisitorConstructor()

module.exports = parser
