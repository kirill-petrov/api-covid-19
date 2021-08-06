const form = document.querySelector('#form');
// const div = document.querySelector('.result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { after, before } = event.target;
  const link = `/covid?after=${after.value}&before=${before.value}`;
  const response = await fetch(link);
  const url = await response.text();

  window.location.assign(url);
});
