// TreasureMap class with new plots and async/await implementation
class TreasureMap {
    static async getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }

    static async decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                } else {
                    // New plot: need to solve a riddle
                    const riddle = "什么有钥匙但没有锁？";
                    const answer = prompt(riddle);
                    if (answer.toLowerCase() === "a piano") {
                        resolve("解码成功!宝藏在一座古老的神庙中，但你需要通过一片密林...");
                    } else {
                        reject("解谜失败!无法继续寻宝。");
                    }
                }
            }, 1500);
        });
    }

    static async searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("糟糕!遇到了神庙守卫，你需要通过他们的考验...");
                } else {
                    // New plot: guard test - simple math problem
                    const problem = prompt("解决这个数学问题: 2 + 3 = ?");
                    if (problem === "5") {
                        resolve("通过了考验，找到了一个神秘的箱子...");
                    } else {
                        reject("考验失败!无法继续寻宝。");
                    }
                }
            }, 2000);
        });
    }

    static async openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // New plot: need to pick the right key
                const keys = ['金钥匙', '银钥匙', '铁钥匙'];
                const correctKey = keys[Math.floor(Math.random() * keys.length)];
                const chosenKey = prompt(`请选择正确的钥匙来打开箱子: ${keys.join(', ')}`);
                if (chosenKey === correctKey) {
                    resolve("恭喜!你找到了传说中的宝藏!");
                } else {
                    throw new Error("选择了错误的钥匙，宝藏未能开启。");
                }
            }, 1000);
        });
    }
}

// Game logic with async/await
async function findTreasureWithAsyncAwait() {
    try {
        const clue = await TreasureMap.getInitialClue();
        document.getElementById('game-status').innerText = clue;
        
        const location = await TreasureMap.decodeAncientScript(clue);
        document.getElementById('game-status').innerText = location;
        
        const box = await TreasureMap.searchTemple(location);
        document.getElementById('game-status').innerText = box;
        
        const treasure = await TreasureMap.openTreasureBox();
        document.getElementById('game-status').innerText = treasure;
        alert(treasure);
    } catch (error) {
        document.getElementById('game-status').innerText = `任务失败: ${error}`;
        alert(`任务失败: ${error}`);
    }
}

// Fetch data from txt files and store player info
async function fetchData(url) {
    const response = await fetch(url);
    return response.text();
}

async function loadGameData() {
    const libraryData = await fetchData('library.txt');
    const templeData = await fetchData('temple.txt');
    const guardData = await fetchData('guard.txt');
    
    // Process and display data as needed
    // For simplicity, we'll just log it here
    console.log("Library Data:", libraryData);
    console.log("Temple Data:", templeData);
    console.log("Guard Data:", guardData);
    
    // You can update the game logic to use these data
}

function savePlayerInfo(playerId, nickname, gameHistory) {
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

function loadPlayerInfo() {
    const playerId = localStorage.getItem('playerId');
    const nickname = localStorage.getItem('nickname');
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    
    return { playerId, nickname, gameHistory };
}

// Background music
function playBackgroundMusic() {
    const music = new Audio('prologue.mp3');
    music.loop = true;
    music.play();
}

// Event listener for starting the game
document.getElementById('start-game').addEventListener('click', async () => {
    // Load game data
    await loadGameData();
    
    // Load or create player info
    const { playerId, nickname, gameHistory } = loadPlayerInfo() || { playerId: '1', nickname: '冒险家', gameHistory: [] };
    
    // Play background music
    playBackgroundMusic();
    
    // Start the game
    findTreasureWithAsyncAwait();
    
    // Save game history after game ends (for simplicity, we'll just add a new entry here)
    gameHistory.push({ timestamp: new Date(), result: 'Pending' }); // Update with actual result after game ends
    savePlayerInfo(playerId, nickname, gameHistory);
});