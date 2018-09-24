var numGuesses = 0;

var secretNumber = Math.ceil(Math.random() * 100);

var guessForm = document.getElementById('guessForm');

var feedback = document.getElementById('feedback');

guessForm.addEventListener('submit', submitEvent => {
  submitEvent.preventDefault();

  feedback.innerText = '';

  const input = submitEvent.target.guess;
  const guess = Number(input.value);

  input.value = '';

  if (Number.isNaN(guess)) {
    feedback.innerText = 'Oops! Make sure to enter a number using only digits.';
  } else {
    numGuesses = numGuesses + 1;
    if (guess === secretNumber) {
      feedback.innerText =
        'You got it! Enter your name below to be added to our list of winners.';
      createAndShowWinnerForm();
    } else if (guess < secretNumber) {
      feedback.innerText = 'Too low! Keep guessing!';
    } else {
      feedback.innerText = 'Too high! Keep guessing!';
    }
  }
});

function createAndShowWinnerForm() {
  const winnerForm = document.createElement('form');
  winnerForm.method = 'POST';
  winnerForm.action = '/winners';

  const nameLabel = document.createElement('label');
  nameLabel.innerText = 'Your name:';

  const nameInput = document.createElement('input');
  nameInput.name = 'name';
  nameInput.autocomplete = false;

  const guessesLabel = document.createElement('label');
  guessesLabel.innerText = 'Number of guesses:';

  const guessesInput = document.createElement('input');
  guessesInput.name = 'guesses';
  guessesInput.value = numGuesses;
  guessesInput.readOnly = true;

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'Submit Name';

  winnerForm.appendChild(nameLabel);
  winnerForm.appendChild(nameInput);
  winnerForm.appendChild(guessesLabel);
  winnerForm.appendChild(guessesInput);
  winnerForm.appendChild(submitButton);

  document.body.appendChild(winnerForm);
}
