let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}

const quizData = [
    {
        question: "The word ‘reset control’ refers to ___________.",
        options: ["proportional control","Integral control","Derivative control", "None of the above"],
        correctAnswer: 0, 
    },
    {
        question: "The appropriate controller will be___________ if the requirements for design are stability error for step input and speed of response.",
        options: ["PID controller","PI controller", "PD controller","P controller"],
        correctAnswer: 1,
    },
    {
        question: "The steady state error of a system due to derivative control is",
        options: [
            "Zero",
            "no change",
            "decreased",
            "increased"

        ],
        correctAnswer: 3,
    },
    {
        question: "The maximum overshoot to an increase in the forward path gain of a control system is ________.",
        options: [" increased","  reduced"," eliminated", "not affected"],
        correctAnswer: 0,
    },
    {
        question: "  What is the purpose of a PID controller in a control system?",
        options: ["To stabilize the system", "To increase the error        ","To decrease the system response  ","None of the above"  ],
        correctAnswer: 0,
    },
    {
        question: "What does the 'I' in PID controller stand for?  ",
        options: [
            "Integral ",
            "Inverse",
            "Instant            ",
            "None of the above"
        ],
        correctAnswer: 0,
    },
    {
        question: "What happens to the system response when the gain of a proportional controller is increased?",
        options: [
            "The response becomes faster",
            "The response becomes slower            ",
            "The response remains the same            ",
            "None of the above"
        ],
        correctAnswer: 0,
    },
    {
        question: "What is the effect of derivative control on the overshoot of a system?",
        options: [
            "Increases overshoot            ",
            "Decreases overshoot",
            "No effect on overshoot            ",
            "None of the above "
        ],
        correctAnswer: 1,
    },
    {
        question: "What is the effect of integral control on the steady state error of a system?  ",
        options: ["Increases steady state error        ", "Decreases steady state error","No effect on steady state error        ","None of the above"],
        correctAnswer: 1, 
    },
   

 

];
const selectedQuestions = getRandomQuestions(quizData,5);
function displayQuiz() {
    const postLabTest = document.getElementById("prelabtest");
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
        console.log("check");
    });
}
displayQuiz(quizData);


function result() 
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


   
 
    
    let prelab = document.getElementById('prelabtest');
    let postlab = document.getElementById('postlabtest');
    var sub = document.getElementById('buttest');
}
    document.getElementById('buttestprelab6').addEventListener('click', function()
    {
    alert("Your Score is:"+score+"/5");
   alert("Your Prelab Test Scores Have Been Submitted.");
   //cache:
   const scoreinstring = score.toString();
   localStorage.setItem('prelab6',scoreinstring);
   const exp = "6"
   localStorage.setItem("exp",exp);
   //Database:
        jsonObject ={}
        jsonObject['exp']=document.getElementById("whatexp").innerText;
        const currentURL = new URL(window.location.href);
        
        jsonObject['rno']=currentURL.searchParams.get("rno");
        jsonObject[`prelabscore`]=score
        fetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/prelabupdate',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);  
        let notib = document.querySelector("#notificationboxsignup");
        let notification = document.createElement("div");
        notification.innerHTML = '<i class="fa-solid fa-circle-check"></i> Redirecting...';
        notification.querySelector('i').classList.add('one');
        notib.appendChild(notification);
        notification.setAttribute('class',"notification");
       setTimeout(() => {
            notification.remove()
            {
                window.location.href = "postlabtest6.html";
            }
       }, 5000)
        })
        
    })

   
    //prelab
    const start = 10;
    let time = start*60;
    let re=setInterval(runcountdown,1000);
    const countdown = document.getElementById('countdown');
    function runcountdown()
    {
        const minutes = Math.floor(time/60);
        let seconds = time%60;
        seconds = seconds<10 ? '0'+seconds : seconds;
        countdown.innerHTML = `${minutes}: ${seconds}`;
        time--;
        if(time<0)
        {
            clearInterval(re)
            prelab.style.display='none';
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
            }
        }

    }

    
    }
function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };
   

