'use strict';

// dom
const {
	section, button, span, h1, h2, h3, pre, code,
	form, fieldset, label, legend, input, select, option,
	ul, li
} = require('iblokz/adapters/vdom');

const obj = require('iblokz/common/obj');
const prettify = require('code-prettify');

const unprettify = html => {
	const tDiv = document.createElement('div');
	tDiv.innerHTML = html.replace(/<br>/g, '^^nl^^');
	const text = tDiv.textContent.replace(/\^\^nl\^\^/g, '\n');
	return text;
};

const getInOut = (index, old, i) => (index === i) ? 'in' : 'out';

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

// 	moveFromRight: transitioning === true && index === i && (index - old) === 1,
// 	moveToLeft: transitioning === true && old === i && (index - old) === 1,
// 	moveFromLeft: transitioning === true && index === i && (index - old) === -1,
// 	moveToRight: transitioning === true && old === i && (index - old) === -1
// });

const getCode = (html, type = 'js') =>
	pre([code(`[type="${type}"][contenteditable="true"][spellcheck="false"]`,
		{props: {innerHTML: prettify.prettyPrintOne(html)}}
	)]);

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
			getCode(`
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
			getCode(`
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
