function checkForm() {

}

function init(){
    let data = getFromStorage();
    if(data!=null){
        setData(data);
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
    let data = form2Object(document.forms[0]);
    localStorage.setItem('data', JSON.stringify(data));
}

function getFromStorage() {
    return JSON.parse(localStorage.getItem('data'));
}