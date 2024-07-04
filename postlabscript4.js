let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}
const quizData = [
    {
        question: "The system is said to be marginally stable, if gain margin is ______",
        options: ["+∞","0 "],
        correctAnswer: 0,
    },
    {
        question: "In transient response, a large resonance peaks corresponds to a large overshoot.",
        options: ["true","false"],
        correctAnswer: 0,
    },
    {
        question: "When a pole is at origin, the magnitude plot is represented as?",
        options: [
            "-10 log (ω) dB",
            "-20 log (ω) dB"
        ],
        correctAnswer: 1,
    },
    {
        question: "The frequency at which the magnitude of the system is 0 dB is known as ______.",
        options: ["gain crossover frequency ", " Phase crossover frequency"],
        correctAnswer: 0,
    },
    {
        question: "The gain crossover frequency is the frequency at which the ___________.        ",
        options: ["Phase shift is zero  ","Magnitude is zero  ","None of the above  ", "Magnitude is unity"],
        correctAnswer: 3,
    },
    {
        question: "The phase crossover frequency is the frequency at which the ___________.        ",
        options: [
            "Magnitude is unity",
            "Magnitude is zero   ",
            "Phase shift is -180 degrees",
            "None of the above            "
        ],
        correctAnswer: 2,
    },
    {
        question: "The Nichols chart is a plot of ___________.        ",
        options: [
            "Magnitude vs frequency            ",
            "Phase angle vs frequency            ",
            "Magnitude vs phase angle",
            "None of the above            "
        ],
        correctAnswer: 2,
    },
    {
        question: "The steady state error of a system with integral control is ___________.        ",
        options: [
            "Increased            ",
            "Eliminated            ",
            "Not affected            ",
            "None of the above            "
        ],
        correctAnswer: 1,
    },
    {
        question: "The derivative control action is sensitive to ___________."        ,
        options: [
            "Low frequency noise",
            "High frequency noise",
            "Both low and high frequency noise            ",
            "None of the above"
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
 alert("Your Response Has Been Submitted.");
 //cache:
 const scoreinstring = score.toString();
 localStorage.setItem('postlab4',scoreinstring);
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
