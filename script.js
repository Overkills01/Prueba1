document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("background-music");
  backgroundMusic.play();

  // Mostrar mensaje de bienvenida en una ventana modal sin vibración al cargar la página
  mostrarMensajeModal("<div style='font-size: 24px;'>¡Bienvenido!<br><br></div><div style='font-size: 18px;'>Éste es mi encriptador y desencriptador de texto. ¡Que lo disfrutes!<br><br>Por cierto, hay un mensaje oculto.</div>", false);


  // Reproduce la música de fondo al cargar la página
  backgroundMusic.play();
});

// Define las variables para las músicas
let backgroundMusic = document.getElementById("background-music");
let scaryMusic = document.getElementById("scary-music");

// Función para cambiar la música de fondo
function cambiarMusica() {
  backgroundMusic.pause(); // Detiene la música actual
  backgroundMusic.currentTime = 0; // Reinicia la reproducción al principio
  scaryMusic.play(); // Reproduce la nueva música
}

// Función para detener la música de miedo
function detenerMusica() {
  scaryMusic.pause(); // Detiene la música de miedo
  scaryMusic.currentTime = 0; // Reinicia la reproducción al principio
  backgroundMusic.play(); // Vuelve a reproducir la música de fondo original
}

// Event list para el botón "Libérame"
document.getElementById("liberameButton").addEventListener("click", function() {
  detenerMusica();
});

// Función para mostrar la ventana modal con un mensaje
function mostrarMensajeModal(mensaje, agregarVibracion = true) {
  document.getElementById('modal-message').innerHTML = mensaje;
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';

  // Agrega la clase 'vibrar' durante un breve período, si es necesario
  if (agregarVibracion) {
    modal.classList.add('vibrar');
    setTimeout(() => {
      modal.classList.remove('vibrar');
    }, 500);
  }

  // Limpiar el textarea en caso de mensaje de error
  const inputTexto = document.getElementById("inputTexto");
  if (mensaje.includes("Lo siento, sólo se admiten letras minúsculas.")) {
    inputTexto.value = '';
  }
}

// Función para cerrar la ventana modal
function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

let errorCount = 0; // Contador de errores

function mostrarMensajeModalConContador(mensaje, agregarVibracion = true) {
  mostrarMensajeModal(mensaje, agregarVibracion);

  // Incrementar el contador de errores
  errorCount++;

  // Verificar si se han mostrado 5 ventanas modales seguidas
  if (errorCount === 5) {
    // Mostrar el mensaje correspondiente en la sexta ventana modal
    mostrarMensajeModal("Creo que he sido bastante claro.", agregarVibracion);
  } else if (errorCount === 6) {
    // Mostrar el mensaje correspondiente en la séptima ventana modal
    mostrarMensajeModal("¡En serio! ¿Piensas continuar con lo mismo?", agregarVibracion);
  } else if (errorCount === 7) {
    // Mostrar el mensaje correspondiente en la octava ventana modal
    mostrarMensajeModal("Última advertencia... NO LO HAGAS.", agregarVibracion);
  } else if (errorCount === 8) {
    // Mostrar el mensaje correspondiente en la novena ventana modal
    mostrarMensajeModal("No me dejas opción.", agregarVibracion);

    // Programar la redirección después de unos segundos (por ejemplo, 3 segundos)
    setTimeout(function() {
      window.location.href = "No tienes acceso.html";
    }, 1);
  }
}

// Función para cerrar la ventana modal y reiniciar el contador de errores
function cerrarModalConContador() {
  if (errorCount >= 5 && errorCount < 8) {
    cerrarModal();
    errorCount = 4; // Reiniciar el contador de errores para que muestre los últimos 4 mensajes
    verificarErrores(); // Mostrar el próximo mensaje en secuencia
  }
}


