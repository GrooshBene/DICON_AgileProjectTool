$(function(){
    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    
    var num = 1;
    console.log(month);
    
    $("#conB").click(function(){
        var text = prompt("내용을 입력해 주세요","");
        
        $("#conN").html(text);
        
    });
    
    $(".date").droppable({
		
		tolerance: "intersect", //50% 이상 겹치면 Drop 되게 한다 
	    accept: ".addBtn", //addBtn라는 class를 가진것만 인식 

		drop:function(event, ui){
            console.log($(this).text());
            num++;
			addTL($(this).text(),num);
            $(this).html($(ui.draggable.clone   ()));
            $(".article").append(addTimeLine);  
		    $("#co"+num).click(function(){
                console.log("#c"+num)
                var text = prompt("내용을 입력해 주세요","");

                $("#c"+num).html(text);

            });
        }
	});
    
    $(".addBtn").draggable({
		revert:"invalid", //drop하는 곳이 아니면 제자리로 돌아가게하는 속성 
		appendTo:"body",//설정한 곳의 마지막 부분에 쌓아준다   
		helper: 'clone', // 복사 
		//revertDuration:0, : 사용시 드레그 되돌아가는 에니메이션 없이 바로 귀환 
		opacity:0.8, //클릭시 박스 투명도 지정
        cursor:"pointer" //cursor pointer로 변경
	});
    
    $(".backMonth").click(function mDate(){
        month = month - 1;
        if(month == 0){
           month = 12;
           year = year - 1;
       }
        $(".viewMonth").html(year+"."+month);
        resetCal();
        $(".dateIndex").html(cal);
    
        $(".date").droppable({
		
            tolerance: "intersect", //50% 이상 겹치면 Drop 되게 한다 
            accept: ".addBtn", //addBtn라는 class를 가진것만 인식 

            drop:function(event, ui){
                console.log($(this).text());
                console.log(timeLineNum);
                num++;
                
                addTL($(this).text(),num);
                $(this).html($(ui.draggable.clone()));
                $(".article").append(addTimeLine);  
                
                $("#co"+num).click(function(){
                    console.log("#c"+num)
                    var text = prompt("내용을 입력해 주세요","");
                        
                    $("#c"+num).html(text);

                });
            }
            
        });
        
    });
    
    $(".frontMonth").click(function pDate(){
        month = month + 1;
        if(month == 13){
           month = 1;
           year = year + 1;
       }
        $(".viewMonth").html(year+"."+month); 
        resetCal();
        $(".dateIndex").html(cal);
        
        $(".date").droppable({
		
            tolerance: "intersect", //50% 이상 겹치면 Drop 되게 한다 
            accept: ".addBtn", //addBtn라는 class를 가진것만 인식 

            drop:function(event, ui){
                console.log($(this).text());
                num++;
                addTL($(this).text(),num);
                $(this).html($(ui.draggable.clone()));
                $(".article").append(addTimeLine);  
                
                $("#co"+num).click(function(){
                    console.log("#c"+num)
                    var text = prompt("내용을 입력해 주세요","");
                        
                    $("#c"+num).html(text);

                });
            }
        });
    
    });
    
    
    
    
    
});