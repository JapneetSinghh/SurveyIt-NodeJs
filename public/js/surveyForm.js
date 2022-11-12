
// Selecting All the add, delete and duplicate buttons on page
var addButtons = document.querySelectorAll("#addNewForm");
var deleteButtons = document.querySelectorAll("#deleteForm");
var duplicateButtons = document.querySelectorAll("#duplicateForm");
var toggleButtons = document.querySelectorAll(".toggleBtn");
// Selecting the modal container
const modalContainer = document.getElementById("modal-container");
// Selecting add form type buttons 
const mcqQuestion = modal.querySelector("#mcqQuestion");
const phoneQuestion = modal.querySelector("#phoneQuestion");
const answerQuestion = modal.querySelector("#answerQuestion");
const linkQuestion = modal.querySelector("#linkQuestion");
// SELECTING THE BTNS FOR ADDING AND DELETING CHOICE
var deleteChoiceBtns = document.querySelectorAll('#deleteChoiceBtn');
var addChoiceBtns = document.querySelectorAll('#addChoice');

// Modal Open
const modalOpen = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove('removeModal');
    modalContainer.style.opacity = "1"
    document.body.style.overflow = "hidden";
}

// Modal Close
const closeModalBtn = document.getElementById("close-modal");
closeModalBtn.addEventListener("click", () => {
    modalContainer.classList.add('removeModal');
    document.body.style.overflow = "auto";
    modalContainer.style.opacity = "0"
    document.body.style.overflow = "visible";
})

let newSurveyForm;

// Getting all the add buttons and adding event listener to them
const getAddButtons = () => {
    // console.log(addButtons);
    addButtons.forEach((addBtn, index) => {
        addBtn.addEventListener("click", function () {
            // console.log(addBtn.closest('.survey-form'));
            const surveyForm = addBtn.closest('.survey-form');
            newSurveyForm = surveyForm;
            modalOpen();
        })
    })
}

// Duplicate Form
const getDuplicateButtons = () => {
    // console.log(duplicateButtons);
    duplicateButtons.forEach((duplicateBtn, index) => {
        duplicateBtn.addEventListener("click", duplicateForm);
    });
}
const duplicateForm = (e) => {
    // console.log(e.target);
    const surveyForm = e.target.closest('.survey-form');
    var newForm = document.createElement('div');
    newForm.className = "survey-form";
    newForm.innerHTML = surveyForm.innerHTML;
    surveyForm.parentNode.insertBefore(newForm, surveyForm.nextSibling);
    var y = surveyForm.nextSibling.offsetTop;
    window.scrollTo({ top: y - 40, behavior: 'smooth' });
    reselectButtons();
    if (surveyForm.nextSibling.querySelector('.Correct')) {
        surveyForm.nextSibling.querySelector('.Correct').classList.remove('Correct');
    }
    if (surveyForm.nextSibling.querySelector('.correctChoice')) {
        surveyForm.nextSibling.querySelector('.correctChoice').value = "";
    }
}

// Adding event listener to all the delete buttons
const getDeleteButtons = () => {
    deleteButtons.forEach((deleteBtn, index) => {
        deleteBtn.addEventListener("click", deleteForm);
    });
}
// Delete Button Event
const deleteForm = (e) => {
    const surveyForm = e.target.closest('.survey-form');
    surveyForm.remove();
    reselectButtons();
}

// Getting all the toggle buttons
const getToggleButtons = () => {
    toggleButtons.forEach(toggleButton => {
        toggleButton.addEventListener('click', toggleButtonActive)
    })
}
// Setting the value of toggle button hidden input
const toggleButtonActive = (e) => {
    const toggleButton = e.target.closest('.toggleBtn');
    // console.log(e.target.closest('.toggleBtn'));
    toggleButton.classList.toggle('unchecked');
    if (toggleButton.nextElementSibling.value === "No") {
        toggleButton.nextElementSibling.value = "Yes"
    } else {
        toggleButton.nextElementSibling.value = "No"
    }
}

getToggleButtons();
getAddButtons();
getDuplicateButtons();
getDeleteButtons();

// MCQ QUESTION CLICK EVENT 
// ADDING MCQ FORM
mcqQuestion.addEventListener("click", function () {
    createAndAddNewForm(getMcqForm);
})
// ADDING QUESTION ANSWER FORM
answerQuestion.addEventListener("click", function () {
    createAndAddNewForm(getQuestionAnswerForm);
})
// ADDING PHONE NUMBER ANSWER FORM
phoneQuestion.addEventListener("click", function () {
    createAndAddNewForm(getPhoneForm);
})
linkQuestion.addEventListener("click", function () {
    createAndAddNewForm(getLinkForm);
})



