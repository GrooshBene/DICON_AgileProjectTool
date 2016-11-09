var addTimeLine;
var cal;
var todo;

var month = 11;
var year = 2016;
var e;

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

function resetCal(date,move){
    //2008 1,1 월
    var calDay = 1;
    cal = "";
    var check;
    if(move == 1){
        month--;
        
        if(month == 0){
            month = 12;
            year--;
        }
    }
    else{
        month++;
        
        if(month == 13){
            month = 1;
            year++;
        }
    }
    
    if(month < 8 && month%2 == 1){
        check = 31;
    }
    else if(month > 7 && month%2 == 0){
        check = 31;
    }
    else{
        check = 30;
    }
    
    console.log(month +"a"+ year)
    var day = new Date(year+"."+month+".1").getDay();
    console.log(day);
    if(day == 0){
        e = 7;   
        var line = 5;
    }
    else{
        e = day;
        if(e == 6 ){
            var line = 5;
        }
        else{
            var line = 4;
        }
        cal = "<tr>";
        
        for(var i = 0; i<e; i++){
            cal += "<td></td>"
        }
        for(var k = 7-i; k>=1; k--){
            cal += "<td class=\"date\"><div>"
            cal += calDay
            cal +="</div></td>"
            calDay++;
        }
        
        cal += "</tr>"
    }

    for(var i = 0; i<line; i++){
        cal += "<tr>"
        for(var k = 0; k<7; k++){
            cal += "<td class=\"date\"><div>"
            cal += calDay
            cal += "</div></td>"
            if(calDay>check-1){
                i = line;
                k = 7;
            }
            else{
                calDay++;
            }
        }
        cal += "</tr>"
    }
    
    
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