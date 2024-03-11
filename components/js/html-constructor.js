import btnsObj from './buttons.js';
import { btnsGrey } from './buttons.js';
import { btnsYellow } from './buttons.js';

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

for (let key in btnsObj) {
    const divRow = document.createElement('div');
    divRow.setAttribute('class', `row ${key}`);
    divButtons.append(divRow);
    createRow(divRow, btnsObj[key]);
}

function createRow(div, obj, lang='ru') {
    const row = obj[lang];

    row.forEach((item) => {
        createButton(div, item);
    })
}

function createButton(div, obj) {
    const content = obj['content'];

    if (obj['sub_content']) {
        const subContent = obj['sub_content'];

        const btnTwoSym = document.createElement('button');
        btnTwoSym.setAttribute('class', 'button button__two-sym');
        div.append(btnTwoSym);

        const divSubSym = document.createElement('div');
        divSubSym.setAttribute('class', 'button__sub-sym');
        btnTwoSym.append(divSubSym);
        divSubSym.innerText = subContent;

        const divMain = document.createElement('div');
        if (isNum(content)) {
            divMain.setAttribute('class', 'button__num');
        } else {
            divMain.setAttribute('class', 'button__sym');
        }
        btnTwoSym.append(divMain);
        divMain.innerText = content;

        return;
    }

    const btn = document.createElement('button');
    btn.setAttribute('class', 'button');
    div.append(btn);

    if (isYellow(content) || isGrey(content)) {
        switch (content) {
            case 'caps lock':
                btn.classList.add(`button__caps`);
                break;
            case '':
                btn.classList.add(`button__space`);
                break;
            case 'up':
                btn.classList.add('button__arrow-up');
                break;
            case 'left':
                btn.classList.add('button__arrow-left');
                break;
            case 'down':
                btn.classList.add('button__arrow-down');
                break;
            case 'right':
                btn.classList.add('button__arrow-right');
                break;
            default:
                btn.classList.add(`button__${content}`);
        }
        btn.innerText = content;
        
        if (isYellow(content)) {
            btn.classList.add('button_rgb-yellow');

            return;
        }
        btn.classList.add('button_rgb-grey');

        return;
    }

    const divBtn = document.createElement('div');
    divBtn.setAttribute('class', 'button__letter');
    btn.append(divBtn);
    divBtn.innerText = content;
}

function isNum(num) {
    return Number.isInteger(parseInt(num));
}

function isYellow(btn) {
    return btnsYellow.includes(btn);
}

function isGrey(btn) {
    return btnsGrey.includes(btn);
}