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
        question: "For parallel combination of blocks, the direction of signals through the blocks in parallel can be",
        options: ["Same", "different","opposite","none of the above"],
        correctAnswer: 0, 
    },
    {
        question: "The property of block diagram reduction method is __________",
        options: ["Bilateral", "Unilateral","Composite","Two-sided"],
        correctAnswer: 1,
    },
    {
        question: "Block diagram reduction can be used to represent __________",
        options: [
            "linear systems only",
            "non-linear systems only",
            "both linear and non-linear systems",
            "time-invariant and time-varying systems"
        ],
        correctAnswer: 3,
    },
    {
        question: "Three blocks with gains 2, 6 and 7 are connected in series. The resultant gain of the system is __________",
        options: ["84", "19","15","44"],
        correctAnswer: 0,
    },
    {
        question: "Two blocks with gains 2 and 4 are connected in parallel. The total gain of the system is __________",
        options: ["6", "8","2","4"],
        correctAnswer: 0,
    },
    {
        question: "In a block diagram, what does a summing point represent?",
        options: [
            "Input",
            "Output",
            "Junction",
            "Amplifier"
        ],
        correctAnswer: 2,
    },
    {
        question: "How does the type of connection between blocks affect the overall system?",
        options: [
            "Voltage",
            "Current",
            "Direction",
            "Resistance"
        ],
        correctAnswer: 2,
    },
    {
        question: "When applying block diagram reduction, what does the term 'composite' refer to?",
        options: [
            "Simplified",
            "Combined",
            "Complex",
            "Individual"
        ],
        correctAnswer: 1,
    },
    {
        question: "What does a series connection of blocks imply for their overall impact on the system?",
        options: [
            "Multiplication",
            "Division",
            "Addition",
            "Subtraction"
        ],
        correctAnswer: 0,
    },
    {
        question: "Can block diagram reduction be applied to dynamic systems?",
        options: [
            "Yes",
            "No",
            "Sometimes",
            "Rarely"
        ],
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
    document.getElementById('buttest').addEventListener('click', function()
    {
    alert("Your Score is:"+score+"/5");
   alert("Your Prelab Test Scores Have Been Submitted.");

   //cache:
    const scoreinstring = score.toString();
    const exp = "1"
    localStorage.setItem('prelab1',scoreinstring);
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