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

  function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#kuvaBanner')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}