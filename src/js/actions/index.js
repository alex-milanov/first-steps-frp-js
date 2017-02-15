'use strict';

// initial
const initial = {
	slidesCount: 3,
	index: 0
};

// actions
const next = () => state => Object.assign({}, state, {
	index: (state.index < state.slidesCount - 1) ? state.index + 1 : state.index
});
const prev = () => state => Object.assign({}, state, {
	index: (state.index > 0) ? state.index - 1 : state.index
});

module.exports = {
	initial,
	next,
	prev
};
