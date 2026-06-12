/* ===================================== */
/* CONNECT FOUR ULTIMATE */
/* JS PART 1 */
/* VARIABLES + STORAGE + SETTINGS */
/* ===================================== */

const ROWS = 6;
const COLS = 7;

/* ===================================== */
/* GAME STATE */
/* ===================================== */

let board = [];

let currentPlayer = "red";

let gameOver = false;

let gameMode = "pvp";

let difficulty = "easy";

let soundEnabled = true;

let animationsEnabled = true;

let timer = 0;

let moves = 0;

let timerInterval = null;

let currentStreak = 0;

let bestStreak = 0;

let selectedAvatar =
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

/* ===================================== */
/* PLAYER STATS */
/* ===================================== */

let stats = {

games:0,

wins:0,

losses:0,

draws:0,

achievements:0,

xp:0,

level:1

};

/* ===================================== */
/* HISTORY */
/* ===================================== */

let history = [];

/* ===================================== */
/* DOM ELEMENTS */
/* ===================================== */

const homeScreen =
document.getElementById(
"homeScreen"
);

const setupScreen =
document.getElementById(
"setupScreen"
);

const gameScreen =
document.getElementById(
"gameScreen"
);

const boardElement =
document.getElementById(
"board"
);

const winnerModal =
document.getElementById(
"winnerModal"
);

const winnerText =
document.getElementById(
"winnerText"
);

/* ===================================== */
/* BUTTONS */
/* ===================================== */

const pvpScreen =
document.getElementById("pvpScreen");

pvpBtn.addEventListener("click",()=>{

    clickSound();

    homeScreen.classList.remove("active");

    pvpScreen.classList.add("active");

    gameScreen.classList.remove("active")

});

const aiBtn =
document.getElementById(
"aiBtn"
);

const startAiBtn =
document.getElementById(
"startAiBtn"
);

const backBtn =
document.getElementById(
"backBtn"
);

const restartBtn =
document.getElementById(
"restartBtn"
);

const newGameBtn =
document.getElementById(
"newGameBtn"
);

const playAgainBtn =
document.getElementById(
"playAgainBtn"
);

const soundBtn =
document.getElementById(
"soundBtn"
);

const soundGameBtn =
document.getElementById(
"soundGameBtn"
);

const settingsBtn =
document.getElementById(
"settingsBtn"
);

const dashboardBtn =
document.getElementById(
"dashboardBtn"
);

/* ===================================== */
/* AUDIO */
/* ===================================== */

const audioCtx =
new (
window.AudioContext ||
window.webkitAudioContext
)();

/* ===================================== */
/* LOCAL STORAGE */
/* ===================================== */

function saveData(){

localStorage.setItem(
"cf_stats",
JSON.stringify(stats)
);

localStorage.setItem(
"cf_history",
JSON.stringify(history)
);

localStorage.setItem(
"cf_streak",
currentStreak
);

localStorage.setItem(
"cf_best_streak",
bestStreak
);

localStorage.setItem(
"cf_avatar",
selectedAvatar
);

}

function loadData(){

const savedStats =
localStorage.getItem(
"cf_stats"
);

const savedHistory =
localStorage.getItem(
"cf_history"
);

const savedStreak =
localStorage.getItem(
"cf_streak"
);

const savedBest =
localStorage.getItem(
"cf_best_streak"
);

const savedAvatar =
localStorage.getItem(
"cf_avatar"
);

if(savedStats){

stats =
JSON.parse(savedStats);

}

if(savedHistory){

history =
JSON.parse(savedHistory);

}

if(savedStreak){

currentStreak =
parseInt(savedStreak);

}

if(savedBest){

bestStreak =
parseInt(savedBest);

}

if(savedAvatar){

selectedAvatar =
savedAvatar;

const img =
document.getElementById(
"profileAvatar"
);

if(img){

img.src =
savedAvatar;

}

}

}

/* ===================================== */
/* LOADER */
/* ===================================== */

window.addEventListener(
"load",
()=>{

setTimeout(()=>{

const loader =
document.getElementById(
"loader"
);

if(loader){

loader.style.display =
"none";

}

},2000);

}
);

/* ===================================== */
/* THEME */
/* ===================================== */

