(()=>{"use strict";const e=(()=>{const e=e=>{console.log(e.target)};return{startTileEvent:()=>{document.querySelectorAll("#computer-grid .tile").forEach((t=>{t.addEventListener("click",e)}))}}})();(()=>{const e=document.getElementById("player-grid"),t=document.getElementById("computer-grid");for(let t=0;t<100;t++){const t=document.createElement("div");t.classList.add("tile"),e.appendChild(t)}for(let e=0;e<10;e++)for(let d=0;d<10;d++){const l=document.createElement("div");l.classList.add("tile"),l.dataset.row=e,l.dataset.col=d,t.appendChild(l)}})(),e.startTileEvent()})();