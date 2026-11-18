const header = document.querySelector('header');
const section = document.querySelector('section');
const requestURL = 'https://semegenkep.github.io/json/example.json';

function populateHeader(superHeroes) {
  const title = document.createElement('h1');
  title.textContent = superHeroes.squadName;

  const description = document.createElement('p');
  description.textContent = 'Hometown: ' + superHeroes.homeTown +
    ' // Formed: ' + superHeroes.formed;

  header.replaceChildren(title, description);
}

function showHeroes(superHeroes) {
  section.replaceChildren();

  for (const hero of superHeroes.members) {
    const article = document.createElement('article');
    const name = document.createElement('h2');
    const identity = document.createElement('p');
    const age = document.createElement('p');
    const powersLabel = document.createElement('p');
    const powersList = document.createElement('ul');

    name.textContent = hero.name;
    identity.textContent = 'Secret identity: ' + hero.secretIdentity;
    age.textContent = 'Age: ' + hero.age;
    powersLabel.textContent = 'Superpowers:';

    for (const power of hero.powers) {
      const item = document.createElement('li');
      item.textContent = power;
      powersList.appendChild(item);
    }

    article.append(name, identity, age, powersLabel, powersList);
    section.appendChild(article);
  }
}

function showError(message) {
  const error = document.createElement('p');
  error.setAttribute('role', 'alert');
  error.textContent = message;
  section.replaceChildren(error);
}

const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.timeout = 15000;

request.onload = function () {
  const superHeroes = request.response;

  console.log(superHeroes);
  populateHeader(superHeroes);
  showHeroes(superHeroes);
};

request.onerror = function () {
  showError('Не вдалося отримати JSON. Перевірте підключення до Інтернету.');
};

request.ontimeout = function () {
  showError('Час очікування відповіді сервера вичерпано. Спробуйте ще раз.');
};

request.send();
