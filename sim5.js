
let queryparams = new URLSearchParams(window.location.search)
let rno = queryparams.get("rno");
let exp = queryparams.get("exp");
let token = queryparams.get('token');
let score = 0;
let tf = document.getElementById('TF1');
let form1 = document.getElementById('five_form1');
let submit = document.getElementById('Submit_5th');
let showAnsBtn = document.getElementById('ShowAns_5th');
let HintBtn = document.getElementById('Hint_5th');
let inps = Array.from(document.getElementsByClassName('tabinp5'));

let answerMap=new Map();
let mcqform = document.getElementById('mcqform_exp5');
let mcqanswermap = new Map();
let submitmcq = document.getElementById('mcqform_submit_exp5');


let answersformcq = ['<','0.707','Oscillatory'];
let answers = ['3.47','-131','1.26','-162','0.67','-180','0.59','-183','0.31','-198','0.004','-235'];

let ShowAns = false;
let hintUsed = false;
for(var i=1;i<=3;i++){
    let target = `ques${i}`;
    mcqanswermap.set(target,answersformcq[i-1])
}
for(var i=1;i<=12;i++){
    let target = `ques${i}`;
    answerMap.set(target,answers[i-1]);
}
console.log(answerMap);
const addEventLists = ()=>{
    tf.addEventListener('mouseover',()=>{
        if(tf.classList.contains('TFmouseout')){
            tf.classList.remove('TFmouseout');
        }
        tf.classList.add('TFmouseover')
    })
    tf.addEventListener('mouseout',()=>{
        if(tf.classList.contains('TFmouseover')){
            tf.classList.remove('TFmouseover');
        }
        tf.classList.add('TFmouseout')
    })
    tf.addEventListener('click',()=>{
        tf.style.visibility = 'hidden';
        form1.style.visibility = 'visible';
    })

    submit.addEventListener('click',(event)=>{
        event.preventDefault();
        for(const i of inps){
            if(i.value===answerMap.get(i.getAttribute('name'))){
                if(ShowAns){
                    score+=0;
                }
                else if(hintUsed){
                    score+=0.5
                }
                else{
                    score+=1;
                }
            }
        }
        console.log(score);
        form1.style.visibility='hidden';
        mcqform.style.visibility='visible';
    })
    submitmcq.addEventListener('click',(event)=>{
        event.preventDefault();
        for(var i=1;i<=3;i++){
            let ques = `ques${i}`
            let opts = mcqform.elements[ques];
            for(const opt of opts){
                if(opt.checked){
                    if(opt.value===mcqanswermap.get(ques)){
                        score+=1;
                    }
                    else{
                        score+=0;
                    }
                }
                else{
                    score+=0;
                }
            }
        }
       
        console.log(score);
        if(document.getElementById('THEPOPUPISHERE')){
            document.getElementById('THEPOPUPISHERE').style.visibility = 'visible';
            document.getElementById('mcqform_exp5').style.visibility = 'hidden';
        }
        else{
            submitstuff(score);
        }
        
    })
    showAnsBtn.addEventListener('click',(event)=>{
        event.preventDefault()
        ShowAns = true;
        for(const i of inps){
    
            i.value = answerMap.get(i.getAttribute('name'));
            i.style.color = 'red';
        }
    
    })
    
    HintBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        hintUsed = true;
        let div_for_hint = document.createElement('div');
        let h3 = document.createElement('h3');
        h3.innerText = "HERE IS YOUR HINT";
        let hint = document.createElement("img");
        hint.src="sim5statics/Hint.png";
    
        hint.style.width = "100%";
        div_for_hint.append(h3);
        div_for_hint.append(hint);
        div_for_hint.style.display='flex';
        div_for_hint.style.flexDirection='column';
        div_for_hint.style.gap='20px';
    
        form1.append(div_for_hint);
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




document.addEventListener('DOMContentLoaded',()=>{
    addEventLists();
})

localStorage.setItem('simulation'+exp,score);
