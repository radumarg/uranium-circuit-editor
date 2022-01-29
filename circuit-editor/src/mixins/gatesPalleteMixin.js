
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
      //for (const id of ["gates-pallete-table-1", "gates-pallete-table-2", "gates-pallete-table-n"])
      for (const id of ["gates-pallete-table-1", "gates-pallete-table-2"])
      { 
        let table = document.getElementById(id);
        let cells = table.getElementsByTagName("TD");
        for(var i = 0; i < cells.length; i++) {
          cells[i].style.backgroundColor = window.darkBackgroundColor;
        }
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
      event.dataTransfer.setData("drag-origin", "gates-pallete");
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
      for (const id of ["gates-pallete-1", "gates-pallete-2", "gates-pallete-n"]) {
        var cells = document.getElementById(id).getElementsByTagName("td");
        if (boolFlag) {
          for(let i = 0; i < cells.length; i++) { 
            if (cells[i].childNodes.length > 0) {
              // cell is not empty (contains a gate image)
              cells[i].style.borderColor = "lightslategray";
            }
          }
        } else {
          for(let i = 0; i < cells.length; i++) {
            if (cells[i].childNodes.length > 0) {
              // cell is not empty (contains a gate image)
              cells[i].style.borderColor = window.lightBackgroundColor;
            }
          }
        }
      }
    })
    this.$root.$on("switchGateColors", () => {
      for (const id of ["gates-pallete-1", "gates-pallete-2", "gates-pallete-n"]) {
        var cells = document.getElementById(id).getElementsByTagName("td");
        for(let i = 0; i < cells.length; i++) {
          if (cells[i].childNodes.length > 0){
            let img = cells[i].childNodes[0];
            if (img.title != "barrier"){
              if (getUserInterfaceSetting('colored-gates') === 'true'){
                img.src = require("../assets/colored-gates/" + img.title + ".svg");
              } else {
                img.src = require("../assets/blue-gates/" + img.title + ".svg");
              }
            }
          }
        }
      }
    })
  },
}