

let values = new Map([
    [1,"Initial"],
    [2,"Step 2"],
    [3,"Step 3"],
    [4,"Step 4"],
    [5,"Step 5"],
    [6, "Step 6"],
    [7,"Step 7"],
    [8,"Step 8"],
    [9,"Step 9"],
    [10,"Step 10"],
    [11,"Step 11"],
    [12,"Step 12"],
    [13,"Final Step"],
])

let hints = new Map([
    [1,"Hint - Two blocks are in series"],
    [2,""],
    [3,"Hint - Shift the branch point towards right"],
    [4,"Hint - Two blocks are in series"],
    [5,"Hint - Two blocks are in series"],
    [6,"Hint - Hint - Shift the Summing point towards left"],
    [7,"Hint - Two blocks are in series"],
    [8,"Hint - Two blocks are in series"],
    [9,"Hint - Summing point 1 & 2"],
    [10,"Hint - Summing point 1 & 2"],
    [11,"Hint - There is a negative feedback loop"],
    [12,"Hint - Two blocks are in series"],
]);

let correctAnswers= new Map([
    ["Initial","G1*G2"],
    ["Step 2","G5+G6"],
    ["Step 3","1/(G5+G6)"],
    ["Step 4","H3/(G5+G6)"],
    ["Step 5","G4*(G5+G6)"],
    ["Step 6","1/G1G2"],
    ["Step 7","H3/G1G2(G5+G6)"],
    ["Step 8","G1G2G3"],
    ["Step 9","1&2"],
    ["Step 10","G1G2G3/(1+G1G2G3H1)"],
    ["Step 11","G4(G5+G6)/(1+G4H2(G5+G6))"],
    ["Step 12","G1G2G3G4(G5+G6)/((1+G1G2G3H1)(1+G4H2(G5+G6)))"],
    ["Final Step","G1G2G3G4(G5+G6)/((1+G1G2G3H1)(1+G4H2(G5+G6))+G3G4H3)"]
]);

