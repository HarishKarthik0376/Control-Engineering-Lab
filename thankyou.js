function createScoreElement(scoreKey, tableId, scoreId, maxScore) {
    let score = localStorage.getItem(scoreKey);
    let table = document.getElementById(tableId);
    let scoreElement = document.createElement("td");
    scoreElement.innerHTML = score + "/" + maxScore;
    scoreElement.setAttribute('id', scoreId);
    table.append(scoreElement);
}
let expno = localStorage.getItem("exp");
console.log(expno)
createScoreElement('prelab'+expno, 'prelabtable', 'prelabscore'+expno, 5);
createScoreElement('postlab'+expno, 'postlbatable', 'postlabscore'+expno, 5);
createScoreElement('simulation'+expno, 'simulationtable', 'simulationscore'+expno, 39);
//clear cache:
document.getElementById("gohome").addEventListener("click",function(){
    localStorage.removeItem("prelab1");
    localStorage.removeItem("postlab1");
    localStorage.removeItem("simulation1");
    localStorage.removeItem("exp");
    window.open("home.html","_parent");
})
document.getElementById("procedureview").addEventListener("click",function()
{
    window.open("procedure"+expno+".html","+parent");
})
function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };