const sortArray = (array) => {
    const result = array.sort((a, b) => {
      return b.score - a.score
    });
    return result

}

export default sortArray