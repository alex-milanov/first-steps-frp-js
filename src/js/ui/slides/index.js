'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

const prettify = require('code-prettify');

const obj = require('iblokz/common/obj');

// dom
const {
	section, button, span, h1, h2, h3,
	form, fieldset, label, legend, input, select, option,
	ul, li
} = require('iblokz/adapters/vdom');

// components
const code = require('./code');

// util
const arrEq = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);
const arrFlatten = arr => arr.reduce((af, ai) => [].concat(af, ai), []);

const prepAnim = (pos, {index, old, direction, transitioning, anim}) => Object.assign({
	active: (arrEq(index, pos) || (arrEq(old, pos)) && transitioning === true),
	onTop: transitioning === true && arrEq(index, pos)
},
(transitioning === true && !arrEq(index, old) && (arrEq(index, pos) || arrEq(old, pos)))
	? obj.keyValue(anim[direction][arrEq(index, pos) ? 'in' : 'out'], true)
	: {}
);

const slides = [
	// slide 1
	[span([
		h1('First Steps in Functional Reactive JavaScript')
	])],
	// slide 2
	[
		span([
			h2('The road so far')
		]),
		span([
			h2('Functional vs Imperative')
		]),
		span([
			h2('Functional vs OOP')
		])
	],
	[
		span([
			h2('JavaScript - The Functional Parts')
		])
	],
	[
		span([
			h2('The Function'),
			ul([
				li('First Class Sitizen'),
				li('ES6 Arrow Functions'),
				li('Promises')
			])
		]),
		span([
			h2('ES6 Arrow Functions'),
			code(`
	// before
	function plusOneOld(num) {
		return num + 1;
	}

	// after
	const plusOneNew = num => num + 1;

	plusOneOld(2);
			`)
		]),
		span([
			h2('Promises, Promises ...'),
			code(`
	const User = mongoose.model('User');

	// before
	User.find({}, function (err, list) {
		if (err) {
			return console.log(err.message);
		}
		return console.log({list});
	});

	// after
	User.find({}).exec()
		.catch(err => console.log(err.message))
		.then(list => console.log(list));

			`)
		]),
		span([
			code(`
	// before
	function getList(model) {
		return function (req, res) {
			const Model = mongoose.model(model);
			Model.find(req.query, function (err, list) {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res.json({list});
			});
		};
	}
			`)
		])
	],
	[
		span([
			h2('Data Operations'),
			ul([
				li('Array Operations'),
				li('Object Operations'),
				li('Complex Operations'),
				li('State')
			])
		]),
		span([
			h2('Array Operations'),
			code(`
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
			`)
		])
	],
	// slide 3
	[span([
		h1('Reactive Programming')
	])]
	// data operations -> stream operations
	// stream operators
	// examples
];

module.exports = ({state, actions}) => section('.slides[tabindex="0"]', arrFlatten(slides.map((col, i) =>
	col.map((slide, k) =>
		section({
			class: prepAnim([i, k], state),
			on: (arrEq(state.index, [i, k]) && state.transitioning)
				? {animationend: () => actions.transitionend()} : {}
		}, [slide])
	))
));
