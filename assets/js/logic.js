let question_count = 0;
let points = 0;
var count = 60;
var interval;

let start = document.getElementById("start");
start.onclick = function () {
    document.getElementById("start-screen").classList.add('hide');
    document.getElementById("questions").classList.remove('hide');

    show(question_count);
    //start timer

    interval = setInterval(myclock, 1000);
}

function myclock() {
    document.getElementById('time').innerHTML = count;
    count--;
    if (count === 0) {
        clearInterval(interval);
        showEndScreen();
    }
}
let submit = document.getElementById("submit");
submit.onclick = function () {
    var initials = document.getElementById("initials").value;
    if (initials.length <= 0) {
        alert('please enter your inital')
    } else {
        var score = document.getElementById("final-score");
        sessionStorage.setItem(initials, score.innerHTML);
        location.href = "highscores.html";
    }
}

function show(count) {
    let question = document.getElementById("question-title");
    let choices = document.getElementById("choices");
    let [first, second, third, fourth] = questions[count].options;

    question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>`;

    choices.innerHTML = `<ul class="choices">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
    toggleActive();
}

function toggleActive() {
    let option = document.querySelectorAll("li.option");
    for (let i = 0; i < option.length; i++) {
        option[i].onclick = function () {
            option[i].classList.add("active");
            next();
        }
    }
}

function next() {

    if (question_count == questions.length - 1) {
        showEndScreen();

    }
    console.log(question_count);

    let user_answer = document.querySelector("li.option.active").innerHTML;
    let ans = document.getElementById("answer");
    if (user_answer == questions[question_count].answer) {
        points += 10;
        ans.innerHTML = 'correct!'
        playCorrectSound();
    } else {

        count = count - 5;
        clearInterval(interval);
        document.getElementById('time').innerHTML = count;
        ans.innerHTML = 'wrong!';
        playWrongSound();
        interval = setInterval(myclock, 1000);
    }
    console.log(points);

    question_count++;
    show(question_count);
}

function showEndScreen() {

    document.getElementById("questions").classList.add('hide');
    document.getElementById("end-screen").classList.remove('hide');
    let score = document.getElementById("final-score");
    score.innerHTML = points;
}

// adding sound effects

function playCorrectSound () {
	let dingdong = new Audio('assets/sfx/correct.wav');
	dingdong.play();
}

function playWrongSound () {
	let dingdong = new Audio('assets/sfx/incorrect.wav');
	dingdong.play();
}