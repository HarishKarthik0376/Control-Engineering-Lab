console.log("Hi");
let queryparams = new URLSearchParams(window.location.search)
let rno = queryparams.get("rno");
let exp = queryparams.get("exp");
console.log(rno);
let simdone = document.getElementById("SimDone");
simdone.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("FileUpload_MatLab").style.visibility = "visible";
    document.getElementById("Submit_Matlab").style.visibility = "visible";
});

let formStuff = document.getElementById("Form_For_File_Upload");
formStuff.addEventListener("submit", (event) => {
    event.preventDefault();
    SendFile();
});

const SendFile = async (target) => {
    let FI = document.getElementById("FileUpload_MatLab");
    let file = FI.files[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const imageData = reader.result.split(',')[1];
            jsonObject = {
                imageData : imageData,
                rno : rno,
                exp:exp
            }
            let res = await fetchAndReturnRes(jsonObject); // Send as an object
            let data = await res.json();
            console.log(data);
            window.open(`https://harishkarthik0376.github.io/Control-Engineering-Lab/simulation.html?rno=${rno}&exp=${exp}`)
        };
    }
};

const fetchAndReturnRes = (requestData) => {
    return fetch("https://ngddxfrpg8.execute-api.us-east-1.amazonaws.com/test/PutScreenshot", {
        method: "POST", // Correct method spelling
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    });
};
