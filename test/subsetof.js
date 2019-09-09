let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("array_subsetof_evals", t => {
  t.true(match(`@["string-arr"] subsetof ["a", "b", "c", "d", "e", "f", "g"]`)(json))
  t.true(match(`@["string-arr"] subsetof ["e", "d", "b", "c", "a"]`)(json))
  t.false(match(`@["string-arr"] subsetof ["a", "b", "c", "d"]`)(json))
  t.end()
})
