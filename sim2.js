
// let TobeAnimClass = (document.getElementById("TF1"))

// TobeAnimClass.addEventListener("mouseover",()=>{
//     if(TobeAnimClass.classList.contains('TFmouseout')){
//         TobeAnimClass.classList.remove('TFmouseout');
//     }
//     TobeAnimClass.classList.add("TFmouseover")
// })

// TobeAnimClass.addEventListener('mouseout',()=>{
//     TobeAnimClass.classList.add("TFmouseout")
//     if(TobeAnimClass.classList.contains('TFmouseover')){
//         TobeAnimClass.classList.remove('TFmouseover');
//     }

// })


let tf1 = document.getElementById("TF1");
if(tf1.style.visibility!="hidden"){
    document.body.style.overflow = "hidden"
}

let form_for_tf1 = document.getElementById("FormForTF1");
tf1.addEventListener("click",()=>{
    tf1.style.visibility = "hidden";
    form_for_tf1.style.visibility = "Visible";
    document.body.style.overflow = "scroll"
    TobeAnimClass.style.visibility = "hidden";
})


let buttons = Array.from(document.getElementsByClassName('formbutt'));

for(const i of buttons){
    i.addEventListener("mouseover",()=>{
        if(i.classList.contains("NoBS")){
            i.classList.remove("NoBS")
        }
        i.classList.add("BS")
    })
    i.addEventListener("mouseout",()=>{
        if(i.classList.contains("BS")){
            i.classList.remove("BS")
        }
        i.classList.add("NoBS")
    })
}

let attempts = 0;

let params = new URLSearchParams(window.location.search);
let exp = params.get('exp');
let rno = params.get('rno');
let token = params.get('token');
//Set AnswerMap
let AnswerMap = new Map();
AnswerMap.set("NatFreq",4)
AnswerMap.set("DampRatio",0.5)
AnswerMap.set("OverDamped","UnderDamped"||"Under Damped"||"underdamped")
AnswerMap.set("RiseTime",0.6046)
AnswerMap.set("DampingFreq",3.464)
AnswerMap.set("peakTime",0.907)
AnswerMap.set("peakOvershoot",16.3)
AnswerMap.set("SettingTimefor2",2)
AnswerMap.set("SettingTimefor5",1.5)

let inp =  Array.from(document.getElementsByClassName("TFFormInp"));

let showans = document.getElementById("ShowAnsButton");

let submitans = document.getElementById('SubmitAnsButton');
let hint_used = false;
let showansUsed = false;

let check_ans = document.getElementById("checkAns");

check_ans.addEventListener("click",(event)=>{
    event.preventDefault();
    attempts+=1;
    for(const i of inp){
        if(AnswerMap.get(i.id)==i.value){
            i.style.border = "solid 2px green";
        }
        else{
            i.style.border = "solid 2px red";
        }
    }
}) 
let score = 0;

export async function  submitstuff(score){
 
    let jsonObject = {};
    jsonObject['testscore']=score;
    jsonObject['exp']=exp
    jsonObject['rno']=rno
    jsonObject['token']=token;
    let fetch_res =  await fetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/testscoreupdater',{
        'method':"POST",
        "headers":{
            'content-Type':'application/json',
            'Authorization':[token,rno]
        },
        'body':JSON.stringify(jsonObject)
    });
    let data = await fetch_res.json();

     console.log(data);
     window.location.href = data.redirect_url;
}
submitans.addEventListener('click',(event)=>{
    event.preventDefault();
    for(const i of inp){
        if(AnswerMap.get(i.id)==i.value){
            if(!hint_used && !showansUsed){
                score+=1
            }
            else if(!showansUsed){
                score+=0.5;
            }
            else{
                score +=0;
            }
            
        }
        else{
            score+=0;
        }
    }
    if(document.getElementById('THEPOPUPISHERE')){
        document.getElementById('THEPOPUPISHERE').style.visibility = 'visible';
        document.getElementById('FormForTF1').style.visibility = 'hidden';
    }
    else{
        submitstuff(score);
    }

})
showans.addEventListener("click",(event)=>{

    event.preventDefault();
    console.log("yep");
    scorecheck();
    if(attempts>2){
        showansUsed = true;
        submitans.disabled = true;
        submitans.style.opacity = "0.2"
  
        for(const i of inp){
            i.value = AnswerMap.get(i.id) 
            i.style.color = "red";
            i.style.fontWeight = "bolder";  
        }
        setTimeout(() => {
            document.getElementById('THEPOPUPISHERE').style.visibility = 'visible';
            document.getElementById('FormForTF1').style.visibility = 'hidden';
        }, 5000);
    
    }
})

let hint = document.getElementById('HintBtn');
hint.addEventListener('click',(event)=>{
    event.preventDefault();
    
    if(attempts>1){
        hint_used = true;
        document.getElementById("HintStuff").style.visibility = "visible";
        document.getElementById("HintImg").src = "Sim2Statics/hint.png"
    }
    

})



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
                console.log(popupscore);
                score+=popupscore
                submitstuff(score);
            })
            submitbtn.style.width = 'fit-content';
            popupform.append(submitbtn);  
            popupform.style.padding = '40px';
            popupform.style.width = "fit-content";
            popupform.style.visibility = 'hidden';
            document.body.append(popupform);
            clearInt();
           
            
        }
    }
       
    )
},3000)


const clearInt = ()=>{
    clearInterval(popupinterval);
}

