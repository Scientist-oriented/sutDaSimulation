// https://m.blog.naver.com/jijok73/221467812386  -> 섯다룰 여기 참고

// 이미지 부분
const cardImages = document.getElementsByTagName("img");
const cardImage1a = document.querySelector("#card1a");
const cardImage1b = document.querySelector("#card1b");
const cardImage2a = document.querySelector("#card2a");
const cardImage2b = document.querySelector("#card2b");
const cardImage3a = document.querySelector("#card3a");
const cardImage3b = document.querySelector("#card3b");
const cardImage4a = document.querySelector("#card4a");
const cardImage4b = document.querySelector("#card4b");
const cardImage5a = document.querySelector("#card5a");
const cardImage5b = document.querySelector("#card5b");
const cardImage6a = document.querySelector("#card6a");
const cardImage6b = document.querySelector("#card6b");
const cardImage7a = document.querySelector("#card7a");
const cardImage7b = document.querySelector("#card7b");
const cardImage8a = document.querySelector("#card8a");
const cardImage8b = document.querySelector("#card8b");
const cardImage9a = document.querySelector("#card9a");
const cardImage9b = document.querySelector("#card9b");
const cardImage10a = document.querySelector("#card10a");
const cardImage10b = document.querySelector("#card10b");


// 각 카드 객체에 저장
class Card {
    constructor(num, side, image) {
        this.num = num;
        this.side = side;
        this.image = image;
    }
}

const card1a = new Card(1, "a", cardImage1a)
const card1b = new Card(1, "b", cardImage1b)
const card2a = new Card(2, "a", cardImage2a)
const card2b = new Card(2, "b", cardImage2b)
const card3a = new Card(3, "a", cardImage3a)
const card3b = new Card(3, "b", cardImage3b)
const card4a = new Card(4, "a", cardImage4a)
const card4b = new Card(4, "b", cardImage4b)
const card5a = new Card(5, "a", cardImage5a)
const card5b = new Card(5, "b", cardImage5b)
const card6a = new Card(6, "a", cardImage6a)
const card6b = new Card(6, "b", cardImage6b)
const card7a = new Card(7, "a", cardImage7a)
const card7b = new Card(7, "b", cardImage7b)
const card8a = new Card(8, "a", cardImage8a)
const card8b = new Card(8, "b", cardImage8b)
const card9a = new Card(9, "a", cardImage9a)
const card9b = new Card(9, "b", cardImage9b)
const card10a = new Card(10, "a", cardImage10a)
const card10b = new Card(10, "b", cardImage10b)

const cardArray = [card1a, card1b, card2a, card2b, card3a, card3b, card4a, card4b, card5a, card5b, card6a, card6b, card7a, card7b, card8a, card8b, card9a, card9b, card10a, card10b]

// 사용자 설정 변수 부분
let selectedCard;
let numberOfPlayers;

// 누르면 작동하는 이벤트 (selected card를 결정)
for (card of cardArray) {
    card.image.onclick = (event) => {
        for (i = 0; i < cardImages.length; i++) {
            cardImages[i].style.opacity = "1.0";
        }
        event.target.style.opacity = "0.5";
        selectedCard = imgToCard(event.target)
        console.log(selectedCard)
    }
}

// img property로 card객체를 return해주는 함수 (임시 방편)
function imgToCard(img) {
    for (card of cardArray) {
        if (card.image == img) {
            return card
        }
    }
}


// 나중에 map 함수 안에 있는 반복문 리팩토링하기
class Scoreboard {
    constructor(owner) {
        this.owner = owner
        this.win = 0
        this.draw = 0
        this.lose = 0
    }
}



class Pair {
    constructor(rank, special) {
        this.rank = rank
        this.special = special
    }
}

class Game {
    constructor() {
        this.winner = [];
        this.rank = Infinity;
        this.gusa = false;
        this.mungGusa = false;
        this.fourSeven = false;
        this.threeSeven = false;
    }
}


