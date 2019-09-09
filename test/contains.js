let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("array_contains_evals", t => {
  t.true(match(`@["string-key"] contains "s"`)(json))
  t.false(match(`@["string-key"] contains "x"`)(json))
  t.true(match(`@["int-arr"] contains 1`)(json))
  t.false(match(`@["int-arr"] contains 7`)(json))
  t.true(match(`@["string-arr"] contains "a"`)(json))
  t.false(match(`@["string-arr"] contains "x"`)(json))
  t.end()
})
