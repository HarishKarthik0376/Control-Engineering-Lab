let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}
const quizData = [
    {
        question: "If the condition arises like the number of poles and zeroes are equal, then the branches can tend towards infinity in a root locus is______.",
        options: ["0","Equal to number of zeroes"],
        correctAnswer: 0,
    },
    {
        question: "Identify which is not the property of root loci?",
        options: ["symmetrical about imaginary axis","symmetrical about real axis"],
        correctAnswer: 0,
    },
    {
        question: "For the given transfer function K(s+6)/(s+3)(s+5), find the centroid of the root locus plot.",
        options: [
            "-4",
            "-1"
        ],
        correctAnswer: 1,
    },
    {
        question: "Is the meeting point of asymptotes is the imaginary axis?",
        options: ["Yes", "No"],
        correctAnswer: 0,
    },
    {
        question: "The steady state error of a system with integral control is ___________.        ",
        options: ["Increased", "Eliminated","Not affected","None of the above"],
        correctAnswer: 1,
    },
    {
        question: "The derivative control action is sensitive to ___________.        ",
        options: [
            "Low frequency noise   ",
            "High frequency noise            ",
            "Both low and high frequency noise",
            "None of the above"
        ],
        correctAnswer: 0,
    },
    {
        question: "The Routh-Hurwitz criterion is used to determine the ___________ of a system.        ",
        options: [
            "Transient response",
            "Steady state response",
            "Stability",
            "None of the above            "
        ],
        correctAnswer: 2,
    },
    {
        question: "The root locus plot starts from ___________.",
        options: [
            "Zeros of the system ",
            "Poles of the system",
            "Both poles and zeros of the system",
            "None of the above"
        ],
        correctAnswer: 1,
    },
    {
        question: "The Bode plot of a system with a double pole at the origin will have an initial slope of ________.        ",
        options: [
            "0 dB/decade            ",
            "-20 dB/decade",
            "-40 dB/decade ",
            "None of the above"
        ],
        correctAnswer: 2,
    },
    {
        question: "The phase margin of a system is negative. The system is ___________.        ",
        options: [
            " Stable   ",
            "Unstable",
            "Marginally stable            ",
            "None of the above"
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
 localStorage.setItem('postlab3',scoreinstring);
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
