import { btnsGrey } from './buttons.js';
import { btnsYellow } from './buttons.js';
import state from './state.js';

export function isNum(num) {
    return Number.isInteger(parseInt(num));
}

export function isYellow(btn) {
    return btnsYellow.includes(btn);
}

export function isGrey(btn) {
    return btnsGrey.includes(btn);
}

export function escFunc() {
    const textarea = document.querySelector('textarea');
    textarea.blur();
}

export function backspaceFunc() {
    const textarea = document.querySelector('textarea');

    if ((textarea.selectionStart - 1) < 0) {
        textarea.setSelectionRange(0, 0);
        return;
    }
    const oneHalf = textarea.value.slice(0, textarea.selectionStart - 1);
    const otherHalf = textarea.value.slice(textarea.selectionStart);
    textarea.value = oneHalf + otherHalf;

    textarea.setSelectionRange(oneHalf.length, oneHalf.length);
}

export function delFunc() {
    const textarea = document.querySelector('textarea');

    const oneHalf = textarea.value.slice(0, textarea.selectionStart);
    const otherHalf = textarea.value.slice(textarea.selectionStart + 1);
    textarea.value = oneHalf + otherHalf;

    textarea.setSelectionRange(oneHalf.length, oneHalf.length);
}

export function capsFunc(elem) {
    if (state['isCaps']) {
        state['isCaps'] = !state['isCaps'];
        elem.classList.remove('caps-on');
        return;
    }
    state['isCaps'] = !state['isCaps'];
    elem.classList.add('caps-on');
}

export function shiftFunc(elem) {
    if (state['isShift']) {
        state['isShift'] = !state['isShift'];
        elem.classList.remove('shift-on');
        return;
    }
    state['isShift'] = !state['isShift'];
    elem.classList.add('shift-on');
}

export function downFunc() {
    const textarea = document.querySelector('textarea');

    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
}

export function upFunc() {
    const textarea = document.querySelector('textarea');
    
    textarea.setSelectionRange(0, 0);
}

export function leftFunc() {
    const textarea = document.querySelector('textarea');

    const pos = textarea.selectionStart;
    
    if (!pos) {
        textarea.setSelectionRange(0, 0);
        return;
    }
    textarea.setSelectionRange(pos - 1, pos - 1);
}

export function rightFunc() {
    const textarea = document.querySelector('textarea');

    const pos = textarea.selectionStart;
    textarea.setSelectionRange(pos + 1, pos + 1);
}

export function insertText(elem) {
    const textarea = document.querySelector('textarea');

    const oneHalf = textarea.value.slice(0, textarea.selectionStart);
    const otherHalf = textarea.value.slice(textarea.selectionStart);
    textarea.value = oneHalf + elem + otherHalf;

    textarea.setSelectionRange(oneHalf.length + 1, oneHalf.length + 1);
}