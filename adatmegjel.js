fetch("https://surveys-5jvt.onrender.com/api/cars/")
.then(response => {
    if(!response.ok)
    {
        throw new Error ('Hálózat rósz')
    }
    return response.json()
})
.then(kocsi => {
    console.log(kocsi.length)
    for (let i = 0; i < kocsi.length; i++)
    {
        display(kocsi[i])
    }
}).catch(error => {
console.error('There was a problem with the fetch operation:', error);
});

