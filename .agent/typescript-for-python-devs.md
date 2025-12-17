# Quick Reference - TypeScript/JavaScript for Python Developers

## Side-by-Side Comparison

### Variables

| Python               | TypeScript/JavaScript                   |
| -------------------- | --------------------------------------- |
| `x = 5`              | `const x = 5;` or `let x = 5;`          |
| `name: str = "John"` | `const name: string = "John";`          |
| `items: list = []`   | `const items: any[] = [];`              |
| `data: dict = {}`    | `const data: Record<string, any> = {};` |

### Functions

| Python                            | TypeScript/JavaScript                          |
| --------------------------------- | ---------------------------------------------- |
| `def add(a: int, b: int) -> int:` | `function add(a: number, b: number): number {` |
| `    return a + b`                | `  return a + b;`                              |
|                                   | `}`                                            |
| `lambda x: x * 2`                 | `(x) => x * 2` or `x => x * 2`                 |

### Lists/Arrays

| Python                       | TypeScript/JavaScript                    |
| ---------------------------- | ---------------------------------------- |
| `nums = [1, 2, 3]`           | `const nums = [1, 2, 3];`                |
| `nums.append(4)`             | `nums.push(4);`                          |
| `len(nums)`                  | `nums.length`                            |
| `nums[0]`                    | `nums[0]`                                |
| `nums[-1]`                   | `nums[nums.length - 1]` or `nums.at(-1)` |
| `[x * 2 for x in nums]`      | `nums.map(x => x * 2)`                   |
| `[x for x in nums if x > 1]` | `nums.filter(x => x > 1)`                |
| `sum(nums)`                  | `nums.reduce((sum, x) => sum + x, 0)`    |
| `any(nums)`                  | `nums.some(x => !!x)`                    |
| `all(nums)`                  | `nums.every(x => !!x)`                   |
| `sorted(nums)`               | `[...nums].sort((a, b) => a - b)`        |

### Dictionaries/Objects

| Python                                 | TypeScript/JavaScript                                 |
| -------------------------------------- | ----------------------------------------------------- |
| `person = {"name": "John", "age": 30}` | `const person = { name: "John", age: 30 };`           |
| `person["name"]`                       | `person.name` or `person["name"]`                     |
| `person.get("name", "Unknown")`        | `person.name ?? "Unknown"`                            |
| `"name" in person`                     | `"name" in person` or `person.hasOwnProperty("name")` |
| `person.keys()`                        | `Object.keys(person)`                                 |
| `person.values()`                      | `Object.values(person)`                               |
| `person.items()`                       | `Object.entries(person)`                              |

### Strings

| Python                    | TypeScript/JavaScript                    |
| ------------------------- | ---------------------------------------- |
| `s.upper()`               | `s.toUpperCase()`                        |
| `s.lower()`               | `s.toLowerCase()`                        |
| `s.strip()`               | `s.trim()`                               |
| `s.split(",")`            | `s.split(",")`                           |
| `",".join(items)`         | `items.join(",")`                        |
| `s.startswith("prefix")`  | `s.startsWith("prefix")`                 |
| `s.endswith("suffix")`    | `s.endsWith("suffix")`                   |
| `"sub" in s`              | `s.includes("sub")`                      |
| `s.replace("old", "new")` | `s.replace("old", "new")` (single)       |
|                           | `s.replaceAll("old", "new")` (all)       |
| `f"Hello {name}"`         | `` `Hello ${name}` `` (template literal) |

### Conditionals

| Python                              | TypeScript/JavaScript                  |
| ----------------------------------- | -------------------------------------- |
| `if x > 5:`                         | `if (x > 5) {`                         |
| `    print("big")`                  | `  console.log("big");`                |
| `elif x > 2:`                       | `} else if (x > 2) {`                  |
| `    print("medium")`               | `  console.log("medium");`             |
| `else:`                             | `} else {`                             |
| `    print("small")`                | `  console.log("small");`              |
|                                     | `}`                                    |
| `result = "yes" if x > 5 else "no"` | `const result = x > 5 ? "yes" : "no";` |

### Loops

| Python                            | TypeScript/JavaScript            |
| --------------------------------- | -------------------------------- |
| `for item in items:`              | `for (const item of items) {`    |
| `    print(item)`                 | `  console.log(item);`           |
|                                   | `}`                              |
| `for i in range(10):`             | `for (let i = 0; i < 10; i++) {` |
| `    print(i)`                    | `  console.log(i);`              |
|                                   | `}`                              |
| `for i, val in enumerate(items):` | `items.forEach((val, i) => {`    |
| `    print(i, val)`               | `  console.log(i, val);`         |
|                                   | `});`                            |
| `while x < 10:`                   | `while (x < 10) {`               |
| `    x += 1`                      | `  x += 1;`                      |
|                                   | `}`                              |

