export function getRandomItemFromArray(array) {
  let randIndex = Math.floor(Math.random() * array.length);
  let randId = array[randIndex]?.id;
  return array.find((item) => item.id == randId) || null;
}

export function getRandomAnswers(list, n, realAnswer) {
  let answers = [];
  while (answers.length < n) {
    if (answers.length >= list.length) {
      break;
    }
    let randomIndex = Math.floor(Math.random() * list.length);
    if (!answers.some((answer) => answer.id === list[randomIndex].id)) {
      //
      answers.push(list[randomIndex]);
    }
  }
  if (!answers.some((answer) => answer.id == realAnswer.id)) {
    //
    let index = Math.floor(Math.random() * answers.length);
    answers = [...answers.slice(0, index), realAnswer, ...answers.slice(index)];
  }
  return answers;
}