const themeSelect =
document.getElementById(
"themeSelect"
);

function applyTheme(theme){

document.body.classList.remove(
"light-theme",
"dark-theme",
"neon-theme"
);

if(theme !== "dark"){

document.body.classList.add(
theme + "-theme"
);

}

localStorage.setItem(
"cf_theme",
theme
);

if(themeSelect){
themeSelect.value = theme;
}

}

const savedTheme =
localStorage.getItem(
"cf_theme"
);

if(savedTheme){

applyTheme(savedTheme);

}

if(themeSelect){
    themeSelect.addEventListener("change",e=>{

applyTheme(e.target.value);

});

}

/* ===================================== */
/* PROFILE */
/* ===================================== */

document
.querySelectorAll(
".avatar-option"
)
.forEach(avatar=>{

avatar.addEventListener(
"click",
()=>{

document
.querySelectorAll(
".avatar-option"
)
.forEach(a=>{

a.classList.remove(
"active-avatar"
);

});

avatar.classList.add(
"active-avatar"
);

selectedAvatar =
avatar.src;

document.getElementById(
"profileAvatar"
).src =
avatar.src;

saveData();

clickSound();

}
);

});

/* ===================================== */
/* INITIAL LOAD */
/* ===================================== */

loadData();

updateDashboard();

updateLeaderboard();

renderHistory();


/* ===================================== */
/* JS PART 2 */
/* SOUND + SETTINGS + NAVIGATION */
/* ===================================== */

/* SETTINGS PANEL */

const settingsPanel =
document.getElementById(
"settingsPanel"
);

const dashboardPanel =
document.getElementById(
"dashboardPanel"
);

const closeSettings =
document.getElementById(
"closeSettings"
);

const closeDashboard =
document.getElementById(
"closeDashboard"
);

/* ===================================== */
/* PREMIUM SOUNDS */
/* ===================================== */

function playTone(
freq,
duration=0.08,
type="sine",
volume=0.15
){

if(!soundEnabled) return;

if(audioCtx.state==="suspended"){

audioCtx.resume();

}

const osc =
audioCtx.createOscillator();

const gain =
audioCtx.createGain();

osc.type=type;

osc.frequency.value=freq;

gain.gain.value=volume;

osc.connect(gain);

gain.connect(
audioCtx.destination
);

osc.start();

gain.gain.exponentialRampToValueAtTime(
0.001,
audioCtx.currentTime+duration
);

osc.stop(
audioCtx.currentTime+duration
);

}

/* CLICK */

function clickSound(){

playTone(
900,
0.05,
"sine",
0.12
);

}

/* DROP COIN */

function dropSound(){

playTone(
400,
0.12,
"triangle",
0.2
);

setTimeout(()=>{

playTone(
280,
0.05,
"triangle",
0.1
);

},60);

}

/* WINNER */

function winSound(){

playTone(523,0.2,"square",0.3);

setTimeout(()=>{
playTone(659,0.2,"square",0.3);
},150);

setTimeout(()=>{
playTone(784,0.25,"square",0.3);
},300);

setTimeout(()=>{
playTone(1046,0.35,"square",0.35);
},500);

}

/* ACHIEVEMENT */

function achievementSound(){

playTone(
1200,
0.12,
"square",
0.2
);

setTimeout(()=>{

playTone(
1500,
0.15,
"square",
0.2
);

},100);

}

/* ===================================== */
/* SOUND TOGGLE */
/* ===================================== */
function updateSoundButtons(){

if(soundBtn){

soundBtn.textContent =
soundEnabled
?
"🔊"
:
"🔇";

}

if(soundGameBtn){

soundGameBtn.textContent =
soundEnabled
?
"🔊"
:
"🔇";

}

}

function toggleSound(){

soundEnabled=
!soundEnabled;

updateSoundButtons();

localStorage.setItem(
"cf_sound",
soundEnabled
);

}

/* LOAD SOUND */

const savedSound=
localStorage.getItem(
"cf_sound"
);

if(savedSound!==null){

soundEnabled=
savedSound==="true";

}

updateSoundButtons();

/* ===================================== */
/* SETTINGS PANEL */
/* ===================================== */

