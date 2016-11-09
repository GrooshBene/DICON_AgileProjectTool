$(function(){
    
    $("#DashBoard").click(function(){
        location.href= "/project/1";
    });
    
    $("#scrum").click(function moveSCrum(){
        location.href="/scrum/project/1";
    });
    
    $("#xp").click(function moveXp(){
        alert("개발중");
    });
    
    $("#chat").click(function moveChat(){
        location.href="../../views/chat.html"; 
    });
   
    $(".outBtnBox").click(function goOut(){
       location.href="/project/user/list";
    });
});