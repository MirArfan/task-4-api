
self.addEventListener('message', async function(e) {
    let apiUrl = e.data;
    console.log(apiUrl);
    try {
        const response = await fetch(apiUrl);
        if (response.status != 200) {
            throw new Error(`some error, Status code : ${response.status}`);
        }
        const posts = await response.json();
        self.postMessage(posts);
    }
    catch (error) {
        console.log(error)
        self.postMessage({ error: error.message })
    }
  
    
});
