const btn1 = document.getElementById('btn1');
const result = document.getElementById('result');

btn1.addEventListener('click', function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
            return response.json()
        })
        .then((data) => {
            console.log(data);
            result.innerHTML='';
            data.forEach((item) => {
                const h3 = document.createElement('h3');
                const h2 = document.createElement('h2');
                const p = document.createElement('p');
                const br = document.createElement('br');

                h3.innerHTML = `User id : ${item.id}`;
                h3.classList.add('userId');
                result.appendChild(h3);
                result.appendChild(br);

                h2.innerHTML = `User Title : ${item.title}`;
                h2.classList.add('userTitle');
                result.appendChild(h2);
                result.appendChild(br);

                p.innerHTML = `User Body : ${item.body}`;
                p.classList.add('userbody');
                result.appendChild(p);
                result.appendChild(br);
                result.appendChild(br);

            });


        })
        .catch(error=>{
            console.log('error fatching data', error);
            result.innerHTML=error;
        })
});