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
			h2('JavaScript - The Functional Parts')
		])
	],
	[
		span([
			h2('The Function (JavaScript - The Functional Parts)'),
			ul([
				li('First Class Citizen'),
				li('ES.Next Arrow Functions')
			])
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
		]),
		span([
			code(`
	// after
	const getList = model => (req, res) =>
		mongoose.model(model).find(req.query).exec()
			.then(
				list => res.json({list})
				err => res.status(500).send(err.message)
			);
			`)
		])
	],
	// slide 3
	[span([
		h1('Slide 4'),
		h2('Some desc here')
	])]
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
