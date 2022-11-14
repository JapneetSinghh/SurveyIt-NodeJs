setTimeout(() => {
    const leftDivs = document.querySelectorAll('.survey-card-image');
    leftDivs.forEach(card => {
        card.style.height = "300px";
        card.style.height = `${card.parentElement.querySelector('.survey-card-content').offsetHeight + 20}px`;
    })

}, 300)
