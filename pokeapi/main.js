/*Contains all functions for displaying the pokedex */

const container = document.querySelector('.pokedex-container');
const loadMoreBtn = document.querySelector('#load-more');
const loadAllBtn = document.querySelector('#load-all');
const loadBtnsContainer = document.querySelector('.load-btns');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('.search-icon');
const resetBtn = document.querySelector('#reset-btn');
const resetBtnContainer = document.querySelector('.reset-btn-container');
const modalCardContainer = document.querySelector('.modal-card-container');
const modalContainer = document.querySelector('.modal-container');

let amountDisplayed;
let count
let cards;

//Add Event Listener
loadMoreBtn.addEventListener('click', displayMorePokemon);
searchBtn.addEventListener('click', searchForPokemon);
resetBtn.addEventListener('click', closeModal);


function pokedex() {
    
    for(let i = 1; i <=100; i++) {
        
        let api = `https://pokeapi.co/api/v2/pokemon/${i}`;
        
        fetch(api)
            .then(response => response.json())
            .then(pokemon => getPokemonInfo(pokemon)) 
         
    };
    
    
    
};

function displayMorePokemon() {
    amountDisplayed += 20
    for(; count < amountDisplayed; count++) {
        if(count > cards.length - 1 ) return
        cards[count].classList.remove('hide-card')
    }   
}

 function initialPokemonDisplayed() {
    count = 20
    amountDisplayed = 20
    cards = document.querySelectorAll('.pokemon-card')
    for(let i = 0; i < cards.length; i++) {
        if(i > 19){
            cards[i].classList.add('hide-card')
        }
    }
    console.log(cards)
}
/*
function displayAllPokemon() {
    
}
*/

function closeModal() {
    modalContainer.classList.add('hide-card')
}


function searchForPokemon() {
    for(let i = 0; i < cards.length; i++) {
        if(searchBar.value === '') {
            return
        }
        else if(searchBar.value.toLowerCase() === cards[i].id) {
            modalCardContainer.appendChild(cards[i])
            modalContainer.classList.remove('hide-card')
        } else {
            
        }
    }
}

function getPokemonInfo(pokemon) {
    
    let pokeNumber = pokemon.id;
     name = pokemon.name;
    let pokeType = pokemon.types[0].type.name
    const colors = {
        fire: '#FECECE',
        grass: '#A7F9AC',
        electric: '#F9F7A9',
        water: '#D1EEFC',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#AA7FFA',
        bug: '#f8d5a3',
        dragon: '#F5AE7D',
        psychic: '#FAAAD1',
        flying: '#EAE6E5',
        fighting: '#e6e0d4',
        normal: '#f5f5f5',
        ghost: '#D4BDF7',
        ice: '#82EAF1',
        steel: '#B4D4D6',
        dark: '#7F5367',
    }
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.id = name
    card.style.backgroundColor = colors[pokeType];
    
    let innerhtml = `
    <div class = "img-container">
    <img src= "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" class= "image">
    </img>
    </div>
    <div class= "info">
    <span class= "id">#${pokeNumber.toString().padStart(3, '0')}</span>
    <h3 class= "name">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
    <small class= "type">Type: ${pokeType.charAt(0).toUpperCase() + pokeType.slice(1)}</small>
    </div>    
    `
     // try an if statement with last item and use child.after()
    card.innerHTML = innerhtml;
    container.append(card) ;   
}
 


pokedex()
setTimeout(initialPokemonDisplayed, 500)



    
    



/*

const config = {attributes: true, childList: true, subtree: true}

const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if(mutation.type === 'childList'){
            console.log('A child node has been added')
            console.log(version)
            version += 1
        }
    }
}

const observer = new MutationObserver(initialPokemonDisplayed());

observer.observe(container, config)

observer.disconnect()
*/