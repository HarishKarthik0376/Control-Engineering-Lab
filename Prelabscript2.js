console.log("Ji");
var display = 0;
function answeer()
{
   if(display == 0)
   {
    div.style.display = 'block';
    display =1 ;
   }
   else{
    div.style.display = 'none';
    display = 0;
   }
   
}
let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}

const quizData = [
    {
        question: "The system whose transfer function is 1/(s^2+1+s). It comes under _____ type and _______ order.",
        options: ["2 and 3", "1 and 3","0 and 0","1 and 2"],
        correctAnswer: 1, 
    },
    {
        question: "Is the second order system classified based on the value of damping ratio?",
        options: ["False", "True"],
        correctAnswer: 1,
    },
    {
        question: "The reduction of steady state error depends on increasing the ________.",
        options: [
            "static error constant",
            "system gain",
            "order number of the system",
            "input"
        ],
        correctAnswer: 3,
    },
    {
        question: "The closed loop poles of a critically damped system is _________.",
        options: ["real, equal and negative", "real, unreal and negative","complex conjugate with negative real part","Purely imaginary"],
        correctAnswer: 0,
    },
    {
        question: " Is the first order system classified based on the value of damping ratio?",
        options: ["False", "True"],
        correctAnswer: 0,
    },
    {
        question: "The open loop poles of a critically damped system is _________.",
        options: [
            "real, equal and negative",
            "real, unreal and negative",
            "complex conjugate with negative real part",
            "Purely imaginary"
        ],
        correctAnswer: 0,
    },
    {
        question: "The reduction of transient response depends on increasing the ________.",
        options: [
            "static error constant",
            "system gain",
            "order number of the system",
            "input"
        ],
        correctAnswer: 1,
    },
    {
        question: "Is the third order system classified based on the value of damping ratio?",
        options: [
            "False",
            "True",
        ],
        correctAnswer: 0,
    },
    {
        question: "The system whose transfer function is 1/s2(1+s). It comes under _____ type and _______ order.",
        options: ["2 and 3", "1 and 3","0 and 0","1 and 2"],
        correctAnswer: 0, 
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
}
    document.getElementById('buttestprelab2').addEventListener('click', function()
    {
    alert("Your Score is:"+score+"/5");
   alert("Your Prelab Test Scores Have Been Submitted.");
   //cache:
   const scoreinstring = score.toString();
   localStorage.setItem('prelab2',scoreinstring);
   const exp = "2"
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
        let notib = document.querySelector("#notificationboxsignup2");
        let notification = document.createElement("div");
        notification.innerHTML = '<i class="fa-solid fa-circle-check"></i> Redirecting...';
        notification.querySelector('i').classList.add('one');
        notib.appendChild(notification);
        notification.setAttribute('class',"notification");
       setTimeout(() => {
            notification.remove()
            {
                window.location.href = data.redirect_url;
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