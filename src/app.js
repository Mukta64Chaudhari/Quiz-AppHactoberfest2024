console.log('Moazam');
const question = [
  {
    ques: 'Which of the following is the markup Language?',
    a: 'HTML',
    b: 'CSS',
    c: 'JavaScript',
    d: 'PHP',
    correct: 'a',
  },
  {
    ques: 'In Which JavaScript was launched?',
    a: '1996',
    b: '1995',
    c: '1998',
    d: '2000',
    correct: 'b',
  },
  {
    ques: 'What does CSS stand for?',
    a: 'Cascade Style Sheet',
    b: 'Cascading Style Sheet',
    c: 'Hyper Text Markup Language',
    d: 'JSON',
    correct: 'b',
  },
];

const total = question.length;
const display = document.querySelector('.box');
const ques = document.querySelector('.Ques');
const options = document.querySelectorAll('.options');
const btn = document.querySelector('.submit');
const btn2 = document.querySelector('.submit2');
const progressBar = document.querySelector('.progress-bar');
let index = 0;
let right = 0;
let wrong = 0;


const loadQues = function () {
  if (index < total) {
    let data = question[index];
    display.innerHTML = `
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
      <h1 class="Ques">Q${index + 1}) ${data.ques}</h1>
      <div class="row">
        <input type="radio" class="options" id="option1" value="a" name="ques" />
        <label for="option1">${data.a}</label>
      </div>
      <div class="row">
        <input type="radio" class="options" id="option2" value="b" name="ques" />
        <label for="option2">${data.b}</label>
      </div>
      <div class="row">
        <input type="radio" class="options" id="option3" value="c" name="ques" />
        <label for="option3">${data.c}</label>
      </div>
      <div class="row">
        <input type="radio" class="options" id="option4" value="d" name="ques" />
        <label for="option4">${data.d}</label>
      </div>
      <div class="row">
        <button class="btn submit">Submit</button>
        <button class="btn2 submit2">Prev</button>
      </div>
    `;

    const progressPercentage = ((index + 1) / total) * 100;
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progressPercentage}%`;

    document.querySelector('.submit').addEventListener('click', getResult);
    document.querySelector('.submit2').addEventListener('click', prevQ);
  } else {
    endQuiz();
  }
};

const getResult = function () {
  let data = question[index];
  const answer = checkAnswer();
  if (answer === data.correct) {
    right++;
  } else {
    wrong++;
  }
  index++;
  loadQues();
};

const reset = () => {
  options.forEach(input => {
    input.checked = false;
  });
};

const checkAnswer = function () {
  const options = document.querySelectorAll('.options');
  let answer;
  options.forEach(input => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};

const prevQ = function () {
  if (index > 0) {
    index--;
    loadQues();
  }
};

const endQuiz = () => {
  display.innerHTML = '';
  let resultMessage = '';
  if (right === total) {
    resultMessage = `Excellent👏`;
  } else if (right === total - 1) {
    resultMessage = `Good 👍`;
  } else if (right === total - 2) {
    resultMessage = `Satisfactory `;
  } else {
    resultMessage = `Better Luck Next time`;
  }
  
  display.innerHTML = `
    <h2 class="head">Thank you for solving the quiz!</h2>
    <h3 class="marks">Correct Options: ${right}/${total}</h3>
    <h2 class="result">${resultMessage}</h2>
    <button class="btn again" onclick="againStart()">Try Again</button>
  `;
};

const againStart = () => {
  index = 0;
  right = 0;
  wrong = 0;
  loadQues();
  resetProgressBar();
};

const resetProgressBar = () => {
  progressBar.style.width = '0%';
};

btn.addEventListener('click', getResult);
btn2.addEventListener('click', () => {
  if (index > 0) {
    index--;
    loadQues();
  }
});

loadQues();