### Null/None Handling

| Python                       | TypeScript/JavaScript                             |
| ---------------------------- | ------------------------------------------------- | --- | --------------------------- |
| `None`                       | `null` or `undefined`                             |
| `x is None`                  | `x === null` or `x == null` (both null/undefined) |
| `x is not None`              | `x !== null` or `x != null`                       |
| `x if x else default`        | `x ?? default` (nullish coalescing)               |
|                              | `x                                                |     | default` (falsy coalescing) |
| `getattr(obj, 'prop', None)` | `obj?.prop` (optional chaining)                   |

### Classes

| Python                             | TypeScript/JavaScript                |
| ---------------------------------- | ------------------------------------ |
| `class Person:`                    | `class Person {`                     |
| `    def __init__(self, name):`    | `  constructor(name: string) {`      |
| `        self.name = name`         | `    this.name = name;`              |
|                                    | `  }`                                |
| `    def greet(self):`             | `  greet(): string {`                |
| `        return f"Hi {self.name}"` | `    return \`Hi ${this.name}\`;`    |
|                                    | `  }`                                |
|                                    | `}`                                  |
| `person = Person("John")`          | `const person = new Person("John");` |

### Imports

| Python                        | TypeScript/JavaScript                  |
| ----------------------------- | -------------------------------------- |
| `import pandas as pd`         | `import * as pd from 'pandas';`        |
| `from lib.csv import readCsv` | `import { readCsv } from '@/lib/csv';` |
| `from lib.csv import *`       | `import * from '@/lib/csv';`           |
| `import lib.csv as csv`       | `import * as csv from '@/lib/csv';`    |

### File I/O

| Python                        | TypeScript/JavaScript (Node.js)                        |
| ----------------------------- | ------------------------------------------------------ |
| `with open('file.txt') as f:` | `import fs from 'node:fs';`                            |
| `    content = f.read()`      | `const content = fs.readFileSync('file.txt', 'utf8');` |
| `import json`                 | -                                                      |
| `data = json.load(f)`         | `const data = JSON.parse(content);`                    |
| `json.dumps(data)`            | `JSON.stringify(data)`                                 |

### Error Handling

| Python                    | TypeScript/JavaScript             |
| ------------------------- | --------------------------------- |
| `try:`                    | `try {`                           |
| `    risky_function()`    | `  riskyFunction();`              |
| `except ValueError as e:` | `} catch (e) {`                   |
| `    print(e)`            | `  if (e instanceof TypeError) {` |
| `finally:`                | `    console.log(e);`             |
| `    cleanup()`           | `  }`                             |
|                           | `} finally {`                     |
|                           | `  cleanup();`                    |
|                           | `}`                               |

### Type Annotations

| Python                             | TypeScript                                |
| ---------------------------------- | ----------------------------------------- |
| `def process(data: dict) -> list:` | `function process(data: object): any[] {` |
| `    return []`                    | `  return [];`                            |
|                                    | `}`                                       |
| `from typing import Optional`      | -                                         |
| `x: Optional[str] = None`          | `let x: string \| null = null;`           |
| `from typing import Union`         | -                                         |
| `x: Union[int, str]`               | `let x: number \| string;`                |
| `from typing import List, Dict`    | -                                         |
| `items: List[str]`                 | `const items: string[]`                   |
| `data: Dict[str, int]`             | `const data: Record<string, number>`      |

### Common Patterns

| Task             | Python                           | TypeScript/JavaScript                          |
| ---------------- | -------------------------------- | ---------------------------------------------- |
| Print/Log        | `print("Hello")`                 | `console.log("Hello");`                        |
| String to Number | `int("42")`                      | `parseInt("42", 10)`                           |
|                  | `float("3.14")`                  | `parseFloat("3.14")` or `Number("3.14")`       |
| Number to String | `str(42)`                        | `String(42)` or `(42).toString()`              |
| Check Type       | `isinstance(x, int)`             | `typeof x === 'number'`                        |
|                  | `isinstance(x, str)`             | `typeof x === 'string'`                        |
|                  | `isinstance(x, list)`            | `Array.isArray(x)`                             |
| Sleep/Delay      | `import time; time.sleep(1)`     | `await new Promise(r => setTimeout(r, 1000));` |
| Current Time     | `import time; time.time()`       | `Date.now()` or `new Date().getTime()`         |
| Random Number    | `import random; random.random()` | `Math.random()`                                |
|                  | `random.randint(1, 10)`          | `Math.floor(Math.random() * 10) + 1`           |
| Math             | `import math`                    | `Math.floor()`, `Math.ceil()`, `Math.round()`  |
|                  | `math.floor(3.7)`                | `Math.floor(3.7)`                              |
|                  | `math.sqrt(16)`                  | `Math.sqrt(16)`                                |

