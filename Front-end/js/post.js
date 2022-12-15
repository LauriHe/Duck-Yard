'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

let form = document.querySelector('#postForm');
let button = document.querySelector('#postbtn');


form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(form);
    const category = data.category;
    const kunto = data.kunto;
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
    /* const fetchOptions2 = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: id, category, id, kunto,
    };
    const response2 = await fetch(url + '/post', fetchOptions2);
    const json2 = await response2.json();
    alert(json2.message); */
  });