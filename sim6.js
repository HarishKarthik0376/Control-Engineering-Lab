
let queryparams = new URLSearchParams(window.location.search)
let rno = queryparams.get("rno");
let exp = queryparams.get("exp");
let token = queryparams.get('token');


let answerMap = new Map();
let answers = ['0.6 sec','1.8 sec','3.6','1.2','0.3']
let hintbtns = Array.from(document.getElementsByClassName('form_hint'));



let submit_buttons = Array.from(document.getElementsByClassName("formbtn"));

let submitbtn = document.getElementById('form_submit');
let showansbtn = document.getElementById('form_showAns');
let inps = document.getElementsByClassName('form6inp');
let showAns = false;
let hintused = false;
let score = 0;

const popupinterval = setInterval(()=>{
    let popupjsonObj = {};
    popupjsonObj['exp']= exp;
    popupjsonObj['rno']=rno;

    fetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/GetPopUp',{
        'method':"POST",
        'headers':{
            'content-type':'application/json',

        },
        'body':JSON.stringify(popupjsonObj)
    }).then((response)=>response.json()).then((data)=>{
        if(data['statusCode']==200){
            console.log(typeof(data['questions']))
            let questions_dict  = data['questions'];
            let popupform = document.createElement('form');
            popupform.id = "THEPOPUPISHERE";
            popupform.style.display = 'flex';
            popupform.style.flexDirection = 'column';
            popupform.style.gap = '10px';
            popupform.style.backgroundColor = 'white';
            popupform.style.borderRadius = '12px';
            let PopUpAnswerMap = new Map()
  
            let heading = document.createElement('h2');
            heading.innerText = 'Pop up Questions!';
            popupform.append(heading);
            popupform.style.position = 'absolute';
            popupform.style.top = "30%";
            popupform.style.left = "40%";
            let k = 1;
            for(const i in questions_dict){
                let the_Question = questions_dict[i];         
                    let question = the_Question['question'];
                    let options = the_Question['options'];
                    let correct_option = the_Question['correctOption']
                    PopUpAnswerMap.set(`ques${k}`,correct_option);
                    console.log(question);
                    console.log(options);
                    console.log(correct_option);
                    let queslabelforform = document.createElement('label');
                    queslabelforform.innerText = question;
                    queslabelforform.style.fontWeight = 'bolder';
                    queslabelforform.style.color = 'red';
                  
                    
                    popupform.append(queslabelforform)
                    let optionsdiv = document.createElement('div');
                    optionsdiv.style.display = 'flex';
                    optionsdiv.style.flexDirection = 'row';
                    optionsdiv.style.gap = '10px';
                    for(var option of options){
                        let optionsradio = document.createElement('input')
                        optionsradio.setAttribute('type','radio')
                        optionsradio.setAttribute('name',`ques${k}`)
                        optionsradio.setAttribute('value',option);
                        let labelforoption = document.createElement('label');
                        labelforoption.innerText = option;
                    
                        optionsdiv.append(optionsradio);
                        optionsdiv.append(labelforoption);

                    }
                    popupform.append(optionsdiv);
                    k+=1;
                   
                    
            }
            let submitbtn = document.createElement('input');
               
           
            submitbtn.setAttribute('type','submit');
            submitbtn.setAttribute('value','submit');
            submitbtn.classList.add('formbtn');//formbtn applies the default button styling for all submit buttons
            submitbtn.addEventListener('click',(event)=>{

                event.preventDefault();
                console.log(questions_dict);
                let popupscore =0;

                for(var i=1;i<=Object.keys(questions_dict).length;i++){

                    let choices = document.getElementsByName(`ques${i}`);
                
                    for(var choice of choices){
                        if(choice.checked){

                            if(choice.value==PopUpAnswerMap.get(`ques${i}`)){
                
                                popupscore +=1;
                            }
                            else{
                                choice.style.backgroundColor = 'red';
                            }
                        }
                    }
            
                }
                score+=popupscore;
                console.log(popupscore);
                submitstuff(score);
            })
            submitbtn.style.width = 'fit-content';
            popupform.append(submitbtn);  
            popupform.style.padding = '40px';
            popupform.style.width = "fit-content";
            popupform.style.visibility = 'hidden';
            document.body.append(popupform);
            clearInt();
           
        
        }else{
            console.log(data);
        }
    }
       
    )
},3000)


const clearInt = ()=>{
    clearInterval(popupinterval);
}



































const submitstuff = async (SCORE) => {
    let jsonObject = {};
    localStorage.setItem('simulation'+exp,SCORE);
    jsonObject['testscore'] = SCORE;
    jsonObject['exp'] = exp;
    jsonObject['rno'] = rno;
    jsonObject['token']=token
    let fetch_res = await fetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/testscoreupdater', {
        'method': "POST",
        "headers": {
            'content-Type': 'application/json',
            'Authorization': [token, rno]
        },
        'body': JSON.stringify(jsonObject)
    });
    let data = await fetch_res.json();
    console.log(data);
    window.location.href = data.redirect_url;
}




for(const hint1 of hintbtns){
    hint1.addEventListener('click',(event)=>{
        hintused = true;
        event.preventDefault();
        if(document.getElementById('hintimg_'+hint1.parentNode.id)){
            null
        }else{
            let hint = document.createElement('img');
            hint.style.width = "100%";      
            hint.id='hintimg_'+hint1.parentNode.id;
            switch(hint1.parentNode.id){
                case "form1":
                    hint.src = 'Hint1.png'
                    break;
                case "form2":
                    hint.src = 'Hint2.png'
                    break;
                default:
                    console.log("fhdsfid");
            }
            console.log(event);
            event.target.parentNode.append(hint);
        }
       
    })
}

for(var i=1;i<=answers.length;i++){
    let q = `ques${i}`;
    answerMap.set(q,answers[i-1]);
}
let pid_controller = document.getElementById('PID_RESPONSE');

pid_controller.addEventListener('click',(event)=>{
    event.preventDefault();
    let pid = document.createElement('img');
    pid.src='Sim6Statics/GraphofPID.png';
    pid.style.width = "60%";
    event.target.parentNode.append(pid);
})

submitbtn.addEventListener('click',(event)=>{
    event.preventDefault()
    for(const inp of inps){
        if(inp.value===answerMap.get(inp.getAttribute('name'))){
            if(showAns){
                score+=0;
            }
            else if(hintused){
                score+=0.5;
            }
            else{
                score+=1
            }
        }
        else{
            inp.value = answerMap.get(inp.getAttribute('name'));
            inp.style.color = 'red';
        }
    }
    if(document.getElementById('THEPOPUPISHERE')){
        document.getElementById('THEPOPUPISHERE').style.visibility = 'visible'
        document.getElementById('simulation_6').style.visibility = 'hidden';
    }
    else{
        submitstuff(score);
    }
    
})


showansbtn.addEventListener('click',()=>{
    showAns = true;
    for(const inp of inps){
        inp.value = answerMap.get(inp.getAttribute('name'));
        inp.style.color = 'red';
    }   
})



for (const i of submit_buttons) {
    i.addEventListener("mouseover", () => {

        if (i.classList.contains("NoBS")) {
            i.classList.remove("NoBS")
        }
        i.classList.add("BS")
    })
    i.addEventListener("mouseout", () => {
        if (i.classList.contains("BS")) {
            i.classList.remove("BS")
        }
        i.classList.add("NoBS")
    })
}

localStorage.setItem('simulation'+exp,score);
