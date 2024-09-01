function hideSelf() {
  const button = document.querySelector('.hide-self-button');
  button.addEventListener('click', (event) => {
    const target = event.target;
    target.hidden = true;
  });
}
