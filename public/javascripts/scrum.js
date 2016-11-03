$(function(){
   
    $("#addCardBtn").click(function addTodoCard(){
        addTodo();
        $(".cardBox").append(todo); 
        
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