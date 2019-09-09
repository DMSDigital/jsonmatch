let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("string_nin_evals", t => {
  t.false(match(`@["string-key"] nin [ "a", null, "string" ]`)(json))
  t.true(match(`@["string-key"] nin [ "a", null ]`)(json))
  t.false(match(`@["null-key"] nin [ "a", null ]`)(json))
  t.true(match(`@["null-key"] nin [ "a", "b" ]`)(json))
  t.true(match(`@["string-arr"] nin [ "a" ]`)(json))
  t.end()
})
