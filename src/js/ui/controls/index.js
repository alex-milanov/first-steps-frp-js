'use strict';

// dom
const {
	section, button, span, h1, h2, pre, code,
	form, fieldset, label, legend, input, select, option
} = require('iblokz/adapters/vdom');

const animList = [
	'moveToLeft',
	'moveFromLeft',
	'moveToRight',
	'moveFromRight'
];

module.exports = ({state, actions}) => section('.controls', [
	label('left in/out'),
	select({on: {change: ev => actions.changeAnim('left', 'in', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.left.in}, prop: {value: anim}}, anim))
	),
	select({on: {change: ev => actions.changeAnim('left', 'out', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.left.out}, prop: {value: anim}}, anim))
	),
	label('right in/out'),
	select({on: {change: ev => actions.changeAnim('right', 'in', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.right.in}, prop: {value: anim}}, anim))
	),
	select({on: {change: ev => actions.changeAnim('right', 'out', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.right.out}, prop: {value: anim}}, anim))
	)
]);