// Adding Form
const createAndAddNewForm = (getForm) => {
    var newForm = document.createElement('div');
    newForm.classList.add("survey-form");
    newForm.innerHTML = getForm();
    let myPromise = new Promise(function (myResolve, myReject) {
        // "Producing Code" (May take some time)
        newSurveyForm.parentNode.insertBefore(newForm, newSurveyForm.nextSibling);
        myResolve(); // when successful
        myReject();  // when error
    });
    myPromise.then(() => {
        reselectButtons();
    }).then(() => {
        closeModalBtn.click();
        var top = newSurveyForm.offsetTop;
        window.scrollTo({ top: top + 100, behavior: 'smooth' });
    })
}
// AFTER DUPLICATE OR ADDITION OF NEW FORM NEW BTNS ARE ADDED THEREFORE THEY HAVE TO BE RESELECTED
const reselectButtons = () => {
    const myPromise = new Promise((resolve, reject) => {
        addButtons = document.querySelectorAll("#addNewForm");
        duplicateButtons = document.querySelectorAll("#duplicateForm");
        deleteButtons = document.querySelectorAll("#deleteForm");
        toggleButtons = document.querySelectorAll('.toggleBtn');
        deleteChoiceBtns = document.querySelectorAll('#deleteChoiceBtn');
        addChoiceBtns = document.querySelectorAll('#addChoice');
        resolve();
        reject();
    })
    myPromise.then(() => {
        getAddButtons();
        getDuplicateButtons();
        getDeleteButtons();
        getToggleButtons();
        setQuestionNumber();
        getDeleteChoiceBtns();
        getAddChoiceBtns();
        setSerialChars();
        setCorrectChoice();
        autoResize();
    })
}


// RETURNS THE CODE FOR MCQ FORM
const getMcqForm = () => {
    return `
    <input type="hidden"
    value="1"
    name="questionNumber"
    class="questionNumber">
<div class="flex-question-sidebar">
 <div class="form-question-card">
     <div id="errorContainer">
         <p>Survey Name Field Can't Be
             Empty</p> <button id="closeErrorContainer"
                 type="button"><i class="bi bi-x"></i></button>
     </div>
     <div class="quesnDiv">
         <label for=""><span id="questionNum"><i class="bi bi-arrow-right"></i>
                 <span class="questionNum">0</span></span>
             Multiple Choice
             Question </label>
         <input class="validateRequired
 validateQuestion question"
                type="text"
                placeholder="Type your question here"
                name="surveyName">
         <input type="hidden"
                name="questionType"
                class="setQuestionType"
                value="MCQ">
         <div>
             <input type="hidden"
                    name="numOfOptions"
                    value="3"
                    class="numOfOptions"
                    id="">
             <ul id="choiceList">
                 <li> <span class="optionSerial">A</span><input class="validateRequired
             validateOption"
                            placeholder="Enter Option"
                            type="text"></li>
                 <li><span class="optionSerial">B</span><input class="validateRequired
             validateOption"
                            placeholder="Enter Option"
                            type="text"></li>
                 <li><span class="optionSerial">C</span><input class="validateRequired
             validateOption"
                            placeholder="Enter Option"
                            type="text">
                     <button id="deleteChoiceBtn"
                             type="button"><i class="bi bi-trash"></i></button>
                 </li>
             </ul>
             <button style="background-color:
     teal; border:none"
                     class="settingsBtn"
                     id="addChoice"
                     type="button"> Add
                 Option
                 +</button>
         </div>
     </div>
 </div>
 <div class="form-question-settings">
     <div style="display:
flex;align-items:center;
justify-content:space-between">
         <p style="margin-top:14px">Required</p>
         <button type="button"
                 class="toggleBtn "><span class="toggleActive"></span></button>
         <input type="hidden"
                value="Yes"
                class="toggleInput"
                name="acceptingResponses">
     </div>
     <div>
         <p>Correct Option</p>
         <div id="correctChoice">
             <button type="button">A</button>
             <button type="button">B</button>
             <button type="button">C</button>
         </div>
         <input class="correctChoice
 validateRequired
 validateCorrectAns"
                type="hidden">
     </div>
 </div>
</div>
<div class="form-navbar">
 <div class="form-navbar-left-btns">
     <div><button id="addNewForm"
                 type="button"><i class="bi bi-plus"></i></button>
     </div>
     <div><button type="button"
                 id="duplicateForm"
                 style="transform:
 rotate(90deg);"><i class="bi bi-layers"></i></button>
     </div>
 </div>
 <div class="form-navbar-right-btns">
     <div><button type="button"
                 id="deleteForm"><i class="bi bi-trash"></i></button>
     </div>
 </div>
</div>
   `
}

