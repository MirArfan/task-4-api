
// ............show data normally...........//
const btn1 = document.getElementById('btn1');
const result = document.getElementById('result');
let show_data_normally = true;

if (show_data_normally) {
    btn1.addEventListener('click', function () {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(function (response) {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                result.innerHTML = '';
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
            .catch(error => {
                console.log('error fatching data', error);
                result.innerHTML = error;
            })
    });
    show_data_normally = false;

}

// ............show data with Tabular formet...........//
let show_data_tabular = true;

const btn2 = document.getElementById('btn2');


let table = document.createElement("table");
table.setAttribute('border', '2');
table.classList.add('tableform');
let tableHeading = `<tr id="table-row">
    <td class="table-data"> user id</td>
    <td class="table-data"> title</td>
    <td class="table-data"> body</td>
</tr>`
table.innerHTML += tableHeading;


btn2.addEventListener('click', function () {
    if (show_data_tabular) {
        console.log("kk");
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(function (response) {
                return response.json()
            })
            .then((data) => {
                console.log(data);

                buildTable(data);

                function buildTable(data) {


                    for (let i = 0; i < data.length; i++) {
                        let row = `<tr>
                                 <td class="inner-data"> ${data[i].id}</td>
                                 <td class="inner-data"> ${data[i].title}</td>
                                 <td class="inner-data"> ${data[i].body}</td>
                            </tr>`

                        table.innerHTML += row;
                    }
                    result.appendChild(table);
                }

                show_data_tabular = false;
            })
            .catch(error => {
                console.log('error fatching data', error);
                result.innerHTML = error;
            })
    }

});


////////////     post method  ////////////

// const fom = document.getElementById('form-btn');
// fom.addEventListener('click', function(){
    
// })
// form.addEventListener('submit', function () {
   
//     // let name = document.getElementById('name').value;
//     // let body = document.getElementById('body').value;

//     // fetch('https://jsonplaceholder.typicode.com/posts', {
//     //     method: 'POST',
//     //     body: JSON.stringify({
//     //         title: name,
//     //         body: body,
           
//     //     }),
//     //     headers: {
//     //         'Content-type': 'application/json; charset=UTF-8',
//     //     },
//     // })
//     //     .then((response) => response.json())
//     //     .then((data) => console.log(data));
// });




// ....//////..  async await .... ////...

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

const getButton = document.getElementById('getPost');
const createButton = document.getElementById('createPost');
const updateButton = document.getElementById('updatePost');
const patchButton = document.getElementById('patchPost');
const deleteButton = document.getElementById('deletePost');


const getPosts = async () => {
    try {
        const response = await fetch(apiEndPoint);
        if (response.status != 200) {
            throw new Error(`some error, Status code : ${response.status}`);
        }
        const posts = await response.json();
        return posts;
    }
    catch (error) {
        console.log(error)
    }
};


getButton.addEventListener('click', async () => {
    const posts = await getPosts();
    console.log(posts);
    if (posts) {

        const table = `<table class="table">
    <thead>
      <tr>
        <th class="table-info" scope="col">ID</th>
        <th class="table-info" scope="col">Title</th>
        <th class="table-info" scope="col">Body</th>
      </tr>
    </thead>
    <tbody>
      ${posts.map((post) => `<tr>
      <th class="async-table-data" scope="row">${post.id}</th>
      <td class="async-table-data">${post.title}</td>
      <td class="async-table-data">${post.body}</td>
    </tr>`)
                .join("\n")}
      
    </tbody>
  </table>`;

        document.getElementById('table').innerHTML = table;
    }

})

/////......... create post........../////
const createPost = async (newpost) => {
    try {
        const response = await fetch(apiEndPoint, {
            method: "POST",
            body: JSON.stringify(newpost),
            headers: { "Content-type": "application/json; charset=UTF-8" },

        });
        if (response.status != 201) {
            throw new Error(`Something went wrong , Status code : ${response.status}`);

        }
        const post = await response.json();
        return post;
    }
    catch (error) {
        console.log(error);
    }
}

createButton.addEventListener("click", async () => {
    const newPost = {
        title: "New Post Title",
        body: "new post body",
        userId: 1,
    };
    const createdPost = await createPost(newPost);
    console.log(createdPost);
})