function encriptarTexto() {
  const inputTexto = document.getElementById("inputTexto").value;

  // Verificar si hay caracteres no permitidos
  if (!validarEntrada(inputTexto)) {
    mostrarMensajeModalConContador("Lo siento, sólo se admiten letras minúsculas.");
    return;
  }

  const resultado = encryptText(inputTexto.toLowerCase());
  document.getElementById("outputTexto").value = resultado;

  // Mostrar el botón de copiar después de encriptar
  mostrarBotonCopiar();
}

function desencriptarTexto() {
  const inputTexto = document.getElementById("inputTexto").value;

  // Verificar si hay caracteres no permitidos
  if (!validarEntrada(inputTexto)) {
    mostrarMensajeModalConContador("Lo siento, sólo se admiten letras minúsculas.");
    return;
  }

  const resultado = decryptText(inputTexto.toLowerCase());
  document.getElementById("outputTexto").value = resultado;

  // Mostrar el botón de copiar después de desencriptar
  mostrarBotonCopiar();
}

function validarEntrada(texto) {
  // Utiliza una expresión regular para verificar si solo hay letras minúsculas
  return /^[a-zñ\s!]+$/m.test(texto);
}

function encryptText(text) {
  return text
      .replace(/e/g, "enter")
      .replace(/i/g, "imes")
      .replace(/a/g, "ai")
      .replace(/o/g, "ober")
      .replace(/u/g, "ufat");
}

function decryptText(text) {
  return text
      .replace(/ufat/g, "u")
      .replace(/ober/g, "o")
      .replace(/imes/g, "i")
      .replace(/enter/g, "e")
      .replace(/ai/g, "a");
}


function copyToClipboard() {
  const outputTexto = document.getElementById("outputTexto");
  const inputTexto = document.getElementById("inputTexto");

  // Copiar el texto al portapapeles
  outputTexto.select();
  document.execCommand("copy");

  // Mostrar la ventana modal sin vibración
  mostrarMensajeModal("Texto copiado con éxito", false);

  // Ocultar el botón de copiar después de copiar
  ocultarBotonCopiar();

  // Limpiar los textos de input y output
  inputTexto.value = '';
  outputTexto.value = '';
}
// Event listener para detectar cambios en el inputTexto
document.getElementById("inputTexto").addEventListener("input", function() {
  // Obtener el valor del input
  const inputText = this.value;

  // Limpiar el output si el input está vacío
  if (inputText.trim() === '') {
    document.getElementById("outputTexto").value = '';
    ocultarBotonCopiar(); // Ocultar el botón de copiar
  }
});



function mostrarBotonCopiar() {
  document.querySelector('.button-copiar').style.display = 'block';
}

function ocultarBotonCopiar() {
  document.querySelector('.button-copiar').style.display = 'none';
}