// RETURNS THE CODE FOR QUESTION and ANSWER FORM
const getQuestionAnswerForm = () => {
    return `
    <input type="hidden"
    value="1"
    name="questionNumber"
    class="questionNumber">
<div class="flex-question-sidebar">
 <div class="form-question-card">
     <div id="errorContainer">
         <p>Survey Name Field Can't Be
             Empty</p> <button id="closeErrorContainer"
                 type="button"><i class="bi
         bi-x"></i></button>
     </div>
     <div class="quesnDiv">
         <label for=""><span id="questionNum"><i class="bi
             bi-arrow-right"></i>
                 <span class="questionNum">0</span></span>
             General
             Question</label>

         <input class="validateRequired
     validateQuestion question"
                type="text"
                placeholder="Type your question here"
                name="question-1">
         <input type="hidden"
                name="questionType"
                class="setQuestionType"
                value="generalQuestion">
         <textarea value="" id="addResize"
                   placeholder="Question Description (Optional)"
                   class="questionDesc"
                   name="surveyDescription"></textarea>
     </div>
 </div>
 <div class="form-question-settings">
     <div style="display:
 flex;align-items:center;
 justify-content:space-between">
         <p style="margin-top:14px">Required</p>
         <button type="button"
                 class="toggleBtn "><span class="toggleActive"></span></button>
         <input type="hidden"
                value="Yes"
                class="toggleInput"
                name="acceptingResponses-question-1">
     </div>
 </div>
</div>
<div class="form-navbar">
 <div class="form-navbar-left-btns">
     <div><button id="addNewForm"
                 type="button"><i class="bi bi-plus"></i></button>
     </div>
     <div><button type="button"
                 id="duplicateForm"
                 style="transform:
     rotate(90deg);"><i class="bi bi-layers"></i></button>
     </div>
 </div>
 <div class="form-navbar-right-btns">
     <div><button type="button"
                 id="deleteForm"><i class="bi bi-trash"></i></button>
     </div>
 </div>
</div>
  `
}

// RETURNS THE CODE FOR QUESTION and ANSWER FORM
const getPhoneForm = () => {
    return `    <input type="hidden"
    value="1"
    name="questionNumber"
    class="questionNumber">
<div class="flex-question-sidebar">
 <div class="form-question-card">
     <div id="errorContainer">
         <p>Survey Name Field Can't Be
             Empty</p> <button id="closeErrorContainer"
                 type="button"><i class="bi
 bi-x"></i></button>
     </div>
     <div class="quesnDiv">
         <label for=""><span id="questionNum"><i class="bi
     bi-arrow-right"></i>
                 <span class="questionNum">0</span></span>Contact
             Number </label>
         <input class="validateRequired
validateQuestion question"
                type="text"
                placeholder="Type your question here"
                name="surveyName">
         <input type="hidden"
                name="contactNumber"
                class="setQuestionType"
                value="contactNumber">
         <div style="margin:
20px;display:grid;place-items:center">
             <div class="iconInput">
                 <div>
                     <i class="bi
         bi-telephone-fill"></i>
                 </div>
                 <div>
                     <input type="tel"
                            disabled
                            name="phoneNumber">
                 </div>
             </div>
         </div>
     </div>
 </div>
 <div class="form-question-settings">
     <div style="display:
flex;align-items:center;
justify-content:space-between">
         <p style="margin-top:14px">Required</p>
         <button type="button"
                 class="toggleBtn "><span class="toggleActive"></span></button>
         <input type="hidden"
                value="Yes"
                class="toggleInput"
                name="acceptingResponses">
     </div>
 </div>
</div>
<div class="form-navbar">
 <div class="form-navbar-left-btns">
     <div><button id="addNewForm"
                 type="button"><i class="bi bi-plus"></i></button>
     </div>
     <div><button type="button"
                 id="duplicateForm"
                 style="transform:
rotate(90deg);"><i class="bi bi-layers"></i></button>
     </div>
 </div>
 <div class="form-navbar-right-btns">
     <div><button type="button"
                 id="deleteForm"><i class="bi bi-trash"></i></button>
     </div>
 </div>
</div>
    `
}

