import btnsObj from './buttons.js';
import { btnsGrey } from './buttons.js';
import { btnsYellow } from './buttons.js';
import state from './state.js';
import { escFunc, backspaceFunc, delFunc, capsFunc, shiftFunc, 
    downFunc, upFunc, leftFunc, rightFunc, insertText } from './logic.js';

const container = document.getElementById('container');

const divKeyboard = document.createElement('div');
divKeyboard.setAttribute('class', 'keyboard');
container.append(divKeyboard);

const divTextarea = document.createElement('div');
divTextarea.setAttribute('class', 'keyboard__textarea');
divKeyboard.append(divTextarea);

const textareaTag = document.createElement('textarea');
textareaTag.setAttribute('name', 'text');
textareaTag.setAttribute('cols', 106);
textareaTag.setAttribute('rows', 10);
divTextarea.append(textareaTag);

function createKeyboard(lang) {
    const divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'keyboard__buttons rows');
    divKeyboard.append(divButtons);


    for (let key in btnsObj) {
        const divRow = document.createElement('div');
        divRow.setAttribute('class', `row ${key}`);
        divButtons.append(divRow);
        createRow(divRow, btnsObj[key], lang);
    }

    const lettersArr = document.querySelectorAll('.button');
    lettersArr.forEach( (letter) => {
        letter.addEventListener('click', listenerFunc);
    })
}

textareaTag.addEventListener('keydown', keydownFunc);
textareaTag.addEventListener('keyup', keyupFunc);

function keydownFunc(evt) {
    // console.log('code', evt.code);
    for (let key in btnsObj) {
        const row = btnsObj[key][state['lang']];
        
        row.forEach((item) => {
            if (item.code === evt.code) {
                const targetBtn = item.button;
                targetBtn.classList.add('click');
                // console.log('code', evt.code);
                // console.log('item', item.code);

                if (evt.code === 'CapsLock') {
                    state['isCaps'] = !state['isCaps'];
                }
                if (evt.key === 'Shift') {
                    state['isShift'] = !state['isShift'];
                }

                if (evt.key === 'Alt' && evt.shiftKey) {
                    
                    if (state['lang'] === 'ru') {
                        delKeyboard();
                        createKeyboard('en');
                        state['lang'] = 'en';
        
                        const shift = document.querySelector('.button__shift');
                        const alt = document.querySelector('.button__alt');
                        shift.classList.add('click');
                        alt.classList.add('click');
                        return;
                    }
                    delKeyboard();
                    createKeyboard('ru');
                    state['lang'] = 'ru';
        
                    const shift = document.querySelector('.button__shift');
                    const alt = document.querySelector('.button__alt');
                    shift.classList.add('click');
                    alt.classList.add('click');
                }

                if (evt.code === 'Tab') {
                    setTimeout(() => targetBtn.classList.remove('click'), 200);
                }
            }
        })
    }
}


function keyupFunc(evt) {
    for (let key in btnsObj) {
        const row = btnsObj[key][state['lang']];
        
        row.forEach((item) => {
            if (item.code === evt.code) {
                if (evt.code === 'CapsLock' && state['isCaps']) {
                    return;
                }
                if (evt.key === 'Shift') {
                    state['isShift'] = false;
                }

                const targetBtn = item.button;
                targetBtn.classList.remove('click');
            }
        })
    }
}

createKeyboard(state['lang']);

function listenerFunc(evt) {
    textareaTag.focus();

    if (evt.currentTarget.classList.contains('button__esc')) {
        escFunc();
    }
    if (evt.currentTarget.classList.contains('button__backspace')) {
        backspaceFunc();
    }
    if (evt.currentTarget.classList.contains('button__tab')) {
        insertText('\t');
    }
    if (evt.currentTarget.classList.contains('button__del')) {
        delFunc();
    }
    if (evt.currentTarget.classList.contains('button__caps')) {
        capsFunc(evt.currentTarget);
    }
    if (evt.currentTarget.classList.contains('button__enter')) {
        insertText('\n');
    }
    if (evt.currentTarget.classList.contains('button__shift')) {
        shiftFunc(evt.currentTarget);
    }
    if (evt.currentTarget.classList.contains('button__arrow-up')) {
        upFunc(evt.currentTarget);
    }
    if (evt.currentTarget.classList.contains('button__arrow-down')) {
        downFunc(evt.currentTarget);
    }
    if (evt.currentTarget.classList.contains('button__arrow-left')) {
        leftFunc(evt.currentTarget);
    }
    if (evt.currentTarget.classList.contains('button__arrow-right')) {
        rightFunc(evt.currentTarget);
    }
    if (evt.currentTarget.classList.contains('button__space')) {
        insertText(' ');
    }
    if (evt.currentTarget.classList.contains('button__alt')) {
        if (state['isShift']) {
            if (state['lang'] === 'ru') {
                delKeyboard();
                createKeyboard('en');
                state['lang'] = 'en';

                const shift = document.querySelector('.button__shift');
                shift.classList.add('shift-on');
                return;
            }
            delKeyboard();
            createKeyboard('ru');
            state['lang'] = 'ru';

            const shift = document.querySelector('.button__shift');
            shift.classList.add('shift-on');
        }
    }
    if (evt.currentTarget.classList.contains('button__two-sym')) {
        if (state['isShift']) {
            insertText(evt.currentTarget.children[0].innerText);
            return;
        }
        insertText(evt.currentTarget.children[1].innerText);
    }
    if (evt.currentTarget.firstElementChild?.classList.contains('button__letter')) {
        if ((state['isCaps'] || state['isShift']) && !(state['isCaps'] && state['isShift'])) {
            insertText(evt.currentTarget.firstElementChild.innerText.toUpperCase());
            return;
        }
        insertText(evt.currentTarget.firstElementChild.innerText.toLowerCase());
    }

}

function delKeyboard() {
    const lettersArr = document.querySelectorAll('.button');
    
    lettersArr.forEach( (letter) => {
        letter.removeEventListener('click', listenerFunc);
    })
    const keyboard = document.querySelector('.keyboard__buttons');
    keyboard.remove();
}

function createRow(div, obj, lang) {
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

        obj['button'] = btnTwoSym;

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
        obj['button'] = btn;
        
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

    obj['button'] = btn;

    return;
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
