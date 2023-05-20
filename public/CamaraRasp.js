import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { app } from "./app/firebase.js";
import { getFirestore, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const firestore = getFirestore(app);
const controlDocRef = doc(firestore, "tasks", "control");

const storage = getStorage(app);
const fileRef = ref(storage, "gs://bucket_campibot/Foto.jpg");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const numRows = 3;
const numCols = 6;

// Creamos un array vacío para almacenar las selecciones del usuario
let selection = [];
const sectionIds = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];

// Cargar la imagen y dibujar en el canvas
getDownloadURL(fileRef)
  .then((url) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Dibujar rectanuglo transparente
      const rectWidth = canvas.width / numCols;
      const rectHeight = canvas.height / numRows;
      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          const x = i * rectWidth;
          const y = j * rectHeight;
          ctx.strokeStyle = "blue";
          ctx.strokeRect(x, y, rectWidth, rectHeight);
          ctx.fillStyle = "rgba(255, 255, 255, 0)";
          ctx.fillRect(x, y, rectWidth, rectHeight);

          // Agregamos la seccionID en el centro de los rectangulos
          const id = sectionIds[i * numRows + j];
          ctx.fillStyle = "black";
          ctx.font = "20px Arial";
          ctx.fillText(id, x + rectWidth / 2, y + rectHeight / 2);
        }
      }
    };
    img.src = url;
  })
  .catch((error) => {
    console.log(error);
  });

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const col = Math.floor(x / (canvas.width / numCols));
  const row = Math.floor(y / (canvas.height / numRows));
  const index = col * numRows + row;

  if (selection.includes(index)) {
    // Si la sección ya está seleccionada, eliminarla del arreglo y dibujar un punto rojo
    selection.splice(selection.indexOf(index), 1);
    ctx.fillStyle = "red";
  } else {
    // Si la sección no está seleccionada, agregarla al arreglo y dibujar un punto verde
    selection.push(index);
    ctx.fillStyle = "green";
  }

  // Visualizar la selección dibujando un punto en el centro de la sección seleccionada
  const rectWidth = canvas.width / numCols;
  const rectHeight = canvas.height / numRows;
  const centerX = col * rectWidth + rectWidth / 2;
  const centerY = row * rectHeight + rectHeight / 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
  ctx.fill();

  // Actualizar la base de datos con el nuevo arreglo de selección
  updateDoc(controlDocRef, {
    orden: selection
  });
});
