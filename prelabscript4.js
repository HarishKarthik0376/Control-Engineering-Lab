let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}

const quizData = [
    {
        question: "Is the Bode plot can be applied to analyze the closed loop system?",
        options: [" False", "True"],
        correctAnswer: 0, 
    },
    {
        question: "In bode plot, the gain margin and phase margin are positive and negative respectively, then the system is _________.",
        options: ["Highly stable","Unstable", "Oscillatory","Stable"],
        correctAnswer: 1,
    },
    {
        question: "For the second order system, the slope of asymptote in Bode plot is _______.",
        options: [
            "18 dB per octave",
            "3 dB per octave",
            "12 dB per octave ",
            "6 dB per octave"

        ],
        correctAnswer: 2,
    },
    {
        question: "What would be the contribution on phase plot of the bode plot for the constant 'k' is positive?",
        options: [" 0"," 45"," 90", "180 "],
        correctAnswer: 0,
    },
    {
        question: "  The Nyquist criterion is applicable to systems that are ___________.  ",
        options: ["Stable ", "Unstable","Both stable and unstable","None of the above"  ],
        correctAnswer: 2,
    },
    {
        question: "The Bode plot is a graph of ___________ versus frequency. ",
        options: [
            "Magnitude and phase angle ",
            "Magnitude and phase shift",
            "Magnitude and time ",
            "None of the above"
        ],
        correctAnswer: 1,
    },
    {
        question: "The phase margin of a system is negative. The system is ___________.        ",
        options: [
            " Stable   ",
            "Unstable",
            "Marginally stable",
            "None of the above"
        ],
        correctAnswer: 1,
    },
    {
        question: "The root locus plot starts from ___________.        ",
        options: [
            "Zeros of the system            ",
            "Poles of the system",
            "Both poles and zeros of the system            ",
            "None of the above "
        ],
        correctAnswer: 1,
    },
    {
        question: "The Routh-Hurwitz criterion is used to determine the ___________ of a system.        ",
        options: ["Transient response ", "Steady state response  ","Stability","None of the above"],
        correctAnswer: 2, 
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
    document.getElementById('buttestprelab4').addEventListener('click', function()
    {
    alert("Your Score is:"+score+"/5");
   alert("Your Prelab Test Scores Have Been Submitted.");
   //cache:
   const scoreinstring = score.toString();
   localStorage.setItem('prelab4',scoreinstring);
   const exp = "4"
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
                // window.location.href = data.redirect_url;
                window.open("postlabtest4.html","_parent");
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

