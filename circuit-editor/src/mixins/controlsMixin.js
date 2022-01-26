import {
  getDuplicateValues,
  arraysHaveElementsInCommon,
} from "../store/modules/javaScriptUtils";

import {
  getUserInterfaceSetting
} from "../store/modules/applicationWideReusableUnits.js";

import {
  seatIsTaken,
  qbitIsTaken,
  seatsAreTaken
} from "../store/modules/gatesTable.js";

import {
  isDefined,
  getAggregatedGatesNewTargets
} from "../store/modules/editorHelper.js";

export const controlsMixin = {
  props: {
    'controls': Array,
    'controlstates': Array,
  },
  data() {
    return {
      editControlsModalCloseIsHovered: false,
      editControlsModalSaveIsHovered: false,
      editControlsPlusIsHovered: false,
      editControlsMinusIsHovered: false,
      moveGateOneQubitUpwardsIsHovered: false,
      moveGateOneQubitDownwardsIsHovered: false,
      alignControlsUpwardsIsHovered: false,
      alignControlsDownwardsIsHovered: false,
      controlsNew: [...this.controls],
      controlstatesNew: [...this.controlstates],
      numberOfControls: this.controls.length,
      options: [
        { value: '1', text: '|1⟩' },
        { value: '0', text: '|0⟩' },
        { value: '+', text: '|+⟩' },
        { value: '-', text: '|-⟩' },
        { value: '+i', text: '|+i⟩' },
        { value: '-i', text: '|-i⟩' },
      ],
    }
  },
  computed: {
    gateImageSrcPopup: function () {
      if (this.name) {
        if (getUserInterfaceSetting('colored-gates') === 'true') {
          return require("../assets/colored-gates/" + this.name + ".svg");
        } else {
          return require("../assets/blue-gates/" + this.name + ".svg");
        }
      } else {
        return String.empty;
      }
    },
  },
  methods: {
    editControlsModalSize() {
      if (this.controlsNew.length <= 7) {
        return "lg";
      } else {
        return "xl";
      }
    },
    getEditControlsEmbededTableStyle() {
      let width = (this.controlsNew.length > 7) ? 880 : 600;
      return `overflow-x:scroll; max-width: ${width}px; height: 175px; min-height: 175px; max-height: 155px; border-spacing: 5px; display: inline-block; table-layout: fixed;`
    },
    getEditControlsEmbedTableCellStyle() {
      let width = (this.controlsNew.length > 7) ? 880 : 560;
      return `width: ${width}px; min-width: ${width}px; max-width: ${width}px`;
    },
    emptySlotsInEditControlsModal() {
      let visibleControls = (this.controlsNew.length > 7) ? 11 : 7;
      return Math.max(0, visibleControls - this.controlsNew.length);
    },
    numberOfColumnsInEditControlsModal() {
      let visibleControls = (this.controlsNew.length > 7) ? 11 : 7;
      return 2 + Math.max(this.controlsNew.length, visibleControls);
    },
    hideEditControlsModal: function () {
      this.$refs['edit-controls-modal-dialog'].hide();
      this.$refs['initial-modal-dialog'].show();
    },
    handleEditControls: function () {
      this.editControlsModalCloseIsHovered = false;
      this.editControlsModalSaveIsHovered = false;
      this.editControlsPlusIsHovered = false;
      this.editControlsMinusIsHovered = false;
      this.moveGateOneQubitUpwardsIsHovered = false;
      this.moveGateOneQubitDownwardsIsHovered = false;
      this.alignControlsUpwardsIsHovered = false;
      this.alignControlsDownwardsIsHovered = false;
      this.controlsNew = [...this.controls];
      this.controlstatesNew = [...this.controlstates];
      this.numberOfControls = this.controls.length;
      if (this.gates) {
        this.numberOfGates = this.gates.length;
      }
      this.$refs['initial-modal-dialog'].hide();
      this.$refs['edit-controls-modal-dialog'].show();
    },
    handleEditControlsHover(hovered) {
      this.editControlsIsHovered = hovered;
    },
    handleEditControlsModalCloseHover(hovered) {
      this.editControlsModalCloseIsHovered = hovered;
    },
    handleEditControlsModalSaveHover(hovered) {
      this.editControlsModalSaveIsHovered = hovered;
    },
    handleEditControlsPlusHover(hovered) {
      this.editControlsPlusIsHovered = hovered;
    },
    handleEditControlsMinusHover(hovered) {
      this.editControlsMinusIsHovered = hovered;
    },
    handleMoveGateOneQubitUpwardsHover(hovered) {
      this.moveGateOneQubitUpwardsIsHovered = hovered;
    },
    handleMoveGateOneQubitDownwardsHover(hovered) {
      this.moveGateOneQubitDownwardsIsHovered = hovered;
    },
    handleAlignControlsUpwardsHover(hovered) {
      this.alignControlsUpwardsIsHovered = hovered;
    },
    handleAlignControlsDownwardsHover(hovered) {
      this.alignControlsDownwardsIsHovered = hovered;
    },
    handleEditControlsModalSave: function () {
      let duplicateControls = getDuplicateValues(this.controlsNew);
      if (arraysHaveElementsInCommon(this.$data.controlsNew, this.$data.targetsNew)) {
        alert("Control and target qubits must differ!");
      } else if (duplicateControls.length > 0) {
        alert("Duplicate controls: " + JSON.stringify(duplicateControls));
      } else {
        this.handleSave();
        this.$refs['edit-controls-modal-dialog'].hide();
      }
    },
    stubImageSrcPopup: function (controlIndex) {
      if (this.name) {
        if (getUserInterfaceSetting('colored-gates') === 'true') {
          return require("../assets/colored-gates/ctrl-" + this.name + "-stub-" + this.controlstatesNew[controlIndex] + ".svg");
        } else {
          return require("../assets/blue-gates/ctrl-" + this.name + "-stub-" + this.controlstatesNew[controlIndex] + ".svg");
        }
      } else {
        return String.empty;
      }
    },
    onControlStateChange() {
      // need to refresh control state icon image
      this.$forceUpdate();
    },
    onNumberControlsChange() {
      if (this.numberOfControls < this.controlsNew.length) {
        this.controlsNew = this.controlsNew.slice(0, this.numberOfControls);
        this.controlstatesNew = this.controlstatesNew.slice(0, this.numberOfControls);
      } else {
        this.addControl();
      }
      this.$forceUpdate();
    },
    addControl() {
      let newControl = null;
      let aggregatedGatesTargets = [];

      if (this.$data.gatesNew) {
        for (let i = 0; i < this.$data.gatesNew.length; i++) {
          let aggregatedGate = this.$data.gatesNew[i];
          aggregatedGatesTargets.push(...aggregatedGate.targets);
        }
      }
      
      let minQubit = Math.min(...this.targetsNew, ...this.controlsNew, ...aggregatedGatesTargets);
      let maxQubit = Math.max(...this.targetsNew, ...this.controlsNew, ...aggregatedGatesTargets);

      if (minQubit > 0 && !seatIsTaken(this.$store.state.circuitEditorModule, minQubit - 1, this.step)) {
        newControl = minQubit - 1;
      } else {
        let currentQubit = minQubit;
        while (currentQubit < maxQubit) {
          currentQubit += 1;
          if (this.targetsNew.includes(currentQubit)) {
            continue;
          }
          if (this.controlsNew.includes(currentQubit)) {
            continue;
          }
          if (getAggregatedGatesNewTargets(this).includes(currentQubit)) {
            continue;
          }
          if (!qbitIsTaken(this.$store.state.circuitEditorModule, currentQubit, this.step)) {
            newControl = currentQubit;
            break;
          }
        }
      }

      if (newControl == null && !seatIsTaken(this.$store.state.circuitEditorModule, maxQubit + 1, this.step)){
        newControl = maxQubit + 1;
      }

      if (isDefined(newControl)) {
        this.controlsNew.push(newControl);
        this.controlstatesNew.push('1');
        this.numberOfControls = this.controlsNew.length;
      } else {
        alert("No empty seat left to add new control!");
      }
    },
    removeControl() {
      if (this.numberOfControls >= 1) {
        this.controlsNew = this.controlsNew.slice(0, this.numberOfControls - 1);
        this.controlstatesNew = this.controlstatesNew.slice(0, this.numberOfControls - 1);
        this.numberOfControls = this.controlsNew.length;
      }
    },
    moveGateOneQubitUpwards() {
      let proposedTargets = [...this.targetsNew];
      let proposedControls = [...this.controlsNew];

      if (Math.min(...proposedTargets) > 0 && Math.min(...proposedControls) > 0) {
        for (let i = 0; i < proposedTargets.length; i++) {
          proposedTargets[i] -= 1;
        }
        for (let i = 0; i < proposedControls.length; i++) {
          proposedControls[i] -= 1;
        }
      } else {
        alert("The 0 qubit index has been reached!");
        return;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control upwards!");
      } else {
        this.targetsNew = proposedTargets;
        this.controlsNew = proposedControls;
        if (this.targetsNew.length > 0) {
          this.targetsString = `${this.targetsNew[0]},  ${this.targetsNew[1]}`;
        }
        this.$forceUpdate();
      }
    },
    moveGateOneQubitDownwards() {
      let proposedTargets = [...this.targetsNew];
      let proposedControls = [...this.controlsNew];

      for (let i = 0; i < proposedTargets.length; i++) {
        proposedTargets[i] += 1;
      }
      for (let i = 0; i < proposedControls.length; i++) {
        proposedControls[i] += 1;
      }

      let existingQbits = [...this.targets, ...this.controls];
      let proposedQbits = [...proposedTargets, ...proposedControls];

      if (seatsAreTaken(this.$store.state.circuitEditorModule, proposedQbits, this.step, existingQbits)) {
        alert("There are no free seats to move control downwards!");
      } else {
        this.targetsNew = proposedTargets;
        this.controlsNew = proposedControls;
        if (this.targetsNew.length > 0) {
          this.targetsString = `${this.targetsNew[0]},  ${this.targetsNew[1]}`;
        }
        this.$forceUpdate();
      }
    },
    alignControlsUpwardsFromTargetQubit() {
      let startUp = Math.min(...this.$data.targetsNew);
      let startDown = Math.max(...this.$data.targetsNew);
      for (let i = 0; i < this.controlsNew.length; i++) {
        if (startUp - i >= 1) {
          this.controlsNew[i] = startUp - i - 1;
        } else {
          this.controlsNew[i] = startDown + i - startUp + 1;
        }
      }
      this.$forceUpdate();
    },
    alignControlsDownwardsFromTargetQubit() {
      let start = Math.max(...this.$data.targetsNew);
      for (let i = 0; i < this.controlsNew.length; i++) {
        this.controlsNew[i] = start + i + 1;
      }
      this.$forceUpdate();
    },
  }
}

