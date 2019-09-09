jsonmatch
=========

**Extended JsonPath filter expressions**


Filter Operators
-----------------

Filters are logical expressions used to filter arrays. A typical filter would be
`@.age > 18` where `@` represents the current item being processed. More
complex filters can be created with logical operators `&&` and `||`. String
literals must be enclosed by single or double quotes (`@.color == 'blue'`
or `@.color == "blue"`).   

| Operator                 | Description                                                           |
| :----------------------- | :-------------------------------------------------------------------- |
| ==                       | left is equal to right (note that 1 is not equal to '1')              |
| !=                       | left is not equal to right                                            |
| <                        | left is less than right                                               |
| <=                       | left is less or equal to right                                        |
| >                        | left is greater than right                                            |
| >=                       | left is greater than or equal to right                                |
| =~                       | left matches regular expression `@.name =~ /foo.*?/i`                 |
| in                       | left exists in right `@.size in ['S', 'M']`                           |
| nin                      | left does not exists in right                                         |
| subsetof                 | left is a subset of right `@.sizes subsetof ['S', 'M', 'L']`          |
| all                      | right is a subset of left `@.countries all ['gb', 'de', 'fr']`        |
| anyof                    | left has an intersection with right `@.sizes anyof ['M', 'L']`        |
| noneof                   | left has no intersection with right `@.sizes noneof ['M', 'L']`       |
| size                     | size of left (array or string) should match right                     |
| empty                    | left (array or string) should be empty                                |
| contains                 | left (array or string) should include right                           |

Match Examples
-------------

Given the json

```javascript
{
  "store": {
    "countries": [
      { "code": "gb" },
      { "code": "fr" },
      { "code": "de" },
    ],
    "book": {
      "category": "reference",
      "author": "Nigel Rees",
      "title": "Sayings of the Century",
      "price": 8.95
    },
    "bicycle": {
      "color": "red",
      "price": 19.95
    },
    "cart": [],
    "sizes": ["S", "M", "L"]
  },
  "additional-notice": false
}
```


| JsonMatch | Result |
| :-------- | :----- |
| @.store.countries[0].code | Match if code exists at 0 index country |
| !@.store.countries[0].flag | Match if it has no flag |
| @.store.countries[1].code == "fr" | Match if it equals "fr" |
| @["additional-notice"] == false | Match if it equals false |
| @.store.book.category != "fiction" | Match if it's not equals "fiction" |
| @.store.bicycle.price > 2 | Match if it's greater than 2 |
| @.store.book.price <= 10.10 | Match if it's less or equal to 10.10 |
| @.store.countries size 3 | Match if it there are 3 countries in the list |
| @.store.cart empty true | Match if cart is empty |
| @.store.cart empty false | Match if cart is not empty |
| @.store.sizes contains "M" | Match if it includes "M" |
| @.store.book.author =~ /rees/i | Match by regex (ignore case) |
| @.store.book.category in ["fiction", "document", "reference"] | Match if right includes category |
| @.store.book.category nin ["fiction", "poem"] | Match if right doesn't include category |
| @.store.sizes subsetof ["S", "M", "L", "XL", "XXL"] | Match if sizes is a subset of right  |
| @.store.sizes all ["S", "L"] | Match if it ["S", "L"] is a subset of sizes |
| @.store.sizes anyof ["L",  "XXL"] | Match if any of ["L", "XL", "XXL"] are present at sizes |
| @.store.sizes anyof ["XL", "XXL"] | Match if none of ["L", "XL", "XXL"] are present at sizes |


Predicates
----------

You can use `&&` and `||` to combine multiple predicates `(@.price < 10 || @.price > 20) && @.category == 'fiction'` , 
`(@.category == 'reference' && @.price > 10) || (@price == "free")`.
 
You can use `!` to negate a predicate `!(@.price < 10 && @.category == 'fiction')`.
