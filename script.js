const newCarBtn = document.getElementById("newCarBtn");

function fetching() {
  fetch("https://surveys-5jvt.onrender.com/api/cars/")
    .then((response) => {
      if (!response.ok) {
        alert("Hiba az adatbázishoz való csatlakozáshoz!");
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
}

function display(kocsi) {
  const conatiner = document.getElementById("cars");

  conatiner.innerHTML += `
  <div class="col-lg-3 col-md-6 col-sm-12 m-2 text-center">
    <div class="card my-2 text-start" onclick="more(this)" id="${kocsi.id}">
          <img src="twilight.jpg" alt="Twilight Sparkle" class="card.img-top img-fluid"/>
          <div class="card-body">
            <h3>${kocsi.model}</h3>
          </div>
    
      </div>
        <button class="btn btn-block"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-block"><i class="bi bi-trash3-fill"></i></button>
  </div>`;
}

function more(card) {
  if (card.children.length == 2) {
    fetch(`https://surveys-5jvt.onrender.com/api/cars/${card.id}`)
      .then((response) => {
        if (!response.ok) {
          alert("Hiba az adatbázishoz való csatlakozáshoz!");
          throw new Error("Hálózat rósz");
        }
        return response.json();
      })
      .then((kocsi) => {
        card.innerHTML += `<ul>
            <li>Azonosító: ${kocsi.id}</li>
            <li>Márka: ${kocsi.brand}</li>
            <li>Gyártási év: ${kocsi.year}</li>
          </ul>`;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } else {
    card.removeChild(card.lastChild);
  }
}

function openWindow() {
  newCArWindow = window.open("newcar.html", "_blank", "width=500,height=350");
}

function closeWindow() {
  const modelInput = document.getElementById("model").value;

  const brandInput = document.getElementById("brand").value;
  const yearInput = document.getElementById("year").value;
  if (modelInput.length < 1 || brandInput.length < 1 || yearInput == "") {
    return alert("Ne hagyjon üresen mezőt!");
  }

  if (isNaN(yearInput) || yearInput < 1884 || yearInput > 2026) {
    return alert("Kérem adjon meg egy lehetséegs évszámot gyártási évnek");
  }
  let idNew = 0;

  fetch("https://surveys-5jvt.onrender.com/api/cars/")
    .then((response) => {
      if (!response.ok) {
        alert("Hiba az adatbázishoz való csatlakozáshoz!");
        throw new Error("Hálózat rósz");
      }
      return response.json();
    })
    .then((kocsi) => {
      let current = [];
      kocsi.forEach((element) => {
        current.push(element.id);
      });
      while (!current.includes(idNew)) idNew++;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  fetch("https://surveys-5jvt.onrender.com/api/cars/", {
    method: "POST",
    body: JSON.stringify({
      id: idNew,
      model: modelInput,
      brand: brandInput,
      year: yearInput,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response => response.json())
  .then(response => console.log(response))
  .then(response => window.close());
}

function reload() {
  document.getElementById("cars").innerHTML = "";
  fetching();
}
