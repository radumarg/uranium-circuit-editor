<template>
   <b-container fluid="xs" class="h-100">
      <b-row class="justify-content-center h-100" style="background-color:white;" align-v="center" align-h="center">
         <b-col></b-col>
         <b-col>
            <div id="spinnerContainerPie" style="display:block;">
               <b-spinner variant="primary" label="Loading ..." style="width:450px; height:450px;"></b-spinner>
            </div>
            <div id="chartContainerPie" class="chartDiv" style="display:none;">
               <JSCharting :options="chartOptions" id="pieChart"></JSCharting>
            </div>
         </b-col>
         <b-col></b-col>
      </b-row>
   </b-container>
</template>

<script>

// Questions? 
// JavaScript chart library: https://jscharting.com/
// Vue-js plugin: https://github.com/jscharting/jscharting-vue/blob/master/README.md

import JSCharting from 'jscharting-vue';

export default {
   name: 'pieChart',
   data() {
      return {
         chartOptions: {
            type: 'pie',
            toolbar: {
               items: {
                  export: {
                     position: 'inside top left',
                     margin_top: 15,
                     margin_left: 15,
                     width: 54,
                     height: 33,
                     outline: { color: 'rgb(123,123,123)' },
                     fill: 'rgb(220,220,220)',
                     radius: 3,
                     icon: {
                        padding: 0,
                        outline: { color: 'rgb(123,123,123)' },
                        fill: 'rgb(255,255,255)',
                        path:
                           'm5 27h4.9v-6.9h10.3v6.9h6.8v-22h-4.9v10h-12.2v-10h-4.9zm4.9-12h12.3v-10h-12.3zm0 12h10.3v-6.9h-10.3zm4.1-5.3v2.5zm18.4-16v20.4m4-14.2h12.3l-6.1 8.3z'
                     },
                     states: {
                        hover: {
                           fill: 'rgb(220,220,220)',
                           icon: {
                           outerShape: 'none',
                           outline: { color: 'rgb(98,98,149)' }
                           }
                        },
                        select: {
                           fill: 'rgb(220,220,220)',
                           icon: {
                           outerShape: 'none',
                           outline: { color: 'rgb(98,98,149)' }
                           }
                        }
                     },
                     items: {
                        print_visible: false,
                        svg_visible: false,
                        png: { label_text: 'Save as PNG' },
                        jpg: { label_text: 'Save as JPG' },
                        pdf: { label_text: 'Save as PDF' }
                     },
                     defaultItem: {
                        margin: [-0.5, 0.5, 0.5, -0.5],
                        icon: 'none',
                        padding: [2, 2, 2, 10],
                        fill: 'rgb(255,255,255)',
                        outline: { color: 'none' },
                        opacity: 1,
                        label: { color: 'rgb(0,0,0)' },
                        states: {
                           hover: {
                           opacity: 1,
                           fill: 'rgb(144,144,144)',
                           label: { color: 'rgb(255,255,255)' }
                           }
                        }
                     },
                     itemsBox: {
                        width: 100,
                        layout: 'vertical',
                        margin: 0,
                        fill: 'rgb(255,255,255)',
                        outline: { color: 'rgb(123,123,123)' },
                     }
                  },
               }
            },
            yAxis_formatString: 'F6',
            series: [
               {
                  name: 'Probability',
                  points: []
               }
            ],
         }
      }
   },
   methods: {
      updateData(topEntriesStateProbabilities) {
         this.$data.chartOptions = {
            type: 'pie',
            series: [
               {
                  name: 'Probability',
                  points: topEntriesStateProbabilities
               }
            ]
         };
      },
      showSpinner: function () {
         let chartDiv = document.getElementById("chartContainerPie");
         chartDiv.style.display = "none";
         let spinnerDiv = document.getElementById("spinnerContainerPie");
         spinnerDiv.style.display = "block";
      },
      showChart: function (topEntriesStateProbabilities, width, height) {
         let element = document.getElementById("pieChart");
         element.style.width = parseInt(width - 150) + "px";
         element.style.height = parseInt(height - 150) + "px";

         this.updateData(topEntriesStateProbabilities);
         let spinnerDiv = document.getElementById("spinnerContainerPie");
         spinnerDiv.style.display = "none";
         let chartDiv = document.getElementById("chartContainerPie");
         chartDiv.style.display = "block";         
      },
   },
   options: {
      responsive: true,
      maintainAspectRatio: false,
   },
   components: {
      JSCharting
   },
   created() {
      this.$root.$on('showSpinners', () => {this.showSpinner()});
      this.$root.$on('showPieChart', (topEntriesStateProbabilities, width, height) => {this.showChart(topEntriesStateProbabilities, width, height)});
   },
}
</script>

<style>

.chartDiv {
   padding-bottom: 50px;
}

</style>