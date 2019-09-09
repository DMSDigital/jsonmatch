let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("int_lte_evals", t => {
  t.true(match(`@["int-key"] <= 10`)(json))
  t.true(match(`@["int-key"] <= 1`)(json))
  t.false(match(`@["int-key"] <= 0`)(json))
  t.end()
})

test("long_lte_evals", t => {
  t.true(match(`@["long-key"] <= 4000000000`)(json))
  t.true(match(`@["long-key"] <= 3000000000`)(json))
  t.false(match(`@["long-key"] <= 666`)(json))
  t.end()
})

test("double_lte_evals", t => {
  t.true(match(`@["double-key"] <= 101.1`)(json))
  t.true(match(`@["double-key"] <= 10.1`)(json))
  t.false(match(`@["double-key"] <= 1.1`)(json))
  t.end()
})
