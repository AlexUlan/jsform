export function isValid (value){
    return value.length >= 5 && value.length <= 256
}

export function modalWindow (title, content){
    const modal = document.createElement('div');
    modal.classList.add('modalWindow');

    const html = `
        <h1>${title}</h1>
        <div class='contnetModal'>${content}</div>
    `
    modal.innerHTML = html;
    mui.overlay('on', modal);
}