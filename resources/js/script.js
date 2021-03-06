
(function(){
        /* defining variables */
        let cards = document.querySelectorAll('.card');
        let imgSrcCompare = [];
        let ids = [];
        let isProcessing=false;
        let rounds = parseInt(document.getElementById('numberOfRounds').dataset.rounds)
        let pairs = parseInt(document.getElementById('numberOfPairs').dataset.pairs)

        /* defining functions */
        const shuffleCards =() =>{
            let imgSources = [
                "./resources/images/holiday1.jpg",
                "./resources/images/holiday2.jpg",
                "./resources/images/holiday3.jpg",
                "./resources/images/holiday1.jpg",
                "./resources/images/holiday2.jpg",
                "./resources/images/holiday3.jpg",
            ];
            let backsides = Array.from(document.querySelectorAll('.backside'))
            let i = 0;
            let randomSources = shuffleCardsImages(imgSources);
            backsides.forEach(backside => {
                backside.setAttribute('src', randomSources[i]);
                i++
            })

        }
            // assisting functions
            function shuffleCardsImages(array) {
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

        const playing = () =>{

            cards.forEach(card => {
                card.addEventListener('click', function game(e) {
                    if (isProcessing) { return; }
                    card.classList.add('is-flipped')
                    if (card.classList.contains('is-flipped')) {
                        let id = card.id;
                        ids.push(id)
                        let img = card.children[2]
                        let imgSrc = img.getAttribute('src');
                        imgSrcCompare.push(imgSrc)
                        let set = getOccurrence(imgSrcCompare, imgSrc)
                        let sameCard = getOccurrence(ids, id)

                        noSet(set,sameCard)
                        aSet(set,sameCard)

                    }
                    gameOver()

                });
            });
        }
            // assisting functions
            function getOccurrence(array, value) {
                let count = 0;
                array.forEach((v) => (v === value && count++));
                return count;
            }
            function noSet(set, sameCard){
                if (imgSrcCompare.length >= 2 && set === 1 && sameCard == 1) {
                    rounds++
                    document.getElementById('numberOfRounds').innerHTML = `Rounds needed: ${rounds}`
                    imgSrcCompare = [];
                    ids = [];
                    let flippedCards = Array.from(document.getElementsByClassName('is-flipped'));
                    flippedCards.forEach(flippedCard => {
                        if (flippedCard.classList.contains('pair') == false){
                            isProcessing = true; //
                            setTimeout(function () {
                                flippedCard.classList.remove('is-flipped')
                                isProcessing = false; //
                            }, 1000);}
                    });
                }
            }
            function aSet(set, sameCard) {
                if (imgSrcCompare.length >= 2 && set == 2 && sameCard == 1) {
                    rounds++
                    pairs++
                    document.getElementById('numberOfRounds').innerHTML = `Rounds needed: ${rounds}`
                    document.getElementById('numberOfPairs').innerHTML = `Pairs found: ${pairs}`
                    imgSrcCompare = [];
                    ids = [];
                    let flippedCards = Array.from(document.getElementsByClassName('is-flipped'));
                    flippedCards.forEach(flippedCard => {
                        flippedCard.classList.add('pair')
                    });
                }
            }
            function gameOver(){
                if (pairs == (cards.length / 2)) {
                    let modalBody = document.getElementById('ModalBody')
                    if (rounds == (cards.length / 2)) {
                        modalBody.innerHTML = `You found them as fast as possible! CONGRATULATIONS! <br> Want to play again?`
                    } else {
                        modalBody.innerHTML = `You found all pairs and needed ${rounds} rounds! <br> You want to try to find them faster?`
                    }
                    document.getElementById('modalbtn').click();
                    document.getElementById('playAgainBtn').addEventListener('click', function () {
                        location.reload();
                    })
                }
            }

        const keyBoardPlay=()=>{
            document.addEventListener('keypress', function (e) {
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
        }

        const playAgain =() =>{
            document.getElementById('playAgainBtn').addEventListener('click', function () {
                location.reload();
            })
        }

        /* run functions */
        shuffleCards()
        keyBoardPlay()
        playing()
        playAgain()
    })();





