function selectDiscuss(element) {
    if (document.getElementsByClassName("discussionSelected")[0]) {
        document.getElementsByClassName("discussionSelected")[0].className = "discussion";
    }
     
    element.className = "discussionSelected";

    var title = document.getElementsByClassName("titleText")[0];
    title.innerHTML = "Loading..."; 
    var randomTime = (Math.floor(Math.random() * 3) + 1) * 1000;
    console.log(randomTime); 
    var nom = element.childNodes[3].childNodes[3].innerHTML;
    setTimeout(function(){ title.innerHTML = nom;  }, randomTime);
}