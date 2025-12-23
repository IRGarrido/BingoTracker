const mainContainer = document.querySelector(".container-bingo");
const chosenNumbers = [];
const notChosen = [];

// Preencher a tabela bingo com os 75 números
const createTabel = () => {
  const numberSheet = document.querySelector("#container-numbers");
  numberSheet.innerHTML = "";

  for (let i = 1; i <= 75; i++) {
    const cell = document.createElement("button");
    cell.className = `number`;
    cell.id = `${i}`;
    cell.textContent = i;
    notChosen.push(i);

    numberSheet.appendChild(cell);
  }
};

createTabel();

// Atualizar último número
const lastNumberUpdate = (number) => {
  const lastNumber = document.querySelector(".last-number");

  if (number > 0 && number <= 15) {
    lastNumber.innerText = "B" + number.toString().padStart(2, "0");
  } else if (number <= 30) {
    lastNumber.innerText = "I" + number;
  } else if (number <= 45) {
    lastNumber.innerText = "N" + number;
  } else if (number <= 60) {
    lastNumber.innerText = "G" + number;
  } else {
    lastNumber.innerText = "O" + number;
  }
};

// Seleção de número
const choseNumber = (number) => {
  number.classList.add("chosen");
  chosenNumbers.push(Number(number.id));
  notChosen.splice(notChosen.indexOf(Number(number.id)), 1);
  lastNumberUpdate(Number(number.id));
};

// Remoção de número
const removeNumber = (number) => {
  // Gerar alerta
  const alert = `<div class="alert">
        <p> Deseja remover o número ${number.id}?</p>
        <div class="container-options">
            <button class="option back"> Voltar </button>
            <button class="option remove"> Remover </button>
        </div>
    </div>`;

  const parser = new DOMParser();

  const htmlTemplate = parser.parseFromString(alert, "text/html");

  const alertBox = htmlTemplate.querySelector(".alert");

  mainContainer.appendChild(alertBox);

  const backOption = document.querySelector(".back");
  const removeOption = document.querySelector(".remove");

  // Voltar
  backOption.addEventListener("click", (e) => {
    e.preventDefault();
    alertBox.remove();
  });

  // Remoção confirmada
  removeOption.addEventListener("click", (e) => {
    e.preventDefault();

    number.classList.remove("chosen");

    // Se número for o último escolhido
    if (Number(number.id) == chosenNumbers[chosenNumbers.length - 1]) {
      // Se houver um anterior
      if (chosenNumbers[chosenNumbers.length - 2]) {
        lastNumberUpdate(chosenNumbers[chosenNumbers.length - 2]);
      } else {
        const lastNumber = document.querySelector(".last-number");
        lastNumber.innerText = "";
      }

      chosenNumbers.pop();
    } else {
      chosenNumbers.splice(chosenNumbers.indexOf(Number(number.id)), 1);
    }

    notChosen.push(Number(number.id));
    alertBox.remove();
  });
  return;
};

// Botões
const bingoButton = document.querySelector("#bingo");
const clearButton = document.querySelector("#reset");
const newNumberButton = document.querySelector("#new-number");

// Comemoração
const celebrate = () => {
  const celebrationContainer = document.createElement("div");
  celebrationContainer.classList.add("celebration-container");

  const celebrationImage = document.createElement("img");
  celebrationImage.classList.add("celebration");

  celebrationImage.src = "img/Bingo.png";
  celebrationImage.alt = "Imagem gerada por IA comemorativa de bingo";

  celebrationContainer.appendChild(celebrationImage);
  mainContainer.appendChild(celebrationContainer);

  celebrationContainer.addEventListener("click", (e) => {
    e.preventDefault();
    celebrationContainer.remove();
  });
};

const clear = () => {
  // Gerar alerta
  const alert = `<div class="alert">
    <p> Deseja remover TODOS OS NÚMEROS?</p>
    <div class="container-options">
        <button class="option back"> Voltar </button>
        <button class="option remove"> Remover </button>
    </div>
    </div>`;

  const parser = new DOMParser();

  const htmlTemplate = parser.parseFromString(alert, "text/html");

  const alertBox = htmlTemplate.querySelector(".alert");

  mainContainer.appendChild(alertBox);

  const backOption = document.querySelector(".back");
  const removeOption = document.querySelector(".remove");

  backOption.addEventListener("click", (e) => {
    e.preventDefault();
    alertBox.remove();
  });

  removeOption.addEventListener("click", () => {
    location.reload();
  });
};

// Event listener do click nos números
const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    if (number.classList.contains("chosen")) {
      removeNumber(number);
    } else {
      choseNumber(number);
    }
  });
});

// Gerar novo número
const generateNumber = () => {
  if (notChosen.length == 0) {
    celebrate();
    return;
  }

  let newNumber = notChosen[Math.floor(Math.random() * notChosen.length)];
  console.log(newNumber);

  const numberEl = document.getElementById(`${newNumber}`);
  choseNumber(numberEl);
};

// Event listener dos botões
bingoButton.addEventListener("click", (e) => {
  e.preventDefault();
  celebrate();
});
clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  clear();
});
newNumberButton.addEventListener("click", (e) => {
  e.preventDefault();
  generateNumber();
});
