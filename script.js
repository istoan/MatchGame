let cards = document.querySelectorAll(".card")


for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.addEventListener("click", (event) => {
        console.log("click");
    
        if(element.classList.contains("selected"))
            event.currentTarget.classList.remove("selected");
        else
            event.currentTarget.classList.add("selected");
    });
}
