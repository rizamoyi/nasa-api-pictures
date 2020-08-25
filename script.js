const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
  resultsArray.forEach(result => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.textContent = result.title;
    cardTitle.classList.add('card-title');
    // Save text
    const saveText = document.createElement('p');
    saveText.textContent = 'Add To Favorites';
    saveText.classList.add('clickable');
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    cardText.classList.add('card-text');
    // Footer
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyright = document.createElement('span');
    const copyrightResult =
      result.copyright === undefined ? '' : result.copyright;
    copyright.textContent = `  ${copyrightResult}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}
// Get 10 images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiURL);
    resultsArray = await response.json();
    updateDOM();
  } catch (error) {
    // Catch Error Here
  }
}

// On Load
getNasaPictures();
