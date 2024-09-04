
const itemInput = document.querySelector('.item-input')
const addItemBtn = document.querySelector('.addItem-btn')
const itemList = document.querySelector('.display-list')
let deleteBtns;

let allItems = JSON.parse(localStorage.getItem("ItemsStorage"))
  ? JSON.parse(localStorage.getItem("ItemsStorage"))
  : [];


class Item {
    constructor(title) {
        this.title = title;
        this.id = crypto.randomUUID()
        this.isChecked = false;
    }
}

const saveItemsToStorage = () => {
    localStorage.setItem("ItemsStorage", JSON.stringify(allItems)); // Saving allItems to localStorage
}

const checkItem = (item) => {
    if (!item.isChecked) {
        item.isChecked = true
    }else if(item.isChecked){
        item.isChecked = false
    }
}

const addItem = (e) => {
    e.preventDefault()
    const itemTItle = itemInput.value
    itemInput.value = ''
    if (itemTItle != '') {
        
        allItems.push(new Item(itemTItle))
        saveItemsToStorage()
        displayItems(allItems)
    }
    
}

const deleteItem = (id) => {
    const filteredArr = allItems.filter(item => item.id != id)
    allItems = filteredArr
    saveItemsToStorage()
}

const deleteAllItems = () => {
    allItems = []
    saveItemsToStorage()
    displayItems(allItems)
}

const displayItems = (items) => {
    itemList.innerHTML = '<button class="clearAll-btn">Clear Items</button>'
    document.querySelector('.clearAll-btn').addEventListener('click', deleteAllItems)

    for (const item of items) {
        let html = `
            <div class="checkbox-wrapper-15 list-item">
            <input class="inp-cbx" id=${item.id} type="checkbox" style="display: none;" ${item.isChecked ? 'checked' : ''}/>
            <label class="cbx" for=${item.id}>
                <span>
                <svg width="12px" height="9px" viewbox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline>
                </svg>
                </span>
                <span>${item.title}</span>
            </label>
                  <img src="./imgs/delete-icon.png" alt="Delete Item" class="icon">
            </div>
        `
        itemList.insertAdjacentHTML('afterbegin', html)
        
        const cb = document.getElementById(item.id)
        cb.addEventListener("click", () => {
            checkItem(findItem(item.id))
            saveItemsToStorage()
            
            console.log(cb);
        })
        
        
    }
    deleteBtns = document.querySelectorAll('[alt="Delete Item"]')
    for (const delBtn of deleteBtns) {
        delBtn.addEventListener('click', (e) => {
            const itemId = delBtn.parentElement.children[0].getAttribute('id')
            deleteItem(itemId)
            displayItems(allItems)
            

        })
    }
    
}

const findItem = (id) => {
    const [item] = allItems.filter(item => item.id == id)
    return item
}





displayItems(allItems)

addItemBtn.addEventListener('click', addItem)


console.log(deleteBtns);
