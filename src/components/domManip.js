const domManip = () => {
  const newUserContainer = document.getElementById('newUserContainer');
  const loading = document.getElementById('spinner');
  const userInput = document.getElementById('name');
  const form = document.getElementById('form');
  const addUserButton = document.getElementById('createUser');
  const buttonActions = document.getElementById('buttonActions');
  const welcomeUser = document.getElementById('welcomeUser');
  const start = document.getElementById('start');
  const leaderBoard = document.getElementById('leaderBoard');
  const gameContainer = document.getElementById('gameContainer');
  const gameButtons = document.getElementById('gameButtons');
  const result = document.getElementById('result');
  const menu = document.getElementById('menu');
  const exit = document.getElementById('exit');
  const playersList = document.getElementById('playersList');
  const players = document.getElementById('players');
  const back = document.getElementById('back');
  

  return {
    newUserContainer,
    loading,
    userInput,
    form,
    addUserButton,
    buttonActions,
    welcomeUser,
    start,
    leaderBoard,
    gameContainer,
    gameButtons,
    result,
    menu,
    exit,
    playersList,
    players,
    back
  };
};

export default domManip;
