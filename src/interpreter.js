let _ = require("lodash")
let parser = require("./parser")

let Visitor = parser.getBaseCstVisitorConstructor()

let findOp = (ctx, map) =>
  _.reduce(
    map,
    (acc, val, key) => {
      if (!_.isEmpty(acc)) return acc
      return !!ctx[key] ? [key, val] : []
    },
    [],
  )

let Both = (f, g) =>
  function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments)
  }

let Either = (f, g) =>
  function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments)
  }

let Exists = path => obj => _.has(obj, path)

let Empty = (item, value) =>
  _.isArrayLike(item) ? _.isEmpty(item) === value : false

let Eq = _.isEqual
let Ne = _.negate(Eq)
let Lt = _.lt
let Lte = _.lte
let Gt = _.gt
let Gte = _.gte
let Contains = _.includes
let Size = (item, value) => _.size(item) === value

let setOf = op => (item, array) => _.isEmpty(op(item, array))
let In = _.flip(_.includes)
let Nin = _.negate(In)
let SubsetOf = setOf(_.difference)
let All = _.flip(SubsetOf)
let NoneOf = setOf(_.intersection)
let AnyOf = _.negate(NoneOf)

let parseString = str => {
  let result = str
  if (result.startsWith("'")) {
    result = result.replace(/"/g, '\\"').replace(/'/g, '"')
  }
  return JSON.parse(result)
}

class Interpreter extends Visitor {
  constructor() {
    super()
    this.validateVisitor()
  }

  match(ctx) {
    return this.visit(ctx.either)
  }

  either(ctx) {
    let result = this.visit(ctx.head)

    if (ctx.tail) {
      ctx.tail.forEach(filter => {
        result = Either(result, this.visit(filter))
      })
    }

    return result
  }

  both(ctx) {
    let result = this.visit(ctx.head)

    if (ctx.tail) {
      ctx.tail.forEach(filter => {
        result = Both(result, this.visit(filter))
      })
    }

    return result
  }

  atomic(ctx) {
    let over = !ctx.Not ? _.identity : _.negate
    if (ctx.filter) return over(this.visit(ctx.filter))
    if (ctx.parenGroup) return over(this.visit(ctx.parenGroup))
  }

  parenGroup(ctx) {
    return this.visit(ctx.match)
  }

  filter(ctx) {
    let path = this.visit(ctx.path)
    let predicateOf = match => obj => match(_.get(obj, path))

    let [key] = findOp(ctx, {
      matchBoolean: true,
      matchValue: true,
      matchSet: true,
      matchRegex: true,
    })

    if (!key) return Exists(path)
    return predicateOf(this.visit(ctx[key]))
  }

  matchBoolean(ctx) {
    let op = this.visit(ctx.booleanFilter)
    let value = this.visit(ctx.boolean)
    return item => op(item, value)
  }

  matchValue(ctx) {
    let op = this.visit(ctx.valueFilter)
    let value = this.visit(ctx.value)
    return item => op(item, value)
  }

  matchSet(ctx) {
    let op = this.visit(ctx.setFilter)
    let array = this.visit(ctx.array)
    return item => op(item, array)
  }

  matchRegex(ctx) {
    let [head, ...pattern] = ctx.RegexLiteral[0].image.split("/")
    let re = new RegExp(...pattern)
    return item => re.test(item)
  }

  path(ctx) {
    return ctx.pathElement.map(item => this.visit(item))
  }

  pathElement(ctx) {
    if (ctx.Dot) {
      return ctx.Identifier[0].image
    }
    return this.visit(ctx.literal)
  }

  booleanFilter(ctx) {
    let map = { Empty }
    return _.find(map, (val, key) => !!ctx[key])
  }

  valueFilter(ctx) {
    let map = { Eq, Ne, Lt, Lte, Gt, Gte, Contains, Size }
    return _.find(map, (val, key) => !!ctx[key])
  }

  setFilter(ctx) {
    let map = { In, Nin, SubsetOf, All, AnyOf, NoneOf }
    return _.find(map, (val, key) => !!ctx[key])
  }

  boolean(ctx) {
    return !!ctx.True
  }

  value(ctx) {
    let [key] = findOp(ctx, {
      literal: true,
      boolean: true,
      array: true,
    })
    if (!key) return null
    return this.visit(ctx[key])
  }

  literal(ctx) {
    let [key, fn] = findOp(ctx, {
      StringLiteral: item => parseString(item[0].image),
      NumberLiteral: item => Number(item[0].image),
    })
    if (!key) return null
    return fn(ctx[key])
  }

  array(ctx) {
    if (ctx.item) {
      return ctx.item.map(item => this.visit(item))
    }
    return []
  }
}

module.exports = new Interpreter()
