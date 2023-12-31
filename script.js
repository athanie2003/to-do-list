// variables
const container = document.querySelector('.container');
const listContainer = document.createElement('div');
listContainer.classList.add('list-container');
const textBox = document.querySelector('.text-box');
const addBtn = document.querySelector('.add');
const bottomBtns = document.createElement('div');
bottomBtns.classList.add('bottom-btns');
const editBtn = document.createElement('button');
const clearBtn = document.createElement('button');
clearBtn.innerText = 'Clear All';
clearBtn.classList.add('clear');

// add to html
container.appendChild(listContainer);
container.appendChild(bottomBtns);
bottomBtns.appendChild(clearBtn);

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

// keys
document.addEventListener('keydown', event => {
    const pressedKey = event.key;
    if(pressedKey == 'Enter'){
        if(textBox.value !== ''){
            createItem(textBox.value, false);
        }
    }
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
    removeBtn.addEventListener('click', () => {
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

    label.addEventListener('click', () => {
        if(!div.classList.contains('editing')){
            div.classList.add('editing');
            const currentText = label.innerText;
            const inputBox = document.createElement('input');
            inputBox.type = 'text';
            inputBox.value = currentText;
            inputBox.classList.add('edit-input');

            // replace label with input for editing
            div.replaceChild(inputBox, label);
            inputBox.focus();

            // save changes
            inputBox.addEventListener('blur', () => {
                if(inputBox.value){
                    label.innerText = inputBox.value;
                }
                div.replaceChild(label, inputBox);
                div.classList.remove('editing');
                savedItems();
            });

            document.addEventListener('keydown', event => {
                const pressedKey = event.key;
                if(pressedKey == 'Enter'){
                    if(inputBox.value){
                        label.innerText = inputBox.value;
                    }
                    div.replaceChild(label, inputBox);
                    div.classList.remove('editing');
                    savedItems();
                }
            });
        }
    });
    savedItems();
}

// store item in localStorage
function savedItems(){
    const items = Array.from(listContainer.children).map(div => ({
        label: div.querySelector('label').innerText,
        checked: div.querySelector('input').checked
    }));
    localStorage.setItem('items', JSON.stringify(items));
}