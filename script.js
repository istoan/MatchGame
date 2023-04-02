let itemsContainer = document.getElementById("itemsContainer");
let gameContainer = document.getElementById("gameContainer");
let level = 0;

let cardLayouts = new Array();
cardLayouts.push(2);
cardLayouts.push(3);
cardLayouts.push(4);
cardLayouts.push(6);
cardLayouts.push(8);
cardLayouts.push(10);
cardLayouts.push(18);

let cards = new Array();
cards.push({"id": "pink", "label": "Pink"});
cards.push({"id": "orange", "label": "Orange"});
cards.push({"id": "red", "label": "Red"});
cards.push({"id": "blue", "label": "Blue"});
cards.push({"id": "black", "label": "Black"});
cards.push({"id": "lightblue", "label": "Lightblue"});
cards.push({"id": "turquoise", "label": "Turquoise"});
cards.push({"id": "magenta", "label": "Magenta"});
cards.push({"id": "gray", "label": "Gray"});
cards.push({"id": "brown", "label": "Brown"});
cards.push({"id": "lime", "label": "Lime"});
cards.push({"id": "teal", "label": "Teal"});
cards.push({"id": "chocolate", "label": "Chocolate"});
cards.push({"id": "tomato", "label": "Tomato"});
cards.push({"id": "gold", "label": "Gold"});
cards.push({"id": "slateblue", "label": "Slateblue"});
cards.push({"id": "olivedrab", "label": "Olivedrab"});
cards.push({"id": "navy", "label": "Navy"});

let selectedCards = new Array();
let numTurnedCards = 0;
let cardContainers = new Array();

shuffle(cards);

generateCards();

function generateCards() {
    cardContainers = [];
    numTurnedCards = 0;
    itemsContainer.innerHTML = "";

    switch (level) {
        case 1:
            itemsContainer.style.gridTemplateColumns = "300px 300px 300px";
            break;

        case 2:
        case 3:
        case 4:
            itemsContainer.style.gridTemplateColumns = "300px 300px 300px 300px";
            break;

        case 5:
            itemsContainer.style.gridTemplateColumns = "300px 300px 300px 300px 300px";
            break;
        
        case 6:
            itemsContainer.style.gridTemplateColumns = "300px 300px 300px 300px 300px 300px";
            break;
        
        default:
            break;
    }

    let currentCards = generateCurrentCardsArray();

    shuffle(currentCards);

    for (let index = 0; index < currentCards.length; index++) {
        const element = currentCards[index];

        cardContainers.push(createCard(element.id, element.label));
    }

    resize();
}

function generateCurrentCardsArray() {
    let currentCards = new Array();

    for (let index = 0; index < cardLayouts[level]; index++) {
        currentCards.push(cards[index]);
        currentCards.push(cards[index]);
    }

    return currentCards;
}

function createCard(id = "", label = "") {
    let card = document.createElement("div");
    card.id = id;
    card.className = "card";

    let content = document.createElement("div");
    content.className = "content";

    let front = document.createElement("div");
    front.className = "front";

    let back = document.createElement("div");
    back.className = "back";
    back.innerText = label;
    back.style.backgroundColor = id;

    card.appendChild(content);
    content.appendChild(front);
    content.appendChild(back);
    itemsContainer.append(card);

    card.addEventListener("click", handleCardClick);

    return card;
}

function handleCardClick(event) {
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

function onCardRevelead(card) {
    enableCardsClick();

    if (selectedCards.indexOf(card) == 1)
    {
        //if this is true, then a match has occured
        if (selectedCards[0].id == selectedCards[1].id)
        {
            numTurnedCards += 2;
            selectedCards[0].removeEventListener("click", handleCardClick);
            selectedCards[1].removeEventListener("click", handleCardClick);
            selectedCards = [];
            
            //if this is true, then the level is finished
            if (numTurnedCards == cardContainers.length){
                alert("Finished!");

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

function disableCardsClick() {
    for (let index = 0; index < cardContainers.length; index++) {
        const element = cardContainers[index];
        element.style.pointerEvents = "none";
    }
}

function enableCardsClick() {
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

window.addEventListener("resize", resize);

function resize() {
    let maxWidth  = itemsContainer.clientWidth,
    maxHeight = itemsContainer.clientHeight;

    let scale,
    width = gameContainer.getBoundingClientRect().width;
    height = gameContainer.getBoundingClientRect().height;

    scale =  Math.min(width/maxWidth, height/maxHeight);
    console.log(scale, maxWidth, width);
    itemsContainer.style.transform = 'scale(' + scale + ')';
}

resize();