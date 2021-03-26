class Card {
    constructor(num, side) {
        this.num = num
        this.side = side
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

// 각 카드 객체에 저장
const card1a = new Card(1, "a")
const card1b = new Card(1, "b")
const card2a = new Card(2, "a")
const card2b = new Card(2, "b")
const card3a = new Card(3, "a")
const card3b = new Card(3, "b")
const card4a = new Card(4, "a")
const card4b = new Card(4, "b")
const card5a = new Card(5, "a")
const card5b = new Card(5, "b")
const card6a = new Card(6, "a")
const card6b = new Card(6, "b")
const card7a = new Card(7, "a")
const card7b = new Card(7, "b")
const card8a = new Card(8, "a")
const card8b = new Card(8, "b")
const card9a = new Card(9, "a")
const card9b = new Card(9, "b")
const card10a = new Card(10, "a")
const card10b = new Card(10, "b")

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



const selectedCard = card1a

let deck = [card1a, card1b, card2a, card2b, card3a, card3b, card4a, card4b, card5a, card5b, card6a, card6b, card7a, card7b, card8a, card8b, card9a, card9b, card10a, card10b]
const selectedCardIdx = deck.indexOf(selectedCard)
deck.splice(selectedCardIdx, 1)
console.log(deck)