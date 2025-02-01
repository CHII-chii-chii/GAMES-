const cardArray = [
    { name: 'fries', img: 'fries.png' },
    { name: 'cheeseburger', img: 'cheeseburger.png' },
    { name: 'ice-cream', img: 'ice-cream.png' },
    { name: 'milkshake', img: 'milkshake.png' },
    { name: 'pizza', img: 'pizza.png' },
    { name: 'hotdog', img: 'hotdog.png' },
    { name: 'fries', img: 'fries.png' },
    { name: 'cheeseburger', img: 'cheeseburger.png' },
    { name: 'ice-cream', img: 'ice-cream.png' },
    { name: 'milkshake', img: 'milkshake.png' },
    { name: 'pizza', img: 'pizza.png' },
    { name: 'hotdog', img: 'hotdog.png' }
];


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));  // Random index
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
}



shuffle(cardArray);

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []  
const cardsWon = []

function createBoard() {
    for( let i = 0; i < cardArray.length; i++){
        const card =  document.createElement('img');
        card.setAttribute('src','blank.png')
        card.setAttribute('data-id',i)
        card.addEventListener('click',flipCard)
        gridDisplay.appendChild(card)
    }
}

createBoard() 


function checkMate(){


    const cards =  document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    if(optionOneId == optionTwoId){
        cards[optionOneId].setAttribute('src', 'blank.png')
        cards[optionTwoId].setAttribute('src', 'blank.png')
        alert('U ARE REALLY A BITCH')
        return
    }

    if(cardsChosen[0] == cardsChosen[1]){
        alert('MATCHED')
        cards[optionOneId].setAttribute('src', 'white.png')
        cards[optionTwoId].setAttribute('src', 'white.png')
        cards[optionOneId].removeEventListener('click',flipCard)
        cards[optionTwoId].removeEventListener('click',flipCard)

        cardsWon.push(cardsChosen)
    }
    else{
        cards[optionOneId].setAttribute('src', 'blank.png')
        cards[optionTwoId].setAttribute('src', 'blank.png')
        alert('NOT MATCHED')
    }
    resultDisplay.innerHTML = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []
    if(cardsWon.length == (cardArray.length/2)){
        resultDisplay.innerHTML = 'YOU WON BITCH !!!!'
    }
}

function flipCard() {
    const cardid = this.getAttribute('data-id')
    
    cardsChosen.push(cardArray[cardid].name)
    cardsChosenIds.push(cardid)
    this.setAttribute('src',cardArray[cardid].img)

    if(cardsChosen.length === 2) {
        setTimeout( checkMate , 500)
    }
      

}