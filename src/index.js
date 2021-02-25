import Game from './game'
import './style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import domManip from './components/domManip';
import addUser from './components/addUser';
import checkUser from './components/checkUser';

const dom = domManip();

const {
  newUserContainer,
  loading,
  userInput,
  form,
  addUserButton,
  buttonActions,
  welcomeUser
} = dom;

if (checkUser()) {
  newUserContainer.classList.add('d-none');
  buttonActions.classList.remove('d-none');
  welcomeUser.innerHTML = `Hello ${localStorage.getItem('current_player')}!`;
}

addUserButton.addEventListener('click', (e) => {
  e.preventDefault();
  const nameValue = userInput.value;
  form.reset();
  form.classList.add('d-none');
  loading.classList.remove('d-none');
  if (nameValue !== '') {
    const user = addUser(nameValue);
    setTimeout(() => {
      loading.classList.add('d-none');
      buttonActions.classList.remove('d-none');
      welcomeUser.innerHTML = `Hello ${user}!`;
    }, 3000);
    
  }
});


//window.game = new Game();
