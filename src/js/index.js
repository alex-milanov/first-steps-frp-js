'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

// iblokz
const vdom = require('iblokz/adapters/vdom');
const obj = require('iblokz/common/obj');
const arr = require('iblokz/common/arr');

// app
const app = require('./util/app');
let actions = app.adapt(require('./actions'));
let ui = require('./ui');
let actions$;

// hot reloading
if (module.hot) {
	// actions
	actions$ = $.fromEventPattern(
		h => module.hot.accept("./actions", h)
	).flatMap(() => {
		actions = app.adapt(require('./actions'));
		return actions.stream.startWith(state => state);
	}).merge(actions.stream);
	// ui
	module.hot.accept("./ui", function() {
		ui = require('./ui');
		actions.stream.onNext(state => state);
	});
} else {
	actions$ = actions.stream;
}

// actions -> state
const state$ = actions$
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();

document.addEventListener('keydown', e => {
	console.log(e.key, e.target, e);
	if (e.target.contentEditable === 'true') {
		switch (e.key) {
			case 'Escape':
				e.target.blur();
				window
					.getSelection()
					.removeAllRanges();
				document.querySelector('.slides').focus();
				break;
			case 'Tab':
				e.preventDefault();
				document.execCommand('insertHTML', false, '&#009');
				break;
			default:
				break;
		}
		return;
	}
	if (e.key === 'E' && e.shiftKey === true && e.ctrlKey === true)
		actions.toggleControls();

	if (e.key === 'ArrowUp') actions.move('top');
	if (e.key === 'ArrowRight') actions.move('right');
	if (e.key === 'ArrowDown') actions.move('bottom');
	if (e.key === 'ArrowLeft') actions.move('left');
});

// state -> ui
const ui$ = state$.map(state => ui({state, actions}));
vdom.patchStream(ui$, '#ui');