// deck을 섞어서 return하는 함수
function shuffle(deck) { 
    var j, x, i; 
    for (i = deck.length; i; i -= 1) { 
        j = Math.floor(Math.random() * i); 
        x = deck[i - 1]; 
        deck[i - 1] = deck[j]; 
        deck[j] = x; 
    }
    return deck 
}

function pickTwoCards(shuffledDeck, numberOfPlayers) {
    let cardsOfEachPlayers = new Array();
    for (i = 0; i < numberOfPlayers; i++) {        
        const card1 = shuffledDeck.pop();
        const card2 = shuffledDeck.pop();
    
        cardsOfEachPlayers.push([card1, card2]);
    }
    return cardsOfEachPlayers;
}

function pickTwoCardsWithSelectedCard(shuffledDeck, numberOfPlayers, selectedCard) {
    let cardsOfEachPlayers = new Array();
    const secondCardOfP1 = shuffledDeck.pop();

    cardsOfEachPlayers.push([selectedCard, secondCardOfP1])

    for (i = 0; i < numberOfPlayers - 1; i++) {        
        const card1 = shuffledDeck.pop();
        const card2 = shuffledDeck.pop();
    
        cardsOfEachPlayers.push([card1, card2]);
    }
    return cardsOfEachPlayers;
}


// 카드 2장을 받은 뒤 Pair 객체를 return하는 함수
function decidePair(card1, card2) {
    if ((card1.num == 3 && card2.num == 8) || (card1.num == 8 && card2.num == 3)) { 
        if (card1.side == "a" && card2.side == "a") { // 처음에 내부에 if문을 이거 하나만 써서 3, 8인데 광땡이 아닌 것들이 전부 undefined처리됨.
            return new Pair(0, null);
        } else {
            return new Pair(26, null);
        }
    } else if ((card1.num == 1 && card2.num == 3) || (card1.num == 3 && card2.num == 1)){
        if ((card1.side == "a") && (card2.side == "a")) {
            return new Pair(1, null);
        } else {
            return new Pair(23, null)
        }
    } else if ((card1.num == 1 && card2.num == 8) || (card1.num == 8 && card2.num == 1)) {
        if ((card1.side == "a") && (card2.side == "a")) {
            return new Pair(1, null);
        } else {
            return new Pair(18, null)
        }
    } else if (card1.num == card2.num) {
        if (card1.num == 10) {
            return new Pair(2, null);
        } else if (card1.num == 9) {
            return new Pair (3, null);
        } else if (card1.num == 8) {
            return new Pair (4, null);
        } else if (card1.num == 7) {
            return new Pair (5, null);
        } else if (card1.num == 6) {
            return new Pair (6, null);
        } else if (card1.num == 5) {
            return new Pair (7, null);
        } else if (card1.num == 4) {
            return new Pair (8, null);
        } else if (card1.num == 3) {
            return new Pair (9, null);
        } else if (card1.num == 2) {
            return new Pair (10, null);
        } else if (card1.num == 1) {
            return new Pair (11, null);
        }
    } else if ((card1.num == 1 && card2.num == 2) || (card1.num == 2 && card2.num == 1)) {
        return new Pair(12, null);
    } else if ((card1.num == 1 && card2.num == 4) || (card1.num == 4 && card2.num == 1)) {
        return new Pair(13, null);
    } else if ((card1.num == 1 && card2.num == 9) || (card1.num == 9 && card2.num == 1)) {
        return new Pair(14, null);
    } else if ((card1.num == 1 && card2.num == 10) || (card1.num == 10 && card2.num == 1)) {
        return new Pair(15, null);
    } else if ((card1.num == 4 && card2.num == 10) || (card1.num == 10 && card2.num == 4)) {
        return new Pair(16, null);
    } else if ((card1.num == 4 && card2.num == 6) || (card1.num == 6 && card2.num == 4)) {
        return new Pair(17, null);
    } else if ((card1.num == 4 && card2.num == 9) || (card1.num == 9 && card2.num == 4)) {
        if (card1.side == "a" && card2.side == "a") {
            return new Pair(3, "mungGusa");
        } else {
            return new Pair(3, "gusa");
        } 
    } else if ((card1.num == 4 && card2.num == 7) || (card1.num == 7 && card2.num == 4)) {
        if (card1.side == "a" && card2.side == "a") {
            return new Pair(23, "fourSeven");
        } else {
            return new Pair(23, null)
        }
    } else if ((card1.num == 3 && card2.num == 7) || (card1.num == 7 && card2.num == 3)) {
        if (card1.side == "a" && card2.side == "a") {
            return new Pair(24, "threeSeven");
        } else {
            return new Pair(24, null)
        }
    } else {
        if ((card1.num + card2.num) % 10 == 9)  {
            return new Pair(18, null);
        } else if ((card1.num + card2.num) % 10 == 8) {
            return new Pair(19, null); 
        } else if ((card1.num + card2.num) % 10 == 7) {
            return new Pair(20, null);
        } else if ((card1.num + card2.num) % 10 == 6) {
            return new Pair(21, null);
        } else if ((card1.num + card2.num) % 10 == 5) {
            return new Pair(22, null);
        } else if ((card1.num + card2.num) % 10 == 4) {
            return new Pair(23, null);
        } else if ((card1.num + card2.num) % 10 == 3) {
            return new Pair(24, null);
        } else if ((card1.num + card2.num) % 10 == 2) {
            return new Pair(25, null);
        } else if ((card1.num + card2.num) % 10 == 1) {
            return new Pair(26, null);
        } else if ((card1.num + card2.num) % 10 == 0) {
            return new Pair(27, null);
        }
    }
}

