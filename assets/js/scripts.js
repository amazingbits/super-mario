const cloudsImage = document.querySelector(".clouds");
const score = document.querySelector(".score span");

function stopCloudsAnimation() {
    const cloudsCurrentPositionOnScreen = `${cloudsImage.offsetLeft}px`;
    cloudsImage.style.left = cloudsCurrentPositionOnScreen;
    cloudsImage.style.animation = "none";    
}