const form = document.querySelector('#form');
// const div = document.querySelector('.result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { after, before } = event.target;

  const link = `/covid?after=${after.value}&before=${before.value}`;

  const response = await fetch(link); // по умолчанию GET

  const url = await response.text();
  console.log('client', url);
  window.location.assign(url);

  // const totalResult = data.data.reduce((sum, el) => sum + el.change_fatalities, 0);
  // const div = document.querySelector('.result');
  // div.textContent = `${totalResult}`;
});
