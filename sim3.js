let params = new URLSearchParams(window.location.search);
let exp = params.get('exp');
let rno = params.get('rno');
let token = params.get('token');
var i;

// Setting autocomplete to off for all the buttons
let inps = document.querySelectorAll("input");

for (const i of inps) {
    i.setAttribute("autocomplete", "off");
}

let SCORE = 0;

let eq_intro = document.getElementById('EQintro_3');
let mcqform = document.getElementById('mcqform');
let secondform = document.getElementById('secondform');
let thirdform = document.getElementById('thirdform');
let finform = document.getElementById('finalform');

let AnswerMapForFourth = new Map()
AnswerMapForFourth.set('1', 'true')
AnswerMapForFourth.set('2', '180')
AnswerMapForFourth.set('3', '-2')
AnswerMapForFourth.set('4', '-0.845')
AnswerMapForFourth.set('5', '0')
AnswerMapForFourth.set('6', '2.8')
AnswerMapForFourth.set('7', '48')

let COMPLETE = false

let secondform_submit = document.getElementById('form2_submit');
let AnsMapForSecond = new Map();
let second_showANs = false;
let second_hint_used = false;
AnsMapForSecond.set("zeroes", "0")
AnsMapForSecond.set("poles", "3")
let second_inps = document.getElementsByClassName("secondforminp");
let showAns_second = document.getElementById('form2_showans');
let hint_second = document.getElementById('form2_hint');

let third_form_submit = document.getElementById("form3_submit");
let AnswerMap_for_form3 = new Map()
AnswerMap_for_form3.set("P1", '0');
AnswerMap_for_form3.set("P2", '-2');
AnswerMap_for_form3.set("P3", '-4');
let thirdinps = document.getElementsByClassName('ThirdFormInp');
let thirdShowAns = false
let thirdHint = false
let thirdshowansbtn = document.getElementById('form3_showans');
let thirdhintbtn = document.getElementById("form3_hint");

eq_intro.addEventListener("mouseover", () => {
    if (eq_intro.classList.contains('TFmouseout')) {
        eq_intro.classList.remove('TFmouseout')
    }
    eq_intro.classList.add('TFmouseover')
})

eq_intro.addEventListener("mouseout", () => {
    if (eq_intro.classList.contains('TFmouseover')) {
        eq_intro.classList.remove('TFmouseover')
    }
    eq_intro.classList.add('TFmouseout')
})

eq_intro.addEventListener("click", () => {
    eq_intro.style.visibility = "hidden";
    mcqform.style.visibility = "visible";
})

// MCQFORMSTUFF

let mcq_submit = document.getElementById('mcqform_submit')

let AnsMapForMCQ = new Map();

AnsMapForMCQ.set('ques1', 'Must lie on the root loci');
AnsMapForMCQ.set('ques2', 'Zero');
AnsMapForMCQ.set('ques3', 'Root Locus')

mcq_submit.addEventListener("click", (event) => {
    event.preventDefault();

    for (var i = 1; i <= 3; i++) {
        let question = `ques${i}`
        let correct_answer = AnsMapForMCQ.get(question);
        let opts = mcqform.elements[question];
        for (const option of opts) {
            if (option.checked) {
                if (option.value == correct_answer) {
                    SCORE += 1
                }
            }
        }
    }

    mcqform.style.visibility = "hidden";
    secondform.style.visibility = "visible";
    COMPLETE = false;
})

let mcq_reset = document.getElementById('mcqform_reset');

mcq_reset.addEventListener("click", (event) => {
    event.preventDefault();
    let rds = mcqform.querySelectorAll('input[type="radio"]');
    for (const i of rds) {
        if (i.checked) {
            i.checked = false;
        }
    }
})

// SECONDFORMSTUFF

secondform_submit.addEventListener("click", (event) => {
    event.preventDefault()

    for (const i of second_inps) {

        if (i.value == "") {
            prompt("Please enter a value and then try again!")
            break;
        } else {
            if (String(i.value) == AnsMapForSecond.get(i.getAttribute("name"))) {
                if (second_showANs) {
                    SCORE += 0;
                } else if (second_hint_used) {
                    SCORE += 0.5;
                } else {
                    SCORE += 1;
                }

            } else {
                SCORE += 0;
                i.value = AnsMapForSecond.get(i.getAttribute("name"))
                i.style.color = "red";
            }
        }
    }

    secondform.style.visibility = "hidden";
    thirdform.style.visibility = "visible";
    COMPLETE = false;
})