let description = new Map([
    ["Step 2","Reduce the blocks connected in parallel. Enter the value in the respective field. Click on the ‘SUBMIT PARALLEL GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 3","Shift the take-off point ahead or behind the block. Enter the derived value in the respective field. Click on the ‘SUBMIT THE TAKE-OFF SHIFT’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 4","Reduce the blocks connected in series. Enter the value in the respective field. Click on the ‘SUBMIT SERIES GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 5","Reduce the blocks connected in series. Enter the value in the respective field. Click on the ‘SUBMIT SERIES GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 6","Shift the summing point ahead or behind the block. Enter the derived value in the respective field. Click on the ‘SUBMIT THE SUMMING POINT SHIFT’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 7","Reduce the blocks connected in series. Enter the value in the respective field. Click on the ‘SUBMIT SERIES GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 8","Reduce the blocks connected in series. Enter the value in the respective field. Click on the ‘SUBMIT SERIES GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 9","Interchange/split/combine the summing point in the block. Enter the derived value in the respective field. Click on the ‘SUBMIT THE SUMMING POINT INTERCHANGE/SHIFT/COMBINE’ Button to check whether the user has derived it Right or Wrong. "],
    ["Step 10"," Eliminate the minor internal feedback loops with suitable rule. Enter the value in the respective field. Click on the ‘SUBMIT FEEDBACK LOOP GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 11","Eliminate the minor internal feedback loops with suitable rule. Enter the value in the respective field. Click on the ‘SUBMIT FEEDBACK LOOP GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Step 12"," Reduce the blocks connected in series. Enter the value in the respective field. Click on the ‘SUBMIT SERIES GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
    ["Final Step","Eliminate the minor internal feedback loops with suitable rule. Enter the value in the respective field. Click on the ‘SUBMIT FEEDBACK LOOP GAIN BLOCK’ Button to check whether the user has derived it Right or Wrong."],
])


let submit = document.getElementById("Submit");
let nextbtn = document.getElementById("NextBtn");
let ansres = document.getElementById("AnswerResponse_div");
let step = document.getElementById("step");
let value = document.getElementById("Answer");
let showAns = document.getElementById("ShowAnswerBtn");
let fin = document.getElementById("FinalBtn");
let hint = document.getElementById("HintBtn")
let proc = document.getElementById("Procedure");
let i=1;
let j = 1;
let tries = 0;

var hintused = 0;
var showansused = 0;
var marks = 0

submit.addEventListener("click",()=>{ 
    if(i>=13){
        fin.style.display="block";
        nextbtn.disabled=true;
        nextbtn.style.display="none";
    }
    ans = correctAnswers.get(values.get(i));
    if(value.value==ans){
        if(showansused){
            marks+=0
        }
        else if(hintused){
            marks+=1
        }
        else{
            marks+=3
           
        }
        if(j>=13){
            proc.innerText="Congrats. You have completed lab. Now click Finish to view final image"
        }
        submit.disabled=true;
        ansres.style.display = "block";
        ansres.innerHTML = "<p style=color:Green;margin-left:120px;margin-top:60px;font-size:1.5rem;>Excellent....Correct Answer!</p>";
        value.disabled = true;
        if(i<13){
            nextbtn.style.display = "block";
            if(nextbtn.disabled===true){
                nextbtn.disabled = false;
            }
        }
       
        if(showAns.style.display!="none"){
            showAns.style.display = "none";
        }
        
        i=i+1;
        j=j+1;
        nextbtn.addEventListener("click",()=>{  
            tries = 0;
            if(showAns.style.display=="block"){
                showAns.style.display = "none";
            }

            if(hint.style.display=="block"){
                hint.style.display = "none";
            }
            proc.innerText = description.get(values.get(j));
           
            value.value = "";
            submit.disabled = false;  
            if(showAns.disabled==true){
                showAns.disabled=false;
            }        
            nextbtn.style.display="none";
            value.disabled = false;
            let img = document.getElementById("The_Image");
            step.innerText = values.get(i);
            img.src = `Image${i}.png`;
            img.style.width = "50%";
            document.getElementById("hint_container").style.display = "none";
            ansres.style.display = "none";
        })
        fin.addEventListener("click", async () => {
            submit.disabled = true;
          
            if (showAns) {
              showAns.disabled = true;
            }
          
            console.log(marks);
          
            const jsonObject = {};
            const currentURL = new URL(window.location.href);
            const rno = currentURL.searchParams.get("rno");
            const exp = currentURL.searchParams.get("exp");
            jsonObject['exp'] = exp;
            jsonObject['rno'] = rno;
            jsonObject['testscore'] = marks;
            localStorage.setItem("simulation1",marks.toString());
          
            // Retry function
            const retryFetch = async (url, options) => {
              let retries = 0;
              const maxRetries = 15;
          
              while (retries < maxRetries) {
                try {
                  const response = await fetch(url, options);
          
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                  }
                } catch (error) {
                  console.error('Error during fetch operation:', error);
                  retries++;
                  console.log(`Retrying (${retries}/${maxRetries})...`);
                }
              }
          
              throw new Error('Max retries reached');
            };
          
            try {
              const data = await retryFetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/testscoreupdater', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonObject)
              });
          
              console.log("data", data);
          
            } catch (error) {
              console.error('Error during fetch operation:', error);
            }
            setTimeout(() => {
                {
                    window.location.href = "postlabtest.html"
                    // window.location.href = `https://harishkarthik0376.github.io/Control-Engineering-Lab/postlabtest.html?rno=${rno}&exp=${exp}`;
                }
            }, 5000)
          
          });
          




    }
    else{
        if(tries>=2){
            showAns.style.display="block";
        }
        else if(tries>=1){
            if(i!=13){ 
                hint.style.display = "block";
            }
            
        }
        let ansres = document.getElementById("AnswerResponse_div");
        ansres.style.display = "block";
        ansres.innerHTML =  "<p style=color:Red;margin-left:120px;margin-top:60px;font-size:1.5rem;>Wrong Answer! Please Try Again</p>";
        let hiddenbtns = Array.from(document.getElementsByClassName("SimButtons_Hidden"));
        
        showAns.addEventListener("click",()=>{
            showansused = 1;
            value.value=ans;
            showAns.disabled = true;
        })
        tries+=1;
    }
})


function getValuebykey(value,map){
    for (let [i,j] of map){ 
        if(j==value){
            return i
        }
    }   
}
var vis = 0;
hint.addEventListener("click",function(){
    hintused = 1;
    let image_placeholder = document.getElementById("Hint");
    let hint_para = document.getElementById("hint_para");
    let key = getValuebykey(step.innerHTML,values);
    hint_para.innerText = hints.get(key);
    image_placeholder.setAttribute("src",`hint${key}.png`);
    if(vis==0){
    document.getElementById("hint_container").style.display = "block";
    vis=1;
    }
    else
    {
        document.getElementById("hint_container").style.display = "none";
        vis=0;
    }

})
        const start3 = 45;
        let time3 = start3*60;
        let simre = setInterval(simruncountdown,1000);
        const countdown2 = document.getElementById('countdown2');
        function simruncountdown()
            {
            const minutes = Math.floor(time3/60);
            let seconds = time3%60;
            seconds = seconds<10 ? '0'+seconds : seconds;
            document.getElementsByClassName("simtimer")[0].innerHTML = `${minutes}: ${seconds}`;
            time3--;
            if(time3<0)
        {
            clearInterval(simre)
            }
    }