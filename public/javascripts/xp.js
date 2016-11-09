
$(function(){
    
    var i = 1;
    
    
    
   
    $("#aaaaaa").keypress(function(event){
        console.log(event.keyCode)
       if(event.which == 13){
           if(i%2 == 1){
               addChat_Lee($(this).val());
               event.preventDefault();
               $(this).val("");
               
               
               $(".chatView").append(chat);
            
           }
           if(i%2 == 0){
               addChat($(this).val());
              $(this).val("");
               
               $(".chatView").append(chat);
           }
           
           i++;
        }
    });
    
});