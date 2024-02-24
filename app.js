const btn1=document.getElementById('btn1');
const result=document.getElementById('result');

btn1.addEventListener('click', function(){
    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(function(response){
        return response.json()
    })
    .then((response)=>{
        console.log(response);
        const h3=document.createElement('h3');
        const h2=document.createElement('h2');
        const p=document.createElement('p');
        const br=document.createElement('br');

        h3.textContent=`User id : ${response.id}`;
        h3.classList.add('userId');
        result.appendChild(h3);
        result.appendChild(br);
        
        h2.textContent=`User Title : ${response.title}`;
        h2.classList.add('userTitle');
        result.appendChild(h2);
        result.appendChild(br);

        p.textContent=`User Body : ${response.body}`;
        p.classList.add('userbody');
        result.appendChild(p);
        result.appendChild(br);


    })
});