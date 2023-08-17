// variables
const body = document.querySelector('body');
const listContainer = document.createElement('div');
const textBox = document.querySelector('.text-box');
const addBtn = document.querySelector('.add');
const clearBtn = document.querySelector('.clear');
let numOfItems = 0;

// add to html
body.appendChild(listContainer);

// load items from localStorage when page loads
window.addEventListener('load', () => {
    const savedItems = JSON.parse(localStorage.getItem('items')) ||
    savedItems.forEach(savedItem => {
        createItem(savedItem.label, savedItem.checked);
    });
});


// buttons
addBtn.addEventListener('click', () => {
    if(textBox.value != ''){
        createItem();
    }
});

clearBtn.addEventListener('click', () => {
    if(listContainer.hasChildNodes){
        const items = listContainer.querySelectorAll('div');
        items.forEach(item => {
            item.remove();
        });
    }
});


// functions
// stores item in localStorage
function savedItems(){
    const items = Array.from(listContainer.children).map(div => ({
        label: div.querySelector('label').innerText,
        checked: div.querySelector('input').checked
    }));
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(){
    // numOfItems++;
    const div = document.createElement('div');
    div.classList.add(`item`);
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

    // buttons from items created within function
    removeBtn.addEventListener('click', (event) => {
        div.remove();
        savedItems();
    });
    input.addEventListener('change', () => {
        if(input.checked){
            label.style.textDecoration = 'line-through';
        }
        else{
            label.style.textDecoration = 'none';
        }
        savedItems();
    });
    savedItems();
}
