let cursor = document.querySelector("img");
document.onmousemove = e => (cursor.style = `left:${e.offsetX}px;top:${e.offsetY}px;`);
