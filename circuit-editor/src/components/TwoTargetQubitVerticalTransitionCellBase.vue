<script>
import { mapActions } from 'vuex';
export default {
  name: "TwoTargetQubitVerticalTransitionCellBase",
  props: {
    step: Number,
    qbit: Number,
    qbit2: Number,
    id: String,
  },
  methods: {
    ...mapActions('circuitEditorModule/', ['insertGateInCircuit', 'removeGateFromCircuit']),
    handleDropEvent: function () {
      let originalQbit = event.dataTransfer.getData("originalQbit");
      let originalQbit2 = event.dataTransfer.getData("originalQbit2");
      let originalStep = event.dataTransfer.getData("originalStep");
      let draggedQbit = event.dataTransfer.getData("dragged-qbit");
      let gateName = event.dataTransfer.getData("gateName");
      let step = event.currentTarget.getAttribute("step");
      let qbit = event.currentTarget.getAttribute("qbit");
      let dropQbit = this.id.split('_').shift();
   
      if (originalStep == null || step != originalStep || qbit != originalQbit) {
        this.handleDragLeave();
        return;
      }

      // add the new gate mandatory params
      let dto = { step: step, name: gateName, qbit: originalQbit, qbit2: originalQbit2 };
      
      // add optional params, notice lower case needed for types.includes
      if (event.dataTransfer.types.includes("phi")) {
        let phi = event.dataTransfer.getData("phi");
        dto["phi"] = phi;
      }
      if (event.dataTransfer.types.includes("theta")) {
        let theta = event.dataTransfer.getData("theta");
        dto["theta"] = theta;
      }

      if (draggedQbit == originalQbit){
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
