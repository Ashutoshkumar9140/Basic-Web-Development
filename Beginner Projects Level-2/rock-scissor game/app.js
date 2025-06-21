let userScore=0;
let compScore=0;
const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg")
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// to generate computer choice

const genCompChoice = ()=>{
    const options=["rock","paper","scissor"]
    const randIdx= Math.floor(Math.random()*3);
    return options[randIdx];
}

// if game draw

const drawGame = (userChoice,compChoice)=>{
    msg.innerText=`${userChoice} = ${compChoice}`
    msg.style.backgroundColor="blue"
}

// for winner

const showWinner= (userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        // console.log("You win!")
        msg.innerText=`you win, your ${userWin} beats ${compChoice}`;
        msg.style.backgroundColor="green"
    
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        // console.log("You lose")
        msg.innerText=`you win,  ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor="red"
    }

}


//to access both choices
const playGame=(userChoice)=>{
    // console.log("user choice = ",userChoice)
    const compChoice = genCompChoice();
    // console.log("Comp choice ",compChoice);
    


   // to decide winner


    if(userChoice===compChoice){
        drawGame(userChoice,compChoice);
    }else{
        let userWin=true;
        if(userChoice==="rock"){
            userWin = compChoice==="paper" ? false : true;
        }else if(userChoice==="paper"){
            userWin = compChoice==="scissor" ?false:true;
        }else{
            userWin = compChoice==="rock" ?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }

}


// to generate user choice
choices.forEach((choice)=>{
    
    choice.addEventListener("click",()=>{
        const userChoice= choice.getAttribute("id")
        playGame(userChoice);
    });
});