function liberarVideo() {
  // Limpiar el textarea
  document.getElementById("inputTexto").value = '';

  // Reproduce el audio de interferencia
  const interferenceAudio = document.getElementById("interference-audio");
  interferenceAudio.currentTime = 0;
  interferenceAudio.play();

  // Mostrar el mensaje en el textarea
  document.getElementById("inputTexto").value = "tail venterz tenter rentersufatltenter ufatn pobercober dimesfimescimesl lenterenterr enterstenter menternsaijenter penterrober lobers pufatntobers y lais cobermais nober enterstaibain ai mimes ailcaincenter henter enterstaidober aitraipaidober entern enterstenter ufatnimesventerrsober denter boberlsimesllober poberr senterimess lairgobers dimesais ufatnai prentersenterncimesai mailimesgnai menter enterncenterrrober aiqufatimes poberdimesai venterrlobers ai toberdobers sufats sobermbrais dainzaindober entern lai penternufatmbrai penterrober naidimesenter poberdimesai venterrmenter cobermober ufatn enterspenterctrober oberlvimesdaidober entern lai enterncrufatcimesjaidai denterl timesentermpober enterstufatventer entern lai oberscufatrimesdaid limesmimesnail denterl enterspaicimesober grimestaindober mimess laimenterntobers rentersobernaindober entern lai entertenterrnimesdaid vaicimesai penterrober nimesngufatn entercober rentergrentersaibai pairai cobernsoberlairmenter tufatventer mimesenterdober denter qufatenterdair aitraipaidober aiqufatimes pairai simesentermprenter penterrdimesdober entern lais sobermbrais qufatenter aicenterchain entern caidai rimesncobern lobers sufatsufatrrobers denter lober denterscobernobercimesdober haiblaindober entern lenterngufatais oberlvimesdaidais sufatsufatrrobers qufatenter senter airraistraibain cobermober senterrpimesenterntenters poberr mimes menterntenter penterrober tufat vimesaijenterrober denter ailmais vailimesenterntenters hais simesdober mimes lufatz entern enterstai noberchenter imesntenterrmimesnaiblenter graicimesais poberr airraincairmenter denter enterstenter imesnfimesenterrnober aibsoberlufattober y dentervoberlventerrmenter ail mufatndober denter lobers vimesvobers tenter enterstairenter aigraidentercimesdober poberr simesentermprenter aidimesobers"
  
  
  

  // Ocultar los botones de encriptar y desencriptar
  document.getElementById("encriptarButton").style.display = "none";
  document.getElementById("desencriptarButton").style.display = "none";

  // Mostrar el botón Libérame
  document.getElementById("liberameButton").style.display = "block";

  // Ocultar todos los elementos excepto el video y el botón Libérame
  const elementos = document.querySelectorAll('header, main, footer, #liberameButton');
  elementos.forEach(elemento => {
      elemento.style.display = 'none';
  });

  // Mostrar el video
  const video = document.getElementById("glitchVideo");
  video.style.display = "block";
  video.play();

  // Ocultar el video después de que termine de reproducirse
  video.addEventListener('ended', () => {
    video.pause();
    video.style.display = "none";

    // Restaurar la visualización de los elementos y los botones de encriptar y desencriptar
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const encriptarButton = document.getElementById("encriptarButton");
    const desencriptarButton = document.getElementById("desencriptarButton");
    const liberameButton = document.getElementById("liberameButton");
    
    header.style.display = 'flex';
    main.style.display = 'flex';
    footer.style.display = 'flex';
    encriptarButton.style.display = 'inline-block';
    desencriptarButton.style.display = 'inline-block';
    liberameButton.style.display = 'none';
  });
}

// Event listener para reconocer la palabra MIEDO en el input
document.getElementById("inputTexto").addEventListener("input", function() {
  if (this.value.trim() === "MIEDO") {
    cambiarMusica();
    document.getElementById("encriptarButton").style.display = "none";
    document.getElementById("desencriptarButton").style.display = "none";
    document.getElementById("liberameButton").style.display = "block";
  } else {
    backgroundMusic.play(); // Reproducir música de fondo si no es "MIEDO"
    detenerMusica();
    document.getElementById("encriptarButton").style.display = "inline-block";
    document.getElementById("desencriptarButton").style.display = "inline-block";
    document.getElementById("liberameButton").style.display = "none";
  }
});

// Ocultar el botón de copiar al cargar la página
ocultarBotonCopiar();

