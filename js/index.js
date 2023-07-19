const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter-container button");
const filtertName = document.querySelector(".name");
const filterValue = document.querySelector(".value");
const filterSlider = document.querySelector(".filter-container input");
const rotaterOptions = document.querySelectorAll(".rotate-container button");
const previewImg = document.querySelector(".preview-img img");
const resetFilterBtn = document.querySelector(".reset-filter");
const chooseImgBtn = document.querySelector(".choose-img");
const downloadImgBtn = document.querySelector(".download-img");

let brightness = "50", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    })
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) grayscale(${grayscale}%)`;
}

filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filtertName.innerText = option.innerText;

        if (option.id === "brightness") {
            filterSlider.max = "100";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter-container .active");

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}

rotaterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else if (option.id === "vertical") {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    })
});

const resetFilter = () => {
    brightness = "50", grayscale = "0";
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

const downloadImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg"
    link.href = canvas.toDataURL();
    link.click();
}

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
downloadImgBtn.addEventListener("click", downloadImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());