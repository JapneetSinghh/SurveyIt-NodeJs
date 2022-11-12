const getMcqForm = (question, isRequired, options, numberOfOptions, correctOption) => {
    var isRequiredClass = 'unchecked';
    if (isRequired !== 'No') {
        isRequiredClass = '';
    }
    var optionHtml = ``;
    var correctChoiceBtn = ``;
    options.forEach((option, index) => {
        var optionInput = option.option;
        var serial = option.serial;
        if (index < 2) {
            optionHtml += ` <li> <span class="optionSerial">${serial}</span><input class="validateRequired
            validateOption" placeholder="Enter Option" value="${optionInput}" type="text"></li>`

        } else {
            optionHtml += `<li><span class="optionSerial">${serial}</span><input class="validateRequired validateOption" placeholder="Enter Option" value="${optionInput}" type="text"> 
            <button id="deleteChoiceBtn" type="button"><i class="bi bi-trash"></i></button> </li>`
        }
        if (serial.toString() === correctOption.toString()) {
            correctChoiceBtn += `<button class="Correct" type="button">${serial}</button>`
        } else {
            correctChoiceBtn += `<button type="button">${serial}</button>`
        }
    })
    return `
    <div class="survey-form">
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
                            Multiple Choice
                            Question </label>
                        <input class="validateRequired
        validateQuestion question"
                            type="text"
                            placeholder="Type your question here"
                            value="${question}"
                            name="surveyName">
                            
                            <input type="hidden"
                                name="questionType"
                                class="setQuestionType"
                                value="MCQ">
                                <div>
                                    <input type="hidden"
                                        name="numOfOptions"
                                        value="${numberOfOptions}"
                                        class="numOfOptions"
                                        id="">
                                        <ul id="choiceList">
                                          ${optionHtml}
                                        </ul>
                                        <button style="background-color: teal; border:none"
                                            class="settingsBtn"
                                            id="addChoice"
                                            type="button"> Add Option
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
                                class="toggleBtn ${isRequiredClass} "><span class="toggleActive"></span></button>
                            <input type="hidden"
                                value="${isRequired}"
                                class="toggleInput"
                                name="acceptingResponses">
                        </div>
                        <div>
                            <p>Correct Option</p>
                            <div id="correctChoice">
                                ${correctChoiceBtn}
                            </div>
                            <input class="correctChoice validateRequired validateCorrectAns"
                              value="${correctOption}"   type="hidden">
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
            </div>`
}
const getGeneralQuestion = (question, isRequired, description) => {
    var isRequiredClass = '';
    if (isRequired === 'No') {
        isRequiredClass = 'unchecked';
    }
    return `
    <div class="survey-form">
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
                       value="${question}"
                       name="question-1">
                <input type="hidden"
                       name="questionType"
                       class="setQuestionType"
                       value="generalQuestion">
                <textarea value=""
                          placeholder="Question Description (Optional)"
                          class="questionDesc"
                          name="surveyDescription">${description}</textarea>

            </div>
        </div>
        <div class="form-question-settings">
            <div style="display:
        flex;align-items:center;
        justify-content:space-between">
                <p style="margin-top:14px">Required</p>
                <button type="button"
                        class="toggleBtn ${isRequiredClass} "><span class="toggleActive "></span></button>
                <input type="hidden"
                       value="${isRequired}"
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
</div>
    `
}

const getContactNumberForm = (question, isRequired) => {
    var isRequiredClass = '';
    if (isRequired === 'No') {
        isRequiredClass = 'unchecked';
    }
    return `
<div class="survey-form">
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
                        <span class="questionNum">0</span></span>Contact
                    Number </label>
                <input class="validateRequired
    validateQuestion question"
                       type="text"
                       placeholder="Type your question here"
                       value="${question}"
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
                        class="toggleBtn  ${isRequiredClass}"><span class="toggleActive"></span></button>
                <input type="hidden"
                       value="${isRequired}"
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
</div>
`
}
const getLinkForm = (question, isRequired) => {
    var isRequiredClass = '';
    if (isRequired === 'No') {
        isRequiredClass = 'unchecked';
    }

    return `<div class="survey-form">
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
            <label for=""><span id="questionNum"><i class="bi
                bi-arrow-right"></i>
                    <span class="questionNum">0</span></span> Link</label>
            <input class="validateRequired validateQuestion question"
                   type="text"
                   placeholder="Type your question here"
                   value="${question}"
                   name="surveyName">

            <input type="hidden"
                   name="questionType"
                   class="setQuestionType"
                   value="link">
            <div style="margin:
20px;display:grid;place-items:center">
                <div class="iconInput">
                    <div>
                        <i class="bi
    bi-link-45deg"></i>
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
                    class="toggleBtn  ${isRequiredClass}"><span class="toggleActive"></span></button>
            <input type="hidden"
                   value="${isRequired}"
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
</div>
`
}
const setForms = (data) => {
    var questionsData = '';
    data.forEach(question => {
        const questionType = question.type;
        if (questionType === 'MCQ') {
            questionsData += getMcqForm(question.question, question.isRequired, question.options, question.numberOfOptions, question.correctOption);
        }
        if (questionType === 'generalQuestion') {
            questionsData += getGeneralQuestion(question.question, question.isRequired, question.questionDescription);
        };
        if (questionType === 'link') {
            questionsData += getLinkForm(question.question, question.isRequired);
        }
        if (questionType === 'contactNumber') {
            questionsData += getContactNumberForm(question.question, question.isRequired);
        }
    });
    return questionsData;
}

module.exports = {
    setForms: setForms,
}