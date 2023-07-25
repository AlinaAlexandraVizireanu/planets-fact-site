const mainImage = document.querySelector(".main-image");
const mainTitle = document.querySelector(".section__info--title");
const mainText = document.querySelector(".section__info--text_content");
const source = document.querySelector(".section__info--text_source");
const rotation = document.querySelector(".rotation_text");
const revolution = document.querySelector(".revolution_text");
const radius = document.querySelector(".radius_text");
const temperature = document.querySelector(".temperature_text");

axios
  .get("data.json")
  .then((response) => {
    console.log(response.data);
    // -------Display the main image---------
    mainImage.src = response.data[0].images.planet;
    mainImage.alt = "planet Mercury";

    // -------Display the main text---------
    mainTitle.innerText = response.data[0].name;
    mainText.innerText = response.data[0].overview.content;
    source.href = response.data[0].overview.source;

    // -------Display additional information---------
    rotation.innerText = response.data[0].rotation;
    revolution.innerText = response.data[0].revolution;
    radius.innerText = response.data[0].radius;
    temperature.innerText = response.data[0].temperature;
  })
  .catch((err) => {
    console.log(err);
  });
