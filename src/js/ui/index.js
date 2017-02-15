'use strict';

// dom
const {section, button, span, h1, h2, pre, code} = require('iblokz/adapters/vdom');
// components
// const counter = require('./counter');

module.exports = ({state, actions}) => section('#ui', [
	section('.slides[tabindex="0"]', [
		section({class: {active: state.index === 0}}, [span([
			h2('First Steps in'),
			h1('Functional Reactive JavaScript')
		])]),
		section({class: {active: state.index === 1}}, [span([
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
		])]),
		section({class: {active: state.index === 2}}, [span([
			h1('Slide 3'),
			h2('Some desc here')
		])])
	])
]);
