const firePixelsArray = [];
const fireWidth = 10;
const fireHeight = 10;

function start() {
  createFireStructure();
  createFireSource();
  renderFire();

  setInterval(calculateFirePropagation, 1000);
}

function createFireStructure() {
  const numberOfPixels = fireHeight * fireWidth;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0;
  }
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + fireWidth * row;
      updateFireIntensityPerPixel(pixelIndex)
    }
  }

  renderFire( )
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth;
  if (belowPixelIndex >= fireHeight * fireWidth) {
    return;
  }

  const decay = 1;
  const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
  const newfireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

  firePixelsArray[currentPixelIndex] = newfireIntensity;
}

function renderFire() {
  let html = '<table cellpadding=0 cellspacing=0">';

  for (let row = 0; row < fireHeight; row++) {
    html += '<tr">';

    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + fireWidth * row;
      const fireIntensity = firePixelsArray[pixelIndex];

      html += "<td>";
      html += `<div class="pixel-index">${pixelIndex}</div>`;
      html += fireIntensity;
      html += "</td>";
    }

    html += "</tr>";
  }

  html += "</table>";
  document.querySelector("#fireCanvas").innerHTML = html;
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIdenx = fireWidth * fireHeight;
    const pixelIndex = overflowPixelIdenx - fireWidth + column;

    firePixelsArray[pixelIndex] = 36;
  }
}

start();
