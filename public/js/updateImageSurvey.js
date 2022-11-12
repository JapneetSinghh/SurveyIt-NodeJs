const imageContainer = document.getElementById('thumbnailImage');
const updateImageLinkBtn = document.getElementById('updateImageLink');
const imageLinkInput = document.getElementById('toBeUpdated');

updateImageLinkBtn.addEventListener("click", () => {
    imageContainer.src=imageLinkInput.value;
})



