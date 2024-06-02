let elementCounter = 0;

function addText() {
    const textElement = document.createElement('div');
    textElement.className = 'element';
    textElement.contentEditable = true;
    textElement.style.top = '50px';
    textElement.style.left = '50px';
    textElement.innerText = 'Edit this text';
    makeElementDraggable(textElement);
    document.getElementById('canvas').appendChild(textElement);
}

function addImage() {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.className = 'element';
        imgElement.style.top = '50px';
        imgElement.style.left = '50px';
        imgElement.style.width = '100px';
        imgElement.style.height = 'auto';
        makeElementDraggable(imgElement);
        document.getElementById('canvas').appendChild(imgElement);
    }
}

function makeElementDraggable(element) {
    element.draggable = true;
    element.ondragstart = function (event) {
        event.dataTransfer.setData('text/plain', null);
        const style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData('text/plain',
            (parseInt(style.getPropertyValue('left'), 10) - event.clientX) + ',' +
            (parseInt(style.getPropertyValue('top'), 10) - event.clientY));
    };

    element.ondragend = function (event) {
        const offset = event.dataTransfer.getData('text/plain').split(',');
        element.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        element.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    };
}

function exportDesign() {
    const canvas = document.getElementById('canvas');
    const elements = canvas.getElementsByClassName('element');
    let htmlContent = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Exported Design</title><link rel="stylesheet" href="style.css"></head><body>';
    htmlContent += '<div id="canvas" style="position:relative;">';

    for (let element of elements) {
        if (element.tagName === 'DIV') {
            htmlContent += `<div class="element" style="position:absolute; left:${element.style.left}; top:${element.style.top};">${element.innerHTML}</div>`;
        } else if (element.tagName === 'IMG') {
            htmlContent += `<img src="${element.src}" class="element" style="position:absolute; left:${element.style.left}; top:${element.style.top}; width:${element.style.width}; height:${element.style.height};">`;
        }
    }

    htmlContent += '</div></body></html>';

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
