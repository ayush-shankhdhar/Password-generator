
const inputSlider=document.querySelector("[data-length-slider]");
const lengthDisplay=document.querySelector("[data-length-Number]");

const passwordDisplay = document.querySelector ("[data-passwordDisplay]");
const copyBtn = document. querySelector (" [data-copy]");

const copyMsg = document. querySelector (" [data-copyMsg]");
const uppercaseCheck = document. querySelector ("#uppercase");
const lowercaseCheck = document.querySelector ("#lowercase");
const numbersCheck = document. querySelector ("#numbers");
const symbolsCheck = document. querySelector ("#symbols");
const indicator = document. querySelector("[data-indicator");
const generateBtn = document. querySelector (".generateButton");
const allCheckBox = document.querySelectorAll("input [type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const clearbu=document.querySelector("#clearbutton");

// initial value
let password="";
let passwordlength=10;
let checkCount=1;
handleSlider();

//  set password length
function handleSlider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerText=passwordlength;
}

// for password shuffle
function shufflePassword(array){
    // fisher yates mate
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
  

function setIndicator(color) {
    indicator.style.backgroundColor = color;
}


function getRndInteger(min,max) {
   return Math.floor(Math.random()*(max-min))+min; 
}
 

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

 function generateSymbol(){
    randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum); 
 }

// set color of indicator  
 function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck. checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if(numbersCheck. checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) &&passwordlength >= 8) {
        setIndicator ("#0f0");
    } 
    else if ((hasLower || hasUpper) && (hasNum ||hasSym) && passwordlength >= 6){
        setIndicator ("#ff0") ;
    }
    else {
    setIndicator ("#f00");
    }
 }



async function copyContent(){
    try {
        navigator.clipboard.writeText(passwordDisplay.value);  // copy msg to clipboard
        copyMsg.innerText="copied"; 
    }
     catch (e) {
        copyMsg.innerText="Failed"; 
    }
     //to make copy wala span visible
     copyMsg.classList.add("active");
     setTimeout(() => {
        copyMsg.classList.remove("active");
     }, 2000);
}


function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    // special condn
    if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckBoxChange);  
})


inputSlider.addEventListener("input",(e)=>{
    passwordlength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value) copyContent();
})


generateBtn.addEventListener("click",()=>{
// none of the checkbox selected
if (checkCount === 0) {
    console.log(checkCount);
    alert("please select at least one checkbox");
    return;
}

if(passwordlength<checkCount){
    passwordlength=checkCount;
    handleSlider();
}
// let's start the journey to find new password

// remove old password
password="";


let functionArray = [];

if (uppercaseCheck.checked)
    functionArray.push(generateUpperCase);
if (lowercaseCheck.checked)
    functionArray.push(generateLowerCase);
if (symbolsCheck.checked)
    functionArray.push(generateSymbol);
if (numbersCheck.checked)
    functionArray.push(generateRandomNumber);


// when 4 checkboxes are checked, then add 4 length password, which is compulsory..

for (let index = 0; index < functionArray.length; index++) {
    password += functionArray[index]();
    // calling function
}


// now if length is 10, n you have added 4 length password, so add remaining passwords
for (let i = 0; i < passwordlength - functionArray.length; i++) {
    let randomIndex = getRndInteger(0, functionArray.length);
    console.log("get random index");
    password += functionArray[randomIndex]();
}

password = shufflePassword(Array.from(password));
console.log("password shufflled")
passwordDisplay.value = password;
calcStrength();
});

clearbu.addEventListener("click",()=>{
    window.location.reload();
})


