let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("int_ne_evals", t => {
  t.false(match(`@["int-key"] != 1`)(json))
  t.true(match(`@["int-key"] != 666`)(json))
  t.true(match(`@["int-key"] != "1"`)(json))
  t.end()
})

test("long_ne_evals", t => {
  t.false(match(`@["long-key"] != 3000000000`)(json))
  t.true(match(`@["long-key"] != 666`)(json))
  t.end()
})

test("double_ne_evals", t => {
  t.false(match(`@["double-key"] != 10.1`)(json))
  t.false(match(`@["double-key"] != 10.10`)(json))
  t.true(match(`@["double-key"] != 10.11`)(json))
  t.end()
})


test("string_ne_evals", t => {
  t.false(match(`@["string-key"] != "string"`)(json))
  t.true(match(`@["string-key"] != "666"`)(json))
  t.end()
})

test("boolean_ne_evals", t => {
  t.false(match(`@["boolean-key"] != true`)(json))
  t.true(match(`@["boolean-key"] != false`)(json))
  t.end()
})

test("null_ne_evals", t => {
  t.false(match(`@["null-key"] != null`)(json))
  t.true(match(`@["null-key"] != "666"`)(json))
  t.true(match(`@["string-key"] != null`)(json))
  t.end()
})

test("arr_ne_evals", t => {
  t.false(match(`@["arr-empty"] != []`)(json))
  t.false(match(`@["int-arr"] != [0,1,2,3,4]`)(json))
  t.true(match(`@["int-arr"] != [0,1,2,3]`)(json))
  t.true(match(`@["int-arr"] != [0,1,2,3,4,5]`)(json))
  t.end()
})
