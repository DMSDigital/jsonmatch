let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("int_gt_evals", t => {
  t.false(match(`@["int-key"] > 10`)(json))
  t.true(match(`@["int-key"] > 0`)(json))
  t.end()
})

test("long_gt_evals", t => {
  t.false(match(`@["long-key"] > 4000000000`)(json))
  t.true(match(`@["long-key"] > 666`)(json))
  t.end()
})

test("double_gt_evals", t => {
  t.false(match(`@["double-key"] > 101.1`)(json))
  t.true(match(`@["double-key"] > 1.1`)(json))
  t.end()
})

test("string_gt_evals", t => {
  t.false(match(`@["char-key"] > "x"`)(json))
  t.true(match(`@["char-key"] > "a"`)(json))
  t.end()
})
