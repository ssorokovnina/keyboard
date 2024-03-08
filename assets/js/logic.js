const textarea = document.querySelector('textarea');

const lettersArr = document.querySelectorAll('.button');

lettersArr.forEach( (letter) => {
    letter.addEventListener('click', (evt) => {
        if (letter.classList.contains('button__space')) {
            textarea.textContent += ' ';
        }
        if (letter.firstElementChild.classList.contains('button__letter')) {
            textarea.textContent += letter.firstElementChild.innerText.toLowerCase();
        }
        if (letter.classList.contains('button__two-sym')) {
            textarea.textContent += letter.children[1].innerText;
        }
    })
})
    
