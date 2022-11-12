// var deleteChoiceBtns = document.querySelectorAll('#deleteChoiceBtn');
// const addChoiceBtns = document.querySelectorAll('#addChoice');
// var serialChar = 'A';
// var serialCharNum = 65;


// const addMCQchoice = (e) => {
//     const choiceList = e.target.parentElement;
//     var newChoice = document.createElement('li');
//     newChoice.innerHTML = ` <span class="optionSerial"></span><input type="text">
//     <button id="deleteChoiceBtn" type="button"><i class="bi bi-trash"></i></button>`
//     const choiceListLi = choiceList.querySelectorAll('li');
//     var length = choiceListLi.length;
//     var targetLiItem = choiceListLi[length - 1];
//     targetLiItem.parentNode.insertBefore(newChoice, targetLiItem.nextSibling);
//     deleteChoiceBtns = document.querySelectorAll('#deleteChoiceBtn');
//     getDeleteChoiceBtns();
//     setSerialChars();
// }

// addChoiceBtns.forEach((addChoiceBtn) => {
//     addChoiceBtn.addEventListener("click", addMCQchoice);
// })

// const getDeleteChoiceBtns = () => {
//     deleteChoiceBtns.forEach(delChoiceBtn => {
//         delChoiceBtn.addEventListener("click", delChoice);
//     })
// }
// const delChoice = (e) => {
//     e.target.parentElement.parentElement.remove();
//     setSerialChars();
// }
// getDeleteChoiceBtns();

// const setSerialChars = () => {
//     const choiceList = document.querySelectorAll('#choiceList');
//     choiceList.forEach(choice => {
//         const serial = choice.querySelectorAll('.optionSerial');
//         serial.forEach(item => {
//             item.textContent = String.fromCharCode(serialCharNum);
//             serialCharNum++;
//         })
//     })
//     serialCharNum = 65;
// }
// setSerialChars();