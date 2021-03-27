<script>
import { mapActions } from 'vuex';
export default {
  name: "ControlVerticalTransitionCellBase",
  props: {
    step: Number,
    qbit: Number,
    id: String,
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'removeGateFromCircuit']),
    handleDropEvent: function () {
      let originalQbit = event.dataTransfer.getData("originalQbit");
      let originalStep = event.dataTransfer.getData("originalStep");
      let originalControl = event.dataTransfer.getData("originalControl");
      let controlstate = event.dataTransfer.getData("controlstate");
      let dragOrigin = event.dataTransfer.getData("drag-origin");
      let gateName = event.dataTransfer.getData("gateName");
      let step = event.currentTarget.getAttribute("step");
      let qbit = event.currentTarget.getAttribute("qbit");
      let dropQbit = this.id.split('_').shift();
   
      if (originalStep == null || step != originalStep || qbit != originalQbit) {
        this.handleDragLeave();
        return;
      }

      // add the new gate mandatory params
      let dto = { step: step, name: gateName, qbit: originalQbit, control: originalControl, controlstate: controlstate};
      
      // add optional params, notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("phi")) {
        let phi = event.dataTransfer.getData("phi");
        dto["phi"] = phi;
      }
      if (event.dataTransfer.types.includes("theta")) {
        let theta = event.dataTransfer.getData("theta");
        dto["theta"] = theta;
      }
      if (event.dataTransfer.types.includes("lambda")) {
        let lambda = event.dataTransfer.getData("lambda");
        dto["lambda"] = lambda;
      }
      if (event.dataTransfer.types.includes("root")) {
        let root = event.dataTransfer.getData("root");
        dto["root"] = root;
      }

      if (dragOrigin == "stub"){
        dto["control"] = dropQbit;
      } else {
        dto["qbit"] = dropQbit;
      }

      // step1 - remove original gate if drag event started from a cell 
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'qbit': originalQbit});

      // step2 - add the new gate to the circuit
      this.insertGateInCircuit(dto);
    },
    handleDragOver() {
      var image = window.document.getElementById(this.id);
      image.src = require("../assets/vertical-red-line-long.svg");
    },
  },
};
</script>
