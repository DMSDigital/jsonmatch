let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("arr_int_eq_evals", t => {
  t.true(match(`@["int-arr"][2] == 2`)(json))
  t.false(match(`@["int-arr"][2] == 1`)(json))
  t.false(match(`@["int-arr"][2] == "2"`)(json))
  t.end()
})

test("int_eq_evals", t => {
  t.true(match(`@["int-key"] == 1`)(json))
  t.false(match(`@["int-key"] == 666`)(json))
  t.false(match(`@["int-key"] == "1"`)(json))
  t.end()
})

test("long_eq_evals", t => {
  t.true(match(`@["long-key"] == 3000000000`)(json))
  t.false(match(`@["long-key"] == 666`)(json))
  t.end()
})

test("double_eq_evals", t => {
  t.true(match(`@["double-key"] == 10.1`)(json))
  t.true(match(`@["double-key"] == 10.10`)(json))
  t.false(match(`@["double-key"] == 10.11`)(json))
  t.end()
})


test("string_eq_evals", t => {
  t.true(match(`@["string-key"] == "string"`)(json))
  t.false(match(`@["string-key"] == "666"`)(json))
  t.end()
})

test("boolean_eq_evals", t => {
  t.true(match(`@["boolean-key"] == true`)(json))
  t.false(match(`@["boolean-key"] == false`)(json))
  t.end()
})

test("null_eq_evals", t => {
  t.true(match(`@["null-key"] == null`)(json))
  t.false(match(`@["null-key"] == "666"`)(json))
  t.false(match(`@["string-key"] == null`)(json))
  t.end()
})

test("arr_eq_evals", t => {
  t.true(match(`@["arr-empty"] == []`)(json))
  t.true(match(`@["int-arr"] == [0,1,2,3,4]`)(json))
  t.false(match(`@["int-arr"] == [0,1,2,3]`)(json))
  t.false(match(`@["int-arr"] == [0,1,2,3,4,5]`)(json))
  t.end()
})
