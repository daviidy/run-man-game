const addUser = (user) => {
    if (!localStorage.getItem('current_player')) {
        console.log('added');
        localStorage.setItem('current_player', user);
        
        return localStorage.getItem('current_player');
    }
}

export default addUser;