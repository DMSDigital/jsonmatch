let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("array_noneof_evals", t => {
  t.false(match(`@["string-arr"] noneof ["a", "z"]`)(json))
  t.false(match(`@["string-arr"] noneof ["z", "b", "a"]`)(json))
  t.true(match(`@["string-arr"] noneof ["x", "y", "z"]`)(json))
  t.end()
})
