try {
    const toggleBtn = document.getElementById("toggle-btn");
    const closeBtn = document.querySelector("#close-btn");
    const sideBar = document.getElementById("sidebar");
    const gridContainer = document.querySelector(".container");
    closeBtn.addEventListener("click", () => {
        gridContainer.classList.add("hideSidebar");
    })
    toggleBtn.addEventListener("click", () => {
        gridContainer.classList.remove("hideSidebar");
    })
    document.addEventListener("DOMContentLoaded", () => {
        if (window.innerWidth <= 800) {
            gridContainer.classList.add("hideSidebar");
        }
    })

}
catch (e) {
    // console.log(e);
}