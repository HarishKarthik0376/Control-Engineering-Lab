let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}
const quizData = [
    {
        question: "The coordinates of sinusoidal transfer function of a polar plot is ____.",
        options: ["Magnitude and phase angle","Magnitude and frequency "],
        correctAnswer: 0,
    },
    {
        question: "The polar plot of a transfer function that passes through the critical point (-1,0) has a gain margin of _________.",
        options: ["0","infinity"],
        correctAnswer: 1,
    },
    {
        question: "The stability of the system cannot be predicted based on the position of poles.",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 1,
    },
    {
        question: "The gain margin of the system is becoming half when the gain of the open-loop system is doubled.",
        options: ["True", " False"],
        correctAnswer: 1,
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
    {
        question: "The Nyquist plot is a plot of ___________.        "        ,
        options: [
            "Magnitude vs frequency            ",
            "Phase angle vs frequency            ",
            "Magnitude vs phase angle           ",
            "None of the above"
        ],
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
 localStorage.setItem('postlab5',scoreinstring);
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
    alert("Times Up!! Your Response Has Been Automatically Submitted.");
    }
}
}
function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };
