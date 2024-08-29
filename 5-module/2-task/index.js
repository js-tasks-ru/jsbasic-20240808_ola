function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');
  button.addEventListener('click', (event) => {
    text.hidden = text.hidden ? false : true;
  });
}
