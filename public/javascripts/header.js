$(function(){
    
    $("#DashBoard").click(function(){
        location.href="team.html"; 
    });
    
    $("#scrum").click(function moveSCrum(){
        location.href="scrum.html"; 
    });
    
    $("#xp").click(function moveXp(){
        location.href="xp.html"; 
    });
    
    $("#chat").click(function moveChat(){
        location.href="chat.html"; 
    });
   
    $(".outBtnBox").click(function goOut(){
       location.href="main.html";    
    });
});