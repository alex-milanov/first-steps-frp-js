'use strict';

const obj = require('iblokz/common/obj');

// initial
const initial = {
	slidesMap: ['', ['', ''], ''],
	index: [0, 0],
	old: [0, 0],
	transitioning: false,
	direction: false,
	anim: {
		top: {
			in: 'moveFromTop',
			out: 'moveToBottom'
		},
		left: {
			in: 'moveFromLeft',
			out: 'moveToRight'
		},
		bottom: {
			in: 'moveFromBottom',
			out: 'moveToTop'
		},
		right: {
			in: 'moveFromRight',
			out: 'moveToLeft'
		}
	}
};

const directionMap = {
	top: ({index, slidesMap}) => (slidesMap[index[0]] instanceof Array && index[1] > 0)
		? [index[0], index[1] - 1] : index,
	left: ({index, slidesMap}) => (index[0] > 0)
		? [index[0] - 1, 0] : index,
	bottom: ({index, slidesMap}) => (slidesMap[index[0]] instanceof Array && (index[1] < slidesMap[index[0]].length - 1))
		? [index[0], index[1] + 1] : index,
	right: ({index, slidesMap}) => (index[0] < slidesMap.length - 1)
		? [index[0] + 1, 0] : index
};

// actions
const move = direction => state => Object.assign({}, state, {
	index: directionMap[direction](state),
	old: state.index,
	transitioning: true,
	direction
});
/*
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
*/
const transitionend = () => state => Object.assign({}, state, {transitioning: false, directon: false});
const changeAnim = (direction, inOut, animClass) => state => obj.patch(state, ['anim', direction, inOut], animClass);

module.exports = {
	initial,
	move,
	transitionend,
	changeAnim
};
