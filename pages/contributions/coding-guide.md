# Coding Guidelines

We use a resonably strict coding style to ensure that the code is easy to read and maintain. This document is a summary of the coding style that we use. We implemented these coding practices in our eslint configuration. You can find the eslint configuration in the `.eslintrc.js` file in the root of the project. We will keep updating this document as we find better ways to write code along side updating the eslint configuration.

If you see any piece of code that does not follow the guidelines, please feel free to fix it and submit a pull request.

This style guide is applicable to code written in the following languages:

-   TypeScript (`.ts`)
-   React TypeScript (`.tsx`)

## Table of Contents

You can find the table of contents for this document on the right side of the page. It is recommended to read through the entire document to get a good understanding of the coding style. However, if you are looking for something specific, you can use the table of contents to jump to that section.

### Naming Conventions

-   Always use PascalCase and suffix with the word `Type` when defining new types in TypeScript.

    ```typescript
    // bad, not PascalCase and not suffixed with Type
    type user = {
    	name: string;
    	age: number;
    };

    // good
    type UserType = {
    	name: string;
    	age: number;
    };

    // good
    type CheckoutSessionType = {
    	session: {};
    };
    ```

-   Avoid single letter names. Be descriptive with your naming.

    ```typescript
    // bad
    function q() {
    	// ...
    }

    // good
    function query() {
    	// ...
    }
    ```

-   Use camelCase when naming objects, functions, and instances.

    ```typescript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

-   Use PascalCase only when naming constructors or classes.

    ```typescript
    // bad
    function user(options) {
    	this.name = options.name;
    }

    const bad = new user({
    	name: "nope",
    });

    // good
    class User {
    	constructor(options) {
    		this.name = options.name;
    	}
    }

    const good = new User({
    	name: "yup",
    });
    ```

-   Do not use trailing or leading underscores. JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won’t count as breaking, or that tests aren’t needed. tl;dr: if you want something to be “private”, it must not be observably present.

    ```typescript
    // bad
    this.__firstName__ = "Panda";
    this.firstName_ = "Panda";
    this._firstName = "Panda";

    // good
    this.firstName = "Panda";

    // good, in environments where WeakMaps are available
    const firstNames = new WeakMap();
    firstNames.set(this, "Panda");
    ```

-   Don’t save references to `this`. Use arrow functions or [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

    ```typescript
    // bad
    function foo() {
    	const self = this;
    	return function () {
    		console.log(self);
    	};
    }

    // bad
    function foo() {
    	const that = this;
    	return function () {
    		console.log(that);
    	};
    }

    // good
    function foo() {
    	return () => {
    		console.log(this);
    	};
    }
    ```

-   A base filename should exactly match the name of its default export.

    ```typescript
    // file 1 contents
    class CheckBox {
    	// ...
    }
    export default CheckBox;

    // file 2 contents
    export default function fortyTwo() {
    	return 42;
    }

    // file 3 contents
    export default function insideDirectory() {}

    // in some other file
    // bad
    import CheckBox from "@/checkBox"; // PascalCase import/export, camelCase filename
    import FortyTwo from "@/FortyTwo"; // PascalCase import/filename, camelCase export
    import InsideDirectory from "@/InsideDirectory"; // PascalCase import/filename, camelCase export

    // bad
    import CheckBox from "@/check_box"; // PascalCase import/export, snake_case filename
    import forty_two from "@/forty_two"; // snake_case import/filename, camelCase export
    import inside_directory from "@/inside_directory"; // snake_case import, camelCase export
    import index from "@/inside_directory/index"; // requiring the index file explicitly
    import insideDirectory from "@/insideDirectory/index"; // requiring the index file explicitly

    // good
    import CheckBox from "@/CheckBox"; // PascalCase export/import/filename
    import fortyTwo from "@/fortyTwo"; // camelCase export/import/filename
    import insideDirectory from "@/insideDirectory"; // camelCase export/import/directory name/implicit "index"
    // ^ supports both insideDirectory.js and insideDirectory/index.js
    ```

-   Use camelCase when you export-default a function. Your filename should be identical to your function’s name.

    ```typescript
    function makeStyleGuide() {
    	// ...
    }

    export default makeStyleGuide;
    ```

-   Use PascalCase when you export a constructor / class / singleton / function library / bare object.

    ```typescript
    const CheckoutSession = {
    	session: {},
    };

    export default CheckoutSession;
    ```

-   Acronyms and initialisms should always be all uppercased, or all lowercased. Names are for readability, not to appease a computer algorithm.

    ```typescript
    // bad
    import SmsContainer from "@/containers/SmsContainer";

    // bad
    const HttpRequests = [
    	// ...
    ];

    // good
    import SMSContainer from "@/containers/SMSContainer";

    // good
    const HTTPRequests = [
    	// ...
    ];

    // also good
    const httpRequests = [
    	// ...
    ];

    // best
    import TextMessageContainer from "@/containers/TextMessageContainer";

    // best
    const requests = [
    	// ...
    ];
    ```

-   You may optionally uppercase a constant only if it (1) is exported, (2) is a `const` (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change. This is an additional tool to assist in situations where the programmer would be unsure if a variable might ever change. UPPERCASE_VARIABLES are letting the programmer know that they can trust the variable (and its properties) not to change.

    -   What about all `const` variables? - This is unnecessary, so uppercasing should not be used for constants within a file. It should be used for exported constants however.
    -   What about exported objects? - Uppercase at the top level of export (e.g. `EXPORTED_OBJECT.key`) and maintain that all nested properties do not change.

    ```typescript
    // bad
    const PRIVATE_VARIABLE = "should not be unnecessarily uppercased within a file";

    // bad
    export const THING_TO_BE_CHANGED = "should obviously not be uppercased";

    // bad
    export let REASSIGNABLE_VARIABLE = "do not use let with uppercase variables";

    // ---

    // allowed but does not supply semantic value
    export const apiKey = "SOMEKEY";

    // better in most cases
    export const API_KEY = "SOMEKEY";

    // ---

    // bad - unnecessarily uppercases key while adding no semantic value
    export const MAPPING = {
    	KEY: "value",
    };

    // good
    export const MAPPING = {
    	key: "value",
    };
    ```

### References

-   Use `const` for all of your references; avoid using `var`. This ensures that you can't reassign your references, which can lead to bugs and difficult to comprehend code.

    ```typescript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

