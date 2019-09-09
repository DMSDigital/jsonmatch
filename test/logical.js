let test = require("tape")
let { match } = require("../src/index")

let json = {
  foo: true,
  bar: false,
  firstname: "Bob",
  surname: "Smith",
  age: 30,
}

test("or_and_filters_evaluates", t => {
  t.true(match(`@.foo == true || @.bar == true`)(json))
  t.false(match(`!(@.foo == true || @.bar == true)`)(json))
  t.false(match(`@.foo == true && @.bar == true`)(json))
  t.true(match(`!(@.foo == true && @.bar == true)`)(json))

  t.false(match(`(@.firstname == 'Bob' || @.firstname == 'Jane') && @.surname == 'Doe'`)(json))
  t.true(match(
    `(@.firstname == 'Robert' || @.firstname == 'Bob' || @.firstname == 'Bobby')` +
    ` && (((@.age >= 18) && @.age < 60) && ((@.foo == true) || @.bar == true))`
  )(json))
  t.false(match(
    `(@.firstname in ["Robert", "Bob", "Bobby"])` +
    ` && ((@.age >= 18 && @.age < 60) && (@.foo == true && @.bar == true))`
  )(json))
  t.end()
})