if(settingsBtn){

settingsBtn.addEventListener(
"click",
()=>{

clickSound();

settingsPanel.classList.add(
"active"
);

}
);

}

if(closeSettings){

closeSettings.addEventListener(
"click",
()=>{

settingsPanel.classList.remove(
"active"
);

clickSound();

}
);

}

/* ===================================== */
/* DASHBOARD PANEL */
/* ===================================== */

if(dashboardBtn){

dashboardBtn.addEventListener(
"click",
()=>{

dashboardPanel.classList.add(
"active"
);

clickSound();

}
);

}

if(closeDashboard){

closeDashboard.addEventListener(
"click",
()=>{

dashboardPanel.classList.remove(
"active"
);

clickSound();

}
);

}

/* ===================================== */
/* HOME BUTTONS */
/* ===================================== */

if(soundBtn){

soundBtn.addEventListener(
"click",
()=>{

toggleSound();

clickSound();

}
);

}

if(soundGameBtn){

soundGameBtn.addEventListener(
"click",
()=>{

toggleSound();

clickSound();

}
);

}


/* ===================================== */
/* AI SETUP SCREEN */
/* ===================================== */

aiBtn.addEventListener(
"click",
()=>{

clickSound();

homeScreen.classList.remove(
"active"
);

setupScreen.classList.add(
"active"
);

}
);

backBtn.addEventListener(
"click",
()=>{

clickSound();

setupScreen.classList.remove(
"active"
);

homeScreen.classList.add(
"active"
);

}
);

startAiBtn.addEventListener(
"click",
()=>{

clickSound();

gameMode="ai";

difficulty=
document.getElementById(
"difficultySelect"
).value;

startGame();

}
);

/* ===================================== */
/* GAME NAVIGATION */
/* ===================================== */

newGameBtn.addEventListener(
"click",
()=>{

clickSound();

gameScreen.classList.remove(
"active"
);

setupScreen.classList.remove(
"active"
);

homeScreen.classList.add(
"active"
);

clearInterval(
timerInterval
);

}
);

/* ===================================== */
/* PLAY AGAIN */
/* ===================================== */

playAgainBtn.addEventListener(
"click",
()=>{

clickSound();

winnerModal.classList.remove(
"show"
);

resetBoard();

}
);

/* ===================================== */
/* JS PART 3 */
/* START GAME */
/* BOARD */
/* TIMER */
/* TURN SYSTEM */
/* ===================================== */

function startGame(){
    window.scrollTo(0,0);

homeScreen.classList.remove(
"active"
);

setupScreen.classList.remove(
"active"
);

gameScreen.classList.add(
"active"
);


const playerName =

document.getElementById(
"playerName"
).value.trim()

||

"Player 1";

/* PLAYER NAMES */

document.getElementById(
"player1Name"
).textContent =
playerName;

const profileCard =
document.getElementById(
"profileName"
);

if(profileCard){

profileCard.textContent=
playerName;

}

document.getElementById(
"profileName"
).textContent =
playerName;

document.getElementById(
"playerAvatar"
).src =
selectedAvatar;

/* DIFFICULTY */

document.getElementById(
"difficultyDisplay"
).textContent =

gameMode==="ai"

?

`🤖 ${difficulty.toUpperCase()} AI`

:

"👥 PvP Mode";

/* PLAYER 2 */

if(gameMode==="ai"){

    document.getElementById(
    "player2Name"
    ).textContent =
    "Cyber Bot";

}else{

    document.getElementById(
    "player1Name"
    ).textContent =
    window.pvpPlayer1 || "Player 1";

    document.getElementById(
    "player2Name"
    ).textContent =
    window.pvpPlayer2 || "Player 2";

}

/* FIRST TURN */

if(gameMode==="ai"){

const firstTurn =

document.getElementById(
"firstTurn"
).value;

if(firstTurn==="computer"){

currentPlayer="yellow";

}

else if(firstTurn==="random"){

currentPlayer =

Math.random() > 0.5

?

"red"

:

"yellow";

}

else{

currentPlayer="red";

}

}else{

currentPlayer="red";

}

resetBoard();

if(

gameMode==="ai"

&&

currentPlayer==="yellow"

){

setTimeout(
computerMove,
700
);

}

}

