// Initialize Firebase
// Aquí debemos incluir las credenciales de Firebase y la configuración de Firebase
import './app/firebase.js';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
	updateDoc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
 
const db = getFirestore();
const controlDocRef = doc(db, "tasks", "control");

async function addTaskToControl(tarea) {
    // Obtenemos el documento de control
    const docSnap = await getDoc(controlDocRef);
    const controlDocData = docSnap.data();
    // Actualizamos el campo "tarea" del documento de control
    await updateDoc(controlDocRef, { tarea: { ...controlDocData.tarea, ...tarea } });
}


const btnLuz = document.getElementById('btn-luz');
btnLuz.addEventListener('click', () => {
    const tarea = {
        description1: 'A',
        description2: '',
        description3: '',
        description4: '',
        description5: '',
    };
    addTaskToControl(tarea);
});

const btnfoto = document.getElementById('btn-foto');
btnfoto.addEventListener('click', () => {
    const tarea = {
        description1: '',
        description2: 'B',
        description3: '',
        description4: '',
        description5: '',
    };
    addTaskToControl(tarea);
});

const btnPlantar = document.getElementById('btn-plantar');
btnPlantar.addEventListener('click', () => {
    const tarea = {
        description1: '',
        description2: '',
        description3: 'C',
        description4: '',
        description5: '',
    };
    addTaskToControl(tarea);
});

const btnRegar = document.getElementById('btn-regar');
btnRegar.addEventListener('click', () => {
    const tarea = {
        description1: '',
        description2: '',
        description3: '',
        description4: 'D',
        description5: '',
    };
    addTaskToControl(tarea);
});

const btnIniciar = document.getElementById('btn-iniciar');
btnIniciar.addEventListener('click', () => {
    const tarea = {
        description1: '',
        description2: '',
        description3: '',
        description4: '',
        description5: 'E',
    };
    addTaskToControl(tarea);
});

