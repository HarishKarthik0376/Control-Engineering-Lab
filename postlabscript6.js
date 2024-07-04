let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}
const quizData = [
    {
        question: " Is the steady state response improved by using PID controller?",
        options: ["Yes","No"],
        correctAnswer: 0,
    },
    {
        question: "Which controller is used to increase the stability of the system?",
        options: ["PID ","P"],
        correctAnswer: 0,
    },
    {
        question: "What is the input of the PID controller?",
        options: [
            "Output signal","Error Signal "
            
        ],
        correctAnswer: 1,
    },
    {
        question: "The proportional controller constant gain value increases, the roots of the characteristic equation shifted to ___________.",
        options: ["Right half of the s-plane","Left half of the s-plane"],
        correctAnswer: 1,
    },
    {
        question: "The maximum overshoot to an increase in the forward path gain of a control system is ________. ",
        options: ["Reduced        ","Eliminated        ","Increased", "Not affected"],
        correctAnswer: 2,
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
 alert("Your Response Has Been Submitted.");
 //cache:
 const scoreinstring = score.toString();
 localStorage.setItem('postlab6',scoreinstring);
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
                window.open("thankyou.html","_parent");
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
    alert("Times Up!! Your Response Has Been Automatically Submitted.");
    }
}
}
function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };
