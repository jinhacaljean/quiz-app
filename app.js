// Questions store

var questions = [
{
	questionNumber: 1,
	question: 'Wisconsin gained statehood in what year?',
	answers: [
		'1776',
		'1848',
		'1803',
		'1837'
	],
	correctAnswer: '1848',
},
{
	questionNumber: 2,
	question: 'The Driftless Area is a region in Wisconsin that was never impacted by:',
	answers: [
		'Dairy farms',
		'Tornadoes',
		'Glaciers',
		'River currents'
	],
	correctAnswer: 'Glaciers',
},
{
	questionNumber: 3,
	question: "What is Wisconsin's state motto?",
	answers: [
		'Virtute et armis',
		'Forward',
		"Land of Enchantment",
		'The Crossroads of America'
	],
	correctAnswer: 'Forward',
},
{
	questionNumber: 4,
	question: `The Milwaukee Art Museum is known for it's "wings", and was designed by this famous architect:`,
	answers: [
		'Frank Gehry',
		'Frank Lloyd Wright',
		'Philip Johnson',
		'Santiago Calatrava'
	],
	correctAnswer: 'Santiago Calatrava',
},
{
	questionNumber: 5,
	question: `Wisconsin is known for making cheese, but it also grows over 97% of the nation's:`,
	answers: [
		'Ginseng',
		'Corn',
		'Cherries',
		'Cranberries'
	],
	correctAnswer: 'Ginseng',
},
{
	questionNumber: 6,
	question: `Wisconsin's NFL team, the Green Bay Packers, was named after:`,
	answers: [
		'A canned meat company',
		'Wool traders that historically traversed the area',
		'Joe Packingham, their first coach',
		'Nicholas Pacquet, a fur trader who founded Green Bay'
	],
	correctAnswer: 'A canned meat company',
},
]

// Global variables
var questionIndex = 0
var currentScore = 0

// Functions that render HTML into the DOM
function startQuiz(){
	$('.js-start-quiz').hide();
	$('.js-question-format').removeClass('hidden');
	$('h1').addClass('hidden');
	renderQuestion();
}

// Function to render question
function renderQuestion(){
	$('.js-question-number').text(`Question ${questionIndex + 1} out of ${questions.length}`);
	$('.js-current-score').text(`Your current score is ${currentScore} out of ${questions.length}`);
	$('.js-question').text(questions[questionIndex].question);
	$('span#answerA').text(questions[questionIndex].answers[0]);
	$('span#answerB').text(questions[questionIndex].answers[1]);
	$('span#answerC').text(questions[questionIndex].answers[2]);
	$('span#answerD').text(questions[questionIndex].answers[3]);
}

function checkQuestion(response){
	// does submitted answer match correct answer?
	var correctChoice = questions[questionIndex].correctAnswer;

	if (response === correctChoice && questions[questionIndex].questionNumber < questions.length) {
		// if yes, currentScore += 1
		currentScore += 1;
		$('.js-current-score').text(`Your current score is ${currentScore} out of ${questions.length}`);
		$('.js-question-submit').hide();
		$('.js-next-question').before( "<p class = 'answer-text'>Oh you betcha, you got it right!</p>");
		$('.js-next-question').removeClass('hidden');
	}
	else if (response === correctChoice && questions[questionIndex].questionNumber === questions.length) {
		currentScore += 1;
		$('.js-current-score').text(`Your current score is ${currentScore} out of ${questions.length}`);
		$('.js-question-submit').hide();
		$('.js-results').before( "<p class = 'answer-text'>Oh you betcha, you got it right!</p>");
		$('.js-results').removeClass('hidden');
	}
	else if (response !== correctChoice && questions[questionIndex].questionNumber < questions.length) {
		$('.js-question-submit').hide();
		$('.js-next-question').before( `<p class = "answer-text">Don'cha know, the correct answer is ${correctChoice}.</p>`);
		// button appears for next question
		$('.js-next-question').removeClass('hidden');
	}
	else if (response !== correctChoice && questions[questionIndex].questionNumber === questions.length) {
		$('.js-question-submit').hide();
		$('.js-results').before( `<p class = "answer-text">Don'cha know, the correct answer is ${correctChoice}.</p>`);
		// button appears for next question
		$('.js-results').removeClass('hidden');
	}
	
}

function nextQuestion(){
	questionIndex += 1;
	$('.answer-text').hide();
	$('.js-next-question').addClass('hidden');
	$('.js-question-submit').show();
	// clear radio form
	$('input').prop('checked', false);
	renderQuestion();
	
}

function showResults(){
	if (currentScore === questions.length) {
		$('.js-play-again').before(`<p class = "answer-text-final">You must be a Wisconsin native, you got ${currentScore} questions out of ${questions.length} total questions correct.`)
	}
	else if (currentScore >= questions.length/2) {
		$('.js-play-again').before(`<p class = "answer-text-final">Nice work, you got ${currentScore} questions out of ${questions.length} total questions correct.`)
	}
	else {
		$('.js-play-again').before(`<p class = "answer-text-final">Do you consider Wisconsin a "fly-over state"? You only got ${currentScore} questions out of ${questions.length} total questions correct.`)
	}
	$('.js-question-format-container').hide();
	$('.js-play-again').removeClass('hidden');
	$('.js-results').addClass('hidden');
	$('.js-question-number').hide();
	$('.answer-text').hide();
	$('.js-current-score').hide();
}

function playAgain(){
	questionIndex = 0;
	currentScore = 0;
	$('.js-question-format').show();
	$('.js-question-format-container').show();
	$('.js-current-score').show();
	$('.js-question-number').show();
	$('.answer-text-final').hide();
	$('input').prop('checked', false);
	$('.js-play-again').addClass('hidden');
	$('.js-question-submit').show();
	renderQuestion();
}


// Event Listenters
function handleQuizStart(){
	$('.js-start-quiz').click(function(event){
		event.preventDefault();
		startQuiz();
	});
}

function handleQuestionSubmit(){
	$('.js-question-submit').click(function(event){
		event.preventDefault();
		if ($('input[name=question]:checked').length === 0) {
	  		$('.js-alert-text').text('Please select an answer.');
		}
		else {
			response = $('input[type=radio][name=question]:checked').parent().find('span').text();
			console.log(response);
			checkQuestion(response);
			console.log('current score is ' + currentScore);
			$('.js-alert-text').text('');
			}
		});
}

function handleNextQuestion(){
	$('.js-next-question').click(function(e){
		event.preventDefault();
		nextQuestion();

	});
}

function handlePlayAgain (){
	$('.js-play-again').click(function(e){
		event.preventDefault();
		playAgain();
		
	});
}

function handleResultsClick() {
	$('.js-results').click(function(e){
		event.preventDefault();
		showResults();
	});
}

// loads functions on page load
$(function(){
	handleQuizStart();
	handleQuestionSubmit();
	handleNextQuestion();
	handlePlayAgain();
	handleResultsClick();
});

