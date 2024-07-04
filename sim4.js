console.log("Hi");
let queryparams = new URLSearchParams(window.location.search)
let rno = queryparams.get("rno");
let exp = queryparams.get("exp");
let token = queryparams.get('token');
let mcqform = document.getElementById('mcqform_exp4');
let mcq_submit = document.getElementById('mcqform_submit_exp4')
let secondForm = document.getElementById("Final_exp4");
let AnsMapForMCQ = new Map();

AnsMapForMCQ.set('ques1', '75');
AnsMapForMCQ.set('ques2', 'Minimum phase network');
AnsMapForMCQ.set('ques3', 'Phase crossover');

let SCORE = 0;
mcq_submit.addEventListener('click',(event)=>{

    event.preventDefault();
    for(var i=1;i<=3;i++){
        let question = `ques${i}`;
        let opts = mcqform.elements[question];
        for(var opt of opts){
            if(opt.checked){
                console.log(opt.value);
                if(opt.value==AnsMapForMCQ.get(question)){
                    SCORE+=1
                }
            }
        
        }
    }

console.log(SCORE);
mcqform.style.visibility = "hidden";
secondForm.style.visibility="visible";
})
let submit_buttons = Array.from(document.getElementsByClassName("formbtn"));


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


let questions = document.getElementsByClassName("forminp");

let submit = document.getElementById("form_submit");
let showans = document.getElementById("form_showans");
let hint = document.getElementsByClassName('form_hint');

let AnswerMap = new Map()
let answers = ['0.25 rad/sec','0.333 rad/sec','-20','-20','-20','-40','-60','42.5','-6.22','38','33','-146','-172','-187','-248','1.16 rad/sec','-242 degree',' -62 degree',' 0.289 rad/sec','-30.7 db','No']
for(var i=0;i<21;i++){
    AnswerMap.set(`ques${i+1}`,answers[i])   
}
localStorage.setItem('simulation'+exp,SCORE);
console.log(AnswerMap);
let ShowAns = false;
let Hint = false;
submit.addEventListener("click",()=>{
    for(const question of questions){
        if(question.value==AnswerMap.get(question.getAttribute('name'))){
            if(ShowAns){
                SCORE+=0;
            }
            else if(Hint){
                SCORE+=0.5;
            }
            else{
                SCORE+=1;
            }
        }
        else{
            question.value = AnswerMap.get(question.getAttribute('name'));
            question.style.color = "red";
        }
    }
    if(document.getElementById('THEPOPUPISHERE')){
        document.getElementById('THEPOPUPISHERE').style.visibility = 'visible';
        let forms = document.getElementsByClassName('formstocomplete_exp4');
        for( var form of forms){
            form.style.visibility = 'hidden';
        }
        let btns = document.getElementsByClassName('mainformbtn');
        for(var btn of btns){
            btn.style.visibility = 'hidden';
        }
    }
    else{
        submitstuff(SCORE);
    }
})



showans.addEventListener("click",()=>{
    ShowAns = true;
    for(const question of questions){
        question.value = AnswerMap.get(question.getAttribute('name'));
        question.style.color = "red";
    }
})


for(const hintbtn of hint){
    hintbtn.addEventListener("click",()=>{
        event.preventDefault();
        Hint = true;
        let imag = document.createElement("img");
        imag.src = "Sim4Statics/Hint";
        imag.style.width = "100%";
        switch(hintbtn.parentNode.id){
            case "exp4secondform":
                imag.src+="1.png"
                break;
            case "exp4thirdform":
                imag.src+="2.png"
                break;
            case "exp4fourthform":
                imag.src+="3.png"
                break;
            case "exp4fifthform":
                imag.src+="4.png"
                break;
            case "exp4sixthform":
                imag.src+="5.png"
                break;
            case "exp4seventhform":
                imag.src+="6.png"
                break;
            case "exp4eigthform":
                imag.src+="7.png"
                break;
            case "exp4ninthform":
                imag.src+="8.png"
                break;
       
        }
        hintbtn.parentNode.append(imag);
    })
  
}

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
                SCORE+=popupscore;
                console.log(popupscore);
                submitstuff(SCORE);
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
    let jsonObject = {}
    jsonObject['testscore'] = SCORE;
    jsonObject['exp'] = exp
    jsonObject['rno'] = rno
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



