const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter-container button");
const filtertName = document.querySelector(".name");
const filterValue = document.querySelector(".value");
const filterSlider = document.querySelector(".filter-container input");
const rotaterOptions = document.querySelectorAll(".rotate-container button");
const previewImg = document.querySelector(".preview-img img");
const chooseImgBtn = document.querySelector(".choose-img");

let brightness = "50", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    })
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
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

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());