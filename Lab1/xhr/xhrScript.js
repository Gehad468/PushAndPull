
console.log("Wecome to my cv")

var xhr=  new XMLHttpRequest ()

console.log(xhr)

ch=document.getElementById("btn_change")

main_content = document.getElementById("myskills");




ch.addEventListener("click",function(){
    console.log("button clicked ")


xhr.open("GET","cv.txt");

xhr.onreadystatechange=function(){
    if(xhr.readyState===4 && xhr.status===200){
        console.log(xhr.responseText)
        console.log(xhr.responseText)
        main_content.innerHTML+=xhr.responseText;

    }else if(xhr.readyState===4 && xhr.status===404){
        main_content.innerHTML +="<h1 >Data not found </h1>"
    }

}

xhr.send();
})



