function $(select) {//获取单个
    return document.querySelector(select);
}

function $$(select) {//获取所有
    return document.querySelectorAll(select);
}

function $$$(tagName) {//创建一个dom
    return document.createElement(tagName);
}