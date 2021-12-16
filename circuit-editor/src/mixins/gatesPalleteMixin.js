
import { 
  createDragImageGhost, 
  hideTooltips,
  getUserInterfaceSetting
} from "../store/modules/applicationWideReusableUnits.js";

export const gatesPalleteMixin = {
  methods: {
    gateSelected: function (event) {
      // find selected table cell
      let cell = null;
      var tag = event.target.tagName.toUpperCase();
      if (tag == "TD") {
        cell = event.target;
      } else if (tag == "IMG")  {
        cell = event.target.parentElement;
      }
      let selectedCellBgColor = cell.style.backgroundColor.toUpperCase();
      // reset bckg for all cells
      let table = document.getElementById("gates-pallete-table");
      let cells = table.getElementsByTagName("TD");
      for(var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = window.darkBackgroundColor;
      }
      // set bckg black for selected cell
      if (cell != null) {
        if (selectedCellBgColor == "BLACK"){
          this.$root.$emit("updateHelpEvent", null);
          cell.style.backgroundColor = window.darkBackgroundColor;
        } else {
          cell.style.backgroundColor = "Black";
          this.$root.$emit("updateHelpEvent", cell.id);
        }
      }
    },
    dragStart: function(event) {
      hideTooltips();
      const target = event.target;
      event.dataTransfer.setData("gateName", target.title);
      let dragImageGhost = createDragImageGhost(target);  
      event.dataTransfer.setDragImage(dragImageGhost, target.width/2.0, target.height/2.0);
    },
    dragEnd: function() {
      let dragImageGhost = window.document.getElementById("dragged-gate-ghost");
      document.body.removeChild(dragImageGhost);
    },
  },
  data() {
    return {
        coloredGatesCookie: getUserInterfaceSetting("colored-gates") === 'true',
    };
  },
  created() {
    this.$root.$on("switchThemeDark", (boolFlag) => {
      var cells = document.getElementById("gates-pallete").getElementsByTagName("td");
      if (boolFlag) {
        for(let i = 0; i < cells.length; i++) { 
          cells[i].style.borderColor = "lightslategray";
        }
      } else {
        for(let i = 0; i < cells.length; i++) {
          cells[i].style.borderColor = window.lightBackgroundColor;
        }
      }
    })
    this.$root.$on("switchGateColors", () => {
      var cells = document.getElementById("gates-pallete").getElementsByTagName("td");
      for(let i = 0; i < cells.length; i++) {
        let img = cells[i].childNodes[0];
        if (getUserInterfaceSetting('colored-gates') === 'true'){
          if (img.title.includes("ctrl-")){
            img.src = require("../assets/colored-gates/" + img.title + "-1.svg");     
          } else {
            img.src = require("../assets/colored-gates/" + img.title + ".svg");
          }
        } else {
          if (img.title.includes("ctrl-")){
            img.src = require("../assets/blue-gates/" + img.title + "-1.svg");     
          } else {
            img.src = require("../assets/blue-gates/" + img.title + ".svg");
          }
        }
      }
    })
  },
}