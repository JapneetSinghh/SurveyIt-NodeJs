
const setOptions = () => {
    if (document.querySelectorAll('.answerMarked')) {
        answers = document.querySelectorAll('.answerMarked');
        console.log(answers);
        answers.forEach(answerMarked => {
            const correctOption = answerMarked.nextSibling.nextSibling.nextSibling.nextSibling;
            if (answerMarked.value === correctOption.value) {
                const status = correctOption.closest('.survey-form').querySelector('.answerStatus');
                status.innerHTML = '<i class="bi bi-check2"></i>';
                correctOption.classList.add('correctAnswerMarked');
            } else {
                const status = correctOption.closest('.survey-form').querySelector('.answerStatus');
                status.innerHTML = '<i class="bi bi-x"></i>';
                status.style.color = 'red';
                correctOption.classList.add('incorrectAnswerMarked');
            }
        });
    }
}
setOptions();