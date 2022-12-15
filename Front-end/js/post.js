'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

let form = document.querySelector('#postForm');
let button = document.querySelector('#postbtn');


form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: data,
    };
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    alert(json.message);
  });

