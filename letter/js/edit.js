function checkForm() {

}

function init(){
    let letter = getFromStorage();
    if(letter!=null){
        setData(letter);
    }
}

function setData(data) {
    for (p in data) {
        let prop = findByname(document.forms[0], p);
        if (prop != undefined) {
            prop.value = data[p];
        }
    }
}

function findByname(form, prop) {
    for (var i = 0; i < form.length; i++) {
        if (form.elements[i].id == prop) {
            return form.elements[i];
        }
    }
}

function form2Object(form) {
    let o = {};
    o["fname"] = form.name;
    for (var i = 0; i < form.length; i++) {
        let attr = form.elements[i];
        if (attr.id.length > 0) {
            o[attr.id] = attr.value;
        }
    }
    return o;
}

function save(){
    let letter = form2Object(document.forms[0]);
    localStorage.setItem('letter', JSON.stringify(letter));
}

function getFromStorage() {
    return JSON.parse(localStorage.getItem('letter'));
}