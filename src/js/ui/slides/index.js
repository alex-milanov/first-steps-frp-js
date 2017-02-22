'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

const prettify = require('code-prettify');

const obj = require('iblokz/common/obj');

// dom
const {
	h, section, button, span, h1, h2, h3,
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
	// slide 3
	[
		span([
			h2('JavaScript - The Functional Parts')
		])
	],
	// slide 4
	[
		span([
			h2('The Function'),
			ul([
				li('First Class Sitizen'),
				li('ES6 Arrow Functions'),
				li('Higher Order Functions')
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
	// slide 5
	[
		span([
			h2('Data Operations with Higher Order Functions'),
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
	// slide 6
	[span([
		h1('Asynchronisity')
	])],
	// slide 7
	[span([
		h1('Reactive Programming')
	])]
	// data operations -> stream operations
	// stream operators
	// examples
];

const parseEl = el => (el.type === 'code')
	? code(el.text)
	: h(el.tag, el.text || el.children && el.children.map(parseEl) || '');

const parseSlides = slides => slides.map(col =>
	col.map(parseEl)
);

module.exports = ({state, actions}) => section('.slides[tabindex="0"]',
	arrFlatten(parseSlides(state.slides).map((col, i) =>
		col.map((slide, k) =>
			section({
				class: prepAnim([i, k], state),
				on: (arrEq(state.index, [i, k]) && state.transitioning)
					? {animationend: () => actions.transitionend()} : {}
			}, [slide])
		))
	));
