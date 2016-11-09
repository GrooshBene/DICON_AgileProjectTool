var addTimeLine;
var cal;
var todo;
var chat;
var i = 1;
function addTL(date, num){
        addTimeLine = "<div class=\"timeLine conference"+i+"\">";
        addTimeLine +="<div class=\"timeLineProfile\">";
        addTimeLine +="<div class=\"timeLineProfileImg\">";
        addTimeLine +="<img src=\"../public/images/profile.png\" alt=\"\" />";
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"timeLineProfileIndex\">";
        addTimeLine +="<div class=\"timeLineProfileName\">";
        addTimeLine +="이장훈";
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"timeLineProfileDate\">";
        addTimeLine +=$(".viewMonth").html()+"."+date;
        addTimeLine +="</div>";
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"\">";
        addTimeLine +="</div>";
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"timeLineIndex\">";
        addTimeLine +="<div class=\"timeLineContent\">";
        addTimeLine +="<div id=\"c"+num+"\" class=\"contentName\">";
        addTimeLine +="내용을 추가해 주세요";
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"contentDate\">";
        addTimeLine +="개발팀 -"+$(".viewMonth").html()+date;
        addTimeLine +="</div>";
        addTimeLine +="<div id=\"co"+num+"\" class=\"contentBtn\">";
        addTimeLine +="회의록 작성";
        addTimeLine +="</div>";
        addTimeLine +="</div>";
        addTimeLine +="</div>";
        addTimeLine +="</div>";
    
        console.log(num);
        i++;
        if(i>3){
            i=1;
        }
}

function resetCal(){
        var a = 2;
        cal = "<tr>"
        cal +="<td></td><td></td><td></td><td></td><td></td><td></td>";
        cal += "<td class=\"date\"><div>1</div></td></tr>";
        for(var i = 1; i <=4; i ++){
            cal += "<tr>";
            for(var k = 1; k<=7; k++){
                
                cal += "<td class=\"date\"><div>";
                cal += a
                cal += "</div></td>";
                
                a++;
            }
            cal += "</tr>";
        }
    
        cal += "<tr>";
        cal += "<td class=\"date\"><div>29</div></td>";
        cal += "<td class=\"date\"><div>30</div></td>";
        cal += "<td class=\"date\"><div>31</div></td></tr>";

}

function addTodo(i){
    todo = "<div class=\"cardView\">";
    todo += "<div class=\"cardName\">";
    todo += "<div id=\"name"+i+"\" class=\"cardNameIndex\">";
    todo += "제목을 추가해 주세요";
    todo += "</div>";
    todo += "<div class=\"cardImg\">";
    // add img here
    todo += "</div>";
    todo += "</div>";
    todo += "<div id=\"date"+i+"\" class=\"cardDate\">";
    todo += "날짜를 추가해 주세요";
    todo += "</div>";
    todo += "<div id=\"index"+i+"\"class=\"cardIndex\">";
    todo += "내용을 추가해 주세요";
    todo += "</div>";
    todo += "<div class=\"nullView\">";
    todo += "</div>";
    todo += "<div class=\"cardMemo\">";
    todo += "<button id=\"memoBtn\" class=\"mBtn"+i+"\" type=\"button\" name=\"button\">메모</button>";
    todo += "</div>";
    todo += "</div>";

    
}
function addChat_Lee(message){
        chat = "<div class=\"chatValue\">";
        chat += "<div class=\"chatProfile\">";
        chat += "<div class=\"chatProfileImg\">";
        chat += "<div class=\"img\">";
        chat += "<div class=\"roomProfile\">";
        chat += "강";
        chat += "</div>";
        chat += "</div>";
        chat += "</div>";
        chat += "<div class=\"chatProfileName\">";
        chat += "강은솔";
        chat += "</div>";
        chat += "</div>";
        chat += "<div class=\"chatIndex\">";
        chat += "<div class=\"chatBox\">";
        chat += message;
        chat += "</div>";
        chat += "</div>";
        chat += "</div>";
}

function addChat(message){
        chat = "<div id=\"aaaa\" class=\"chatValue\">";
        chat += "<div id=\"right\" class=\"chatProfile\">";
        
      
        chat += "</div>";
        chat += "<div id=\"right\" class=\"chatIndex\">";
        chat += "<div id=\"right\" class=\"chatBox\">";
        chat += message;
        chat += "</div>";
        chat += "</div>";
        chat += "</div>";
}