// RETURNS THE CODE FOR QUESTION and ANSWER FORM
const getLinkForm = () => {
    return `    <input type="hidden"
   value="1"
   name="questionNumber"
   class="questionNumber">
<div class="flex-question-sidebar">
<div class="form-question-card">
    <div id="errorContainer">
        <p>Survey Name Field Can't Be
            Empty</p> <button id="closeErrorContainer"
                type="button"><i class="bi bi-x"></i></button>
    </div>
    <div class="quesnDiv">
        <label for=""><span id="questionNum"><i class="bi
            bi-arrow-right"></i>
                <span class="questionNum">0</span></span> Link</label>
        <input class="validateRequired validateQuestion question"
               type="text"
               placeholder="Type your question here"
               name="surveyName">

        <input type="hidden"
               name="questionType"
               class="setQuestionType"
               value="link">
        <div style="margin:
20px;display:grid;place-items:center">
            <div class="iconInput">
                <div>
                    <i class="bi bi-link-45deg"></i>
                </div>
                <div>
                    <input disabled
                           style="width: 100%;max-width:400px;text-align:left;font-size:17px;letter-spacing:1px;"
                           type="tel"
                           name="phoneNumber">
                </div>
            </div>
        </div>
    </div>
</div>
<div class="form-question-settings">
    <div style="display:
flex;align-items:center;
justify-content:space-between">
        <p style="margin-top:14px">Required</p>
        <button type="button"
                class="toggleBtn "><span class="toggleActive"></span></button>
        <input type="hidden"
               value="Yes"
               class="toggleInput"
               name="acceptingResponses">
    </div>
</div>
</div>
<div class="form-navbar">
<div class="form-navbar-left-btns">
    <div><button id="addNewForm"
                type="button"><i class="bi bi-plus"></i></button>
    </div>
    <div><button type="button"
                id="duplicateForm"
                style="transform:
rotate(90deg);"><i class="bi bi-layers"></i></button>
    </div>
</div>
<div class="form-navbar-right-btns">
    <div><button type="button"
                id="deleteForm"><i class="bi bi-trash"></i></button>
    </div>
</div>
</div>
   
   `
}

// SETTING NAME OF ALL THE INPUTS ON PAGE ACCORDING TO THEIR QUESTION NUMBER
const setInputName = (ques, index) => {
    const surveyForm = ques.closest('.survey-form');
    const inputs = surveyForm.querySelectorAll('input');
    const textAreas = surveyForm.querySelectorAll('textarea');
    const MCQOptions = surveyForm.querySelectorAll('.validateOption');

    inputs.forEach(input => {
        // SETTING NAME OF ALL THE QUESTIONS
        if (input.classList.contains('question')) {
            input.name = `question_${index}`;
        };
        // SETTING NAME OF CORRECT OPTION INPUT FOR ALL MCQ's
        if (input.classList.contains('correctChoice')) {
            input.name = `question_${index}_correct_option`;
        }
        // SETTING NAME OF QUESTION TYPES HIDDEN INPUT IN ALL QUESTIONS
        if (input.classList.contains('setQuestionType')) {
            input.name = `question_${index}_type`;
        }
        // SETTING NAME OF ALL THE TOGGLE BUTTONS ASKING FOR REQUIRED IN EVERY QUESTION
        if (input.classList.contains('toggleInput')) {
            input.name = `question_${index}_required`;
        }
        if (input.classList.contains('numOfOptions')) {
            input.name = `question_${index}_number_of_options`;
        }
        if (input.classList.contains('answer')) {
            input.name = `question_${index}_answer`;
        }
    })
    // SETTING NAME OF ALL DESCRIPTION BOXES
    textAreas.forEach(textarea => {
        if (textarea.classList.contains('questionDesc')) {
            textarea.name = `question_${index}_description`;
        };
        if (textarea.classList.contains('answer')) {
            // console.log(textarea);
            textarea.name = `question_${index}_answer`;
        }
    })
    // SETTING NAME OF ALL MCQ OPTIONS
    MCQOptions.forEach((options, optionIndex) => {
        options.name = `question_${index}_option_${optionIndex + 1}`
    })
}

