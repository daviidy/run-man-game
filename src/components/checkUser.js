const checkUser = () => {
    if (localStorage.getItem('current_player') !== null) {
        return true
    }
    else {
        return false;
    }
}

export default checkUser;