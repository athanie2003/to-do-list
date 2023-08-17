// variables
const body = document.querySelector('body');
const listContainer = document.createElement('div');
const textBox = document.querySelector('.text-box');
const addBtn = document.querySelector('.add');
const clearBtn = document.querySelector('.clear');

// add to html
body.appendChild(listContainer);

// load items from localStorage when page loads
window.addEventListener('load', () => {
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    savedItems.forEach(savedItem => {
        createItem(savedItem.label, savedItem.checked);
    });

    // Apply styles to labels if checked
    listContainer.querySelectorAll('.item').forEach(div => {
        const input = div.querySelector('input');
        const label = div.querySelector('label');
        if (input.checked) {
            label.style.textDecoration = 'line-through';
        }
    });
});

// buttons
addBtn.addEventListener('click', () => {
    if(textBox.value !== ''){
        createItem(textBox.value, false);
    }
});

clearBtn.addEventListener('click', () => {
    while(listContainer.firstChild){
        listContainer.removeChild(listContainer.firstChild);
    }
    savedItems();
});


// functions
function createItem(labelText, isChecked){
    const div = document.createElement('div');
    div.classList.add(`item`);
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = isChecked;
    const label = document.createElement('label');
    label.innerText = labelText;
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

// stores item in localStorage
function savedItems(){
    const items = Array.from(listContainer.children).map(div => ({
        label: div.querySelector('label').innerText,
        checked: div.querySelector('input').checked
    }));
    localStorage.setItem('items', JSON.stringify(items));
}