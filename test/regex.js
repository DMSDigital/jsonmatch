let test = require("tape")
let { match } = require("../src/index")
let { json } = require("./fixtures")

test("string_regex_evals", t => {
  t.true(match(`@["string-key"] =~ /^string$/`)(json))
  t.false(match(`@["string-key"] =~ /^tring$/`)(json))
  t.false(match(`@["null-key"] =~ /^string$/`)(json))
  t.false(match(`@["int-key"] =~ /^string$/`)(json))
  t.end()
})
