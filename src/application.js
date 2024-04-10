import axios from 'axios';

const check = (str) => {
  if (str.trim(' ').length > 0) {
    return true;
  }
  return false;
};

const state = {
  validateName: false,
  validateEmail: false,
};

// g@s

const check2 = (str) => {
  const checkmate = str.split('');
  const jopa = checkmate.indexOf('@');
  // str[jopa-1] str[jopa+1]
  console.log(checkmate);
  if (str.trim(' ').length > 0 && str[jopa - 1] && str[jopa + 1]) {
    return true;
  }
  return false;
};

export default () => {
  const html = `<form id="registrationForm">
  <div class="form-group">
      <label for="inputName">Name</label>
      <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
  </div>
  <div class="form-group">
      <label for="inputEmail">Email</label>
      <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
  </div>
  <input type="submit" value="Submit" class="btn btn-primary">
</form>`;
  const newContain = document.querySelector('.form-container');
  newContain.innerHTML = html;
  const button = document.querySelector('.btn');
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const responce = await axios.post('/users');
    document.body.innerHTML = `<p>${responce.data.message}</p>`;
  });
  const inputEmail = document.querySelector('#inputEmail');
  const inputName = document.querySelector('#inputName');
  inputName.addEventListener('input', (e) => {
    const text = e.target.value;
    if (check(text)) {
      inputName.classList.add('is-valid');
      inputName.classList.remove('is-invalid');
      state.validateName = true;
    } else {
      inputName.classList.remove('is-valid');
      inputName.classList.add('is-invalid');
      state.validateName = false;
    }
    if (state.validateEmail && state.validateName) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
  inputEmail.addEventListener('input', (e) => {
    const text = e.target.value;
    if (check2(text)) {
      inputEmail.classList.add('is-valid');
      inputEmail.classList.remove('is-invalid');
      state.validateEmail = true;
    } else {
      inputEmail.classList.remove('is-valid');
      inputEmail.classList.add('is-invalid');
      state.validateEmail = false;
    }
    if (state.validateEmail && state.validateName) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
};
