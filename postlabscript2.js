let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}
const quizData = [
    {
        question: "The range of damping ratio for a under damped second order system is",
        options: ["0 less than δ less than 2","0 less than δ less than 1"],
        correctAnswer: 1,
    },
    {
        question: "Whenever the damping coefficient is negative then the system’s response may be oscillatory with _________.",
        options: ["increasing magnitude","decreasing magnitude"],
        correctAnswer: 1,
    },
    {
        question: "When the parabolic function is subjected to derivation, it results in _________ function?",
        options: [
            "Unit Impulse",
            "Ramp"
        ],
        correctAnswer: 1,
    },
    {
        question: "The time required to reach fifty percentage of the final value at very first time is known as 'Delay time'.",
        options: ["True", "False"],
        correctAnswer: 0,
    },
    {
        question: "The range of damping ratio for an over damped second order system is ___________.",
        options: ["0 less than δ less than 1", "0 less than δ less than 2"],
        correctAnswer: 0,
    },
    {
        question: "Whenever the damping coefficient is positive then the system’s response may be oscillatory with _________.",
        options: [
            "decreasing magnitude",
            "increasing magnitude",
        ],
        correctAnswer: 0,
    },
    {
        question: "When the cubic function is subjected to derivation, it results in _________ function?",
        options: [
            "Ramp",
            "Unit Impulse",
        ],
        correctAnswer: 0,
    },
    {
        question: "The time required to reach seventy-five percentage of the final value at very first time is known as 'Rise time'.",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 0,
    },
    {
        question: "The range of damping ratio for a critically damped second order system is ___________.",
        options: [
            "0 less than δ less than 2",
            "0 less than δ less than 1"
        ],
        correctAnswer: 1,
    },
    {
        question: "Whenever the damping coefficient is zero then the system’s response may be oscillatory with _________.",
        options: [
            " increasing magnitude",
            "decreasing magnitude",
        ],
        correctAnswer: 1,
    },
 

];
const selectedQuestions = getRandomQuestions(quizData,5);
function displayQuiz() {
    const postLabTest = document.getElementById("postlabtest");
    selectedQuestions.forEach((questionData, index) => {
        const questionElement = document.createElement("p");
        questionElement.innerHTML = `
            <h3 class="qns">${index + 1}. ${questionData.question}</h3>
            <p class="qns1">(Choose 1 option!)</p>
        `;

        const optionsList = document.createElement("p");
        optionsList.style.listStyleType = "none";
        questionData.options.forEach((option, optionIndex) => {
            const optionItem = document.createElement("li");
            optionItem.innerHTML = `
                <p class="opts">
                    <input type="radio" value="${optionIndex}" name="correct${index}" id = "ans${index}" class="opts">
                    <span id="answer${index + 1}" class="answer">${option}</span>
                </p>
            `;
            optionsList.appendChild(optionItem);
        });

        questionElement.appendChild(optionsList);
        postLabTest.appendChild(questionElement);
    });
}
displayQuiz(quizData);


function result1() 
{  
    selectedQuestions.forEach((questionData, index) => {
    const selectedAnswer = document.querySelector(`input[id="ans${index}"]:checked`);
    if (selectedAnswer) {
        const userAnswerIndex = parseInt(selectedAnswer.value);
        if (userAnswerIndex === questionData.correctAnswer) {
            score++;
        }
    }
});
   
    alert("Your Score is:"+score+"/5")
 alert("Your Response Has Been Submited.");
 //cache:
 const scoreinstring = score.toString();
 localStorage.setItem('postlab2',scoreinstring);
 //Database:
 jsonObject={};
 const currentURL = new URL(window.location.href);
 let rno = currentURL.searchParams.get("rno");
 let exp = currentURL.searchParams.get("exp");
 jsonObject['exp']=exp;
 jsonObject['rno']=rno
 jsonObject[`postlabscore`]=score
 fetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/postlabscoreupdate', {
method: "POST",
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(jsonObject)
})
.then(response => response.json())
.then(data => {
console.log("data",data);

})
.catch(error => {
console.error('Error during fetch operation:', error);
});
        let notib = document.querySelector("#notificationboxsignup");
        let notification = document.createElement("div");
        notification.innerHTML = '<i class="fa-solid fa-circle-check"></i> Redirecting...';
        notification.querySelector('i').classList.add('one');
        notib.appendChild(notification);
        notification.setAttribute('class',"notification");
       setTimeout(() => {
            notification.remove()
            {
                window.open("home.html","_parent");
            }
       }, 5000)
}
 {
    var posttimer = document.getElementById('countdown1');
    const start = 10;
    let time = start*60;
    let pre = setInterval(postruncountdown,1000);
    function postruncountdown()
    {
        const minutes = Math.floor(time/60);
    let seconds = time%60;
    seconds = seconds<10 ? '0'+seconds : seconds;
    posttimer.innerHTML = `${minutes}: ${seconds}`;
    time--;
    if(time<0)
{
    clearInterval(pre)
    alert("Times Up!! Your Response Has Been Automatically Submited.");
    }
}
}
function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };
