let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("array_anyof_evals", t => {
  t.true(match(`@["string-arr"] anyof ["a", "z"]`)(json))
  t.true(match(`@["string-arr"] anyof ["z", "b", "a"]`)(json))
  t.false(match(`@["string-arr"] anyof ["x", "y", "z"]`)(json))
  t.end()
})
