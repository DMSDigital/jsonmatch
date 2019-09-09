let test = require("tape")
let { parse } = require("../src/index")

test("a_filter_can_be_parsed", t => {
  t.equal(parse("@.foo").errors.length, 0)
  t.equal(parse(`@["foo"]`).errors.length, 0)
  t.equal(parse(`@["foo"][0]`).errors.length, 0)
  t.equal(parse(`@.foo[0].bar`).errors.length, 0)
  t.equal(parse("@.foo == 1").errors.length, 0)
  t.equal(parse("@.foo == 1 || @['bar']").errors.length, 0)
  t.equal(parse("@.foo == 1 && @['bar']").errors.length, 0)
  t.end()
})

test("an_invalid_filter_can_not_be_parsed", t => {
  t.notEqual(parse("[@.foo]").errors.length, 0)
  t.notEqual(parse("@.foo ||").errors.length, 0)
  t.notEqual(parse("?@.foo").errors.length, 0)
  t.end()
})
