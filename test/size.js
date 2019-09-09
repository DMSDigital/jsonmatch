let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("array_size_evals", t => {
  t.true(match(`@["string-arr"] size 5`)(json))
  t.false(match(`@["string-arr"] size 7`)(json))
  t.end()
})

test("string_size_evals", t => {
  t.true(match(`@["string-key"] size 6`)(json))
  t.false(match(`@["string-key"] size 7`)(json))
  t.end()
})

test("other_size_evals", t => {
  t.false(match(`@["int-key"] size 6`)(json))
  t.end()
})

test("null_size_evals", t => {
  t.false(match(`@["null-key"] size 6`)(json))
  t.end()
})