function makeCardsToPairs(cardsOfEachPlayers) {
    let pairsOfEachPlayers = new Array();
    for (i = 0; i < cardsOfEachPlayers.length; i++) {
        const card1 = cardsOfEachPlayers[i][0]
        const card2 = cardsOfEachPlayers[i][1]
        const pair = decidePair(card1, card2)

        pairsOfEachPlayers.push(pair)
    }
    return pairsOfEachPlayers
}

// 게임을 업데이트하는데 필요함 함수
function reflectPairToGame(pair, game) {
    if (pair.special) {
        if (pair.special == "mungGusa") {
            game.mungGusa = true;
        } else if (pair.special == "gusa") {
            game.gusa = true;
        } else if (pair.special == "fourSeven") {
            game.fourSeven = true;
        } else if (pair.special == "threeSeven") {
            game.fourSeven = true;
        }
    }
    if (pair.rank < game.rank) {
        game.rank = pair.rank;
        return "newWinner"
    } else if (pair.rank == game.rank) {
        return "sameRank"
    } else {
        return false
    }
}

// 페어들을 받아서 게임 객체로 return
function updateGame(pairsOfEachPlayers) {
    let game = new Game(); // game 객체를 만들고 
    for (i = 0; i < pairsOfEachPlayers.length; i++) {
        const result = reflectPairToGame(pairsOfEachPlayers[i], game)
        if (result == "newWinner") {
            game.winner = []
            game.winner.push(i)
        } else if (result == "sameRank") {
            game.winner.push(i)
        } 
    }
    return game
}


// 특수족보를 들고있는 사람을 찾는다
function findSpecialHolder(special, pairsOfEachPlayers) {
    for (i = 0; i < pairsOfEachPlayers.length; i++) {
        if (pairsOfEachPlayers[i].special == special) {
            return i
        }
    }
}