showAns_second.addEventListener("click", (event) => {
    event.preventDefault()
    second_showANs = true;
    for (const i of second_inps) {
        i.value = AnsMapForSecond.get(i.getAttribute('name'))
        i.style.color = "red";
    }
})

hint_second.addEventListener("click", (event) => {
    event.preventDefault()
    second_hint_used = true;
    let img = document.createElement("img");
    img.src = "Sim3Statics/hintsecond.png"
    secondform.append(img);
})
let submit_buttons_form2 = Array.from(document.getElementsByClassName("formbtn"));

// THIRD FORM STUFF

third_form_submit.addEventListener("click", (event) => {
    event.preventDefault();
    for (const i of thirdinps) {
        if (i.value == AnswerMap_for_form3.get(i.getAttribute('name'))) {
            if (thirdShowAns) {
                SCORE += 0
            } else if (thirdHint) {
                SCORE += 0.5
            } else {
                SCORE += 1
            }
        }
        thirdform.style.visibility = "hidden";
        finform.style.visibility = "visible";
        COMPLETE = false;
    }
})

thirdshowansbtn.addEventListener("click", (event) => {
    event.preventDefault();
    thirdShowAns = true;
    for (const i of thirdinps) {
        i.value = AnswerMap_for_form3.get(i.getAttribute('name'));
        i.style.color = "red";
    }
})

thirdhintbtn.addEventListener("click", (event) => {
    event.preventDefault();
    thirdHint = true;
    let div = document.createElement('p')
    div.innerHTML = "Poles=roots of the denominator polynomial<br>Zeros=roots of the numerator polynomial"
    thirdform.append(div);
})

// FOURTH FORM

let finalform_submit = document.getElementById("finalform_submit");
let finalshowAnsbtn = document.getElementById('finalform_showans');
let finalHintbtn = document.getElementById('finalformhint');
let finaldisplayrootLocus = document.getElementById('finalform_rootloc');

let finalShowANs = false;
let finalHint = false;
let finalinps = document.getElementsByClassName('finalforminput')

finaldisplayrootLocus.addEventListener('click', () => {
    event.preventDefault();
    finform.style.visibility = 'hidden';
    let img = document.createElement('img');
    img.id = "ROOTLOC"
    img.src = "Sim3Statics/RootLoc.png";
    document.body.append(img);
    let backbtn = document.createElement('button');
    backbtn.classList.add('formbtn');
    backbtn.id = "backid"
    backbtn.innerText = "BACK";
    backbtn.addEventListener('click', () => {
        document.body.removeChild(document.getElementById('ROOTLOC'));
        document.body.removeChild(document.getElementById('backid'));

        finform.style.visibility = "visible";
    })
    document.body.append(backbtn);
});

finalform_submit.addEventListener("click", () => {
    event.preventDefault();
    for (const i of finalinps) {
        if (i.value == AnswerMapForFourth.get(i.getAttribute('name'))) {
            if (finalShowANs) {
                SCORE += 0
            } else if (finalHint) {
                SCORE += 0.5
            } else {
                SCORE += 1;
            }
        } else {
            SCORE += 0;
            i.value = AnswerMapForFourth.get(i.getAttribute('name'));
            i.style.color = "red";
        }

    }
    COMPLETE = true;
    console.log(SCORE);
    if(document.getElementById('THEPOPUPISHERE')){
        document.getElementById('THEPOPUPISHERE').style.visibility = 'visible';
        document.getElementById('finalform').style.visibility = 'hidden';
    }
    else{
        submitstuff(SCORE);
    }
    //submitstuff(SCORE);
})

finalshowAnsbtn.addEventListener('click', (event) => {
    event.preventDefault();
    finalShowANs = true;
    for (const i of finalinps) {
        i.value = AnswerMapForFourth.get(i.getAttribute('name'));
        i.style.color = "red";
    }
    setTimeout(()=>{
        document.getElementById('POPUPISHERE').style.visibility = 'visible';
        document.getElementById('finalform').style.visibility = 'hidden';
    },5000)
})

finalHintbtn.addEventListener('click', () => {
    event.preventDefault();
    finalHint = true;
    let div_of_imgs = document.createElement('div');
    div_of_imgs.style.display = "flex";
    div_of_imgs.style.flexDirection = "column";
    div_of_imgs.style.gap = "10px";
    for (i = 0; i < 3; i++) {
        let temp_img = document.createElement('img')
        temp_img.src = `Sim3Statics/finalHint${i}.jpeg`;
        div_of_imgs.append(temp_img);
    }
    finform.append(div_of_imgs);
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
    localStorage.setItem('simulation'+exp,SCORE);
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

for (const i of submit_buttons_form2) {
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




