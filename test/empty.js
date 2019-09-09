let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("empty_evals", t => {
  t.true(match(`@["string-key"] empty false`)(json))
  t.false(match(`@["string-key"] empty true`)(json))

  t.true(match(`@["string-key-empty"] empty true`)(json))
  t.false(match(`@["string-key-empty"] empty false`)(json))

  t.true(match(`@["int-arr"] empty false`)(json))
  t.false(match(`@["int-arr"] empty true`)(json))

  t.true(match(`@["arr-empty"] empty true`)(json))
  t.false(match(`@["arr-empty"] empty false`)(json))

  t.false(match(`@["null-key"] empty true`)(json))
  t.false(match(`@["null-key"] empty false`)(json))

  t.end()
})
