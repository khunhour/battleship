(()=>{var t={13:(t,e,r)=>{const a=r(113);t.exports=class{constructor(){this.board=this.createGrid(),this.allShips=[],this.createGrid()}createGrid(){this.board=[];for(let t=0;t<10;t++){this.board[t]=[];for(let e=0;e<10;e++)this.board[t].push({hasShip:"",isShot:!1})}}placeShip(t,e,r){let o=e[0],s=e[1];const n=this.getShipId(),i=new a(t,n);this.allShips.push(i);for(let e=0;e<t;e++)this.board[o][s].hasShip=n,"vertical"===r?o++:s++}recieveAttack(t,e){if(!this.board[t][e].isShot&&(this.board[t][e].isShot=!0,this.checkHasShip(t,e))){const r=this.getAttackedShip(t,e);r.hit([t,e]),r.checkSunkState()}}checkShipPlacementValidity(t,e,r,a){let o=e,s=r;for(let e=0;e<t;e++){if(""!==this.board[o][s].hasShip)return!1;"vertical"===a?o++:"horizontal"===a&&s++}return!0}getShipId(){return this.allShips.length}checkHasShip(t,e){return""!==this.board[t][e].hasShip}getAttackedShip(t,e){const r=Number(this.board[t][e].hasShip);return this.allShips[r]}checkAllShipsAreSunk(){return this.allShips.filter((t=>t.isSunk)).length===this.allShips.length}}},926:(t,e,r)=>{const a=r(13);t.exports=class{constructor(t){this.name=t,this.gameboard=new a,this.moves=[],this.smartMoves=[]}attack(t,e,r){t.gameboard.recieveAttack(e,r)}restartPlayer(){this.moves=[],this.smartMoves=[],this.gameboard=new a}}},113:t=>{t.exports=class{constructor(t,e){this.shipId=e,this.length=t,this.hits=[],this.isSunk=!1}hit(t){this.hits.push(t)}checkSunkState(){this.length===this.hits.length&&(this.isSunk=!0)}}}},e={};function r(a){var o=e[a];if(void 0!==o)return o.exports;var s=e[a]={exports:{}};return t[a](s,s.exports,r),s.exports}(()=>{"use strict";const t=(()=>{const t=(t,e)=>{const r=JSON.stringify(e);return t.some((t=>JSON.stringify(t)===r))},e=r=>{console.log("getRandomCoord");let a=`0${Math.floor(100*Math.random())}`;a=a.slice(-2);const o=a.split("").map(Number);return t(r.moves,o)?e(r):(r.moves.push(o),o)};return{getCoord:t=>{if(0!==t.smartMoves.length){const e=t.smartMoves[0];return t.moves.push(e),t.smartMoves.shift(),e}return e(t)},calculateNextBestCoord:(e,r,a)=>{const o=a[0],s=a[1];if(""===r.gameboard.board[o][s].hasShip)return;const n=[[o,s+1],[o,s-1],[o+1,s],[o-1,s]];n.slice().forEach((r=>{if(console.log(r),console.log("forEach"),r[0]<0||r[0]>9||r[1]<0||r[1]>9){console.log("minus outside range");const t=n.findIndex((t=>JSON.stringify(t)===JSON.stringify(r)));n.splice(t,1)}if(t(e.moves,r)){console.log("already played");const t=n.findIndex((t=>JSON.stringify(t)===JSON.stringify(r)));n.splice(t,1)}})),n.forEach((t=>{e.smartMoves.push(t)}))}}})(),e=(()=>{const t=(e,r,a)=>{let o,s;return"horizontal"===a?(o=Math.floor(10*Math.random()),s=Math.floor(Math.random()*(10-r))):(o=Math.floor(Math.random()*(10-r)),s=Math.floor(10*Math.random())),((t,e,r,a)=>{let o=!1,s=e[0],n=e[1];for(let e=0;e<r;e++)""!==t.gameboard.board[s][n].hasShip&&(o=!0,console.log("hi")),"horizontal"===a?n++:s++;return o})(e,[o,s],r,a)?t(e,r,a):[o,s]};return{placeShipRandomly:e=>{[5,4,3,2,2,1].forEach((r=>{const a=["horizontal","vertical"][Math.floor(2*Math.random())],o=t(e,r,a);e.gameboard.placeShip(r,o,a)}))}}})(),a=(()=>{const t=(t,e,r)=>{"computer"===t.name?document.querySelector(`#computer-grid [data-row="${e}"][data-col="${r}"]`).classList.add("red-mark"):document.querySelector(`#human-grid [data-row="${e}"][data-col="${r}"]`).classList.add("red-mark")},e=(t,e,r)=>{"computer"===t.name?document.querySelector(`#computer-grid [data-row="${e}"][data-col="${r}"]`).classList.add("missed-mark"):document.querySelector(`#human-grid [data-row="${e}"][data-col="${r}"]`).classList.add("missed-mark")},r=(t,e,r)=>{"computer"===t.name?document.querySelector(`#computer-grid [data-row="${e}"][data-col="${r}"]`).classList.add("ship-mark"):document.querySelector(`#human-grid [data-row="${e}"][data-col="${r}"]`).classList.add("ship-mark")},a=t=>{const e=t.gameboard.allShips.filter((t=>!1===t.isSunk));document.querySelector(`.${t.name}-side .ship-num`).textContent=`Ships Remaining: ${e.length}`},o=()=>{const t=document.getElementById("human-grid"),e=document.getElementById("computer-grid");for(let r=0;r<10;r++)for(let a=0;a<10;a++){const o=document.createElement("div");o.classList.add("tile"),o.dataset.row=r,o.dataset.col=a;const s=o.cloneNode();t.appendChild(s),e.appendChild(o)}};return{createBoard:o,render:o=>{for(let a=0;a<10;a++)for(let s=0;s<10;s++)o.gameboard.board[a][s].isShot&&""!==o.gameboard.board[a][s].hasShip?t(o,a,s):o.gameboard.board[a][s].isShot&&""===o.gameboard.board[a][s].hasShip&&e(o,a,s),""!==o.gameboard.board[a][s].hasShip&&r(o,a,s);a(o)},declareWinner:t=>{const e=document.querySelector(".announcement");"computer"===t.name?e.textContent="You Lose!":e.textContent="You Won!"},updateRemainingShip:a,disableBoard:()=>{document.querySelector(".board").classList.add("fade")},restartBoard:()=>{document.getElementById("human-grid").textContent="",document.getElementById("computer-grid").textContent="",document.querySelectorAll(".ship-num").forEach((t=>{t.textContent="Ships Remaining: 6"})),o(),document.querySelector(".board").classList.remove("fade")}}})(),o=r(926),s=(()=>{const r=new o("human"),s=new o("computer"),n=()=>{e.placeShipRandomly(r),e.placeShipRandomly(s),a.render(r),a.render(s)},i=(t,e)=>{e.gameboard.checkAllShipsAreSunk()&&(a.declareWinner(t),a.disableBoard())};return{startGame:n,startAttackRound:(e,o)=>{r.attack(s,e,o),a.render(s),i(r,s);const n=t.getCoord(s,r);t.calculateNextBestCoord(s,r,n),s.attack(r,n[0],n[1]),a.render(r),i(s,r)},restartGame:()=>{a.restartBoard(),r.restartPlayer(),s.restartPlayer(),n()}}})(),n=(()=>{const t=()=>{document.querySelectorAll("#computer-grid .tile").forEach((t=>{t.addEventListener("click",(t=>{const e=Number(t.target.dataset.row),r=Number(t.target.dataset.col);s.startAttackRound(e,r)}))}))};return{startButtonEvent:()=>{document.getElementById("start").addEventListener("click",(()=>{s.startGame(),t()})),document.getElementById("restart").addEventListener("click",(()=>{s.restartGame(),t()}))}}})();a.createBoard(),n.startButtonEvent()})()})();