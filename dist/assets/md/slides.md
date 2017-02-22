# First Steps in Functional Reactive JavaScript

## The Story so far

### Functional vs Imperative

### Functional vs OOP

## JavaScript - The Functional Parts

## The Function

- First Class Sitizen
- ES6 Arrow Functions
- Higher Order Functions

### ES6 Arrow Functions

```js
	// before
	function plusOneOld(num) {
		return num + 1;
	}

	// after
	const plusOneNew = num => num + 1;

	plusOneOld(2);
```

## Data Operations with Higher Order Functions

- Array Operations
- Object Operations
- Complex Operations

### Array Operations

```js
// initial
const arr1 = [1, 2, 3, 4, 5];
console.log('initial', arr1);

// map
const arr2 = arr1.map(n => n * 10);
console.log('map', arr2);

// filter
const arr3 = arr1.filter(n => n > 2);
console.log('filter', arr3);

// reduce
const arr4 = arr1.reduce((sum, n) => sum + n, 0);
console.log('reduce', arr4);
```

## Async Operations

## Reactive Programming

## Examples
