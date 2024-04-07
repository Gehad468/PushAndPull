
console.log("Wecome to my cv")

var xhr=  new XMLHttpRequest ()

console.log(xhr)

ch=document.getElementById("btn_change")

main_content = document.getElementById("myskills");

ch.addEventListener("click",function(){
    console.log("button clicked ")


    $.ajax({

        method:"get",

        url: "cv.txt",

        data: { 
            name: "gehad"  
        },
        success:function(res){
            console.log("request successed",res)
            main_content.innerHTML += res
        },
        error: function(){
            console.log("error")
        }
    
    })

})



