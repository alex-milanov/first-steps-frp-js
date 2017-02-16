'use strict';

// initial
const initial = {
	slidesCount: 3,
	index: 0,
	old: 0,
	transitioning: false
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

module.exports = {
	initial,
	next,
	prev,
	transitionend
};
