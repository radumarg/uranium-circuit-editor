  /* get named http request parameter */
  function get_request_param (name){
    let match = (new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search);
    if(match){
      return decodeURIComponent(match[1]);
    } else{
      return null;
    }
  }
  
  /* get cookie by name */
  function getCookie (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    else return null;
  }
  
  /* use Django REST API to retrieve circuit */
  export function retrieve_project_circuits(){
    
    //TODO: change to retrieve all circuits for a given prject identity
    //TODO: update uranium website to deliver empty circuits in the new format

    // Due to Cross-Origin Resource Sharing (CORS) policy restrictions the following request will
    // not work if request is sent to Django local development server from the Vue.js development server
    // In order to test while developeing, launch chrome in the following flags:
    // google-chrome --disable-site-isolation-trials --disable-web-security --user-data-dir="/tmp"
    window.currentCircuitId = get_request_param('circuitid');
    let authToken = getCookie('auth-token');
    if (window.currentCircuitId && authToken){
  
        let xmlHttpReq = new XMLHttpRequest();
        let url = '/projects/circuits-api/?circuitid='.concat(window.currentCircuitId);
        xmlHttpReq.open( 'GET', url, false); //TODO: this must be changed to an async request
        xmlHttpReq.setRequestHeader('Authorization', authToken);
        xmlHttpReq.setRequestHeader('Accept', 'application/json');

        let retries = 0;
        while (xmlHttpReq.status != 200 && retries < 3) {
          xmlHttpReq.send(null);
          if (xmlHttpReq.responseText && xmlHttpReq.status == 200){
              let jsonObj = JSON.parse(xmlHttpReq.responseText);
              if (!jsonObj.version || jsonObj.version == "1.0"){
                alert("Unfortunately this circuit format is outdated. We will refrain from introducing backwards incompatible changes in the future.")
                jsonObj = JSON.parse('{"version": "1.1", "circuit_type": "simple", "steps": []}');
              }
              return jsonObj;
          } 
          retries += 1;
        }
        alert('Failed to retrieve the circuit code. Please try to reload the page.');
    }

    // Using negative values since these circuits are not intended to be saved in Django application database and
    // will be loaded only if the Circuit Editor will be opened from the "Explore Editor" button on Uranium front
    // webpage or in the development enviroment.
    window.circuitIds = [-1, -2, -3, -4];

    // Current circuit to be loaded in editor.
    window.currentCircuitId = -1;

    return JSON.parse('{\
"-1": {"version": "1.2", "circuit_type": "simple", "circuit_id": "-1", "circuit_name": "First Circuit", "circuit_abbreviation": "1st", "project_id": "-1", "project_name": "My Project", "steps": []},\
"-2": {"version": "1.2", "circuit_type": "simple", "circuit_id": "-2", "circuit_name": "Second Circuit", "circuit_abbreviation": "2nd", "project_id": "-1", "project_name": "My Project", "steps": []},\
"-3": {"version": "1.2", "circuit_type": "simple", "circuit_id": "-3", "circuit_name": "Third Circuit", "circuit_abbreviation": "3rd", "project_id": "-1", "project_name": "My Project", "steps": []},\
"-4": {"version": "1.2", "circuit_type": "simple", "circuit_id": "-4", "circuit_name": "Fourth Circuit", "circuit_abbreviation": "4th", "project_id": "-1", "project_name": "My Project", "steps": []}\
}');
  }
  
  /* use Django REST API to save circuit */
  export function save_circuit(yaml){

    let xmlHttpReq = new XMLHttpRequest();

    xmlHttpReq.timeout = 10000;
    xmlHttpReq.ontimeout = function () {
        alert("For some reason saving the circuit has failed, please try again.");
    };

    xmlHttpReq.onerror = function () {
      alert("For some reason saving the circuit has failed, please try again.");
    };

    let url = '/projects/circuits-api/?circuitid='.concat(window.currentCircuitId);
    xmlHttpReq.open( "POST", url, true);

    let authToken = getCookie('auth-token');
    xmlHttpReq.setRequestHeader('Authorization', authToken);
    let csrfToken = getCookie('csrftoken');
    xmlHttpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    let encodedCircuit = encodeURI(yaml);
    // '+' character is a reserved character and not encoded corectly, not sure why
    // at server side according to specs + is treated as space and %2B is decoded as literal "+"
    encodedCircuit = encodedCircuit.replaceAll('+', '%2B');
    let data = `yaml-code=${encodedCircuit}&csrfmiddlewaretoken=${csrfToken}`;

    xmlHttpReq.send(data);    
  }