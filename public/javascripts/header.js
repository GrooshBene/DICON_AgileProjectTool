$(function(){
    
    $("#DashBoard").click(function(){
        location.href= "/project/1";
    });
    
    $("#scrum").click(function moveSCrum(){
        location.href="/scrum/project/1";
    });
    
    $("#xp").click(function moveXp(){
        location.href="xp.html"; 
    });
    
    $("#chat").click(function moveChat(){
        location.href="chat.html"; 
    });
   
    $(".outBtnBox").click(function goOut(){
       location.href="/project/user/list";
    });
});