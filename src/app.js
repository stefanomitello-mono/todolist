


const form = document.querySelector('form');
const textarea = document.querySelector("textarea");
const addbtn = document.querySelector("#addbtn");
const closebtn = document.querySelector(".btn");



let todo = []

const generateUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

const add = (event) => {
    console.log("data:", textarea.value)
    if (!textarea.value) {
        alert("Inserisci un testo!")
        return;
    }

    if (!load()) {
        item = {
            "guid": generateUUID(),
            "checked": false,
            "text": textarea.value
        }
        todo.push(item)
        save(todo);
        return;
    } else {
        todo = load();
        console.log(todo)
        item = {
            "guid": generateUUID(),
            "checked": false,
            "text": textarea.value
        }
        todo.push(item)
        save(todo);
        return;
    }




    //event.preventDefault();
    //console.log(event.preventDefault)
}
form.addEventListener('submit', add);

const save = (obj) => {
    localStorage.setItem('todo', JSON.stringify(obj));
}

const removeItem = (e) => {
    todo = load();
    todo = todo.filter(item => item.guid != e.getAttribute("data-guid"));
    console.log(todo)
    save(todo)
    onLoad()

}

const load = () => {
    return JSON.parse(localStorage.getItem('todo'));
}

const onLoad = () => {
    let todo = load();
    console.log(todo)
    const text = todo.map(x => `<li><span><input data-guid="${x.guid}" onChange="setItemChecked(this)" type="checkbox" ${x.checked ? 'checked' : ''}><label class="text">${x.text}</label></span><a data-guid="${x.guid}" onClick="removeItem(this)" class="close">&times</a> </li>`).join("");
    document.querySelector('.list').innerHTML = text;

}
document.addEventListener("DOMContentLoaded", onLoad);


const setItemChecked = (e) => {
    console.log(e.getAttribute("data-guid"))
    let todo = load();

    todo = todo.map(obj => obj.guid === e.getAttribute("data-guid") ? { ...obj, checked: true } : obj);

    if (e.checked) {
        todo = todo.map(obj => obj.guid === e.getAttribute("data-guid") ? { ...obj, checked: true } : obj);

    } else {
        todo = todo.map(obj => obj.guid === e.getAttribute("data-guid") ? { ...obj, checked: false } : obj);

    }

    save(todo)
    onLoad()
}