/* ===================================== */
/* RESET BOARD */
/* ===================================== */

function resetBoard(){

board=[];

for(
let r=0;
r<ROWS;
r++
){

board[r]=[];

for(
let c=0;
c<COLS;
c++
){

board[r][c]="";

}

}

gameOver=false;

moves=0;

timer=0;

clearInterval(
timerInterval
);

timerInterval=

setInterval(
updateTimer,
1000
);

document.getElementById(
"movesCount"
).textContent=
"0";

createBoard();

updateTurnText();

}

/* ===================================== */
/* CREATE BOARD */
/* ===================================== */

function createBoard(){

boardElement.innerHTML="";

for(
let r=0;
r<ROWS;
r++
){

for(
let c=0;
c<COLS;
c++
){

const cell=

document.createElement(
"div"
);

cell.classList.add(
"cell"
);

cell.dataset.row=r;

cell.dataset.col=c;

cell.addEventListener(
"click",
()=>{

dropDisc(c);

}
);

boardElement.appendChild(
cell
);

}

}

}

/* ===================================== */
/* TURN TEXT */
/* ===================================== */

function updateTurnText(){

const turnIndicator=

document.getElementById(
"turnIndicator"
);

if(currentPlayer==="red"){

turnIndicator.textContent=

"🔴 Player Turn";

}else{

if(gameMode==="ai"){

turnIndicator.textContent=

"🤖 AI Turn";

}else{

turnIndicator.textContent=

"🟡 Player 2 Turn";

}

}

}

/* ===================================== */
/* TIMER */
/* ===================================== */

function updateTimer(){

timer++;

const mins=

String(
Math.floor(
timer/60
)
).padStart(
2,
"0"
);

const secs=

String(
timer%60
).padStart(
2,
"0"
);

document.getElementById(
"gameTime"
).textContent=

`${mins}:${secs}`;

}

/* ===================================== */
/* UPDATE DASHBOARD */
/* ===================================== */

function updateDashboard(){

document.getElementById(
"totalGames"
).textContent =
stats.games;

document.getElementById(
"winsCount"
).textContent =
stats.wins;

document.getElementById(
"lossCount"
).textContent =
stats.losses;

const rate =

stats.games===0

?

0

:

Math.round(

(stats.wins /
stats.games)

*100

);

document.getElementById(
"winRate"
).textContent =

rate+"%";

document.getElementById(
"bestStreak"
).textContent =

bestStreak;

document.getElementById(
"achievementCount"
).textContent =

stats.achievements || 0;

document.getElementById(
"winsDisplay"
).textContent =

stats.wins;

document.getElementById(
"lossDisplay"
).textContent =

stats.losses;

document.getElementById(
"currentStreak"
).textContent =

currentStreak;

document.getElementById(
"gameWinRate"
).textContent =

rate+"%";

}

/* ===================================== */
/* MATCH COUNTER */
/* ===================================== */

function updateMatchCount(){

document.getElementById(
"matchCount"
).textContent =

stats.games;

}


/* ===================================== */
/* JS PART 4 */
/* DROP DISC */
/* WIN CHECK */
/* WIN HIGHLIGHT */
/* GAME END */
/* ===================================== */

function dropDisc(col){

if(gameOver) return;

/* AI TURN LOCK */

if(
gameMode==="ai" &&
currentPlayer==="yellow"
){
return;
}

for(
let row=ROWS-1;
row>=0;
row--
){

if(board[row][col]===""){

board[row][col]=currentPlayer;

/* UNDO SAVE */

moveHistory.push({

row:row,
col:col

});

moves++;

dropSound();

document.getElementById(
"movesCount"
).textContent=
moves;

renderBoard();

/* WIN CHECK */

const winningCells =

checkWinner(
row,
col
);

if(winningCells){

gameOver=true;

/* HIGHLIGHT */

highlightWinningCells(
winningCells
);

winSound();

/* DELAYED POPUP */

setTimeout(()=>{

const winnerName=

currentPlayer==="red"

?

document.getElementById(
"player1Name"
).textContent

:

document.getElementById(
"player2Name"
).textContent;

endGame(
winnerName
);

},2500);

return;

}

/* DRAW */

if(isBoardFull()){

gameOver=true;

stats.games++;
stats.draws++;

saveData();

updateDashboard();

setTimeout(()=>{

showWinner(
"🤝 DRAW MATCH"
);

},1000);

return;

}

/* NEXT TURN */

currentPlayer=

currentPlayer==="red"

?

"yellow"

:

"red";

updateTurnText();

/* AI MOVE */

if(
gameMode==="ai" &&
currentPlayer==="yellow"
){

setTimeout(
computerMove,
700
);

}

return;

}

}

}

