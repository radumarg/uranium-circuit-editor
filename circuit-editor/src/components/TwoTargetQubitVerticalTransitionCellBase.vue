<script>
import { mapActions } from 'vuex';
export default {
  name: "TwoTargetQubitVerticalTransitionCellBase",
  props: {
    step: Number,
    qrow: Number,
    qbit: Number,
    qbit2: Number,
    id: String,
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'removeGateFromCircuit']),
    handleDropEvent: function (event) {
      let originalTarget = parseInt(event.dataTransfer.getData("originalTarget"));
      let originalTarget2 = parseInt(event.dataTransfer.getData("originalTarget2"));
      let originalStep = parseInt(event.dataTransfer.getData("originalStep"));
      let draggedQbit = parseInt(event.dataTransfer.getData("dragged-qbit"));
      let gateName = event.dataTransfer.getData("gateName");
      let step = parseInt(event.currentTarget.getAttribute("step"));
      let dropQbit = parseInt(event.currentTarget.getAttribute("qrow"));
      let qbit = parseInt(event.currentTarget.getAttribute("qbit"));
   
      if (originalStep == null || step != originalStep || qbit != originalTarget) {
        this.handleDragLeave();
        return;
      }

      // add the new gate mandatory params
      let dto = { step: step, name: gateName, qbit: originalTarget, qbit2: originalTarget2 };
      
      // add optional params, notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("phi")) {
        let phi = parseFloat(event.dataTransfer.getData("phi"));
        dto["phi"] = phi;
      }
      if (event.dataTransfer.types.includes("theta")) {
        let theta = parseFloat(event.dataTransfer.getData("theta"));
        dto["theta"] = theta;
      }

      if (draggedQbit == originalTarget){
        dto["qbit"] = dropQbit;
      } else {
        dto["qbit2"] = dropQbit;
      }

      if (dto["qbit"] == dto["qbit2"]){
        this.handleDragLeave();
        return;
      }

      // step1 - remove original gate if drag event started from a cell 
      // in editor (not originating from gates pallete)
      this.removeGateFromCircuit({'step': originalStep, 'qbit': originalTarget});

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
