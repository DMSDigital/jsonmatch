let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("string_in_evals", t => {
  t.true(match(`@["string-key"] in [ "a", null, "string" ]`)(json))
  t.false(match(`@["string-key"] in [ "a", null ]`)(json))
  t.true(match(`@["null-key"] in [ "a", null ]`)(json))
  t.false(match(`@["null-key"] in [ "a", "b" ]`)(json))
  t.false(match(`@["string-arr"] in [ "a" ]`)(json))
  t.end()
})