/* ===================================== */
/* RENDER BOARD */
/* ===================================== */

function renderBoard(){

const cells=

document.querySelectorAll(
".cell"
);

cells.forEach(cell=>{

const row=
parseInt(
cell.dataset.row
);

const col=
parseInt(
cell.dataset.col
);

cell.classList.remove(
"red",
"yellow"
);

if(board[row][col]){

cell.classList.add(
board[row][col]
);

}

});

}

/* ===================================== */
/* DRAW CHECK */
/* ===================================== */

function isBoardFull(){

for(
let c=0;
c<COLS;
c++
){

if(board[0][c]===""){

return false;

}

}

return true;

}

/* ===================================== */
/* WIN DETECTION */
/* RETURNS WINNING CELLS */
/* ===================================== */

function checkWinner(
row,
col
){

const directions=[

[0,1],
[1,0],
[1,1],
[1,-1]

];

const color=
board[row][col];

for(const [dr,dc]
of directions){

let cells=[
[row,col]
];

/* FORWARD */

let r=row+dr;
let c=col+dc;

while(

r>=0 &&
r<ROWS &&
c>=0 &&
c<COLS &&
board[r][c]===color

){

cells.push(
[r,c]
);

r+=dr;
c+=dc;

}

/* BACKWARD */

r=row-dr;
c=col-dc;

while(

r>=0 &&
r<ROWS &&
c>=0 &&
c<COLS &&
board[r][c]===color

){

cells.unshift(
[r,c]
);

r-=dr;
c-=dc;

}

if(cells.length>=4){

return cells;

}

}

return null;

}

/* ===================================== */
/* WIN HIGHLIGHT */
/* ===================================== */

function highlightWinningCells(
cells
){

const boardCells=

document.querySelectorAll(
".cell"
);

cells.forEach(([r,c])=>{

boardCells.forEach(cell=>{

if(

parseInt(
cell.dataset.row
)===r

&&

parseInt(
cell.dataset.col
)===c

){

cell.classList.add(
"winning-cell"
);

}

});

});

}

/* ===================================== */
/* END GAME */
/* ===================================== */

function endGame(winner){

clearInterval(
timerInterval
);

stats.games++;

const player1=

document.getElementById(
"player1Name"
).textContent;

if(winner===player1){

stats.wins++;

currentStreak++;

if(
currentStreak>
bestStreak
){

bestStreak=
currentStreak;

}

}else{

stats.losses++;

currentStreak=0;

}

saveData();

updateDashboard();

updateMatchCount();

/* SAVE HISTORY */

history.unshift({

winner:winner,

moves:moves,

time:
document.getElementById(
"gameTime"
).textContent,

date:
new Date()
.toLocaleDateString()

});

history=
history.slice(
0,
20
);

renderHistory();

showWinner(
`🏆 ${winner} Wins!`
);

}

/* ===================================== */
/* WINNER POPUP */
/* ===================================== */

function showWinner(text){

winnerText.textContent=
text;

winnerModal.classList.add(
"show"
);

}


/* ===================================== */
/* JS PART 5 */
/* AI + UNDO + HINT + HISTORY */
/* ACHIEVEMENTS + CONFETTI */
/* ===================================== */

let moveHistory=[];

/* ===================================== */
/* AI */
/* ===================================== */

function computerMove(){

if(gameOver) return;

const thinking=
document.getElementById(
"aiThinking"
);

if(thinking){

thinking.style.display=
"block";

}

setTimeout(()=>{

if(thinking){

thinking.style.display=
"none";

}

let col;

switch(difficulty){

case "easy":

col=randomMove();
break;

case "medium":

col=mediumMove();
break;

case "hard":

col=hardMove();
break;

case "impossible":

col=impossibleMove();
break;

default:

col=randomMove();

}

forceMove(col);

},1000);

}

