const minusbtn = document.querySelector(".dec-btn")
const plusbtn = document.querySelector(".inc-btn")
const resetbtn = document.querySelector(".res")
const count = document.querySelector(".count")
const scale = document.querySelector(".inc-dec")





minusbtn.addEventListener('click',()=>{
    const scaleN = parseInt(scale.value)
    
    count.innerText -= scaleN;
})

plusbtn.addEventListener('click',()=>{
    const scaleN = parseInt(scale.value)
    const countValue = parseInt(count.innerText)
    count.innerText = countValue + scaleN;
    
})

resetbtn.addEventListener('click',()=>{
    count.innerText = 0;
    scale.value =1;
})