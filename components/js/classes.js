import btnsObj from './buttons.js';
import state from './state.js';
import { isNum, isYellow, isGrey } from './utils.js';
import { escFunc, backspaceFunc, delFunc, capsFunc, shiftFunc, 
    downFunc, upFunc, leftFunc, rightFunc, insertText } from './utils.js';

let arr = [];

class Button {
    constructor(btnObj, func) {
        this.button = this.create(btnObj); // del
        this.link(func);
    }

    create(btn) {
        const lang = state['lang'];
        const content = btn[`content_${lang}`];

        if (btn[`isSub_${lang}`]) {
            const subContent = btn[`sub_${lang}`];

            const btnTwoSym = document.createElement('button');
            btnTwoSym.setAttribute('class', 'button button__two-sym');

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

            return btnTwoSym;
        }

        const btnEl = document.createElement('button');
        btnEl.setAttribute('class', 'button');

        if (isYellow(content) || isGrey(content)) {
            switch (content) {
                case 'caps lock':
                    btnEl.classList.add(`button__caps`);
                    break;
                case '':
                    btnEl.classList.add(`button__space`);
                    break;
                case 'up':
                    btnEl.classList.add('button__arrow-up');
                    break;
                case 'left':
                    btnEl.classList.add('button__arrow-left');
                    break;
                case 'down':
                    btnEl.classList.add('button__arrow-down');
                    break;
                case 'right':
                    btnEl.classList.add('button__arrow-right');
                    break;
                default:
                    btnEl.classList.add(`button__${content}`);
            }
            btnEl.innerText = content;
            
            if (isYellow(content)) {
                btnEl.classList.add('button_rgb-yellow');

                return btnEl;
            }
            btnEl.classList.add('button_rgb-grey');

            return btnEl;
        }

        const divBtn = document.createElement('div');
        divBtn.setAttribute('class', 'button__letter');
        btnEl.append(divBtn);
        divBtn.innerText = content;

        return btnEl;
    }

    link(func) {
        this.button.addEventListener('click', func);
    }

    unlink(func) {
        this.button.removeEventListener('click', func);
    }

    changeLang(inst) {
        if (state['lang'] === 'ru') {
            state['lang'] = 'en';
        } else {
            state['lang'] = 'ru';
        }
        
        const obj = arr.find((el) => {
            return el.elem.button === inst.button ? el : null;
        })

        const content = obj[`content_${state['lang']}`];
        if (isYellow(content) || isGrey(content)) {
            return;
        }

        const btn = obj.elem.button;
        if (obj['isSub_en'] !== obj['isSub_ru']) {
            btn.removeChild(btn.firstElementChild);

            if (state['lang'] === 'en') {
                btn.classList.add('button__two-sym');

                const divSub = document.createElement('div');
                divSub.setAttribute('class', 'button__sub-sym');
                btn.append(divSub);
                divSub.innerText = obj[`sub_${state['lang']}`];

                const divMain = document.createElement('div');
                divMain.setAttribute('class', 'button__sym');
                btn.append(divMain);
                divMain.innerText = content;

                return;
            }
            btn.classList.remove('button__two-sym');
            while (btn.firstElementChild) {
                btn.removeChild(btn.firstElementChild);
            }

            const divLetter = document.createElement('div');
            divLetter.setAttribute('class', 'button__letter');
            btn.append(divLetter);
            divLetter.innerText = content;

            return;
        }
        if (btn.classList.contains('button__two-sym')) {

            const sub = obj[`sub_${state['lang']}`];
            btn.querySelector('.button__sub-sym').innerText = sub;

            if (btn.querySelector('.button__sym')) {
                btn.querySelector('.button__sym').innerText = content;
                return ;
            }
            return ;
        }
        btn.querySelector('.button__letter').innerText = content;
    }
}

class Keyboard {
    constructor() {
        const container = document.getElementById('container');

        const divKeyboard = document.createElement('div');
        divKeyboard.setAttribute('class', 'keyboard');
        container.append(divKeyboard);

        const divTextarea = document.createElement('div');
        divTextarea.setAttribute('class', 'keyboard__textarea');
        divKeyboard.append(divTextarea);

        this.textareaTag = document.createElement('textarea');
        this.textareaTag.setAttribute('name', 'text');
        this.textareaTag.setAttribute('cols', 106);
        this.textareaTag.setAttribute('rows', 10);
        divTextarea.append(this.textareaTag);

        divKeyboard.append(this.create());

        this.keydownLink();
        this.keyupLink();
    }

    create() {
        const divButtons = document.createElement('div');
        divButtons.setAttribute('class', 'keyboard__buttons rows');

        for (let key in btnsObj) {
            const divRow = document.createElement('div');
            divRow.setAttribute('class', `row ${key}`);
            divButtons.append(divRow);

            const row = btnsObj[key];
            row.forEach((item) => {
                const btn = new Button(item, this.listenerFunc);
                arr.push({
                    elem: btn,
                    ...item,
                })
                divRow.append(btn.button);
            });
        }

        return divButtons;
    }

    keyupLink() {
        this.textareaTag.addEventListener('keyup', this.keyupFunc);
    }

    keydownLink() {
        this.textareaTag.addEventListener('keydown', this.keydownFunc);
    }

    keyupFunc(evt) {
        for (let elemObj of arr) {

            if (evt.code === elemObj.code) {

                if (evt.code === 'CapsLock' && state['isCaps']) {
                    return;
                }
                if (evt.key === 'Shift') {
                    state['isShift'] = false;
                }

                const targetBtn = elemObj.elem.button;

                targetBtn.classList.remove('click');
            }
        }
    }

    keydownFunc(evt) {
        for (let elemObj of arr) {

            if (evt.code === elemObj.code) {

                if (evt.code === 'CapsLock') {
                    state['isCaps'] = !state['isCaps'];
                }
                if (evt.key === 'Shift') {
                    state['isShift'] = !state['isShift'];
                }
                if (evt.key === 'Alt' && evt.shiftKey) {
                    for (let elemObj of arr) {
                        elemObj.elem.changeLang(elemObj.elem);
                        // check all button highlights
    
                    }
                }

                const targetBtn = elemObj.elem.button;

                targetBtn.classList.add('click');

                if (evt.code === 'Tab') {
                    evt.preventDefault();
                    insertText('\t');
                }
            }
        }
    }

    listenerFunc(evt) {
        const textarea = document.querySelector('textarea');
        textarea.focus();

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
                for (let elemObj of arr) {
                    elemObj.elem.changeLang(elemObj.elem);
                    // check all button highlights

                }

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
}

const kb = new Keyboard();