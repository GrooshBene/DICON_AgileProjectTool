$(function(){
   var num = 1;
    
    
    $("#addCardBtn").click(function addTodoCard(){
        num++;
        addTodo(num);
        $(".cardBox").append(todo); 
        $(".mBtn"+num).click(function(){
           $("#name"+num).text(prompt("제목입력",""));
           $("#date"+num).text(prompt("날짜입력",""));
           $("#index"+num).text(prompt("내용입력",""));
        });
        
        $(".cardView").draggable({
           revert:"invalid",
            appendTo:"body",
            cursor:"pointer",
            helper: 'clone',  
        });
    });
    
    $(".cardView").draggable({
       revert:"invalid",
		appendTo:"body",
		cursor:"pointer",
        helper: 'clone',  
    });
    
    $(".Doing").droppable({
		
		tolerance: "intersect", 
	    accept: ".cardView",
	    hoverClass: "droppable-active",



		drop:function(event, ui){
			$(this).append($(ui.draggable));
		}
	}); 
    
    $(".Done").droppable({
		
		tolerance: "intersect", 
	    accept: ".cardView",
	    hoverClass: "droppable-active",



		drop:function(event, ui){
			$(this).append($(ui.draggable));
		}
	}); 
    
});