function randomMove(){

const available=[];

for(let c=0;c<COLS;c++){

if(board[0][c]===""){

available.push(c);

}

}

return available[
Math.floor(
Math.random()*available.length
)
];

}

function mediumMove(){

if(Math.random()<0.5){

return hardMove();

}

return randomMove();

}

function getAvailableRow(col){

for(let r=ROWS-1;r>=0;r--){

if(board[r][col]===""){

return r;

}

}

return -1;

}

function hardMove(){

const priority = [3,2,4,1,5,0,6];

/* WIN */

for(const c of priority){

const row = getAvailableRow(c);

if(row === -1) continue;

board[row][c] = "yellow";

const win = checkWinner(row,c);

board[row][c] = "";

if(win) return c;

}

/* BLOCK */

for(const c of priority){

const row = getAvailableRow(c);

if(row === -1) continue;

board[row][c] = "red";

const win = checkWinner(row,c);

board[row][c] = "";

if(win) return c;

}

/* RANDOM FROM BEST COLUMNS */

const goodMoves = [];

for(const c of priority){

if(getAvailableRow(c)!==-1){

goodMoves.push(c);

}

}

return goodMoves[
Math.floor(
Math.random()*goodMoves.length
)
];

}






function forceMove(col){

for(
let row=ROWS-1;
row>=0;
row--
){

if(board[row][col]===""){

board[row][col]="yellow";

moves++;

document.getElementById(
"movesCount"
).textContent=
moves;

dropSound();

renderBoard();

const winner=
checkWinner(
row,
col
);

if(winner){

highlightWinningCells(
winner
);

winSound();

setTimeout(()=>{

endGame(
document.getElementById(
"player2Name"
).textContent
);

},2500);

return;

}

if(isBoardFull()){

showWinner(
"🤝 DRAW MATCH"
);

return;

}

currentPlayer="red";

updateTurnText();

return;

}

}

}


function impossibleMove(){

/* WIN */

for(let c=0;c<COLS;c++){

const row=getAvailableRow(c);

if(row===-1) continue;

board[row][c]="yellow";

if(checkWinner(row,c)){

board[row][c]="";

return c;

}

board[row][c]="";

}

/* BLOCK */

for(let c=0;c<COLS;c++){

const row=getAvailableRow(c);

if(row===-1) continue;

board[row][c]="red";

if(checkWinner(row,c)){

board[row][c]="";

return c;

}

board[row][c]="";

}

/* AGGRESSIVE */

const priority=[3,2,4,1,5,0,6];

const available=
priority.filter(
c=>getAvailableRow(c)!==-1
);

return available[
Math.floor(
Math.random()*available.length
)
];

}



/* ===================================== */
/* UNDO */
/* ===================================== */

const undoBtn=
document.getElementById(
"undoBtn"
);

if(undoBtn){

undoBtn.addEventListener(
"click",
()=>{

clickSound();

if(moveHistory.length===0)
return;

const last=
moveHistory.pop();

board[
last.row
][
last.col
]="";

renderBoard();

}
);

}

/* ===================================== */
/* HINT */
/* ===================================== */

const hintBtn=
document.getElementById(
"hintBtn"
);

if(hintBtn){

hintBtn.addEventListener(
"click",
()=>{

clickSound();

alert(
`💡 Try Column ${
hardMove()+1
}`
);

}
);

}

/* ===================================== */
/* ACHIEVEMENTS */
/* ===================================== */

function unlockAchievement(
name
){

achievementSound();

stats.achievements++;

saveData();

updateDashboard();

const popup=
document.getElementById(
"achievementPopup"
);

const text=
document.getElementById(
"achievementText"
);

text.textContent=
name;

popup.classList.add(
"show"
);

setTimeout(()=>{

popup.classList.remove(
"show"
);

},3000);

}

function checkAchievements(){

if(stats.wins===1){

unlockAchievement(
"🏆 First Victory"
);

}

if(stats.wins===5){

unlockAchievement(
"🔥 5 Wins"
);

}

if(stats.games===25){

unlockAchievement(
"👑 25 Matches Played"
);

}

}

