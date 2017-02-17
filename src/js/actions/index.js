'use strict';

const obj = require('iblokz/common/obj');

// initial
const initial = {
	slidesCount: 3,
	index: 0,
	old: 0,
	transitioning: false,
	anim: {
		left: {
			in: 'moveFromLeft',
			out: 'moveToRight'
		},
		right: {
			in: 'moveFromRight',
			out: 'moveToLeft'
		}
	}
};

// actions
const next = () => state => Object.assign({}, state, {
	index: (state.index < state.slidesCount - 1) ? state.index + 1 : state.index,
	old: state.index,
	transitioning: true
});
const prev = () => state => Object.assign({}, state, {
	index: (state.index > 0) ? state.index - 1 : state.index,
	old: state.index,
	transitioning: true
});
const transitionend = () => state => Object.assign({}, state, {transitioning: false});
const changeAnim = (direction, inOut, animClass) => state => obj.patch(state, ['anim', direction, inOut], animClass);

module.exports = {
	initial,
	next,
	prev,
	transitionend,
	changeAnim
};
