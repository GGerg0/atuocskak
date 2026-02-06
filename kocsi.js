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

function display(kocsi)
{
    const conatiner = document.getElementById("container")

    conatiner.innerHTML += 
    `<div class="card col-lg-3 col-md-6 col-sm-12 m-1">
        <img src="twilight.jpg" alt="Twilight Sparkle" class="card.img-top img-fluid"/>
        <div class="card-body">
          <h3>${kocsi.model}</h3>
          <ul>
            <li>${kocsi.id}</li>
            <li>${kocsi.brand}</li>
            <li>${kocsi.year}</li>
          </ul>
        </div>
      </div>`

}