// SETS THE QUESTION NUMBER OF ALL THE FORMS
const setQuestionNumber = () => {
    const questionNum = document.querySelectorAll('.questionNum');
    // console.log(questionNum);
    questionNum.forEach((ques, index) => {
        ques.innerHTML = index;
        setInputName(ques, index);
        ques.closest('.survey-form').querySelector('.questionNumber').value = index;

    })


}
setQuestionNumber();

// SET THE SERIAL OF ALL THE MCQ CHOICE ON THE PAGE A,B,C,D
var serialChar = 'A';
var serialCharNum = 65;
const setSerialChars = () => {
    var numOfOptions = 0;
    var surveyForm;
    const choiceList = document.querySelectorAll('#choiceList');
    choiceList.forEach(choice => {
        const serial = choice.querySelectorAll('.optionSerial');
        serial.forEach(item => {
            item.textContent = String.fromCharCode(serialCharNum);
            serialCharNum++;
            numOfOptions++;
        })
        serialCharNum = 65;
        // SETTING NUMBER OF OPTIONS IN HIDDEN INPUT
        choice.closest('.survey-form').querySelector('.numOfOptions').value = numOfOptions;
        numOfOptions = 0;
        surveyForm = choice.closest('.survey-form');
    })
    if (document.getElementById('viewMode')) {
        if (surveyForm) {
            setChoiceButtons(surveyForm);
            setCorrectChoice();
        }
    }
}

const setChoiceButtons = (surveyForm) => {
    // console.log(surveyForm);
    const list = surveyForm.querySelectorAll('li');
    // console.log(list);
    var correctChoiceBtns = surveyForm.querySelector('#correctChoice');
    correctChoiceBtns.innerHTML = '';
    list.forEach(li => {
        const liSerial = li.querySelector('.optionSerial').textContent;
        correctChoiceBtns.innerHTML += `<button type="button">${liSerial}</button>`
    });
}
const setCorrectChoice = () => {
    var correctChoiceBtns = document.querySelectorAll('#correctChoice')
    correctChoiceBtns.forEach(choiceBtnContainer => {
        var buttonsList = choiceBtnContainer.querySelectorAll('button');
        buttonsList.forEach(btn => {
            btn.addEventListener("click", setCorrectChoiceEvent);
        })
    })
}
const setCorrectChoiceEvent = (e) => {
    var correctChoice = e.target.textContent.trim();
    var btnList = e.target.parentElement.querySelectorAll('button');
    btnList.forEach(btn => {
        btn.classList.remove("Correct");
        console.log(btn);
    })
    console.log('correct choice' + correctChoice)
    var correctChoiceInput = e.target.parentElement.nextElementSibling;
    correctChoiceInput.value = correctChoice;
    if (e.target.textContent.trim() === correctChoice) {
        e.target.classList.add("Correct");
    }
}
setCorrectChoice();

// ADD EVENT LISTENER TO ALL THE ADD CHOICE BTNS ON SCREEN
const getAddChoiceBtns = () => {
    addChoiceBtns.forEach((addChoiceBtn) => {
        addChoiceBtn.addEventListener("click", addMCQchoice);
    })
}
// ADD CHOICE EVENT LISTENER FUNCTION
const addMCQchoice = (e) => {
    const choiceList = e.target.parentElement;
    var newChoice = document.createElement('li');
    newChoice.innerHTML = ` <span class="optionSerial"></span><input class="validateRequired validateOption" placeholder="Enter Option" type="text">
    <button id="deleteChoiceBtn" type="button"><i class="bi bi-trash"></i></button>`
    const choiceListLi = choiceList.querySelectorAll('li');
    var length = choiceListLi.length;
    var targetLiItem = choiceListLi[length - 1];
    targetLiItem.parentNode.insertBefore(newChoice, targetLiItem.nextSibling);
    deleteChoiceBtns = document.querySelectorAll('#deleteChoiceBtn');
    getDeleteChoiceBtns();
    setSerialChars();
    const currentForm = e.target.closest('.survey-form');
    currentForm.querySelector('.correctChoice').value = '';
    setChoiceButtons(currentForm);
    setCorrectChoice();
    setQuestionNumber();
}

