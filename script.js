let highlight = false;
let selectedCard = null;

fetch("https://surveys-5jvt.onrender.com/api/cars/")
  .then((response) => {
    if (!response.ok) {
      alert("Hiba az adatbázishoz való csatlakozáshoz!")
      throw new Error("Hálózat rósz");
    }
    return response.json();
  })
  .then((kocsi) => {
    console.log(kocsi.length);
    for (let i = 0; i < kocsi.length; i++) {
      display(kocsi[i]);
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function display(kocsi) {
  const conatiner = document.getElementById("cars");

  conatiner.innerHTML += `<div class="card col-lg-3 col-md-6 col-sm-12 m-2 " onclick="more(this)" id="${kocsi.id}">
        <img src="twilight.jpg" alt="Twilight Sparkle" class="card.img-top img-fluid"/>
        <div class="card-body">
          <h3>${kocsi.model}</h3>
        </div>
      </div>`;
}

function more(card) {
  if (card.children.length == 2) {
    fetch(`https://surveys-5jvt.onrender.com/api/cars/${card.id}`)
      .then((response) => {
        if (!response.ok) {
          alert("Hiba az adatbázishoz való csatlakozáshoz!")
          throw new Error("Hálózat rósz");
        }
        return response.json();
      })
      .then((kocsi) => {
        
        highlight = true;
        card.innerHTML += `<ul>
            <li>${kocsi.id}</li>
            <li>${kocsi.brand}</li>
            <li>${kocsi.year}</li>
          </ul>`
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  else
  {
    card.removeChild(card.lastChild)
    highlight = false
  }
}


function openWindow(){
    window.open("newcar.html","_blank","width=500,height=800")
}

function closeWindow()
{
    window.close()
}