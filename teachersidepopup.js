let mainbox = document.getElementById("expandablebox");
let count=1;
let anothercount = 2;
let i=0;
let optionscount = 5;
let correctops;
let divtoreplicate = document.getElementById("extraqns");
var clone;
var section = prompt("Enter section");
var exp = prompt("Enter exp (example:exp1 or exp2)");
document.getElementById("addqn").addEventListener("click",function()
{   i++;
    clone  = divtoreplicate.cloneNode(true);
    let options = clone.querySelectorAll('.optionadded');
    correctops = clone.querySelectorAll('.correctopts');
    //options id update...
    options.forEach(function(option) {
    option.setAttribute("id","opt"+optionscount);
    option.classList.remove("forqn1");
    option.classList.add("forqn"+anothercount);
    option.value = "";
    optionscount++;
    });
    count++;  
     //correct answer id update...
     correctops.forEach(function(correct){
     correct.setAttribute("id","correctopt"+count);
     correct.classList.remove("forqn"+anothercount);

    }) 
    anothercount++;
    //question id update...
    clone.querySelector("#qn1").setAttribute("id","qn"+count);
    clone.querySelector("#qn"+count).value = "";
    mainbox.append(clone);
    document.getElementsByClassName("serialno")[i].innerHTML = count + ".";
})
//submit the qns button...
let finalcount =1;
let optsfinalcount = 1;
let n=4;
document.getElementById("submitqns").addEventListener("click",function(){
    const map = new Map();
    let totalqns = document.querySelectorAll(".qnsadded");
    anothercount = 1;
    totalqns.forEach(function(qn){
        var arr = [];
        let totaloptions = document.querySelectorAll(".forqn"+anothercount);
        totaloptions.forEach(function(option) {
            arr.push(option.value);
        });
        let correctopion = document.getElementById("correctopt"+finalcount).value;
        let respectiveqn  = document.getElementById("qn"+anothercount).value;
        map.set("qn"+finalcount, {question: respectiveqn, correctOption: correctopion, options: arr });
        finalcount++;
        anothercount++;
    });
    // map.forEach(function(value) {
    //     console.log("Question - " + value.question +  ", Correct Option - " + value.correctOption + ", Options - " + value.options.join(", "));
    // });
    // for(finalcount=1;finalcount<=map.size;finalcount++)
    // {
    //     console.log(map);
    // }
    submittheques(map)
});
const submittheques = (map) => {
    const mapObject = Object.fromEntries(map.entries());
    mapObject['exp'] =exp;
    mapObject['section']=section;
    for (let i in mapObject) {
        console.log(i, mapObject[i]);
    }

    fetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/PopUpUpload', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(mapObject)
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}
