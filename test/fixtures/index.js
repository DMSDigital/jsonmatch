let json = {
  fe: 4,
  "int-key": 1,
  "long-key": 3000000000,
  "double-key": 10.1,
  "boolean-key": true,
  "null-key": null,
  "string-key": "string",
  "string-key-empty": "",
  "char-key": "c",
  "arr-empty": [],
  "int-arr": [0, 1, 2, 3, 4],
  "string-arr": ["a", "b", "c", "d", "e"],
}

let logicJson = {
  foo: true,
  bar: false,
  firstname: "Bob",
  surname: "Smith",
  age: 30,
}

module.exports = { json, logicJson }
