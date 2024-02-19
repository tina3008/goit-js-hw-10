const formSet = document.querySelector('.feedback-form');
const inputinfo = formSet.elements.email;
const areainfo = formSet.elements.message;
let saveinfo = { email: '', message: '' };

const parsedinfo = JSON.parse(localStorage.getItem('feedback-form-state'));

if (parsedinfo !== null) {
  areainfo.value = parsedinfo.message;
  inputinfo.value = parsedinfo.email;

  saveinfo = parsedinfo;
}

formSet.addEventListener('input', event => {
  const email = event.currentTarget.elements.email.value;
  const message = event.currentTarget.elements.message.value;

  saveinfo.email = email.trim();
  saveinfo.message = message.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(saveinfo));
});

formSet.addEventListener('submit', evt => {
  evt.preventDefault();

  if (saveinfo.email.length == 0 || saveinfo.message.length == 0) {
    console.log(`please fill all field`);
  } else {
    console.log(saveinfo);
    localStorage.removeItem('feedback-form-state');
    formSet.reset();
    saveinfo.email = '';
    saveinfo.message = '';
  }
});