## Async/Await (Like Python's asyncio)

### Python (asyncio)

```python
import asyncio
import aiohttp

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def main():
    data = await fetch_data('https://api.example.com/data')
    print(data)

asyncio.run(main())
```

### TypeScript/JavaScript

```typescript
async function fetchData(url: string) {
  const response = await fetch(url);
  return await response.json();
}

async function main() {
  const data = await fetchData('https://api.example.com/data');
  console.log(data);
}

main();
```

## React Hooks (Special to React)

### useState - Like instance variables

```typescript
// Creates a state variable that triggers re-render when changed
const [count, setCount] = useState(0);
// count - current value
// setCount - function to update (like self.count = x)

// Usage:
setCount(5); // Set to 5
setCount((prev) => prev + 1); // Increment
```

### useEffect - Like lifecycle methods

```typescript
// Runs after component renders (like __init__ or side effects)
useEffect(() => {
  // This runs when component mounts or dependencies change
  fetchData();

  // Cleanup (like __del__)
  return () => {
    cleanup();
  };
}, [dependency]); // Run when 'dependency' changes
```

### useContext - Like global state

```typescript
// Access global context (like accessing global variables)
const filters = useContext(FilterContext);
```

## Common Next.js/React Patterns

### Component Definition

```typescript
// Function component (most common)
function MyComponent({ name }: { name: string }) {
  return <div>Hello {name}</div>;
}

// Arrow function component
const MyComponent = ({ name }: { name: string }) => {
  return <div>Hello {name}</div>;
};
```

### Props (Like function arguments)

```typescript
interface MyComponentProps {
  title: string;
  count: number;
  onClick: () => void;
}

function MyComponent({ title, count, onClick }: MyComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
```

### Conditional Rendering

```typescript
// Python:
// if show:
//     return <Component />
// else:
//     return <OtherComponent />

// TypeScript:
return show ? <Component /> : <OtherComponent />;

// Or:
return (
  <div>
    {show && <Component />}
    {!show && <OtherComponent />}
  </div>
);
```

### Looping/Mapping

```typescript
// Python:
// for item in items:
//     print(item.name)

// TypeScript (JSX):
return (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

## Important JavaScript Gotchas for Python Developers

### 1. Equality

```typescript
// === checks type AND value (use this!)
5 === 5; // true
5 === '5'; // false

// == does type coercion (avoid!)
5 == '5'; // true (coerces string to number)
```

### 2. Truthy/Falsy

```typescript
// Falsy values: false, 0, "", null, undefined, NaN
// Everything else is truthy

if ("") {          // False
if (0) {           // False
if ([]) {          // True! (empty array is truthy)
if ({}) {          // True! (empty object is truthy)
```

### 3. This Binding

```typescript
// Arrow functions preserve 'this' context
const obj = {
  name: 'John',
  greet: function () {
    console.log(this.name);
  }, // 'this' is obj
  greetArrow: () => {
    console.log(this.name);
  }, // 'this' is outer context
};
```

### 4. Array/Object Mutability

```typescript
// These mutate the original:
nums.push(4); // Adds to array
nums.sort(); // Sorts in place

// These create new arrays/objects:
const newNums = [...nums, 4]; // Spread operator
const sorted = [...nums].sort(); // Copy then sort
const newObj = { ...obj, age: 30 }; // Add/update property
```

### 5. Async is Everywhere

```typescript
// Many operations are async in JavaScript
const response = await fetch(url); // Network request
const data = await response.json(); // Parsing

// Without await, you get a Promise (like a Future in Python)
const promise = fetch(url); // This is a Promise, not the data!
```

## Debugging Tips

### Console Methods

```typescript
console.log(x); // Print value
console.error('Error:', e); // Print error
console.table(arrayOfObjs); // Pretty table
console.dir(obj); // Object inspector
console.time('label'); // Start timer
console.timeEnd('label'); // End timer
```

### Debugger

```typescript
debugger; // Pauses execution in browser DevTools (like pdb.set_trace())
```

### Type Checking

```typescript
typeof x; // "number", "string", "boolean", "object", "function", "undefined"
Array.isArray(x); // Check if array
x instanceof Date; // Check if instance of class
```

## Resources for Python Developers

- [TypeScript for Python Developers](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [JavaScript for Python Developers](https://dev.to/rajdurvasula/python-vs-node-js-comparison-3h13)
- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org/docs)

---

**Quick Memory Aid:**

- `;` ends statements (like Python's newline)
- `{}` for blocks (like Python's indentation)
- `const/let` for variables (like Python's just writing the name)
- Arrow functions `=>` (like Python's `lambda` but more powerful)
- `.map()` (like list comprehension)
- `.filter()` (like list comprehension with if)
- `.reduce()` (like Python's `reduce` or aggregation)
