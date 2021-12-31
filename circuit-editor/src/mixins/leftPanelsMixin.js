
import { mapActions} from 'vuex';

export const leftPanelsMixin = {
  methods: {
    ...mapActions('circuitEditorModule/', ['removeGateFromCircuitByUser']),
    handleDropEvent: function (event) {
      let targets = JSON.parse("[" +  event.dataTransfer.getData("originalTargets") + "]");
      let step = parseInt(event.dataTransfer.getData("originalStep"));
      if (!isNaN(step) && targets.length > 0) {
        let dto = { step: step, targets: targets };
        this.removeGateFromCircuitByUser(dto);
      }
    }
  },
}