const image = document.querySelector("img");

axios
  .get("data.json")
  .then((response) => {
    console.log(response.data[0]);
    image.src = response.data[0].images.planet;
  })
  .catch((err) => {
    console.log(err);
  });
