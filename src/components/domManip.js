const domManip = () => {
  const newUserContainer = document.getElementById('newUserContainer');
  const loading = document.getElementById('spinner');
  const userInput = document.getElementById('name');
  const form = document.getElementById('form');
  const addUserButton = document.getElementById('createUser');
  const buttonActions = document.getElementById('buttonActions');
  const welcomeUser = document.getElementById('welcomeUser');
  

  return {
    newUserContainer,
    loading,
    userInput,
    form,
    addUserButton,
    buttonActions,
    welcomeUser
  };
};

export default domManip;
