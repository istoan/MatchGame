let cards = new Array();
cards.push({"id": "apple", "back": "Apple"});
cards.push({"id": "apple", "back": "Apple"});
cards.push({"id": "orange", "back": "Orange"});
cards.push({"id": "orange", "back": "Orange"});

let selectedCard;

shuffle(cards);

generateCards();

function generateCards(){
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];

        createCard(element.id, element.back);
    }
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

    card.appendChild(content);
    content.appendChild(front);
    content.appendChild(back);
    document.body.append(card);

    card.addEventListener("click", () => {
        console.log("click");
    
        if(card.classList.contains("selected"))
            card.classList.remove("selected");
        else
        {
            card.classList.add("selected");
            selectedCard = card;
        }
    });
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