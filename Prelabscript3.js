let score = 0;
function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, numQuestions);
}

const quizData = [
    {
        question: "The breakaway points in the root locus plot should",
        options: [" Lie on the root locus", "Always be on the real axis alone","Lie between 0 and -1","Lie outside the root loci"],
        correctAnswer: 0, 
    },
    {
        question: "Is the root locus branch start from the open loop zeros?",
        options: ["Yes ", "No"],
        correctAnswer: 1,
    },
    {
        question: "In root locus, ___________ denotes the number of segments that does not end in zeroes.",
        options: [
            "The difference between the gain constants",
            "The difference between the number of poles and zeroes"

        ],
        correctAnswer: 1,
    },
    {
        question: "In a given transfer function, whenever the gain is decreased to a zero, the roots occurring will _________.",
        options: ["Coincide with poles", "Coincide with zero "],
        correctAnswer: 0,
    },
    {
        question: "  The root locus plot of a system with a double pole at the origin will have an initial slope of ________.",
        options: ["0 dB/decade", "-20 dB/decade","-40 dB/decade","None of the above"  ],
        correctAnswer: 2,
    },
    {
        question: "The phase margin of a system is negative. The system is ___________.  ",
        options: [
            "Stable",
            "Unstable",
            "Marginally stable",
            "None of the above"
        ],
        correctAnswer: 1,
    },
    {
        question: "The gain crossover frequency is the frequency at which the ___________        .",
        options: [
            "Phase shift is zero            ",
            "Magnitude is unity",
            "Magnitude is zero",
            "None of the above"
        ],
        correctAnswer: 1,
    },
    {
        question: "The phase crossover frequency is the frequency at which the ___________.        ",
        options: [
            "Magnitude is unity",
            "Phase shift is -180 degrees",
            "Magnitude is zero ",
            "None of the above "
        ],
        correctAnswer: 1,
    },
    {
        question: "The Nyquist plot is a plot of ___________        .",
        options: ["Magnitude vs frequency ", "Phase angle vs frequency","Magnitude vs phase angle","None of the above"],
        correctAnswer: 2, 
    },
    {
        question: "The Nichols chart is a plot of ___________.        ",
        options: ["Magnitude vs frequency", "Phase angle vs frequency","Magnitude vs phase angle","None of the above"],
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
    document.getElementById('buttestprelab3').addEventListener('click', function()
    {
    alert("Your Score is:"+score+"/5");
   alert("Your Prelab Test Scores Have Been Submitted.");
   //cache:
   const scoreinstring = score.toString();
   localStorage.setItem('prelab3',scoreinstring);
   const exp = "3"
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
                window.open("postlabtest3.html","_parent");
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

