var addTimeLine;
var cal;
var todo;

var i = 1;
function addTL(date){
        addTimeLine = "<div class=\"timeLine conference"+i+"\">";
        addTimeLine +="<div class=\"timeLineProfile\">";
        addTimeLine +="<div class=\"timeLineProfileImg\">";
        addTimeLine +="<img src=\"img/profile.png\" alt=\"\" />";
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"timeLineProfileIndex\">";
        addTimeLine +="<div class=\"timeLineProfileName\">";
        addTimeLine +="USER";
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
        addTimeLine +="<div class=\"contentName\">";
        addTimeLine +="한수가 밥사주기";
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"contentDate\">";
        addTimeLine +="개발팀 -"+$(".viewMonth").html()+date;
        addTimeLine +="</div>";
        addTimeLine +="<div class=\"contentBtn\">";
        addTimeLine +="회의록 작성";
        addTimeLine +="</div>";
        addTimeLine +="</div>";
        addTimeLine +="</div>";
        addTimeLine +="</div>";
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

function addTodo(){
    todo = "<div class=\"cardView\">";
    todo += "<div class=\"cardName\">";
    todo += "<div class=\"cardNameIndex\">";
    todo += "로그인 기능";
    todo += "</div>";
    todo += "<div class=\"cardImg\">";
    // add img here
    todo += "</div>";
    todo += "</div>";
    todo += "<div class=\"cardDate\">";
    todo += "2016.10.31 | 4일 후 까지, 중요도 : 30";
    todo += "</div>";
    todo += "<div class=\"cardIndex\">";
    todo += "비밀번호는 *로 추가 요망";
    todo += "</div>";
    todo += "<div class=\"nullView\">";
    todo += "</div>";
    todo += "<div class=\"cardMemo\">";
    todo += "<button id=\"memoBtn\" type=\"button\" name=\"button\">메모</button>";
    todo += "</div>";
    todo += "</div>";

    
}