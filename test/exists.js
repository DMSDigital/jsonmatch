let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("exists_evals", t => {
  t.true(match(`@["string-key"]`)(json))
  t.false(match(`!@["string-key"]`)(json))
  t.false(match(`@["missing-key"]`)(json))
  t.true(match(`!@["missing-key"]`)(json))
  t.end()
})