/* ===================================== */
/* HISTORY */
/* ===================================== */

function renderHistory(){

const container=

document.getElementById(
"historyList"
);

if(!container) return;

if(history.length===0){

container.innerHTML=

`
<p class="empty">
No Matches Yet
</p>
`;

return;

}

container.innerHTML="";

history.forEach(match=>{

const div=
document.createElement(
"div"
);

div.className=
"history-item";

div.innerHTML=

`
<strong>
${match.winner}
</strong>
<br>
🎯 ${match.moves} Moves
<br>
⏱ ${match.time}
<br>
📅 ${match.date}
`;

container.appendChild(
div
);

});

}

/* ===================================== */
/* CLEAR HISTORY */
/* ===================================== */

const clearHistoryBtn=
document.getElementById(
"clearHistoryBtn"
);

if(clearHistoryBtn){

clearHistoryBtn.addEventListener(
"click",
()=>{

history=[];

renderHistory();

saveData();

}
);

}

/* ===================================== */
/* RESTART */
/* ===================================== */

restartBtn.addEventListener(
"click",
()=>{

clickSound();

if(
confirm(
"Reset Current Match?"
)
){

resetBoard();

}

}
);

/* ===================================== */
/* CONFETTI */
/* ===================================== */

function launchConfetti(){

for(
let i=0;
i<80;
i++
){

const confetti=
document.createElement(
"div"
);

confetti.style.position=
"fixed";

confetti.style.left=
Math.random()*100+
"vw";

confetti.style.top=
"-20px";

confetti.style.width=
"10px";

confetti.style.height=
"10px";

confetti.style.background=
`hsl(
${Math.random()*360},
100%,
50%
)`;

confetti.style.zIndex=
"9999";

document.body.appendChild(
confetti
);

const duration=
2000+
Math.random()*2000;

confetti.animate(

[
{
transform:
"translateY(0)"
},
{
transform:
`translateY(
110vh
)`
}
],

{
duration:
duration
}

);

setTimeout(()=>{

confetti.remove();

},duration);

}

}

/* ===================================== */
/* OVERRIDE SHOW WINNER */
/* ===================================== */

const oldShowWinner=
showWinner;

showWinner=
function(text){

launchConfetti();

checkAchievements();

winnerText.textContent=
text;

winnerModal.classList.add(
"show"
);

};

/* ===================================== */
/* INITIALIZE */
/* ===================================== */

updateDashboard();

updateMatchCount();

renderHistory();

updateSoundButtons();

console.log(
"🎮 Connect Four Ultimate Loaded"
);





/* ========================= */
/* EXTRA BUTTON CONNECTIONS */
/* ========================= */

const leaderboardBtn =
document.getElementById("leaderboardBtn");

const achievementsBtn =
document.getElementById("achievementsBtn");

const challengeBtn =
document.getElementById("challengeBtn");

const leaderboardModal =
document.getElementById("leaderboardModal");

const achievementsModal =
document.getElementById("achievementsModal");

const challengeModal =
document.getElementById("challengeModal");

const closeLeaderboard =
document.getElementById("closeLeaderboard");

const closeAchievements =
document.getElementById("closeAchievements");

const closeChallenge =
document.getElementById("closeChallenge");

/* LEADERBOARD */

leaderboardBtn?.addEventListener(
"click",
()=>{
clickSound();
leaderboardModal.classList.add("active");
}
);

closeLeaderboard?.addEventListener(
"click",
()=>{
leaderboardModal.classList.remove("active");
}
);

/* ACHIEVEMENTS */

achievementsBtn?.addEventListener(
"click",
()=>{
clickSound();
achievementsModal.classList.add("active");
}
);

closeAchievements?.addEventListener(
"click",
()=>{
achievementsModal.classList.remove("active");
}
);

/* DAILY CHALLENGE */

challengeBtn?.addEventListener(
"click",
()=>{
clickSound();
challengeModal.classList.add("active");
}
);

closeChallenge?.addEventListener(
"click",
()=>{
challengeModal.classList.remove("active");
}
);







