let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("int_all_evals", t => {
  t.true(match(`@["int-arr"] all [ 0, 1 ]`)(json))
  t.false(match(`@["int-arr"] all [ 0, 7 ]`)(json))
  t.end()
})

test("string_all_evals", t => {
  t.true(match(`@["string-arr"] all [ "a", "b" ]`)(json))
  t.false(match(`@["string-arr"] all [ "a", "x" ]`)(json))
  t.end()
})

test("not_array_all_evals", t => {
  t.false(match(`@["string-key"] all [ "a", "b" ]`)(json))
  t.end()
})
