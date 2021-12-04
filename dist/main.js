(()=>{var e={13:(e,t,r)=>{const a=r(113);e.exports=class{constructor(){this.board=this.createGrid(),this.allShips=[],this.createGrid()}createGrid(){this.board=[];for(let e=0;e<10;e++){this.board[e]=[];for(let t=0;t<10;t++)this.board[e].push({hasShip:"",isShot:!1})}}placeShip(e,t,r){let o=t[0],s=t[1];const n=this.getShipId(),i=new a(e,n);this.allShips.push(i);for(let t=0;t<e;t++)this.board[o][s].hasShip=n,"vertical"===r?o++:s++}recieveAttack(e,t){if(!this.board[e][t].isShot&&(this.board[e][t].isShot=!0,this.checkHasShip(e,t))){const r=this.getAttackedShip(e,t);r.hit([e,t]),r.checkSunkState()}}checkShipPlacementValidity(e,t,r,a){let o=t,s=r;for(let t=0;t<e;t++){if(""!==this.board[o][s].hasShip)return!1;"vertical"===a?o++:"horizontal"===a&&s++}return!0}getShipId(){return this.allShips.length}checkHasShip(e,t){return""!==this.board[e][t].hasShip}getAttackedShip(e,t){const r=Number(this.board[e][t].hasShip);return this.allShips[r]}checkAllShipsAreSunk(){return this.allShips.filter((e=>e.isSunk)).length===this.allShips.length}}},926:(e,t,r)=>{const a=r(13);e.exports=class{constructor(e){this.name=e,this.gameboard=new a,this.moves=[],this.smartMoves=[]}attack(e,t,r){e.gameboard.recieveAttack(t,r)}restartPlayer(){this.moves=[],this.smartMoves=[],this.gameboard=new a}}},113:e=>{e.exports=class{constructor(e,t){this.shipId=t,this.length=e,this.hits=[],this.isSunk=!1}hit(e){this.hits.push(e)}checkSunkState(){this.length===this.hits.length&&(this.isSunk=!0)}}}},t={};function r(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,r),s.exports}(()=>{"use strict";const e=(()=>{const e=document.querySelector(".announcement");return{displayWelcomeMsg:()=>{e.textContent='Welcome to BattleShip. \r\n Place 6 ships on your board. \r\n Then press "Start" when you\'re done.'},declareWinner:t=>{"computer"===t.name?e.textContent="You Lose!":e.textContent="You Won!"},displayStartingGameMsg:()=>{e.textContent="Take turn dropping your bomb."}}})(),t=(()=>{const e=(e,t)=>{const r=JSON.stringify(t);return e.some((e=>JSON.stringify(e)===r))},t=r=>{console.log("getRandomCoord");let a=`0${Math.floor(100*Math.random())}`;a=a.slice(-2);const o=a.split("").map(Number);return e(r.moves,o)?t(r):(r.moves.push(o),o)};return{getCoord:e=>{if(0!==e.smartMoves.length){const t=e.smartMoves[0];return e.moves.push(t),e.smartMoves.shift(),t}return t(e)},calculateNextBestCoord:(t,r,a)=>{const o=a[0],s=a[1];if(""===r.gameboard.board[o][s].hasShip)return;const n=[[o,s+1],[o,s-1],[o+1,s],[o-1,s]];n.slice().forEach((r=>{if(console.log(r),console.log("forEach"),r[0]<0||r[0]>9||r[1]<0||r[1]>9){console.log("minus outside range");const e=n.findIndex((e=>JSON.stringify(e)===JSON.stringify(r)));n.splice(e,1)}if(e(t.moves,r)){console.log("already played");const e=n.findIndex((e=>JSON.stringify(e)===JSON.stringify(r)));n.splice(e,1)}})),n.forEach((e=>{t.smartMoves.push(e)}))}}})(),a=(()=>{const e=e=>e[0]>9||e[1]>9||e[0]<0||e[1]<0,t=(t,r,a,o)=>{let s=!1,n=Number(r[0]),i=Number(r[1]);for(let r=0;r<a;r++){const r=[[n+1,i],[n-1,i],[n,i+1],[n,i-1],[n-1,i-1],[n-1,i+1],[n+1,i+1],[n+1,i-1]].filter((t=>!e(t)));console.log(r);for(let e=0;e<r.length;e++){const a=r[e][0],o=r[e][1];""!==t.gameboard.board[a][o].hasShip&&(s=!0)}""!==t.gameboard.board[n][i].hasShip&&(s=!0),"horizontal"===o?i++:n++}return s},r=(e,a,o)=>{let s,n;return"horizontal"===o?(s=Math.floor(10*Math.random()),n=Math.floor(Math.random()*(10-a))):(s=Math.floor(Math.random()*(10-a)),n=Math.floor(10*Math.random())),t(e,[s,n],a,o)?r(e,a,o):[s,n]};return{placeShipRandomly:e=>{[5,4,3,2,2,1].forEach((t=>{const a=["horizontal","vertical"][Math.floor(2*Math.random())],o=r(e,t,a);e.gameboard.placeShip(t,o,a)}))},hoverShipUI:(e,r,a,o)=>{const s=Number(r.dataset.row),n=Number(r.dataset.col);let i=a,d="green-hovered-tile";"horizontal"===o?a>10-n&&(i=10-n,d="red-hovered-tile"):"vertical"===o&&a>10-s&&(i=10-s,d="red-hovered-tile"),t(e,[s,n],i,o)&&(d="red-hovered-tile");for(let e=0;e<i;e++){let t,r;"horizontal"===o?(t=s,r=n+e):(t=s+e,r=n),document.querySelector(`#human-grid [data-row="${t}"][data-col="${r}"]`).classList.add(d)}},removeHoverShipUI:()=>{document.querySelectorAll(".green-hovered-tile").forEach((e=>{e.classList.remove("green-hovered-tile")})),document.querySelectorAll(".red-hovered-tile").forEach((e=>{e.classList.remove("red-hovered-tile")}))},checkAlreadyHasShip:t,checkplacementOutsideBoard:(e,t,r)=>"horizontal"===r?t>10-e[1]:t>10-e[0],getShipDirection:()=>null===document.querySelector("#rotate:checked")?"vertical":"horizontal"}})(),o=(()=>{const e=(e,t,r)=>{"computer"===e.name?document.querySelector(`#computer-grid [data-row="${t}"][data-col="${r}"]`).classList.add("red-mark"):document.querySelector(`#human-grid [data-row="${t}"][data-col="${r}"]`).classList.add("red-mark")},t=(e,t,r)=>{"computer"===e.name?document.querySelector(`#computer-grid [data-row="${t}"][data-col="${r}"]`).classList.add("missed-mark"):document.querySelector(`#human-grid [data-row="${t}"][data-col="${r}"]`).classList.add("missed-mark")},r=(e,t,r,a)=>{"computer"===e.name?document.querySelector(`#computer-grid [data-row="${t}"][data-col="${r}"]`).classList.add("ship-mark"):document.querySelector(`#human-grid [data-row="${t}"][data-col="${r}"]`).classList.add(`ship-mark${a}`)},a=e=>{const t=e.gameboard.allShips.filter((e=>!1===e.isSunk));document.querySelector(`.${e.name}-side .ship-num`).textContent=`Ships Remaining: ${t.length}`},o=(e,t)=>{const r=document.querySelector(`#${e}`);r.classList.add("no-event"),t&&r.classList.add("fade")},s=()=>{const e=document.getElementById("human-grid"),t=document.getElementById("computer-grid");for(let r=0;r<10;r++)for(let a=0;a<10;a++){const o=document.createElement("div");o.classList.add("tile"),o.dataset.row=r,o.dataset.col=a;const s=document.createElement("div");s.classList.add("tile"),s.dataset.row=r,s.dataset.col=a,e.appendChild(s),t.appendChild(o)}o("computer-grid",!0)};return{createBoard:s,render:o=>{for(let a=0;a<10;a++)for(let s=0;s<10;s++){o.gameboard.board[a][s].isShot&&""!==o.gameboard.board[a][s].hasShip?e(o,a,s):o.gameboard.board[a][s].isShot&&""===o.gameboard.board[a][s].hasShip&&t(o,a,s);const n=o.gameboard.board[a][s].hasShip;""!==n&&"human"===o.name&&r(o,a,s,n)}a(o)},updateRemainingShip:a,disableUI:o,restartBoard:()=>{document.getElementById("human-grid").textContent="",document.getElementById("computer-grid").textContent="",document.querySelectorAll(".ship-num").forEach((e=>{e.textContent="Ships Remaining: 0"})),s()},enableUI:e=>{const t=document.querySelector(`#${e}`);t.classList.remove("no-event"),t.classList.remove("fade")}}})(),s=r(926),n=(()=>{const r=new s("human"),n=new s("computer"),i=()=>{r.restartPlayer(),n.restartPlayer(),o.restartBoard(),o.enableUI("human-grid"),o.enableUI("button-group"),o.enableUI("start"),e.displayWelcomeMsg()},d=(t,r)=>!!r.gameboard.checkAllShipsAreSunk()&&(e.declareWinner(t),o.disableUI(`${t.name}-grid`,!0),o.disableUI(`${r.name}-grid`,!0),!0);return{startGame:()=>{r.gameboard.allShips.length<6||(a.placeShipRandomly(n),o.enableUI("computer-grid"),o.render(n),o.disableUI("button-group",!0),o.disableUI("start",!0),e.displayStartingGameMsg())},startAttackRound:(e,a)=>{if(r.attack(n,e,a),o.render(n),d(r,n))return;const s=t.getCoord(n,r);t.calculateNextBestCoord(n,r,s),n.attack(r,s[0],s[1]),o.render(r),d(n,r)},restartGame:i,randomizeShip:()=>{i(),a.placeShipRandomly(r),o.disableUI("human-grid",!1),o.render(r)},placeShipManually:e=>{console.log("clicked");const t=[5,4,3,2,2,1][r.gameboard.allShips.length],s=a.getShipDirection(),n=e.target.dataset.row,i=e.target.dataset.col;a.checkplacementOutsideBoard([n,i],t,s)||a.checkAlreadyHasShip(r,[n,i],t,s)||(r.gameboard.placeShip(t,[n,i],s),o.render(r),r.gameboard.allShips.length>5&&o.disableUI("human-grid",!1))},displayHoverEffect:e=>{a.removeHoverShipUI();const t=a.getShipDirection(),o=r.gameboard.allShips.length;a.hoverShipUI(r,e.target,[5,4,3,2,2,1][o],t)}}})(),i=(()=>{const e=()=>{document.querySelectorAll("#computer-grid .tile").forEach((e=>{e.addEventListener("click",(e=>{const t=Number(e.target.dataset.row),r=Number(e.target.dataset.col);n.startAttackRound(t,r)}))}))};return{startButtonEvent:()=>{document.getElementById("start").addEventListener("click",(()=>{n.startGame(),e()})),document.getElementById("restart").addEventListener("click",(()=>{n.restartGame(),e()})),document.getElementById("randomize").addEventListener("click",n.randomizeShip),document.getElementById("reset").addEventListener("click",n.restartGame)},startPlaceShipsEvent:()=>{const e=document.querySelector("#human-grid");e.addEventListener("mouseover",n.displayHoverEffect),e.addEventListener("mouseleave",a.removeHoverShipUI),e.addEventListener("click",n.placeShipManually)}}})();o.createBoard(),e.displayWelcomeMsg(),i.startButtonEvent(),i.startPlaceShipsEvent()})()})();