// ADD EVENT LISTENER TO ALL THE DELETE CHOICE BTNS ON SCREEN
const getDeleteChoiceBtns = () => {
    deleteChoiceBtns.forEach(delChoiceBtn => {
        delChoiceBtn.addEventListener("click", delChoice);
    })
}
// DELETE CHOICE EVENT LISTENER FUNCTION
const delChoice = (e) => {
    const currentForm = e.target.closest('.survey-form');
    currentForm.querySelector('.correctChoice').value = '';
    if (e.target.parentElement.parentElement.id !== `choiceList`) {
        e.target.parentElement.parentElement.remove();
    }
    setSerialChars();
    setChoiceButtons(currentForm);
    setCorrectChoice();
    setQuestionNumber();
}

// SELECTS DELETE CHOICE BTNS
getDeleteChoiceBtns();
// SELECTS ADD CHOICE BTNS
getAddChoiceBtns();
// SETS THE SERIAL NUMBERS OF ALL THE MCQ CHOICE
setSerialChars();


// VALIDATING ALL THE INPUTS
const vaildationCheckBtn = document.querySelector('#submitBtnCheck');
var validationStatus = true;
vaildationCheckBtn.addEventListener("click", () => {
    validationStatus = true
    const closeErrorContainer = document.querySelectorAll('#closeErrorContainer');
    closeErrorContainer.forEach(btn => {
        btn.addEventListener("click", removeErrorCard);
        btn.click();
    })
    const inputs = document.querySelectorAll('.validateRequired');
    inputs.forEach(input => {
        validate(input);
    });
    if (validationStatus) {
        console.log("Can Be Submitted");
        const submitFormBtn = document.getElementById('#submitForm');
        submitFormBtn.click();
    }
    else {
        console.log("Can't Be Submitted");
    }
})

const validate = (input) => {
    var inputField = input.parentElement.closest('.survey-form');
    var inputField = inputField.querySelector('.form-question-card');
    if (input.value === '' && input.classList.contains('validateQuestion')) {
        validateQuestion(inputField, "Question Field Can't Be Empty");
        validationStatus = false;
    }
    else if (input.value === '' && input.classList.contains('validateCorrectAns')) {
        validateQuestion(inputField, "Please Select The Correct Option");
        validationStatus = false;
    }
    else if (input.value === '' && input.classList.contains('validateOption')) {
        validateQuestion(inputField, "Please Fill All The Options");
        validationStatus = false;
    }
    else if (input.value === '' && input.classList.contains('answer')) {
        validateQuestion(inputField, "Answer for this question is required");
        validationStatus = false;
    }
    else if (input.value === '' && input.classList.contains('validateSurveyHeader')) {
        validateQuestion(inputField, "Survey details are required");
        validationStatus = false;
    }
    else if (input.value === '' && input.classList.contains('userDetails')) {
        validateQuestion(inputField, "Please enter your name and email to submit");
        validationStatus = false;
    }
    return validationStatus;
}

// FUNCTION FOR SENDING ERROR TO THE USER
const validateQuestion = (input, message) => {
    var questionCard = input;
    const errorCard = questionCard.querySelector('#errorContainer');
    errorCard.innerHTML =
        ` 
              <p>${message}</p> <button id="closeErrorContainer" type="button"><i class="bi bi-x"></i></button> 
            `
    errorCard.style.visibility = "visible";
    errorCard.style.opacity = 1;
    errorCard.style.height = "70px";
    errorCard.style.transform = `scaleY(1)`;
    var y = errorCard.offsetTop;
    window.scrollTo({ top: y, behavior: 'smooth' });
    const closeErrorContainer = document.querySelectorAll('#closeErrorContainer');
    closeErrorContainer.forEach(btn => {
        btn.addEventListener("click", removeErrorCard);
    })
}

const removeErrorCard = (e) => {
    const errorCard = e.target.closest('#errorContainer');
    errorCard.style.visibility = "hidden";
    errorCard.style.opacity = 0;
    errorCard.style.height = "0px";
    errorCard.style.transform = `scaleY(0)`;
}

// Auto Resizing the textarea
const autResizeEvent = (e) => {
    console.log(e.target);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
}
const autoResize = () => {
    if (document.querySelectorAll("#autoResize")) {
        var textareas = document.querySelectorAll("#autoResize");
        textareas.forEach(textarea => {
            textarea.addEventListener('input', autResizeEvent);
        })
    }
}
autoResize();
if (document.querySelectorAll('#autoResize')) {
    const textareas = document.querySelectorAll('#autoResize');
    textareas.forEach(textarea => {
        textarea.style.height = '40px';
    })
}
