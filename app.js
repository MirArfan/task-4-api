
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


/////........form section for POST method ......////
const msg_btn = document.getElementById('msg-btn');


let formVisible = false;

msg_btn.addEventListener("click", function () {
    if (!formVisible) {
        const form_div = document.createElement("div");
        form_div.style.display = "flex";
        form_div.style.justifyContent = "center";
        form_div.style.alignItems = "center";
        form_div.style.maxWidth = "1440px";
        // form_div.style.height = "40vh";
        form_div.style.margin = "0 auto";
        // form_div.style.width = "100vh";
        form_div.style.padding = "20px";
        form_div.style.borderRadius = "5px";

        form_div.innerHTML = `
    <form id="contact-form">
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name" required style="width: 400px; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; "><br>
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" required style="width: 400px; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box;"><br>
    <label for="message">Message:</label><br>
    <textarea id="message" name="message" placeholder="Optional" style="width: 400px; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box;"></textarea><br>
    <button class="form-submit-btn" type="submit" style="width: 100px; padding: 10px; border: none; border-radius: 3px; background-color: #007bff; color: #fff; cursor: pointer;">Submit</button>
</form>
    `;

        msg_btn.insertAdjacentElement('afterend', form_div);

        const contact_form = document.getElementById('contact-form');
        contact_form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(contact_form);
            const formValues = Object.fromEntries(formData.entries());
            console.log(formValues);
            contact_form.reset();

            fetch(apiEndPoint, {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    console.log('Form submitted successfully');

                } else {
                    console.error('Form submission failed');

                }
            }).catch(error => {
                console.error('Error submitting form:', error);
            });
        });
        formVisible = true;
    }
    else {
        const form_div = document.getElementById('contact-form');
        if (form_div) {
            form_div.remove();
        }
        formVisible = false;
    }
});



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

let create_btn2 = true;
// const createButton=document.getElementById('createPost');


createButton.addEventListener("click", async () => {
    if (create_btn2) {
        try {
            const form_div = document.createElement("div");
            form_div.style.display = "flex";
            form_div.style.justifyContent = "center";
            form_div.style.alignItems = "center";
            form_div.style.maxWidth = "1440px";
            // form_div.style.height = "40vh";
            form_div.style.margin = "0 auto";
            // form_div.style.width = "100vh";
            form_div.style.padding = "20px";
            form_div.style.borderRadius = "5px";

            form_div.innerHTML = `
            <form id="contact-form">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required style="width: 400px; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; "><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required style="width: 400px; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box;"><br>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message" placeholder="Optional" style="width: 400px; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box;"></textarea><br>
            <button class="form-submit-btn" type="submit" style="width: 100px; padding: 10px; border: none; border-radius: 3px; background-color: #007bff; color: #fff; cursor: pointer;">Submit</button>
        </form>
    `;

            createButton.insertAdjacentElement('afterend', form_div);

            const contact_form = document.getElementById('contact-form');
            contact_form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const formData = new FormData(contact_form);
                const formValues = Object.fromEntries(formData.entries());
                console.log(formValues);
                contact_form.reset();

                try {
                    const createdPost = await createPost(formValues);
                    console.log(createdPost);
                } catch (error) {
                    console.error("Failed to create post:", error);
                }
            });

            create_btn2 = false;
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        const form_div = document.getElementById('contact-form');
        if (form_div) {
            form_div.remove();
        }
        create_btn2 = true;
    }
});