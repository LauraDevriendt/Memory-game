

let imgSources = [
    "./resources/images/holiday1.jpg",
    "./resources/images/holiday2.jpg",
    "./resources/images/holiday3.jpg",
    "./resources/images/holiday1.jpg",
    "./resources/images/holiday2.jpg",
    "./resources/images/holiday3.jpg",
];
let cards = document.querySelectorAll('.card');
let imgSrcCompare= [];
let ids=[];
let rounds = parseInt(document.getElementById('numberOfRounds').dataset.rounds)
let pairs = parseInt(document.getElementById('numberOfPairs').dataset.pairs)
/* shuffle cards on load */
shuffleMemoryImages()
function shuffleMemoryImages(){
}
/* Fisher yates shuffle */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { // loop from back to front
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // same can be written as:
        // let t = array[i];
        // array[i] = array[j];
        // array[j] = t
        [array[i], array[j]] = [array[j], array[i]]; // a b becomes b a and becomes random list 2
    }
    return array
}
/* flipping cards */
let randomSources=shuffle(imgSources);
let backsides = Array.from(document.querySelectorAll('.backside'))
let i=0;
backsides.forEach(backside=>{
    backside.setAttribute('src', randomSources[i]);
    i++
})
cards.forEach(card=> {
    card.addEventListener('click', function game(e) {

        card.classList.add('is-flipped')
        if (card.classList.contains('is-flipped')) {
           let id = card.id;
           ids.push(id)
            let img = card.children[2]
            let imgSrc = img.getAttribute('src');
            imgSrcCompare.push(imgSrc)
            let set = getOccurrence(imgSrcCompare, imgSrc)
            let sameCard = getOccurrence(ids, id)
            if(imgSrcCompare.length>=2 && set===1 && sameCard==1){
                rounds++
                document.getElementById('numberOfRounds').innerHTML=`Rounds needed: ${rounds}`
                imgSrcCompare=[];
                ids=[];
                let flippedCards = Array.from(document.getElementsByClassName('is-flipped'));
                flippedCards.forEach(flippedCard=>{
                    if(flippedCard.classList.contains('pair')==false)
                        setTimeout(function(){
                            flippedCard.classList.remove('is-flipped')
                        },1000);
                });
            }
            if(imgSrcCompare.length>=2 && set==2 && sameCard==1){
                rounds++
                pairs++
                document.getElementById('numberOfRounds').innerHTML=`Rounds needed: ${rounds}`
                document.getElementById('numberOfPairs').innerHTML=`Pairs found: ${pairs}`
                imgSrcCompare=[];
                ids=[];
                let flippedCards = Array.from(document.getElementsByClassName('is-flipped'));
                flippedCards.forEach(flippedCard=>{
                    flippedCard.classList.add('pair')

                });
            }
        }
        if(pairs==(imgSources.length/2)){
            let modalBody= document.getElementById('ModalBody')
            if(rounds == (imgSources.length/2)){
                modalBody.innerHTML=`You found them as fast as possible! CONGRATULATIONS! <br> Want to play again?`
            }else{
                modalBody.innerHTML=`You found all pairs and needed ${rounds} rounds! <br> You want to try to find them faster?`
            }
            document.getElementById('modalbtn').click();
            document.getElementById('playAgainBtn').addEventListener('click', function(){
                location.reload();
            })
        }
    });
});
document.getElementById('playAgainBtn').addEventListener('click', function(){
    location.reload();
})

function getOccurrence(array, value) {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

document.addEventListener('keypress', function(e){
    switch (e.keyCode) {
        case 49:
            cards[0].click();
            break;
        case 50:
            cards[1].click();
            break;
        case 51:
            cards[2].click();
            break;
        case 52:
            cards[3].click();
            break;
        case 53:
            cards[4].click();
            break;
        case 54:
            cards[5].click();
            break;
    }
});
