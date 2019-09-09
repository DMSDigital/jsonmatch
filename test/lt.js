let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("int_lt_evals", t => {
  t.true(match(`@["int-key"] < 10`)(json))
  t.false(match(`@["int-key"] < 0`)(json))
  t.end()
})

test("long_lt_evals", t => {
  t.true(match(`@["long-key"] < 4000000000`)(json))
  t.false(match(`@["long-key"] < 666`)(json))
  t.end()
})

test("double_lt_evals", t => {
  t.true(match(`@["double-key"] < 101.1`)(json))
  t.false(match(`@["double-key"] < 1.1`)(json))
  t.end()
})

test("string_lt_evals", t => {
  t.true(match(`@["char-key"] < "x"`)(json))
  t.false(match(`@["char-key"] < "a"`)(json))
  t.end()
})
