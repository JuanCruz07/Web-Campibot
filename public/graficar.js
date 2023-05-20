import { db } from "./app/firebase.js";
import {
	collection,
	doc,
	onSnapshot,
	getDoc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

import "https://cdn.jsdelivr.net/npm/chart.js";

// Configuración de las gráficas
var ctxX = document.getElementById('myChartX').getContext('2d');
var chartX = new Chart(ctxX, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Valor del sensor eje X',
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			borderColor: 'rgba(255, 99, 132, 1)',
			data: []
		}]
	},
	options: {
		scales: {
			y: {
				beginAtZero: true
			},
			x: {
				ticks: {
					autoSkip: true,
					maxTicksLimit: 15
				}
			}
		}
	}
});

var ctxY = document.getElementById('myChartY').getContext('2d');
var chartY = new Chart(ctxY, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Valor del sensor eje Y',
			backgroundColor: 'rgba(255, 159, 64, 0.2)',
			borderColor: 'rgba(255, 159, 64, 1)',
			data: []
		}]
	},
	options: {
		scales: {
			y: {
				beginAtZero: true
			},
			x: {
				ticks: {
					autoSkip: true,
					maxTicksLimit: 15
				}
			}
		}
	}
});

var ctxZ = document.getElementById('myChartZ').getContext('2d');
var chartZ = new Chart(ctxZ, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Valor del sensor eje Z',
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 1)',
			data: []
		}]
	},
	options: {
		scales: {
			y: {
				beginAtZero: true
			},
			x: {
				ticks: {
					autoSkip: true,
					maxTicksLimit: 15
				}
			}
		}
	}
});


// Consulta Firestore para obtener los datos de las gráficas
const tasksRef = collection(db, "tasks");
const docRef = doc(tasksRef, "Sensores");

// Consulta Firestore para obtener los datos de los campos del documento
const docSnap = await getDoc(docRef);
/*
// Obtener los nombres de los campos del documento
const fields = Object.keys(docSnap.data());
// Obtener los valores de los campos del documento
const values = Object.values(docSnap.data());
*/
// Crear la gráfica de barras
var ctxBar = document.getElementById("chartBar").getContext("2d");

var chartBar = new Chart(ctxBar, {
  type: "bar",
  data: {
    labels: ["Sensor 1", "Sensor 2", "Sensor 3"],
    datasets: [
      {
        label: "Barras",
        backgroundColor: "#007bff",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return "$" + value.toLocaleString();
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  },
});

// Crear grafico de torta
var ctxPie = document.getElementById("chartPie").getContext("2d");
var chartPie = new Chart(ctxPie, {
  type: "pie",
  data: {
    labels: ["Valor X", "Valor Y", "Valor Z"],
    datasets: [
      {
        backgroundColor: ["#007bff", "#28a745", "#dc3545"],
        borderColor: "rgba(255,255,255,0.54)",
        data: [0, 0, 0],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Valores en tiempo real",
      fontSize: 18,
      fontColor: "#333",
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          var value =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return label + ": " + value;
        },
      },
    },
  },
});

// Agregar leyenda al gráfico circular
var legendItems = [];
chartPie.data.labels.forEach(function (label, index) {
  var bgColor = chartPie.data.datasets[0].backgroundColor[index];
  legendItems.push(
    '<div class="chart-legend-item">' +
      '<div class="chart-legend-color" style="background-color:' +
      bgColor +
      '"></div>' +
      '<div class="chart-legend-label">' +
      label +
      "</div>" +
      "</div>"
  );
});
var legend = '<div class="chart-legend">' + legendItems.join("") + "</div>";
document.getElementById("chartPie").parentNode.insertAdjacentHTML(
  "beforeend",
  legend
);


// Mantener los últimos 15 valores del eje x
var labelsX = [];
var labelsY = [];
var labelsZ = [];

onSnapshot(docRef, function (doc) {
	if (doc.exists) {
		var dataX = doc.data().ValorX;
		var dataY = doc.data().ValorY;
		var dataZ = doc.data().ValorZ;
		var timestamp = new Date().toLocaleTimeString();

		// Agregar el nuevo valor al final del arreglo de labels
		labelsX.push(timestamp);
		labelsY.push(timestamp);
		labelsZ.push(timestamp);

		// Si el tamaño del arreglo de labels es mayor a 15, eliminar el primer valor
		if (labelsX.length > 15) {
			labelsX.shift();
			labelsY.shift();
			labelsZ.shift();
		}

		// Actualizar las etiquetas de las gráficas
		chartX.data.labels = labelsX;
		chartY.data.labels = labelsY;
		chartZ.data.labels = labelsZ;


		// Agregar los nuevos valores a los arreglos de data de las gráficas
		chartX.data.datasets[0].data.push(dataX);
		chartY.data.datasets[0].data.push(dataY);
		chartZ.data.datasets[0].data.push(dataZ);

		if (chartX.data.datasets[0].data.length > 15) {
			chartX.data.datasets[0].data.shift();
		}
		if (chartY.data.datasets[0].data.length > 15) {
			chartY.data.datasets[0].data.shift();
		}
		if (chartZ.data.datasets[0].data.length > 15) {
			chartZ.data.datasets[0].data.shift();
		}

		// Actualizar las gráficas
		chartX.update();
		chartY.update();
		chartZ.update();

		// Obtener los nuevos valores de los campos
		const newValues = Object.values(doc.data());
		// Actualizar los datos de la gráfica de barras con los nuevos valores
		chartBar.data.datasets[0].data = newValues;
		// Actualizar la gráfica de barras
		chartBar.update();


		// Actualizar los datos del gráfico circular
		chartPie.data.datasets[0].data[0] = dataX;
		chartPie.data.datasets[0].data[1] = dataY;
		chartPie.data.datasets[0].data[2] = dataZ;
		chartPie.update();


	} else {
		console.log("El documento no existe.");
	}
});

