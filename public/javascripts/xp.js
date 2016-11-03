$(function(){
  $(".card").draggable({
		revert:"invalid",
		appendTo:"body",
		cursor:"pointer",
		helper: 'clone',  
	});

	$(".timeView").droppable({
		
		tolerance: "intersect", 
	    accept: ".card",
	    hoverClass: "droppable-active",



		drop:function(event, ui){
			$(this).append($(ui.draggable.clone()));
		}
	});  
}); 