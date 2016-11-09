$(function(){
    var addUrl = "http://localhost:3000/project/add"
    var listUrl = "http://localhost:3000/project/user/list"
    var i;
    $(".addTeamBtn").click(function(){
        var text = prompt("팀 이름 입력","")
        
        if (text != null) {

        
            $.ajax({
                method:"GET",
                url:addUrl,
                data:{"name":text},
                success:function(da){
                    console.log(da)
                    i++;
                    var a = "<div id=\""+i+"\" class=\"teamBox\">";
                    a += "<div class=\"teamName\">";
                    a += "팀"+i;
                    a +="</div>";
                    a += "<div class=\"teamJoin\">";
                    a += "<div class=\"teamJoinText\">";
                    a += "팀으로 가기";
                    a += "</div>";
                    a += "<div class=\"teamJoinImg\">";
                    a += "<img src=\"/public/images/icon/ic_teamsel_goteam.png\" alt=\"\" />";
                    a += "</div>";
                    a += "</div>";
                    a += "</div>";
                    
                    $(".article").append(a);
                },
                error:function(){

                }
            });   
        } else {

            console.log("a")

        }

        });

    
    $("document").ready(function check (){
       $.ajax({
            method:"POST",
            url:listUrl,

            success:function(data){
                console.log(data)
                for(i = 1; i<=data.length; i++){
                    var a = "<div id=\""+i+"\" class=\"teamBox\">";
                        a += "<div class=\"teamName\">";
                        a += "팀"+i;
                        a +="</div>";
                        a += "<div class=\"teamJoin\">";
                        a += "<div class=\"teamJoinText\">";
                        a += "팀으로 가기";
                        a += "</div>";
                        a += "<div class=\"teamJoinImg\">";
                        a += "<img src=\"/public/images/icon/ic_teamsel_goteam.png\" alt=\"\" />";
                        a += "</div>";
                        a += "</div>";
                        a += "</div>";
                        
                        $(".article").append(a);
                }
                $(".teamJoin").click(function teamJoin(){
                   location.href="/project/1";
                });
            },
            error:function(){

            }
        });    
    });
  
});