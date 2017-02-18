'use strict';

// dom
const {
	section, button, span, h1, h2, pre, code,
	form, fieldset, label, legend, input, select, option
} = require('iblokz/adapters/vdom');

const obj = require('iblokz/common/obj');
const prettify = require('code-prettify');

const unprettify = html => {
	const tDiv = document.createElement('div');
	tDiv.innerHTML = html.replace(/<br>/g, '^^nl^^');
	const text = tDiv.textContent.replace(/\^\^nl\^\^/g, '\n');
	return text;
};

const getDirection = (index, old) => (index > old) ? 'right' : 'left';
const getInOut = (index, old, i) => (index === i) ? 'in' : 'out';

const prepAnim = (i, {index, old, transitioning, anim}) => Object.assign({
	active: index === i || (old === i && transitioning === true),
	onTop: transitioning === true && index === i
},
(transitioning === true && index !== old && (index === i || old === i))
	? obj.keyValue(anim[getDirection(index, old)][getInOut(index, old, i)], true)
	: {}
);

// 	moveFromRight: transitioning === true && index === i && (index - old) === 1,
// 	moveToLeft: transitioning === true && old === i && (index - old) === 1,
// 	moveFromLeft: transitioning === true && index === i && (index - old) === -1,
// 	moveToRight: transitioning === true && old === i && (index - old) === -1
// });

const slides = [
	// slide 1
	span([
		h2('First Steps in'),
		h1('Functional Reactive JavaScript')
	]),
	// slide 2
	span([
		h1('creating a Hash'),
		h2('Converting a collection to a key/value hash:'),
		pre([code('[type="js"][contenteditable="true"]', {
			props: {
				innerHTML: prettify.prettyPrintOne(`
	const users = [
		{id: 1, name: 'Bob'},
		{id: 1, name: 'John'},
	];

	const hash = users.reduce(
		(h, u) => ((h[u.id] = u.name), h), {}
	);
			`)
			},
			on: {
				input: ({target}) => (target.innerHTML = prettify.prettyPrintOne(unprettify(target.innerHTML)))
			}
		})])
	]),
	// slide 3
	span([
		h1('Slide 3'),
		h2('Some desc here')
	])
];

module.exports = ({state, actions}) => section('.slides[tabindex="0"]', slides.map((slide, i) =>
	section({
		class: prepAnim(i, state),
		on: (state.index === i && state.transitioning) ? {animationend: () => actions.transitionend()} : {}
	}, [slide])
));