// 마지막으로 특수족보를 따진다.
function decideGameWinner(game, pairsOfEachPlayers) {
    if (game.mungGusa) {
        if (game.rank > 3) {
            return false; // 무승부는 승자가 없어서 false를 return
        }
    }
    if (game.gusa) {
        if (game.rank > 11) {
            return false;
        }
    }
    if (game.fourSeven) { // 47땡잡이는 1땡 ~ 9땡에게 승리
        if ((game.rank >= 3) && (game.rank <= 11)) {
            const specialWinner = findSpecialHolder("fourSeven", pairsOfEachPlayers);
            game.winner = [specialWinner]
            return game.winner;
        }
    }
    if (game.threeSeven) { //37암행어사는 18광땡 혹은 13광땡에 승리
        if (game.rank == 1) {
            const specialWinner = findSpecialHolder("threeSeven", pairsOfEachPlayers);
            game.winner = [specialWinner]
            return game.winner;
        }
    }
    return game.winner
}

// 플레이어의 승무패를 스코어보드에 기록해준다.
function writeInScoreboard(scoreboard, winner) {
    if (!winner) {
        scoreboard.draw += 1
        return
    } else if (winner.includes(scoreboard.owner)) {
        scoreboard.win += 1
        return
    } else {
        scoreboard.lose += 1
        return
    }
}

// 테스트 케이스 (중간)
// let test0 = new Pair(23, null)
// let test1 = new Pair(24, "mungGusa")
// let test2 = new Pair(21, null)
// let test3 = new Pair(27, null)
// let test4 = new Pair(27, "fourSeven")

// let testPairs = new Array(test0, test1, test2, test3, test4)

// let testGame = updateGame(testPairs)
// console.log(testGame)

// let testWinner = decideGameWinner(testGame, testPairs)
// console.log(testWinner)

// let testScoreboard = new Scoreboard(0)
// console.log(testScoreboard)
// writeInScoreboard(testScoreboard, testWinner)
// console.log(testScoreboard)

function simulation(selectedCard, numberOfPlayers) {
    const numOfSimulation = 1000
    let numOfTrial = 0
    let playScoreboard = new Scoreboard(0)

    while (numOfTrial != numOfSimulation) {
        let deck = [card1a, card1b, card2a, card2b, card3a, card3b, card4a, card4b, card5a, card5b, card6a, card6b, card7a, card7b, card8a, card8b, card9a, card9b, card10a, card10b]
        const selectedCardIdx = deck.indexOf(selectedCard)
        deck.splice(selectedCardIdx, 1)
           
        let simulationDeck = deck
        let shuffledDeck = shuffle(simulationDeck);
        const cardsOfEachPlayers = pickTwoCardsWithSelectedCard(shuffledDeck, numberOfPlayers, selectedCard);
        const pairsOfEachPlayers =  makeCardsToPairs(cardsOfEachPlayers);
        const game = updateGame(pairsOfEachPlayers);
        const gameWinner = decideGameWinner(game, pairsOfEachPlayers);
        writeInScoreboard(playScoreboard, gameWinner);    
        
        numOfTrial += 1
    }
    
    return playScoreboard
}

console.log(simulation(card10a, 5))

// 디버깅 테스트용 (복사해서 여러개 실행해볼 것)
// let playScoreboard = new Scoreboard(0)
// const selectedCard = card1a
// const numberOfPlayers = 5

// // 여기 아래 부터 복사
// var deck = [card1a, card1b, card2a, card2b, card3a, card3b, card4a, card4b, card5a, card5b, card6a, card6b, card7a, card7b, card8a, card8b, card9a, card9b, card10a, card10b]
// var selectedCardIdx = deck.indexOf(selectedCard)
// deck.splice(selectedCardIdx, 1)
   
// var simulationDeck = deck
// var shuffledDeck = shuffle(simulationDeck);
// var cardsOfEachPlayers = pickTwoCardsWithSelectedCard(shuffledDeck, numberOfPlayers, selectedCard);
// var pairsOfEachPlayers =  makeCardsToPairs(cardsOfEachPlayers);
// var game = updateGame(pairsOfEachPlayers);
// var gameWinner = decideGameWinner(game, pairsOfEachPlayers);
// writeInScoreboard(playScoreboard, gameWinner);

// console.log(cardsOfEachPlayers)
// console.log(pairsOfEachPlayers)
// console.log(game)
// console.log(playScoreboard)
// console.log("\n")
// 여기까지 



