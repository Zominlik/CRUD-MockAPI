let elWrapper = document.querySelector('.wrapper');
let elForm = document.querySelector('.form');
let elInputName = document.querySelector('.input1');
let baseUrl = 'https://64861ed1a795d24810b7ba35.mockapi.io/api';

async function rendUser() {
  try {
    let responce = await fetch(`${baseUrl}/users`);
    let users = await responce.json();
    console.log(users);

    elWrapper.innerHTML = '';
    users.reverse().forEach((user) => {
      let crButton = document.createElement('button');
      let crImg = document.createElement('img');
      crImg.setAttribute('src', user.avatar);
      crButton.textContent = 'Delete';

      let elLi = document.createElement('li');
      elLi.setAttribute('data-id', user.id);
      let elH2 = document.createElement('h2');
      elH2.textContent = user.name;
      elLi.append(elH2, crImg, crButton);
      elWrapper.append(elLi);
      crButton.addEventListener('click', async function () {
        console.log(elH2.textContent);
        let handleDelete = await fetch(`${baseUrl}/users/${elLi.dataset.id}`, {
          method: 'DELETE',
        });
        if (handleDelete.status === 200) {
          rendUser();
        } else {
          throw Error(data.statusText);
        }
      });
    });
  } catch (err) {
    console.log(err, 'Error');
  }
}
rendUser();

elForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!elInputName.value) {
    alert('Please Enter value');
  } else {
    let info = {
      name: elInputName.value,
    };
    try {
      let newUser = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      if (newUser.status === 201) {
        rendUser();
        elForm.reset();
      } else {
        throw Error('Invalid');
      }
    } catch (e) {
      alert(e);
    }
  }
});
