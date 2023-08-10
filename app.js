const imageContainer = document.querySelector(".image-container");
const mainImage = document.querySelector(".main-image");
const mainTitle = document.querySelector(".section__info--title");
const mainText = document.querySelector(".section__info--text_content");
const source = document.querySelector(".section__info--text_source");
const rotation = document.querySelector(".rotation_text");
const revolution = document.querySelector(".revolution_text");
const radius = document.querySelector(".radius_text");
const temperature = document.querySelector(".temperature_text");
const headerButtons = document.querySelectorAll(".nav__link");
const navList = document.querySelector(".nav__list");
const menuButton = document.querySelector(".hamburger_menu");
const sectionInfoButtons = document.querySelectorAll(".section-button");
const sectionInfoButtonsText = document.querySelectorAll(".button_text");
const rootStyles = getComputedStyle(document.documentElement);
const surfaceGeologyImg = document.createElement("img");
let currentWidth = window.innerWidth;
let data = null;

axios
  .get("data.json")
  .then((response) => {
    data = response.data;
    displayPlanetsData("EARTH");
  })
  .catch((err) => {
    console.log(err);
  });

window.addEventListener("resize", function () {
  currentWidth = window.innerWidth;
  removeStyle();
  sectionInfoButtonsStyle(mainTitle.innerText);
});

headerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    switch (button.innerText) {
      case "VENUS":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("VENUS");
        break;
      case "EARTH":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("EARTH");
        break;
      case "MARS":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("MARS");
        break;
      case "JUPITER":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("JUPITER");
        break;
      case "SATURN":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("SATURN");
        break;
      case "URANUS":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("URANUS");
        break;
      case "NEPTUNE":
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("NEPTUNE");
        break;
      default:
        removeClasses();
        removeStyle();
        removeSurfaceGeologyImg();
        displayPlanetsData("MERCURY");
    }
  });
});

function displayPlanetsData(planet) {
  const planets = [
    "MERCURY",
    "VENUS",
    "EARTH",
    "MARS",
    "JUPITER",
    "SATURN",
    "URANUS",
    "NEPTUNE",
  ];

  sectionInfoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      switch (button.classList[0]) {
        case "internal":
          // -------Display the main image---------
          removeSurfaceGeologyImg();
          mainImage.src = data[planets.indexOf(planet)].images.internal;
          mainImage.alt = `internal structure of ${planet}`;

          // -------Display the main text---------
          mainText.innerText = data[planets.indexOf(planet)].structure.content;
          source.href = data[planets.indexOf(planet)].structure.source;

          // -------Add style for button---------
          sectionInfoButtonsStyle(planet);
          break;
        case "surface":
          // -------Display the surface geology image---------
          mainImage.src = data[planets.indexOf(planet)].images.planet;
          positionSurfaceGeologyImg(planets, planet);

          // -------Display the main text---------
          mainText.innerText = data[planets.indexOf(planet)].geology.content;
          source.href = data[planets.indexOf(planet)].geology.source;

          // ------Add style for button---------
          sectionInfoButtonsStyle(planet);
          break;
        default:
          // -------Display the main image---------
          removeSurfaceGeologyImg();
          mainImage.src = data[planets.indexOf(planet)].images.planet;
          mainImage.alt = `planet ${planet}`;

          // -------Display the main text---------
          mainText.innerText = data[planets.indexOf(planet)].overview.content;
          source.href = data[planets.indexOf(planet)].overview.source;

          // -------Add style for button---------
          sectionInfoButtonsStyle(planet);
      }
    });
  });
  // -------Display the main image---------
  mainImage.src = data[planets.indexOf(planet)].images.planet;
  mainImage.alt = `planet ${planet}`;
  mainImage.classList.add(`${planet.toLowerCase()}-image`);

  // -------Display the main text---------
  mainTitle.innerText = data[planets.indexOf(planet)].name;
  mainText.innerText = data[planets.indexOf(planet)].overview.content;
  source.href = data[planets.indexOf(planet)].overview.source;

  // -------Display additional information---------
  rotation.innerText = data[planets.indexOf(planet)].rotation;
  revolution.innerText = data[planets.indexOf(planet)].revolution;
  radius.innerText = data[planets.indexOf(planet)].radius;
  temperature.innerText = data[planets.indexOf(planet)].temperature;

  // -------Add focus classes---------
  headerButtons[planets.indexOf(planet)].classList.add(
    `${planet.toLowerCase()}-focus`
  );

  // ------Add style for overview button---------
  sectionInfoButtonsStyle(planet);
}

menuButton.addEventListener("click", function () {
  navList.classList.toggle("nav__list-active");
  menuButton.classList.toggle("hamburger_menu-opacity");
});

function removeClasses() {
  headerButtons.forEach((button) => {
    button.classList.remove("mercury-focus");
    button.classList.remove("venus-focus");
    button.classList.remove("earth-focus");
    button.classList.remove("mars-focus");
    button.classList.remove("jupiter-focus");
    button.classList.remove("saturn-focus");
    button.classList.remove("uranus-focus");
    button.classList.remove("neptune-focus");
  });
  mainImage.classList.remove("mercury-image");
  mainImage.classList.remove("venus-image");
  mainImage.classList.remove("earth-image");
  mainImage.classList.remove("mars-image");
  mainImage.classList.remove("jupiter-image");
  mainImage.classList.remove("saturn-image");
  mainImage.classList.remove("uranus-image");
  mainImage.classList.remove("neptune-image");
}

function removeStyle() {
  sectionInfoButtons.forEach((button) => {
    button.style.backgroundColor = "";
    button.style.borderBottom = "";
  });
}

function removeSurfaceGeologyImg() {
  surfaceGeologyImg.remove();
}

function positionSurfaceGeologyImg(planets, planet) {
  if (planet === "JUPITER") {
    surfaceGeologyImg.style.transform = "translate(-50%, -10%)";
  } else if (planet === "SATURN") {
    surfaceGeologyImg.style.transform = "translate(-50%, -35%)";
  } else {
    surfaceGeologyImg.style.transform = "translate(-50%, 30%)";
  }
  surfaceGeologyImg.src = data[planets.indexOf(planet)].images.geology;
  mainImage.alt = `geology of planet ${planet}`;
  surfaceGeologyImg.classList.add("surface_geology-image");
  imageContainer.appendChild(surfaceGeologyImg);
}

function sectionInfoButtonsStyle(planet) {
  let colorButton = rootStyles.getPropertyValue(
    `--${planet.toLowerCase()}-color`
  );
  if (currentWidth <= 600) {
    sectionInfoButtons[0].style.borderBottom = `4px solid ${colorButton}`;
    sectionInfoButtons[0].style.backgroundColor = "transparent";
  } else {
    sectionInfoButtons[0].style.backgroundColor = colorButton;
  }
  sectionInfoButtons.forEach((button) => {
    let children = button.children;
    let spaceIndex = children[1].innerText.indexOf(" ");

    if (currentWidth <= 600 && spaceIndex !== -1) {
      children[1].innerText = children[1].innerText.slice(spaceIndex + 1);
    } else {
      sectionInfoButtonsText[1].innerText = "INTERNAL STRUCTURE";
      sectionInfoButtonsText[2].innerText = "SURFACE GEOLOGY";
    }

    button.addEventListener("click", function () {
      removeStyle();
      if (currentWidth <= 600) {
        button.style.borderBottom = `4px solid ${colorButton}`;
        button.style.backgroundColor = "transparent";
      } else {
        button.style.backgroundColor = colorButton;
      }
    });
  });
}
