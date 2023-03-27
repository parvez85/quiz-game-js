window.onload = function(){
   var x = document.getElementById('highscores');
   console.log(sessionStorage.length);
    for(var i=0 ;i<sessionStorage.length;i++){
   newli = document.createElement('li');
   console.log("count");
   newtext = document.createTextNode(sessionStorage.key(i) +' - ' + sessionStorage.getItem(sessionStorage.key(i)));
   newli.appendChild(newtext)
   x.appendChild(newli);
    }
};

let clearHS = document.getElementById("clear");
clearHS.onclick = function(){
    sessionStorage.clear();
   location.reload();
}