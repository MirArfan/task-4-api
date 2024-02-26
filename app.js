
// ............show data normally...........//
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



// ............show data with Tabular formet...........//


const btn2 = document.getElementById('btn2');


let table = document.createElement("table");
table.setAttribute('border', '2');
table.classList.add('tableform');
let tableHeading = `<tr id="table-row">
    <td class="table-data"> user id</td>
    <td class="table-data"> title</td>
    <td class="table-data"> body</td>
</tr>`
table.innerHTML+=tableHeading;


btn2.addEventListener('click', function () {
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


        })
        .catch(error => {
            console.log('error fatching data', error);
            result.innerHTML = error;
        })
});



// ....//////..  async await .... ////...

const apiEndPoint= "https://jsonplaceholder.typicode.com/posts";

const getButton=document.getElementById('getPost');
const createButton=document.getElementById('createPost');
const updateButton=document.getElementById('updatePost');
const patchButton=document.getElementById('patchPost');
const deleteButton=document.getElementById('deletePost');


const getPosts= async ()=>{
    try{
        const response =await fetch(apiEndPoint);
        if(response.status!=200)
        {
            throw new Error(`some error, Status code : ${response.status}`);
        }
        const posts=await response.json();
        return posts;
    }
    catch(error){
        console.log(error)
    }
};


getButton.addEventListener('click',async ()=>{
   const posts=await getPosts();
   if(posts){

    const table=`<table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col">Body</th>
      </tr>
    </thead>
    <tbody>
      ${posts.map((post)=>`<tr>
      <th class="async-table-data" scope="row">${post.id}</th>
      <td class="async-table-data">${post.title}</td>
      <td class="async-table-data">${post.body}</td>
    </tr>`)
.join("\n")}
      
    </tbody>
  </table>`;
   
  document.getElementById('table').innerHTML=table;
   }
  
})