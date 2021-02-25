import domManip from './domManip';
import sortArray from './sortArray'

const getScores = (id) => {
    const dom = domManip();

    const {
        players,
        loading,
        back,
    } = dom;

    
    fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/"+id+"/scores/",
    {
        mode: 'cors'
    })
    .then(function(response) {
    return response.json();
    })
    .then(function(response) {
    const array = response.result;
    loading.classList.add('d-none');
    back.classList.remove('d-none');
    while (players.firstChild) {
        players.removeChild(players.lastChild);
    }
    const newArray = sortArray(array);
    for (let i = 0; i < newArray.length; i++) {
        const player = document.createElement('li');
        player.classList.add('list-group-item');
        player.innerHTML = newArray[i].user+": "+ newArray[i].score;
        players.appendChild(player);
    }
    })
    .catch(e => {
    console.log(e);
    });
}

export default getScores