-   If you must reassign references, use `let` instead of `var`. Why? `let` is block-scoped rather than function-scoped like `var`.

    ```typescript
    // bad
    var count = 1;
    if (true) {
    	count += 1;
    }

    // good, use the let.
    let count = 1;
    if (true) {
    	count += 1;
    }
    ```

-   Both `let` and `const` are block-scoped, whereas `var` is function-scoped.

    ```typescript
    // const and let only exist in the blocks they are defined in.
    {
    	let a = 1;
    	const b = 1;
    	var c = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    console.log(c); // Prints 1
    ```

    In the above code, you can see that referencing `a` and `b` will produce a ReferenceError, while `c` contains the number. This is because `a` and `b` are block scoped, while `c` is scoped to the containing function.

### Objects

-   Use the literal syntax for object creation.

    ```typescript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

-   Use object method shorthand.

    ```typescript
    // bad
    const atom = {
    	value: 1,

    	addValue: function (value) {
    		return atom.value + value;
    	},
    };

    // good
    const atom = {
    	value: 1,

    	addValue(value) {
    		return atom.value + value;
    	},
    };
    ```

-   Use property value shorthand as tt is shorter and descriptive.

    ```typescript
    const lewisHamilton = "Lewis Hamilton";

    // bad
    const obj = {
    	lewisHamilton: lewisHamilton,
    };

    // good
    const obj = {
    	lewisHamilton,
    };
    ```

-   Group your shorthand properties at the beginning of your object declaration because it’s easier to tell which properties are using the shorthand.

    ```typescript
    const lewisHamilton = "Lewis Hamilton";
    const maxVerstappen = "Max Verstappen";

    // bad
    const obj = {
    	episodeOne: 1,
    	numberOfRaces: 2,
    	lewisHamilton,
    	episodeThree: 3,
    	mayTheFourth: 4,
    	maxVerstappen,
    };

    // good
    const obj = {
    	lewisHamilton,
    	maxVerstappen,
    	episodeOne: 1,
    	numberOfRaces: 2,
    	episodeThree: 3,
    	mayTheFourth: 4,
    };
    ```

-   Only quote properties that are invalid identifiers. In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

    ```typescript
    // bad
    const bad = {
    	foo: 3,
    	bar: 4,
    	"data-blah": 5,
    };

    // good
    const good = {
    	foo: 3,
    	bar: 4,
    	"data-blah": 5,
    };
    ```

-   Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`. These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`). In modern browsers that support ES2022, or with a polyfill such as <https://npmjs.com/object.hasown>, `Object.hasOwn` can also be used as an alternative to `Object.prototype.hasOwnProperty.call`.

    ```typescript
    // bad
    console.log(object.hasOwnProperty(key));

    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // better
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    console.log(has.call(object, key));

    // best
    console.log(Object.hasOwn(object, key)); // only supported in browsers that support ES2022

    /* or */
    import has from "has"; // https://www.npmjs.com/package/has
    console.log(has(object, key));
    /* or */
    console.log(Object.hasOwn(object, key)); // https://www.npmjs.com/package/object.hasown
    ```

-   Prefer the object spread syntax over [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to shallow-copy objects. Use the object rest parameter syntax to get a new object with certain properties omitted.

    ```typescript
    // very bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this

    // bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

    // good
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
    ```

---

### Arrays

-   Use the literal syntax for array creation.

    ```typescript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```

-   Use [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

    ```typescript
    const someStack = [];

    // bad
    someStack[someStack.length] = "abracadabra";

    // good
    someStack.push("abracadabra");
    ```

-   Use array spreads `...` to copy arrays.

    ```typescript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i += 1) {
    	itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```

-   Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) for converting an array-like object to an array.

    ```typescript
    const arrLike = { 0: "foo", 1: "bar", 2: "baz", length: 3 };

    // bad
    const arr = Array.prototype.slice.call(arrLike);

    // good
    const arr = Array.from(arrLike);
    ```

-   Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) instead of spread `...` for mapping over iterables, because it avoids creating an intermediate array.

    ```typescript
    // bad
    const baz = [...foo].map(bar);

    // good
    const baz = Array.from(foo, bar);
    ```

-   Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following [8.2](#arrows--implicit-return).

    ```typescript
    // good
    [1, 2, 3].map(x => {
    	const y = x + 1;
    	return x * y;
    });

    // good
    [1, 2, 3].map(x => x + 1);

    // bad - no returned value means `acc` becomes undefined after the first iteration
    [
    	[0, 1],
    	[2, 3],
    	[4, 5],
    ].reduce((acc, item, index) => {
    	const flatten = acc.concat(item);
    });

    // good
    [
    	[0, 1],
    	[2, 3],
    	[4, 5],
    ].reduce((acc, item, index) => {
    	const flatten = acc.concat(item);
    	return flatten;
    });

    // bad
    inbox.filter(msg => {
    	const { subject, author } = msg;
    	if (subject === "Mockingbird") {
    		return author === "Harper Lee";
    	} else {
    		return false;
    	}
    });

    // good
    inbox.filter(msg => {
    	const { subject, author } = msg;
    	if (subject === "Mockingbird") {
    		return author === "Harper Lee";
    	}

    	return false;
    });
    ```

-   Use line breaks after opening array brackets and before closing array brackets, if an array has multiple lines

    ```typescript
    // bad
    const arr = [
    	[0, 1],
    	[2, 3],
    	[4, 5],
    ];

    const objectInArray = [
    	{
    		id: 1,
    	},
    	{
    		id: 2,
    	},
    ];

    const numberInArray = [1, 2];

    // good
    const arr = [
    	[0, 1],
    	[2, 3],
    	[4, 5],
    ];

    const objectInArray = [
    	{
    		id: 1,
    	},
    	{
    		id: 2,
    	},
    ];

    const numberInArray = [1, 2];
    ```

### Destructuring

-   Use object destructuring when accessing and using multiple properties of an object. Destructuring saves you from creating temporary references for those properties, and from repetitive access of the object. Repeating object access creates more repetitive code, requires more reading, and creates more opportunities for mistakes. Destructuring objects also provides a single site of definition of the object structure that is used in the block, rather than requiring reading the entire block to determine what is used.

    ```typescript
    // bad
    function getFullName(user) {
    	const firstName = user.firstName;
    	const lastName = user.lastName;

    	return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
    	const { firstName, lastName } = user;
    	return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
    	return `${firstName} ${lastName}`;
    }
    ```

-   Use array destructuring.

    ```typescript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

-   Use object destructuring for multiple return values, not array destructuring because you can add new properties over time or change the order of things without breaking call sites.

    ```typescript
    // bad
    function processInput(input) {
    	// then a miracle occurs
    	return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
    	// then a miracle occurs
    	return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ```

### Strings

-   Use **double** quotes `""` for strings.

    ```typescript
    // bad
    const name = "Capt. Janeway";

    // bad - template literals should contain interpolation or newlines
    const name = `Capt. Janeway`;

    // good
    const name = "Capt. Janeway";
    ```

-   Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation because broken strings are painful to work with and make code less searchable.

    ```typescript
    // bad
    const errorMessage =
    	"This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.";

    // bad
    const errorMessage =
    	"This is a super long error that was thrown because " +
    	"of Batman. When you stop to think about how Batman had anything to do " +
    	"with this, you would get nowhere fast.";

    // good
    const errorMessage =
    	"This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.";
    ```

-   When programmatically building up strings, use template strings instead of concatenation because template strings give you a readable, concise syntax with proper newlines and string interpolation features.

    ```typescript
    // bad
    function sayHi(name) {
    	return "How are you, " + name + "?";
    }

    // bad
    function sayHi(name) {
    	return ["How are you, ", name, "?"].join();
    }

    // bad
    function sayHi(name) {
    	return `How are you, ${name}?`;
    }

    // good
    function sayHi(name) {
    	return `How are you, ${name}?`;
    }
    ```

-   Never use `eval()` on a string; it opens too many vulnerabilities because JavaScript’s `eval()` function is potentially dangerous and is often misused. Using `eval()` on untrusted code can open a program up to several different injection attacks. The use of `eval()` in most contexts can be substituted for a better, alternative approach to a problem.

-   Please do not unnecessarily escape characters in strings. We have seen a lot of experienced developers do this. Why? Backslashes harm readability, thus they should only be present when necessary.

    ```typescript
    // bad
    const foo = "'this' is \"quoted\"";

    // good
    const foo = "'this' is \"quoted\"";
    const foo = `my name is '${name}'`;
    ```

### Functions

-   Use named function expressions instead of function declarations because function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module!

    ```typescript
    // bad
    const foo = function () {
    	// ...
    };

    // good
    function foo() {
    	// ...
    }
    ```

-   Wrap immediately invoked function expressions in parentheses. An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this. Note that in a world with modules everywhere, you almost never need an IIFE.

    ```typescript
    // immediately-invoked function expression (IIFE)
    (function () {
    	console.log("Welcome to the Internet. Please follow me.");
    })();
    ```

-   Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.

    ```typescript
    // bad
    if (currentUser) {
    	function test() {
    		console.log("Nope.");
    	}
    }

    // good
    let test;
    if (currentUser) {
    	test = () => {
    		console.log("Yup.");
    	};
    }
    ```

-   Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

    ```typescript
    // bad
    function foo(name, options, arguments) {
    	// ...
    }

    // good
    function foo(name, options, args) {
    	// ...
    }
    ```

-   Never use `arguments`, opt to use rest syntax `...` instead. `...` is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like `arguments`.

    ```typescript
    // bad
    function concatenateAll() {
    	const args = Array.prototype.slice.call(arguments);
    	return args.join("");
    }

    // good
    function concatenateAll(...args) {
    	return args.join("");
    }
    ```

-   Use default parameter syntax rather than mutating function arguments.

    ```typescript
    // really bad
    function handleThings(opts) {
    	// No! We shouldn’t mutate function arguments.
    	// Double bad: if opts is falsy it'll be set to an object which may
    	// be what you want but it can introduce subtle bugs.
    	opts = opts || {};
    	// ...
    }

    // still bad
    function handleThings(opts) {
    	if (opts === void 0) {
    		opts = {};
    	}
    	// ...
    }

    // good
    function handleThings(opts = {}) {
    	// ...
    }
    ```

-   Avoid side effects with default parameters. They are confusing to reason about.

    ```typescript
    let b = 1;
    // bad
    function count(a = b++) {
    	console.log(a);
    }
    count(); // 1
    count(); // 2
    count(3); // 3
    count(); // 3
    ```

-   Always put default parameters last. It’s a cleaner syntax.

    ```typescript
    // bad
    function handleThings(opts = {}, name) {
    	// ...
    }

    // good
    function handleThings(name, opts = {}) {
    	// ...
    }
    ```

-   Never use the Function constructor to create a new function. Creating a function like this evaluates a string similarly to `eval()`, which opens vulnerabilities.

    ```typescript
    // bad
    const add = new Function("a", "b", "return a + b");

    // still bad
    const subtract = Function("a", "b", "return a - b");
    ```

-   Spacing in a function signature because consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

    ```typescript
    // bad
    const f = function () {};
    const g = function () {};
    const h = function () {};

    // good
    const x = function () {};
    const y = function a() {};
    ```

-   Never mutate parameters. Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

    ```typescript
    // bad
    function f1(obj) {
    	obj.key = 1;
    }

    // good
    function f2(obj) {
    	const key = Object.prototype.hasOwnProperty.call(obj, "key") ? obj.key : 1;
    }
    ```

-   Never reassign parameters. Reassigning parameters can lead to unexpected behavior, especially when accessing the `arguments` object. It can also cause optimization issues, especially in V8.

    ```typescript
    // bad
    function f1(a) {
    	a = 1;
    	// ...
    }

    function f2(a) {
    	if (!a) {
    		a = 1;
    	}
    	// ...
    }

    // good
    function f3(a) {
    	const b = a || 1;
    	// ...
    }

    function f4(a = 1) {
    	// ...
    }
    ```

-   Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item.

    ```typescript
    // bad
    function foo(bar, baz, quux) {
    	// ...
    }

    // good
    function foo(bar, baz, quux) {
    	// ...
    }

    // bad
    console.log(foo, bar, baz);

    // good
    console.log(foo, bar, baz);
    ```

### Arrow Functions

-   When you must use an anonymous function (as when passing an inline callback), use arrow function notation.

    ```typescript
    // bad
    [1, 2, 3].map(function (x) {
    	const y = x + 1;
    	return x * y;
    });

    // good
    [1, 2, 3].map(x => {
    	const y = x + 1;
    	return x * y;
    });
    ```

-   If the function body consists of a single statement returning an [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement because it is syntactic sugar. It reads well when multiple functions are chained together.

    ```typescript
    // bad
    [1, 2, 3].map(number => {
    	const nextNumber = number + 1;
    	`A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map(number => `A string containing the ${number + 1}.`);

    // good
    [1, 2, 3].map(number => {
    	const nextNumber = number + 1;
    	return `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number, index) => ({
    	[index]: number,
    }));

    // No implicit return with side effects
    function foo(callback) {
    	const val = callback();
    	if (val === true) {
    		// Do something if callback returns true
    	}
    }

    let bool = false;

    // bad
    foo(() => (bool = true));

    // good
    foo(() => {
    	bool = true;
    });
    ```

-   In case the expression spans over multiple lines, wrap it in parentheses for better readability. It shows clearly where the function starts and ends.

    ```typescript
    // bad
    ["get", "post", "put"].map(httpMethod =>
    	Object.prototype.hasOwnProperty.call(httpMagicObjectWithAVeryLongName, httpMethod)
    );

    // good
    ["get", "post", "put"].map(httpMethod =>
    	Object.prototype.hasOwnProperty.call(httpMagicObjectWithAVeryLongName, httpMethod)
    );
    ```

-   Always include parentheses around arguments for clarity and consistency because it minimizes diff churn when adding or removing arguments.

    ```typescript
    // bad
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].map(x => x * x);

    // bad
    [1, 2, 3].map(
    	number =>
    		`A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    );

    // good
    [1, 2, 3].map(
    	number =>
    		`A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    );

    // bad
    [1, 2, 3].map(x => {
    	const y = x + 1;
    	return x * y;
    });

    // good
    [1, 2, 3].map(x => {
    	const y = x + 1;
    	return x * y;
    });
    ```

-   Avoid confusing arrow function syntax (`=>`) with comparison operators (`<=`, `>=`).

    ```typescript
    // bad
    const itemHeight = item => (item.height <= 256 ? item.largeSize : item.smallSize);

    // bad
    const itemHeight = item => (item.height >= 256 ? item.largeSize : item.smallSize);

    // good
    const itemHeight = item => (item.height <= 256 ? item.largeSize : item.smallSize);

    // good
    const itemHeight = item => {
    	const { height, largeSize, smallSize } = item;
    	return height <= 256 ? largeSize : smallSize;
    };
    ```

-   Enforce the location of arrow function bodies with implicit returns.

    ```typescript
    // bad
    foo => bar;

    foo => bar;

    // good
    foo => bar;
    foo => bar;
    foo => bar;
    ```

### Modules

-   Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.

    ```typescript
    // bad
    const CheckoutSession = require("@/checkout-session");
    module.exports = CheckoutSession.session;

    // ok
    import CheckoutSession from "@/checkout-session";
    export default CheckoutSession.session;

    // best
    import { CheckoutSession } from "@/checkout-session";
    export default CheckoutSession;
    ```

-   Do not use wildcard imports unless it is absolutely necessary.

    ```typescript
    // bad
    import * as CheckoutSession from "@/checkout-session";

    // good
    import CheckoutSession from "@/checkout-session";
    ```

-   Do not export directly from an import.

    ```typescript
    // bad
    // filename session.js
    export { session as default } from "@/checkout-session";

    // good
    // filename session.js
    import { session } from "@/checkout-session";
    export default session;
    ```

-   Only import from a path in one place.

    ```typescript
    // bad
    import foo from "foo";
    // … some other imports … //
    import { named1, named2 } from "foo";

    // good
    import foo, { named1, named2 } from "foo";

    // good
    import foo, { named1, named2 } from "foo";
    ```

-   Do not export mutable bindings. Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported.

    ```typescript
    // bad
    let foo = 3;
    export { foo };

    // good
    const foo = 3;
    export { foo };
    ```

-   In modules with a single export, prefer default export over named export.

    ```typescript
    // bad
    export function foo() {}

    // good
    export default function foo() {}
    ```

-   Put all `import`s above non-import statements because`import`s are hoisted, keeping them all at the top prevents surprising behavior.

    ```typescript
    // bad
    import foo from "foo";
    foo.init();

    import bar from "bar";

    // good
    import foo from "foo";
    import bar from "bar";

    foo.init();
    ```

-   Multiline imports should be indented just like multiline array and object literals.

    ```typescript
    // bad
    import { longNameA, longNameB, longNameC, longNameD, longNameE } from "path";

    // good
    import { longNameA, longNameB, longNameC, longNameD, longNameE } from "path";
    ```

-   Do not include JavaScript filename extensions

    ```typescript
    // bad
    import foo from "@/foo.js";
    import bar from "@/bar.jsx";
    import baz from "@/baz/index.jsx";

    // good
    import foo from "@/foo";
    import bar from "@/bar";
    import baz from "@/baz";
    ```

### Iterators and Generators

-   Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like `for-in` or `for-of`. This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
    Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

        ```typescript
        const numbers = [1, 2, 3, 4, 5];

        // bad
        let sum = 0;
        for (let num of numbers) {
        	sum += num;
        }
        sum === 15;

        // good
        let sum = 0;
        numbers.forEach(num => {
        	sum += num;
        });
        sum === 15;

        // best (use the functional force)
        const sum = numbers.reduce((total, num) => total + num, 0);
        sum === 15;

        // bad
        const increasedByOne = [];
        for (let i = 0; i < numbers.length; i++) {
        	increasedByOne.push(numbers[i] + 1);
        }

        // good
        const increasedByOne = [];
        numbers.forEach(num => {
        	increasedByOne.push(num + 1);
        });

        // best (keeping it functional)
        const increasedByOne = numbers.map(num => num + 1);
        ```

### Properties

-   Use dot notation when accessing properties.

    ```typescript
    const luke = {
    	jedi: true,
    	age: 28,
    };

    // bad
    const isJedi = luke["jedi"];

    // good
    const isJedi = luke.jedi;
    ```

-   Use bracket notation `[]` when accessing properties with a variable.

    ```typescript
    const luke = {
    	jedi: true,
    	age: 28,
    };

    function getProp(prop) {
    	return luke[prop];
    }

    const isJedi = getProp("jedi");
    ```

-   Use exponentiation operator `**` when calculating exponentiations.

    ```typescript
    // bad
    const binary = Math.pow(2, 10);

    // good
    const binary = 2 ** 10;
    ```

### Variables

-   Always use `const` or `let` to declare variables. Not doing so will result in global variables.

    ```typescript
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

-   Use one `const` or `let` declaration per variable or assignment. It’s easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

    ```typescript
    // bad
    const items = getItems(),
    	goSportsTeam = true,
    	dragonball = "z";

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
    	goSportsTeam = true;
    dragonball = "z";

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = "z";
    ```

-   Group all your `const`s and then group all your `let`s. This is helpful when later on you might need to assign a variable depending on one of the previously assigned variables.

    ```typescript
    // bad
    let i,
    	len,
    	dragonball,
    	items = getItems(),
    	goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```

-   Assign variables where you need them, but place them in a reasonable place. `let` and `const` are block scoped and not function scoped.

    ```typescript
    // bad - unnecessary function call
    function checkName(hasName) {
    	const name = getName();

    	if (hasName === "test") {
    		return false;
    	}

    	if (name === "test") {
    		this.setName("");
    		return false;
    	}

    	return name;
    }

    // good
    function checkName(hasName) {
    	if (hasName === "test") {
    		return false;
    	}

    	const name = getName();

    	if (name === "test") {
    		this.setName("");
    		return false;
    	}

    	return name;
    }
    ```

-   Don’t chain variable assignments. Chaining variable assignments creates implicit global variables.

    ```typescript
    // bad
    (function example() {
    	// JavaScript interprets this as
    	// let a = ( b = ( c = 1 ) );
    	// The let keyword only applies to variable a; variables b and c become
    	// global variables.
    	let a = (b = c = 1);
    })();

    console.log(a); // throws ReferenceError
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
    	let a = 1;
    	let b = a;
    	let c = a;
    })();

    console.log(a); // throws ReferenceError
    console.log(b); // throws ReferenceError
    console.log(c); // throws ReferenceError

    // the same applies for `const`
    ```

-   Avoid using unary increments and decrements (`++`, `--`). As per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.

    ```typescript
    // bad

    const array = [1, 2, 3];
    let num = 1;
    num++;
    --num;

    let sum = 0;
    let truthyCount = 0;
    for (let i = 0; i < array.length; i++) {
    	let value = array[i];
    	sum += value;
    	if (value) {
    		truthyCount++;
    	}
    }

    // good

    const array = [1, 2, 3];
    let num = 1;
    num += 1;
    num -= 1;

    const sum = array.reduce((a, b) => a + b, 0);
    const truthyCount = array.filter(Boolean).length;
    ```

-   Avoid linebreaks before or after `=` in an assignment.

    ```typescript
    // bad
    const foo = superLongLongLongLongLongLongLongLongFunctionName();

    // bad
    const foo = "superLongLongLongLongLongLongLongLongString";

    // good
    const foo = superLongLongLongLongLongLongLongLongFunctionName();

    // good
    const foo = "superLongLongLongLongLongLongLongLongString";
    ```

-   Disallow unused variables. Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such variables take up space in the code and can lead to confusion by readers.

    ```typescript
    // bad

    const some_unused_var = 42;

    // Write-only variables are not considered as used.
    let y = 10;
    y = 5;

    // A read for a modification of itself is not considered as used.
    let z = 0;
    z = z + 1;

    // Unused function arguments.
    function getX(x, y) {
    	return x;
    }

    // good

    function getXPlusY(x, y) {
    	return x + y;
    }

    const x = 1;
    const y = a + 2;

    alert(getXPlusY(x, y));

    // 'type' is ignored even if unused because it has a rest property sibling.
    // This is a form of extracting an object that omits the specified keys.
    const { type, ...coords } = data;
    // 'coords' is now the 'data' object without its 'type' property.
    ```

### Hoisting

-   `var` declarations get hoisted to the top of their closest enclosing function scope, their assignment does not. `const` and `let` declarations are blessed with a new concept called [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz). It’s important to know why [typeof is no longer safe](https://web.archive.org/web/20200121061528/http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).

    ```typescript
    // we know this wouldn’t work (assuming there
    // is no notDefined global variable)
    function example() {
    	console.log(notDefined); // => throws a ReferenceError
    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
    	console.log(declaredButNotAssigned); // => undefined
    	var declaredButNotAssigned = true;
    }

    // the interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
    	let declaredButNotAssigned;
    	console.log(declaredButNotAssigned); // => undefined
    	declaredButNotAssigned = true;
    }

    // using const and let
    function example() {
    	console.log(declaredButNotAssigned); // => throws a ReferenceError
    	console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
    	const declaredButNotAssigned = true;
    }
    ```

-   Anonymous function expressions hoist their variable name, but not the function assignment.

    ```typescript
    function example() {
    	console.log(anonymous); // => undefined

    	anonymous(); // => TypeError anonymous is not a function

    	var anonymous = function () {
    		console.log("anonymous function expression");
    	};
    }
    ```

-   Named function expressions hoist the variable name, not the function name or the function body.

    ```typescript
    function example() {
    	console.log(named); // => undefined

    	named(); // => TypeError named is not a function

    	superPower(); // => ReferenceError superPower is not defined

    	var named = function superPower() {
    		console.log("Flying");
    	};
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
    	console.log(named); // => undefined

    	named(); // => TypeError named is not a function

    	var named = function named() {
    		console.log("named");
    	};
    }
    ```

-   Function declarations hoist their name and the function body.

    ```typescript
    function example() {
    	superPower(); // => Flying

    	function superPower() {
    		console.log("Flying");
    	}
    }
    ```

-   Variables, classes, and functions should be defined before they can be used. When variables, classes, or functions are declared after being used, it can harm readability since a reader won't know what a thing that's referenced is. It's much clearer for a reader to first encounter the source of a thing (whether imported from another module, or defined in the file) before encountering a use of the thing.

    ```typescript
    // bad

    // Variable a is being used before it is being defined.
    console.log(a); // this will be undefined, since while the declaration is hoisted, the initialization is not
    var a = 10;

    // Function fun is being called before being defined.
    fun();
    function fun() {}

    // Class A is being used before being defined.
    new A(); // ReferenceError: Cannot access 'A' before initialization
    class A {}

    // `let` and `const` are hoisted, but they don't have a default initialization.
    // The variables 'a' and 'b' are in a Temporal Dead Zone where JavaScript
    // knows they exist (declaration is hoisted) but they are not accessible
    // (as they are not yet initialized).

    console.log(a); // ReferenceError: Cannot access 'a' before initialization
    console.log(b); // ReferenceError: Cannot access 'b' before initialization
    let a = 10;
    const b = 5;

    // good

    var a = 10;
    console.log(a); // 10

    function fun() {}
    fun();

    class A {}
    new A();

    let a = 10;
    const b = 5;
    console.log(a); // 10
    console.log(b); // 5
    ```

### Comparison Operators & Equality

-   Use `===` and `!==` over `==` and `!=`.

-   Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

    -   **Objects** evaluate to **true**
    -   **Undefined** evaluates to **false**
    -   **Null** evaluates to **false**
    -   **Booleans** evaluate to **the value of the boolean**
    -   **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    -   **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

    ```typescript
    if ([0] && []) {
    	// true
    	// an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

-   Use shortcuts for booleans, but explicit comparisons for strings and numbers.

    ```typescript
    // bad
    if (isValid === true) {
    	// ...
    }

    // good
    if (isValid) {
    	// ...
    }

    // bad
    if (name) {
    	// ...
    }

    // good
    if (name !== "") {
    	// ...
    }

    // bad
    if (collection.length) {
    	// ...
    }

    // good
    if (collection.length > 0) {
    	// ...
    }
    ```

-   Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`). Lexical declarations are visible in the entire `switch` block but only get initialized when assigned, which only happens when its `case` is reached. This causes problems when multiple `case` clauses attempt to define the same thing.

    ```typescript
    // bad
    switch (foo) {
    	case 1:
    		let x = 1;
    		break;
    	case 2:
    		const y = 2;
    		break;
    	case 3:
    		function f() {
    			// ...
    		}
    		break;
    	default:
    		class C {}
    }

    // good
    switch (foo) {
    	case 1: {
    		let x = 1;
    		break;
    	}
    	case 2: {
    		const y = 2;
    		break;
    	}
    	case 3: {
    		function f() {
    			// ...
    		}
    		break;
    	}
    	case 4:
    		bar();
    		break;
    	default: {
    		class C {}
    	}
    }
    ```

-   Ternaries should not be nested and generally be single line expressions.

    ```typescript
    // bad
    const foo = maybe1 > maybe2 ? "bar" : value1 > value2 ? "baz" : null;

    // split into 2 separated ternary expressions
    const maybeNull = value1 > value2 ? "baz" : null;

    // better
    const foo = maybe1 > maybe2 ? "bar" : maybeNull;

    // best
    const foo = maybe1 > maybe2 ? "bar" : maybeNull;
    ```

-   Avoid unneeded ternary statements.

    ```typescript
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;
    const quux = a != null ? a : b;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    const quux = a ?? b;
    ```

-   When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators: `+`, `-`, and `**` since their precedence is broadly understood. We recommend enclosing `/` and `*` in parentheses because their precedence can be ambiguous when they are mixed. This improves readability and clarifies the developer’s intention.

    ```typescript
    // bad
    const foo = (a && b < 0) || c > 0 || d + 1 === 0;

    // bad
    const bar = a ** b - (5 % d);

    // bad
    // one may be confused into thinking (a || b) && c
    if (a || (b && c)) {
    	return d;
    }

    // bad
    const bar = a + (b / c) * d;

    // good
    const foo = (a && b < 0) || c > 0 || d + 1 === 0;

    // good
    const bar = a ** b - (5 % d);

    // good
    if (a || (b && c)) {
    	return d;
    }

    // good
    const bar = a + (b / c) * d;
    ```

-   The nullish coalescing operator (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`. Otherwise, it returns the left-hand side operand. It provides precision by distinguishing null/undefined from other falsy values, enhancing code clarity and predictability.

    ```typescript
    // bad
    const value = 0 ?? "default";
    // returns 0, not 'default'

    // bad
    const value = "" ?? "default";
    // returns '', not 'default'

    // good
    const value = null ?? "default";
    // returns 'default'

    // good
    const user = {
    	name: "John",
    	age: null,
    };
    const age = user.age ?? 18;
    // returns 18
    ```

### Blocks

-   Use braces with all multiline blocks.

    ```typescript
    // bad
    if (test) return false;

    // good
    if (test) return false;

    // good
    if (test) {
    	return false;
    }

    // bad
    function foo() {
    	return false;
    }

    // good
    function bar() {
    	return false;
    }
    ```

-   If you’re using multiline blocks with `if` and `else`, put `else` on the same line as your `if` block’s closing brace.

    ```typescript
    // bad
    if (test) {
    	thing1();
    	thing2();
    } else {
    	thing3();
    }

    // good
    if (test) {
    	thing1();
    	thing2();
    } else {
    	thing3();
    }
    ```

-   If an `if` block always executes a `return` statement, the subsequent `else` block is unnecessary. A `return` in an `else if` block following an `if` block that contains a `return` can be separated into multiple `if` blocks.

    ```typescript
    // bad
    function foo() {
    	if (x) {
    		return x;
    	} else {
    		return y;
    	}
    }

    // bad
    function cats() {
    	if (x) {
    		return x;
    	} else if (y) {
    		return y;
    	}
    }

    // bad
    function dogs() {
    	if (x) {
    		return x;
    	} else {
    		if (y) {
    			return y;
    		}
    	}
    }

    // good
    function foo() {
    	if (x) {
    		return x;
    	}

    	return y;
    }

    // good
    function cats() {
    	if (x) {
    		return x;
    	}

    	if (y) {
    		return y;
    	}
    }

    // good
    function dogs(x) {
    	if (x) {
    		if (z) {
    			return y;
    		}
    	} else {
    		return z;
    	}
    }
    ```

### Control Statements

-   In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line. Requiring operators at the beginning of the line keeps the operators aligned and follows a pattern similar to method chaining. This also improves readability by making it easier to visually follow complex logic.

    ```typescript
    // bad
    if ((foo === 123 || bar === "abc") && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
    	thing1();
    }

    // bad
    if (foo === 123 && bar === "abc") {
    	thing1();
    }

    // bad
    if (foo === 123 && bar === "abc") {
    	thing1();
    }

    // bad
    if (foo === 123 && bar === "abc") {
    	thing1();
    }

    // good
    if (foo === 123 && bar === "abc") {
    	thing1();
    }

    // good
    if ((foo === 123 || bar === "abc") && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
    	thing1();
    }

    // good
    if (foo === 123 && bar === "abc") {
    	thing1();
    }
    ```

-   Don't use selection operators in place of control statements.

    ```typescript
    // bad
    !isRunning && startRunning();

    // good
    if (!isRunning) {
    	startRunning();
    }
    ```

### Comments

-   Use `/** ... */` for multiline comments.

    ```typescript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {
    	// ...

    	return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {
    	// ...

    	return element;
    }
    ```

-   Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.

    ```typescript
    // bad
    const active = true; // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
    	console.log("fetching type...");
    	// set the default type to 'no type'
    	const type = this.type || "no type";

    	return type;
    }

    // good
    function getType() {
    	console.log("fetching type...");

    	// set the default type to 'no type'
    	const type = this.type || "no type";

    	return type;
    }

    // also good
    function getType() {
    	// set the default type to 'no type'
    	const type = this.type || "no type";

    	return type;
    }
    ```

-   Start all comments with a space to make it easier to read.

    ```javascript
    // bad
    //is current tab
    const active = true;

    // good
    // is current tab
    const active = true;

    // bad
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {
    	// ...

    	return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {
    	// ...

    	return element;
    }
    ```

-   Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you’re pointing out a problem that needs to be revisited, or if you’re suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.

-   Use `// FIXME:` to annotate problems.

    ```typescript
    class Calculator extends Abacus {
    	constructor() {
    		super();

    		// FIXME: shouldn’t use a global here
    		total = 0;
    	}
    }
    ```

-   Use `// TODO:` to annotate solutions to problems.

    ```typescript
    class Calculator extends Abacus {
    	constructor() {
    		super();

    		// TODO: total should be configurable by an options param
    		this.total = 0;
    	}
    }
    ```

### Whitespace

-   Use soft tabs (space character) set to 2 spaces.

    ```typescript
    // bad
    function foo() {
    ∙∙∙∙let name;
    }

    // bad
    function bar() {
    ∙let name;
    }

    // good
    function baz() {
    ∙∙let name;
    }
    ```

-   Place 1 space before the leading brace.

    ```typescript
    // bad
    function test() {
    	console.log("test");
    }

    // good
    function test() {
    	console.log("test");
    }

    // bad
    dog.set("attr", {
    	age: "1 year",
    	breed: "Bernese Mountain Dog",
    });

    // good
    dog.set("attr", {
    	age: "1 year",
    	breed: "Bernese Mountain Dog",
    });
    ```

-   Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations.

    ```typescript
    // bad
    if (isJedi) {
    	fight();
    }

    // good
    if (isJedi) {
    	fight();
    }

    // bad
    function fight() {
    	console.log("Swooosh!");
    }

    // good
    function fight() {
    	console.log("Swooosh!");
    }
    ```

-   Set off operators with spaces.

    ```typescript
    // bad
    const x = y + 5;

    // good
    const x = y + 5;
    ```

-   End files with a single newline character.

    ```typescript
    // bad
    import { session } from "@/CheckoutSession";
    // ...
    export default session;
    ```

    ```typescript
    // bad
    import { session } from '@/CheckoutSession';
      // ...
    export default session;↵
    ↵
    ```

    ```typescript
    // good
    import { session } from '@/CheckoutSession';
      // ...
    export default session;↵
    ```

-   Use indentation when making long method chains (more than 2 method chains). Use a leading dot, which emphasizes that the line is a method call, not a new statement.

    ```typescript
    // bad
    $("#items").find(".selected").highlight().end().find(".open").updateCount();

    // bad
    $("#items").find(".selected").highlight().end().find(".open").updateCount();

    // good
    $("#items").find(".selected").highlight().end().find(".open").updateCount();

    // bad
    const leds = stage
    	.selectAll(".led")
    	.data(data)
    	.enter()
    	.append("svg:svg")
    	.classed("led", true)
    	.attr("width", (radius + margin) * 2)
    	.append("svg:g")
    	.attr("transform", `translate(${radius + margin}, ${radius + margin})`)
    	.call(tron.led);

    // good
    const leds = stage
    	.selectAll(".led")
    	.data(data)
    	.enter()
    	.append("svg:svg")
    	.classed("led", true)
    	.attr("width", (radius + margin) * 2)
    	.append("svg:g")
    	.attr("transform", `translate(${radius + margin}, ${radius + margin})`)
    	.call(tron.led);

    // good
    const leds = stage.selectAll(".led").data(data);
    const svg = leds.enter().append("svg:svg");
    svg.classed("led", true).attr("width", (radius + margin) * 2);
    const g = svg.append("svg:g");
    g.attr("transform", `translate(${radius + margin}, ${radius + margin})`).call(tron.led);
    ```

-   Leave a blank line after blocks and before the next statement.

    ```typescript
    // bad
    if (foo) {
    	return bar;
    }
    return baz;

    // good
    if (foo) {
    	return bar;
    }

    return baz;

    // bad
    const obj = {
    	foo() {},
    	bar() {},
    };
    return obj;

    // good
    const obj = {
    	foo() {},

    	bar() {},
    };

    return obj;

    // bad
    const arr = [function foo() {}, function bar() {}];
    return arr;

    // good
    const arr = [function foo() {}, function bar() {}];

    return arr;
    ```

-   Do not pad your blocks with blank lines.

    ```typescript
    // bad
    function bar() {
    	console.log(foo);
    }

    // bad
    if (baz) {
    	console.log(quux);
    } else {
    	console.log(foo);
    }

    // bad
    class Foo {
    	constructor(bar) {
    		this.bar = bar;
    	}
    }

    // good
    function bar() {
    	console.log(foo);
    }

    // good
    if (baz) {
    	console.log(quux);
    } else {
    	console.log(foo);
    }
    ```

-   Do not use multiple blank lines to pad your code.

      <!-- markdownlint-disable MD012 -->

    ```typescript
    // bad
    class Person {
    	constructor(fullName, email, birthday) {
    		this.fullName = fullName;

    		this.email = email;

    		this.setAge(birthday);
    	}

    	setAge(birthday) {
    		const today = new Date();

    		const age = this.getAge(today, birthday);

    		this.age = age;
    	}

    	getAge(today, birthday) {
    		// ..
    	}
    }

    // good
    class Person {
    	constructor(fullName, email, birthday) {
    		this.fullName = fullName;
    		this.email = email;
    		this.setAge(birthday);
    	}

    	setAge(birthday) {
    		const today = new Date();
    		const age = getAge(today, birthday);
    		this.age = age;
    	}

    	getAge(today, birthday) {
    		// ..
    	}
    }
    ```

-   Do not add spaces inside parentheses.

    ```typescript
    // bad
    function bar(foo) {
    	return foo;
    }

    // good
    function bar(foo) {
    	return foo;
    }

    // bad
    if (foo) {
    	console.log(foo);
    }

    // good
    if (foo) {
    	console.log(foo);
    }
    ```

-   Do not add spaces inside brackets.

    ```typescript
    // bad
    const foo = [1, 2, 3];
    console.log(foo[0]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

-   Add spaces inside curly braces.

    ```typescript
    // bad
    const foo = { clark: "kent" };

    // good
    const foo = { clark: "kent" };
    ```

-   Avoid having lines of code that are longer than 100 characters (including whitespace). This ensures readability and maintainability.

    ```typescript
    // bad
    const foo =
    	jsonData &&
    	jsonData.foo &&
    	jsonData.foo.bar &&
    	jsonData.foo.bar.baz &&
    	jsonData.foo.bar.baz.quux &&
    	jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: "POST", url: "https://airbnb.com/", data: { name: "John" } })
    	.done(() => console.log("Congratulations!"))
    	.fail(() => console.log("You have failed this city."));

    // good
    const foo =
    	jsonData &&
    	jsonData.foo &&
    	jsonData.foo.bar &&
    	jsonData.foo.bar.baz &&
    	jsonData.foo.bar.baz.quux &&
    	jsonData.foo.bar.baz.quux.xyzzy;

    // better
    const foo = jsonData?.foo?.bar?.baz?.quux?.xyzzy;

    // good
    $.ajax({
    	method: "POST",
    	url: "https://airbnb.com/",
    	data: { name: "John" },
    })
    	.done(() => console.log("Congratulations!"))
    	.fail(() => console.log("You have failed this city."));
    ```

-   Require consistent spacing inside an open block token and the next token on the same line. This rule also enforces consistent spacing inside a close block token and previous token on the same line.

    ```typescript
    // bad
    function foo() {
    	return true;
    }
    if (foo) {
    	bar = 0;
    }

    // good
    function foo() {
    	return true;
    }
    if (foo) {
    	bar = 0;
    }
    ```

-   Avoid spaces before commas and require a space after commas.

    ```typescript
    // bad
    const foo = 1,
    	bar = 2;
    const arr = [1, 2];

    // good
    const foo = 1,
    	bar = 2;
    const arr = [1, 2];
    ```

-   Enforce spacing inside of computed property brackets.

    ```typescript
    // bad
    obj[foo];
    obj["foo"];
    const x = { [b]: a };
    obj[foo[bar]];

    // good
    obj[foo];
    obj["foo"];
    const x = { [b]: a };
    obj[foo[bar]];
    ```

-   Enforce spacing between keys and values in object literal properties.

    ```typescript
    // bad
    const obj = { foo: 42 };
    const obj2 = { foo: 42 };

    // good
    const obj = { foo: 42 };
    ```

-   Avoid trailing spaces at the end of lines.

-   Avoid multiple empty lines, only allow one newline at the end of files, and avoid a newline at the beginning of files.

      <!-- markdownlint-disable MD012 -->

    ```typescript
    // bad - multiple empty lines
    const x = 1;

    const y = 2;

    // bad - 2+ newlines at end of file
    const x = 1;
    const y = 2;

    // bad - 1+ newline(s) at beginning of file

    const x = 1;
    const y = 2;

    // good
    const x = 1;
    const y = 2;
    ```

### Commas

-   Leading commas: **Nope.**

    ```typescript
    // bad
    const story = [once, upon, aTime];

    // good
    const story = [once, upon, aTime];

    // bad
    const hero = {
    	firstName: "Ada",
    	lastName: "Lovelace",
    	birthYear: 1815,
    	superPower: "computers",
    };

    // good
    const hero = {
    	firstName: "Ada",
    	lastName: "Lovelace",
    	birthYear: 1815,
    	superPower: "computers",
    };
    ```

-   Additional trailing comma: **Yup.** This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don’t have to worry about the [trailing comma problem](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas) in legacy browsers.

    ```diff
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```

    ```typescript
    // bad
    const hero = {
    	firstName: "Dana",
    	lastName: "Scully",
    };

    const heroes = ["Batman", "Superman"];

    // good
    const hero = {
    	firstName: "Dana",
    	lastName: "Scully",
    };

    const heroes = ["Batman", "Superman"];

    // bad
    function createHero(firstName, lastName, inventorOf) {
    	// does nothing
    }

    // good
    function createHero(firstName, lastName, inventorOf) {
    	// does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(firstName, lastName, inventorOf, ...heroArgs) {
    	// does nothing
    }

    // bad
    createHero(firstName, lastName, inventorOf);

    // good
    createHero(firstName, lastName, inventorOf);

    // good (note that a comma must not appear after a "rest" element)
    createHero(firstName, lastName, inventorOf, ...heroArgs);
    ```

### Semicolons

-   When JavaScript encounters a line break without a semicolon, it uses a set of rules called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) to determine whether it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

    ```typescript
    // bad - raises exception
    const luke = {};
    const leia = {}[(luke, leia)].forEach(jedi => (jedi.father = "vader"));

    // bad - raises exception
    const reaction = "No! That’s impossible!"(
    	(async function meanwhileOnTheFalcon() {
    		// handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
    		// ...
    	})()
    );

    // bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
    function foo() {
    	return;
    	("search your feelings, you know it to be foo");
    }

    // good
    const luke = {};
    const leia = {};
    [luke, leia].forEach(jedi => {
    	jedi.father = "vader";
    });

    // good
    const reaction = "No! That’s impossible!";
    (async function meanwhileOnTheFalcon() {
    	// handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
    	// ...
    })();

    // good
    function foo() {
    	return "search your feelings, you know it to be foo";
    }
    ```

### Type Casting & Coercion

-   Numbers: Use `Number` for type casting and `parseInt` always with a radix for parsing strings. The `parseInt` function produces an integer value dictated by interpretation of the contents of the string argument according to the specified radix. Leading whitespace in string is ignored. If radix is `undefined` or `0`, it is assumed to be `10` except when the number begins with the character pairs `0x` or `0X`, in which case a radix of 16 is assumed. This differs from ECMAScript 3, which merely discouraged (but allowed) octal interpretation. Many implementations have not adopted this behavior as of 2013. And, because older browsers must be supported, always specify a radix.

    ```typescript
    const inputValue = "4";

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```

-   If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for [performance reasons](https://web.archive.org/web/20200414205431/https://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you’re doing.

    ```typescript
    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    const val = inputValue >> 0;
    ```

-   Booleans:

    ```typescript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // best
    const hasAge = !!age;
    ```
