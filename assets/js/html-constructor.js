import btnsArr from './buttons.js';

const container = document.getElementById('container');

const divKeyboard = document.createElement('div');
divKeyboard.setAttribute('class', 'keyboard');
container.append(divKeyboard);

const divTextarea = document.createElement('div');
divTextarea.setAttribute('class', 'keyboard__textarea');
divKeyboard.append(divTextarea);

const textarea = document.createElement('textarea');
textarea.setAttribute('name', 'text');
textarea.setAttribute('cols', 106);
textarea.setAttribute('rows', 10);
divTextarea.append(textarea);

const divButtons = document.createElement('div');
divButtons.setAttribute('class', 'keyboard__buttons rows');
divKeyboard.append(divButtons);

for (let key in btnsArr) {
    const divRow = document.createElement('div');
    divRow.setAttribute('class', `row ${key}`);
    divButtons.append(divRow);
    createRow(divRow, btnsArr[key], 'en');
}

function createRow(div, obj, lang='ru') {
    const row = obj[lang];

    row.forEach((item) => {
        if (typeof item === 'object') {

            const btnTwoSym = document.createElement('button');
            btnTwoSym.setAttribute('class', 'button button__two-sym');
            div.append(btnTwoSym);

            const divSubSym = document.createElement('div');
            divSubSym.setAttribute('class', 'button__sub-sym');
            btnTwoSym.append(divSubSym);
            divSubSym.innerText = item[0];

            const divMain = document.createElement('div');
            if (isNum(item[1])) {
                divMain.setAttribute('class', 'button__num');
            } else {
                divMain.setAttribute('class', 'button__sym');
            }
            btnTwoSym.append(divMain);
            divMain.innerText = item[1];
        } else {
            const btn = document.createElement('button');
            btn.setAttribute('class', 'button');
            div.append(btn);

            if (isYellow(item) || isGrey(item)) {
                if (item === 'caps lock') {
                    btn.classList.add(`button__caps`);
                }else if (item === '') {
                    btn.classList.add(`button__space`);
                } else if (item === 'up') {
                    btn.classList.add('button__arrow-up');
                } else if (item === 'left') {
                    btn.classList.add('button__arrow-left');
                } else if (item === 'down') {
                    btn.classList.add('button__arrow-down');
                } else if (item === 'right') {
                    btn.classList.add('button__arrow-right');
                } else {
                    btn.classList.add(`button__${item}`);
                }
                btn.innerText = item;
                if (isYellow(item)) {
                    btn.classList.add('button_rgb-yellow');
                } else {
                    btn.classList.add('button_rgb-grey');
                }
            } else {
                const divBtn = document.createElement('div');
                divBtn.setAttribute('class', 'button__letter');
                btn.append(divBtn);
                divBtn.innerText = item;
            }
        }
    })
}

function isNum(num) {
    return typeof (parseInt(num)) === 'number' ? true : false;
}

function isYellow(btn) {
    return (btn === 'esc' || btn === 'enter' || btn == '') ? true : false;
}

function isGrey(btn) {
    return (btn === 'backspace' || btn === 'tab' || btn === 'del' || btn === 'caps lock' ||
        btn === 'shift' || btn === 'ctrl' || btn === 'alt' || btn === 'win' || btn == 'up' ||
        btn === 'left' || btn === 'down' || btn === 'right') ? true : false;
}