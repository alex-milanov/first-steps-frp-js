'use strict';

// dom
const {section, button, span, h1, h2, pre, code} = require('iblokz/adapters/vdom');

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
		pre([code('[type="js"][contenteditable="true"]', `
const users = [
	{id: 1, name: 'Bob'},
	{id: 1, name: 'John'},
]
const hash = users.reduce(
	(h, u) => ((h[u.id] = u.name), h), {}
);
		`)])
	]),
	// slide 3
	span([
		h1('Slide 3'),
		h2('Some desc here')
	])
];

module.exports = ({state, actions}) => section('#ui', [
	section('.slides[tabindex="0"]', slides.map((slide, i) =>
		section({
			class: {
				active: state.index === i || (state.old === i && state.transitioning === true),
				onTop: state.transitioning === true && state.index === i,
				moveFromRight: state.transitioning === true && state.index === i && (state.index - state.old) === 1,
				moveToLeft: state.transitioning === true && state.old === i && (state.index - state.old) === 1,
				moveFromLeft: state.transitioning === true && state.index === i && (state.index - state.old) === -1,
				moveToRight: state.transitioning === true && state.old === i && (state.index - state.old) === -1
			},
			on: (state.index === i && state.transitioning) ? {animationend: () => actions.transitionend()} : {}
		}, [slide])
	))
]);
