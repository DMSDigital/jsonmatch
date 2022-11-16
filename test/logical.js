let test = require("tape")
let { match } = require("../src/index")
let { logicJson } = require("./fixtures")

test("or_and_filters_evaluates", t => {
  t.true(match(`@.foo == true || @.bar == true`)(logicJson))
  t.false(match(`!(@.foo == true || @.bar == true)`)(logicJson))
  t.false(match(`@.foo == true && @.bar == true`)(logicJson))
  t.true(match(`!(@.foo == true && @.bar == true)`)(logicJson))

  t.false(
    match(
      `(@.firstname == 'Bob' || @.firstname == 'Jane') && @.surname == 'Doe'`,
    )(logicJson),
  )
  t.true(
    match(
      `(@.firstname == 'Robert' || @.firstname == 'Bob' || @.firstname == 'Bobby')` +
        ` && (((@.age >= 18) && @.age < 60) && ((@.foo == true) || @.bar == true))`,
    )(logicJson),
  )
  t.false(
    match(
      `(@.firstname in ["Robert", "Bob", "Bobby"])` +
        ` && ((@.age >= 18 && @.age < 60) && (@.foo == true && @.bar == true))`,
    )(logicJson),
  )
  t.end()
})
