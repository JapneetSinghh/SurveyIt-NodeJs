try {
    const toggleBtn = document.getElementById("toggle-btn");
    const closeBtn = document.querySelector("#close-btn");
    const sideBar = document.getElementById("sidebar");
    const gridContainer = document.querySelector(".container");
    const footerWidth = document.getElementById('footer');
    closeBtn.addEventListener("click", () => {
        gridContainer.classList.add("hideSidebar");
        footerWidth.style.width = '100vw';
        footerWidth.style.marginLeft = '0';
    })
    toggleBtn.addEventListener("click", () => {
        gridContainer.classList.remove("hideSidebar");
    })
    document.addEventListener("DOMContentLoaded", () => {
        if (window.innerWidth <= 800) {
            gridContainer.classList.add("hideSidebar");
            footerWidth.style.width = '100vw';
            footerWidth.style.marginLeft = '0';
        }
    })


}
catch (e) {
    // console.log(e);
}