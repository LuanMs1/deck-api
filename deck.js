export async function shuffleDeck() {
    try {
        let __deck = await fetch(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        ).then((response) => response.json());
        if (!__deck.success) throw "not possible to fetch the deck";
        return __deck;
    } catch (error) {
        return Promise.reject(error);
        // return Error(error);
    }
}
export async function drawHand(__deck, __number) {
    let cards = [];
    const deckId = __deck["deck_id"];
    for (let i = 0; i < __number; i++) {
        const card = fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        ).then((response) => response.json());
        cards.push(card);
    }
    cards = await Promise.all(cards);
    console.log(cards);
    cards.forEach(showCards);
}

function showCards(element) {
    console.log(element);
    const card = element.cards[0];
    const cardImg = document.createElement("img");
    cardImg.id = card["code"];
    cardImg.src = card["image"];
    document.querySelector(".hand").appendChild(cardImg);
}