// Aqui comienza el código para el fondo
document.addEventListener("DOMContentLoaded", function () {
  const container = document.createElement("div");
  container.id = "floating-letters-container";
  document.body.appendChild(container);

  let totalLetters;
  const windowWidth = window.innerWidth;

  // Definir cuántas letras en función del tamaño de la pantalla
  if (windowWidth < 740) {
    totalLetters = 10;
  } else {
    totalLetters = 100;
  }

  const initialFadeCount = Math.floor(totalLetters * 0.5); // 60% of letters will start semi-faded

  for (let i = 0; i < totalLetters; i++) {
    const isSemiFaded = i < initialFadeCount;
    createMovingLetter(container, isSemiFaded);
  }

  setTimeout(function () {
    startContinuousFadeEffect();
  }, 3000);

  function startContinuousFadeEffect() {
    const letters = document.querySelectorAll(".moving-letter");
    letters.forEach(function (letter) {
      addContinuousFadeEffect(letter);
    });
  }

  function createMovingLetter(container, isSemiFaded) {
    const letter = document.createElement("div");
    letter.className = "moving-letter";
    const isReversed = Math.random() < 0.5;
    letter.textContent = isReversed
      ? getRandomLetter().split("").reverse().join("")
      : getRandomLetter();
    container.appendChild(letter);

    letter.style.left = `${Math.random() * 100}vw`;
    letter.style.top = `${Math.random() * 100}vh`;
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;
    const fontSize = Math.random() * (30 - 16) + 16;
    letter.style.fontSize = `${fontSize}px`;

    moveLetter(letter, speedX, speedY);
    addHoverEffect(letter);

    if (isSemiFaded) {
      letter.style.opacity = 0.3;
    } else {
      addContinuousFadeEffect(letter);
    }
  }

  function moveLetter(letter, speedX, speedY) {
    function move() {
      const rect = letter.getBoundingClientRect();
      const newX = rect.left + speedX;
      const newY = rect.top + speedY;

      if (newX + rect.width < 0) {
        letter.style.left = `${window.innerWidth}px`;
      } else if (newX > window.innerWidth) {
        letter.style.left = `-${rect.width}px`;
      } else {
        letter.style.left = `${newX}px`;
      }

      if (newY + rect.height < 0) {
        letter.style.top = `${window.innerHeight}px`;
      } else if (newY > window.innerHeight) {
        letter.style.top = `-${rect.height}px`;
      } else {
        letter.style.top = `${newY}px`;
      }

      requestAnimationFrame(move);
    }

    move();
  }

  function addHoverEffect(letter) {
    letter.addEventListener("mouseover", function () {
      if (letter.dataset.isWord === "true") {
        letter.textContent = getRandomLetter();
        letter.dataset.isWord = "false";
      } else {
        letter.innerHTML = getRandomWord();
        letter.dataset.isWord = "true";
      }
    });
  }

  function addContinuousFadeEffect(letter) {
    setInterval(function () {
      fadeOut(letter, function () {
        fadeIn(letter);
      });
    }, Math.random() * 5000 + 2000);
  }

  function fadeOut(element, callback) {
    let opacity = 1;
    const fadeOutInterval = setInterval(function () {
      if (opacity > 0) {
        opacity -= 0.1;
        element.style.opacity = opacity;
      } else {
        clearInterval(fadeOutInterval);
        callback();
      }
    }, 100);
  }

  function fadeIn(element) {
    let opacity = 0;
    const fadeInInterval = setInterval(function () {
      if (opacity < 1) {
        opacity += 0.1;
        element.style.opacity = opacity;
      } else {
        clearInterval(fadeInInterval);
      }
    }, 100);
  }

  function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  function getRandomWord() {
    const words = [
      "<span style='color:red;'>M</span>urmullos",
      "<span style='color:red;'>I</span>nsondable",
      "<span style='color:red;'>E</span>nigmas",
      "<span style='color:red;'>D</span>esconocido",
      "<span style='color:red;'>O</span>scuridad",
      "Encuéntralo",
      "Mensaje",
      "Secreto",
      "Lo puedes ver?",
      "Ecos",
      "Olvido",
      "Abismo",
      "Quimera",
      "Susurro",
      "Ellos lo saben",
      "Vida",
      "Quien eres?",
      "No lo sabes",
      "Ya estan aqui",
      "Decifralo",
      "Cuidado",
      "No le creas"
    ];
    return words[Math.floor(Math.random() * words.length)];
  }
});
// Función para ajustar el zoom
function ajustarZoom() {
  // Obtener la altura de la pantalla
  var screenHeight = window.screen.height;
  
  // Definir la altura máxima para reducir el zoom (1080p es 1920x1080)
  var maxScreenHeight = 1080;
  
  // Calcular el factor de escala
  var scale = screenHeight > maxScreenHeight ? 1 : 0.7;
  
  // Aplicar el zoom
  document.body.style.zoom = scale * 100 + '%';
}

// Llamar a la función cuando se cargue la página
window.onload = ajustarZoom;
