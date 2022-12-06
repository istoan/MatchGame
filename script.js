let itemsContainer = document.getElementById("itemsContainer");
let level = 0;

let cardLayouts = new Array();
cardLayouts.push(2);
cardLayouts.push(3);
cardLayouts.push(4);
cardLayouts.push(6);
cardLayouts.push(8);

let cards = new Array();
cards.push({"id": "pink", "back": "Pink"});
cards.push({"id": "orange", "back": "Orange"});
cards.push({"id": "red", "back": "Red"});
cards.push({"id": "blue", "back": "Blue"});
cards.push({"id": "black", "back": "Black"});
cards.push({"id": "lightblue", "back": "Lightblue"});
cards.push({"id": "yellow", "back": "Yellow"});
cards.push({"id": "magenta", "back": "Magenta"});

let selectedCards = new Array();
let numTurnedCards = 0;
let cardContainers = new Array();

shuffle(cards);

generateCards();

function generateCards(){
    cardContainers = [];
    numTurnedCards = 0;
    itemsContainer.innerHTML = "";

    let currentCards = generateCurrentCardsArray();

    shuffle(currentCards);

    for (let index = 0; index < currentCards.length; index++) {
        const element = currentCards[index];

        cardContainers.push(createCard(element.id, element.back));
    }
}

function generateCurrentCardsArray(){
    let currentCards = new Array();

    for (let index = 0; index < cardLayouts[level]; index++) {
        currentCards.push(cards[index]);
        currentCards.push(cards[index]);
    }

    return currentCards;
}

function createCard(id = "", info = ""){
    let card = document.createElement("div");
    card.id = id;
    card.className = "card";

    let content = document.createElement("div");
    content.className = "content";

    let front = document.createElement("div");
    front.className = "front";
    front.innerHTML = "Card";

    let back = document.createElement("div");
    back.className = "back";
    back.innerText = info;
    back.style.backgroundColor = id;

    card.appendChild(content);
    content.appendChild(front);
    content.appendChild(back);
    itemsContainer.append(card);

    card.addEventListener("click", handleCardClick);

    return card;
}

function handleCardClick(event){
    console.log("click");

    card = event.currentTarget;

    if(!card.classList.contains("selected")){
        card.classList.add("selected");
        selectedCards.push(card);

        disableCardsClick();
        
        setTimeout(() => {
            onCardRevelead(card);
        }, 600);
    }
}

function onCardRevelead(card){
    enableCardsClick();

    if (selectedCards.indexOf(card) == 1)
    {
        if (selectedCards[0].id == selectedCards[1].id)
        {
            console.log("match")
            numTurnedCards += 2;
            selectedCards[0].removeEventListener("click", handleCardClick);
            selectedCards[1].removeEventListener("click", handleCardClick);
            selectedCards = [];
            
            if (numTurnedCards == cardContainers.length){
                alert("Finished!");

                console.log(level, cardLayouts.length)
                if(level < cardLayouts.length-1)
                    level++;
                generateCards();
            }
        }
        else
        {
            selectedCards[0].classList.remove("selected");
            selectedCards[1].classList.remove("selected");
            selectedCards = [];
        }
    }
}

function disableCardsClick(){
    for (let index = 0; index < cardContainers.length; index++) {
        const element = cardContainers[index];
        element.style.pointerEvents = "none";
    }
}

function enableCardsClick(){
    for (let index = 0; index < cardContainers.length; index++) {
        const element = cardContainers[index];
        element.style.pointerEvents = "auto";
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }