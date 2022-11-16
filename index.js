let { match, parse } = require("./src")

let json = {
  foo: true,
  bar: false,
  firstname: "Bob",
  surname: "Smith",
  age: 30,
}

console.log(
  33,
  match(`@.firstname in ['Bob', 'Jane'] && @.surname == 'Smith'`)(json),
)

// console.log(parse("@.foo").parseErrors)
// console.log(parse("@.foo == 1").parseErrors)

// console.log(parse({ price: 10 }, `@.price > 8.95`))
// console.log(parse(`@.price.value > 10`))
// console.log(parse(`@["price"]["value"] != "val"`))
// console.log(parse(`@['a'] contains 'a'`))
// console.log(parse(`@['a'] size 5`))
//
// console.log(parse(`@.price`))
// console.log(parse({ price: 13 }, `!@.pricee`))
//
// console.log(parse(`@['a'] nin [1]`))
// console.log(parse(`@['a'] in ['a']`))
// console.log(parse(`@['a'] all ['a','b']`))
// console.log(parse(`@['a'] subsetof []`))
// console.log(parse(`@['a'] anyof []`))
// console.log(parse(`@['a'] noneof []`))
//
// console.log(parse({ a: [] }, `@['a'] empty true`))
// console.log(parse({ a: { b: [] } }, `@.a.b empty true`))
//
// console.log(parse(`@['a'] in ['1','2']`))
// console.log(parse(`@['a']['b']['c'] in ['1','2']`))
//
// console.log(parse(`@['a'] == 1 && @['b'] == 2 && @['c'] == 2`))
// console.log(parse(`@['a'] == 1 || @['b'] == 2`))
//
// console.log(parse(`@['a'] =~ /.*?/i`))
// console.log(parse(`@.author =~ /.*REES/i`))
// console.log(parser)
