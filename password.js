let inputSlider = document.getElementById("inputSlider");   //  inputSlider: A slider for selecting password length.
let sliderValue = document.getElementById("sliderValue");   //  sliderValue: A text area displaying the selected password length.
let passBox = document.getElementById("passBox");           //  passBox: A text box where the generated password will appear.
let lowercase = document.getElementById("lowercase");       //  Checkboxes (lowercase, uppercase, numbers, symbols) to select character types to include in the password.
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");           
let genBtn = document.getElementById("genBtn");             //  genBtn: A button to generate the password.
let copyIcon = document.getElementById("copyIcon");         //  copyIcon: An icon that allows copying the password.


// Showing input slider value 
sliderValue.textContent = inputSlider.value;                //Displays the current value of the slider (inputSlider) in sliderValue.
inputSlider.addEventListener('input', ()=>{                 //Updates the displayed value dynamically whenever the slider is adjusted (input event)
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener('click', ()=>{                      //Calls the generatePassword function when the "Generate" button is clicked.
    passBox.value = generatePassword();                     //Displays the generated password in the passBox.
})

let lowerChars = "abcdefghijklmnopqrstuvwxyz";              //lowerChars: Lowercase letters.
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";              //upperChars: Uppercase letters.
let allNumbers = "0123456789";                              //allNumbers: Numeric digits.
let allSymbols = "~!@#$%^&*";                               //allSymbols: Special symbols.

// Function to generate Password
function generatePassword(){
    let genPassword = "";                                   //genPassword stores the generated password.
    let allChars = "";                                      //allChars accumulates the selected character sets based on which checkboxes are checked.

    allChars  += lowercase.checked ? lowerChars : "";
    allChars  += uppercase.checked ? upperChars : "";
    allChars  += numbers.checked ? allNumbers : "";
    allChars  += symbols.checked ? allSymbols : "";


    if(allChars == "" || allChars.length == 0){             //If no character type is selected (allChars is empty), the function returns an empty password.
        return genPassword;
    }


    let i = 1;                                              //Iterates based on the selected password length (inputSlider.value).
    while(i<=inputSlider.value){
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length)); //Randomly selects characters from allChars using Math.random() and appends them to genPassword.
        i++;                                                //Returns the generated password.
    }

    return genPassword;
}

copyIcon.addEventListener('click', ()=>{
    if(passBox.value != "" || passBox.value.length >=1){  //If the password box (passBox) is not empty, copies its value to the clipboard using navigator.clipboard.writeText.
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";                      //Changes the copyIcon text to "check" and sets its tooltip to "Password Copied".
        copyIcon.title = "Password Copied";

        setTimeout(()=>{                                   //Resets the icon text back to "content_copy" after 3 seconds using setTimeout.
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
        }, 3000)
    }
});