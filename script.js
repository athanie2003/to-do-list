// variables
const body = document.querySelector('body');
const listContainer = document.createElement('div');
const textBox = document.querySelector('.text-box');
const addBtn = document.querySelector('.add');
const deleteBtns = document.querySelectorAll('.remove');
let numOfItems = 0;

// add to html
body.appendChild(listContainer);


// buttons
addBtn.addEventListener('click', () => {
    if(textBox.value != ''){
        createItem();
    }
});



function createItem(){
    numOfItems++;
    const div = document.createElement('div');
    div.classList.add(`item${numOfItems}`);
    const input = document.createElement('input');
    input.type = 'checkbox';
    const label = document.createElement('label');
    label.innerText = textBox.value;
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    removeBtn.classList.add('remove');
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(removeBtn);
    listContainer.appendChild(div);
    textBox.value = '';
    removeBtn.addEventListener('click', (event) => {
        div.remove();
    });
    input.addEventListener('change', () => {
        if(input.checked){
            label.style.textDecoration = 'line-through';
        }
        else{
            label.style.textDecoration = 'none';
        }
        
    });
}