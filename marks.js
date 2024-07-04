

var table = document.getElementById("studentsmarks");


var section = prompt("Please enter your section", "S2");
var exp = prompt("please enter the experiment. The options are: \n exp1\n exp2 \n exp3 \n exp4 \n exp5 \n exp6");

projectionAttrs = ['name','rno', `prelab.${exp}`,`TESTSCORES.${exp}`,`POSTLAB.${exp}`,`Screenshot.${exp}`];


var jsonObject = {
    "filterAttribute": "section",
    "filterValue": section,
    "ProjectionAttributes":projectionAttrs
};

fetch('https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/getmarks', {
    method: "post",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonObject)
})
.then(response => response.json())
.then(data => {
    console.log(data.body);

    var responseBody = data.body && typeof data.body === 'string' ? JSON.parse(data.body) : [];
    console.log(typeof(responseBody));
    responseBody.forEach((student) => {
        var studentMap = new Map(Object.entries(student));
    
        var student = table.tBodies[0].insertRow();
        var cellMap = new Map();
        cellMap.set(1,'rno');
        cellMap.set(2,'name');
        cellMap.set(3,`Prelab.${exp}`);
        cellMap.set(4,`Postlab.${exp}`);
        cellMap.set(5,`TESTSCORE.${exp}`);
        cellMap.set(6,`Screenshot.${exp}`);

        for(var i=1;i<=6;i++){
            const cell = student.insertCell(-1);
            console.log(cellMap.get(i),studentMap.get(cellMap.get(i)));
            cell.classList.add('tabledata');
            if(cellMap.get(i)==`Screenshot.${exp}`){
                if(studentMap.get(`Screenshot.${exp}`)==1){
                    cell.innerHTML = `<button id="${studentMap.get("rno")}_${exp}" class="screenshot_upload_button">Get Screenshot here</button>`
                
                }
                else{
                    cell.innerHTML = 'NA';
                }
             
            }
            else{
                if(studentMap.get(cellMap.get(i))){
                    cell.innerHTML = studentMap.get(cellMap.get(i));
                }
                else{
                    cell.innerHTML = 'NA';
                }
            }
            cell.addEventListener('mouseover',()=>{
                if(student.classList.contains('rowmouseout')){
                    student.classList.remove('rowmouseout')
                }
                student.classList.add('rowmouseover');

            })
            cell.addEventListener('mouseout',()=>{
                if(student.classList.contains('rowmouseover')){
                    student.classList.remove('rowmouseover')
                }
                student.classList.add('rowmouseout');
     
            })


        }

        /*
        var cell1 = student.insertCell(-1);
        var cell2 = student.insertCell(-1);
        var cell3 = student.insertCell(-1);
        var cell4 = student.insertCell(-1);
        var cell5 = student.insertCell(-1);
        var cell6 = student.insertCell(-1);
        


        cell1.innerHTML = studentMap.get("rno");
        cell2.innerHTML = studentMap.get("name");
        cell3.innerHTML = studentMap.get(`Prelab.${exp}`) ? studentMap.get(`Prelab.${exp}`) : "N/A";
        cell4.innerHTML = studentMap.get(`TESTSCORE.${exp}`) ? studentMap.get(`TESTSCORE.${exp}`) : "N/A";
        cell5.innerHTML = (studentMap.get(`Postlab.${exp}`)) ? studentMap.get(`Postlab.${exp}`) : "N/A";
        cell6.innerHTML = (studentMap.get(`Screenshot.${exp}`)) ? `<button id="${studentMap.get("rno")}_${exp}" class="screenshot_upload_button">Get Screenshot here</button>` : "N/A";
        */
 
    
       
    });

    let screenshotuploads = document.getElementsByClassName("screenshot_upload_button");
    for (const i of screenshotuploads) {
        i.addEventListener("click", (event) => {
        
            var currentJsonObject = {
                rno: event.target.id.split("_")[0],
                filename: event.target.id.split("_")[1]
            };

            console.log(currentJsonObject);

            fetch("https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/ScreenShotGet", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentJsonObject)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let imageData = data.body.replace(/"/g, '');
                console.log(typeof(imageData));


                if (typeof imageData === 'string') {
                    document.getElementById("studentsmarks").style.visibility = "hidden";
                    document.getElementById("The_image").setAttribute("src", `data:image/jpeg;base64,${imageData}`);
                    document.getElementById("The_image").style.visibility = "visible";

                } else {
                    console.error("Invalid image data format");
                }
            })
            .catch((error) => {
                console.error("Error fetching image data:", error);
            });
        });
    }
})
.catch(error => console.error("Error fetching data:", error));
