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
		"L'Étoile du Nord",
		'The crossroads of America'
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
		'Joe Packingham, the first coach',
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
	renderQuestion();
}

// Function to render question
function renderQuestion(){
	$('.js-question').text(questions[questionIndex].question);
	$('span#answerA').text(questions[questionIndex].answers[0]);
	$('span#answerB').text(questions[questionIndex].answers[1]);
	$('span#answerC').text(questions[questionIndex].answers[2]);
	$('span#answerD').text(questions[questionIndex].answers[3]);
}

function checkQuestion(response){
	// does submitted answer match correct answer?
	var correctChoice = questions[questionIndex].correctAnswer;
	if (response === correctChoice) {
		// if yes, currentScore += 1
		currentScore += 1;
		
	}
	
	// button appears for next question
}











// Event Listenters

// function to start quiz
function handleQuizStart(){
	$('.js-start-quiz').click(function(event){
		startQuiz();
	});
}

function handleQuestionSubmit(){
	$('.js-question-submit').click(function(event){
	response = $('input[type=radio][name=question]:checked').parent().find('span').text();
	console.log(response);
	checkQuestion(response);
	console.log('current score is ' + currentScore);
	});
}

function handleNextQuestion(){

}

// function to submit a question




// loads functions on page load
$(function(){
	handleQuizStart();
	handleQuestionSubmit();
});
