//*Load Category
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((Response) => Response.json())
      .then((data) => displayCategory(data.categories))
      .catch((error) => console.log(error));
  };
  //*Display Category
  const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categories.forEach((item) => {
      const btnContainer = document.createElement("div");
      btnContainer.innerHTML = `
          <button id='categoryBTN${item.id}' onclick="handleButton('categoryBTN${item.id}'); displayLoad() ;displayCategoryContent('${item.category}')" class=" flex items-center justify-center gap-2  px-4 py-2 rounded-full border border-teal-300 btn-wide w-full">
            <img class="w-12 h-12" src="${item.category_icon}" />
            <span class="font-medium text-teal-900">${item.category}</span>
          </button>
          `;
      categoryContainer.append(btnContainer);
    });
  };
  //* Handle Button Function
const handleButton = (buttonId) => {
    const buttons = document.querySelectorAll("#category-container button");
    buttons.forEach((button) => button.classList.remove("bg-teal-100"));
    const clickedButton = document.getElementById(buttonId);
    if (clickedButton) {
      clickedButton.classList.add("bg-teal-100");
    }
  };
  //*Load Pets
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((Response) => Response.json())
      .then((data) => {
        displayPets(data.pets);
        document.getElementById('sortBTN').addEventListener("click",() => sortPrice(data.pets));
        
      })
      .catch((error) => console.log(error));
  };
  //*Display Pets
const displayPets = (pets) => {
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = "";
    if (pets.length === 0) {
      petsContainer.classList.remove("grid");
  
      petsContainer.innerHTML = `
      <div class= "min-h-[300px] flex flex-col gap-5 justify-center items-center">
      <img src="images/error.webp" />
      <h3 class="font-bold">Oops!! No Content Here</h3>
      </div>
      `;
      return;
    } else {
      petsContainer.classList.add("grid");
    }
    pets.forEach((pet) => {
      const dataCheck = ["breed", "date_of_birth", "gender","price"];
      dataCheck.forEach((field) => {
        if (pet[field] === undefined || pet[field] === null) {
          pet[field] = "Not Available";
        }
      });
  
      const card = document.createElement("div");
      card.innerHTML = `
      <div class="w-full p-5 border border-teal-100 hover:border-teal-400 rounded-lg">
      <div class="">
      <img class="rounded-xl mb-5" src="${pet.image}"/>
  
      <h2 class="font-bold text-xl mb-3">${pet.pet_name}</h2>
  
      <div class="flex items-center gap-2">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=256w&id=2740&format=png"/>
      <p>Breed: ${pet.breed}</p>
      </div>
      
      <div class="flex items-center gap-2">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=256w&id=UTe6yKq2hvHK&format=png"/>
      <p>Birth: ${pet.date_of_birth}</p>
      </div>
  
      <div class="flex items-center gap-2">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=256w&id=1665&format=png"/>
      <p>Gender: ${pet.gender}</p>
      </div>
  
      <div class="flex items-center gap-2">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=256w&id=7172&format=png"/>
      <p>Price: ${pet.price}$</p>
      </div>
  
      <div class= "flex justify-between mt-7">
      <button class= " btn cursor-pointer border-teal-100 hover:bg-white hover:border-teal-500" onclick="getImagedata('${pet.image}')"><img class="w-5 h-5 " src="https://img.icons8.com/?size=256w&id=581&format=png"/></button>
      <button class= " btn cursor-pointer border-teal-100 hover:bg-white hover:border-teal-500" onclick="LoadCongratesModal(${pet.petId})">Adopt</button>
      <button class= " btn cursor-pointer border-teal-100 hover:bg-white hover:border-teal-500" onclick="loadModel(${pet.petId})">Details</button>
      </div>
      
    </div>
  </div>
          `;
  
      petsContainer.append(card);
    });
  };




  loadCategory();
loadPets();