document.getElementById(
"footerLeaderboard"
)?.addEventListener(
"click",
()=>{
leaderboardModal.classList.add("active");
}
);

document.getElementById(
"footerAchievements"
)?.addEventListener(
"click",
()=>{
achievementsModal.classList.add("active");
}
);

document.getElementById(
"footerSettings"
)?.addEventListener(
"click",
()=>{
settingsPanel.classList.add("active");
}
);



function cycleTheme(){

if(
document.body.classList.contains(
"light-theme"
)
){

applyTheme("neon");
return;

}

if(
document.body.classList.contains(
"neon-theme"
)
){

applyTheme("dark");
return;

}

applyTheme("light");

}

document.getElementById(
"themeBtnHome"
)?.addEventListener(
"click",
()=>{
clickSound();
cycleTheme();
}
);

document.getElementById(
"themeBtn"
)?.addEventListener(
"click",
()=>{
clickSound();
cycleTheme();
}
);

//full screen

const fullscreenBtn =
document.getElementById(
"fullscreenBtn"
);

const fullscreenGameBtn =
document.getElementById(
"fullscreenGameBtn"
);

function toggleFullscreen(){

if(
!document.fullscreenElement
){

document.documentElement
.requestFullscreen();

}else{

document.exitFullscreen();

}

}

fullscreenBtn?.addEventListener(
"click",
toggleFullscreen
);

fullscreenGameBtn?.addEventListener(
"click",
toggleFullscreen
);




function updateLeaderboard(){

const list=
document.getElementById(
"leaderboardList"
);

if(!list) return;

list.innerHTML=`

<div class="leader-item">
<span>🥇 Wins</span>
<span>${stats.wins}</span>
</div>

<div class="leader-item">
<span>🎮 Games</span>
<span>${stats.games}</span>
</div>

<div class="leader-item">
<span>🔥 Best Streak</span>
<span>${bestStreak}</span>
</div>

<div class="leader-item">
<span>🏆 Win Rate</span>
<span>
${
stats.games
?
Math.round(
(stats.wins/stats.games)
*100
)
:
0
}%
</span>
</div>

`;

}


const closeWinnerBtn =
document.getElementById(
"closeWinnerBtn"
);

const winnerStatsBtn =
document.getElementById(
"winnerStatsBtn"
);

closeWinnerBtn?.addEventListener("click", () => {

    clickSound();

    winnerModal.classList.remove("show");

    currentPlayer = "red";

    resetBoard();

});


winnerStatsBtn?.addEventListener(
"click",
()=>{

    winnerModal.classList.remove("show");

    dashboardPanel?.classList.add(
        "active"
    );

});


const pvpSetup =
document.getElementById("pvpSetup");

startPvPBtn?.addEventListener(
"click",
()=>{

    const player1 =
    document.getElementById(
    "playerOneInput"
    ).value.trim();

    const player2 =
    document.getElementById(
    "playerTwoInput"
    ).value.trim();

    if(!player1 || !player2){

        alert(
        "Please enter both player names"
        );

        return;
    }

    window.pvpPlayer1 = player1;
    window.pvpPlayer2 = player2;

    gameMode = "pvp";

    startPvPBtn.addEventListener
    pvpScreen.classList.remove("active");
gameScreen.classList.add("active");

    startGame();

});



const liveStatsToggle =
document.getElementById(
"liveStatsToggle"
);

const liveStatsContent =
document.getElementById(
"liveStatsContent"
);

liveStatsToggle?.addEventListener(
"click",
()=>{

    liveStatsContent.classList.toggle(
        "show"
    );

});

const progressToggle =
document.getElementById(
"progressToggle"
);

const progressContent =
document.getElementById(
"progressContent"
);

progressToggle?.addEventListener(
"click",
()=>{

    progressContent.classList.toggle(
        "show"
    );

});

const backPvPBtn =
document.getElementById("backPvPBtn");

backPvPBtn?.addEventListener(
"click",
()=>{

    pvpScreen.classList.remove("active");

    homeScreen.classList.add("active");

});


function showScreen(screenId){

    screens.forEach(screen =>
        screen.classList.remove("active")
    );

    document
    .getElementById(screenId)
    .classList.add("active");

    window.scrollTo(0,0);

}