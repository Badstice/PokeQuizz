function rdmOne() {
  const array = new Uint32Array(1);
  self.crypto.getRandomValues(array);
  const randomValue = array[0];

  return randomValue % 2 === 0 ? 1 : -1;
}

function nextInt(min, max) {
  const array = new Uint32Array(1);
  self.crypto.getRandomValues(array);
  const randomValue = array[0];
  return Math.floor((randomValue / 4294967295) * (max - min)) + min;
}

function shuffleArray(arr) {
  arr.sort(() => rdmOne());
  return arr;
}

function rdmBool() {
  return rdmOne() > 0;
}

function getRdm(array) {
  return shuffleArray(array)[0];
}

function getPokemon(pokemonName) {
  return datas.find((p) => p.name === pokemonName);
}

function checkName(name) {
  const replaces = {
    e: ["é", "è", "ê"],
  };
  for (const key in replaces) {
    if (Object.hasOwnProperty.call(replaces, key)) {
      const values = replaces[key];
      name = name.replace(new RegExp(values.join("|"), "ig"), key);
    }
  }
  return name.toLowerCase();
}

function getTypeUrl(type) {
  return `https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${checkName(
    type
  )}.png`;
}

function remove(array, elmt) {
  const index = array.indexOf(elmt);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

function replaceNonWhiteWithBlack(imageElement) {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set the canvas dimensions to match the image
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  // Draw the image onto the canvas
  ctx.drawImage(imageElement, 0, 0);

  // Get the image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Define the RGB values for white
  const whiteR = 255;
  const whiteG = 255;
  const whiteB = 255;

  // Loop through each pixel
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]; // Red channel value
    const green = data[i + 1]; // Green channel value
    const blue = data[i + 2]; // Blue channel value

    // If the pixel is not white, set it to black
    if (red !== whiteR || green !== whiteG || blue !== whiteB) {
      data[i] = 0; // Red
      data[i + 1] = 0; // Green
      data[i + 2] = 0; // Blue
    }
  }

  // Put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Replace the original image with the modified one
  imageElement.src = canvas.toDataURL("image/png");
}
