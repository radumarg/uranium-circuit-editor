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
  export async function  retrieve_project_circuits(retries){
    
    // Due to Cross-Origin Resource Sharing (CORS) policy restrictions the following request will
    // not work if request is sent to Django local development server from the Vue.js development server
    // In order to test while developing, launch chrome in the following flags:
    // google-chrome --disable-site-isolation-trials --disable-web-security --user-data-dir="/tmp"
    window.projectId = get_request_param('projectid');
    let authToken = getCookie('auth-token');
    if (window.projectId && authToken){

      return new Promise( (resolve, reject) => {
  
        let xmlHttpReq = new XMLHttpRequest();
        let url = '/projects/projects-api/?projectid='.concat(window.projectId);
        xmlHttpReq.open( 'GET', url, true);
        xmlHttpReq.setRequestHeader('Authorization', authToken);
        xmlHttpReq.setRequestHeader('Accept', 'application/json');
        xmlHttpReq.timeout = 5000;

        xmlHttpReq.onload = function () {
          if (xmlHttpReq.readyState === 4) {
            if (xmlHttpReq.responseText && xmlHttpReq.status === 200) {
              let jsonObj = JSON.parse(xmlHttpReq.responseText);
              let alertUser = false;
              for (const [key, value] of Object.entries(jsonObj)) {
                let circuitId = key;
                let circuitState = value;
                if (circuitState.version == null || circuitState.version == undefined || circuitState.version == "1.0" || circuitState.version == "1.1") {
                  alertUser = true;
                  jsonObj[circuitId] = {
                    "version": "1.2",
                    "circuit_type": "simple",
                    "circuit_id": circuitId,
                    "circuit_name": "Outdated circuit, pls delete!",
                    "circuit_abbreviation": "unk",
                    "project_id": window.projectId,
                    "project_name": "Unknown Project",
                    "steps": []
                  }
                }
              }
              if (alertUser) {
                alert("Unfortunately one of your circuit has an outdated format. We will try to refrain from introducing backwards incompatible changes in the future. For now, please delete this circuit(s) and create a new a one.");
              }
              resolve(jsonObj);
            } else {
              retries += 1;
              if (retries < 2) {
                retrieve_project_circuits(retries);
              } else {
                reject('Failed to retrieve your project. Out site may be temporary unavailable. Please try again a bit later.');
              }
            }
          }
        };

        xmlHttpReq.onerror = function () {
          retries += 1;
          if (retries < 2) {
            retrieve_project_circuits(retries);
          } else {
            reject('Failed to retrieve your project. Unexpected error. Please send us a message or try again later.');
          }
        };

        xmlHttpReq.ontimeout = function () {
          retries += 1;
          if (retries < 2) {
            retrieve_project_circuits(retries);
          } else {
            reject('Failed to retrieve your project. Out site may be temporary unavailable. Please try again a bit later.');
          }
        };

        xmlHttpReq.send(null);
      });
    } else {
      // Using negative id values since these circuits are not intended to be saved in Django application database and
      // will be loaded only if the Circuit Editor will be opened from the "Explore Editor" button on Uranium front
      // webpage or in the development enviroment.
      
      return JSON.parse('{\
"-1": {"version": "1.2", "circuit_type": "simple", "circuit_id": -1, "circuit_name": "First Circuit", "circuit_abbreviation": "1st", "project_id": -1, "project_name": "My Project", "steps": []},\
"-2": {"version": "1.2", "circuit_type": "simple", "circuit_id": -2, "circuit_name": "Second Circuit", "circuit_abbreviation": "2nd", "project_id": -1, "project_name": "My Project", "steps": []},\
"-3": {"version": "1.2", "circuit_type": "simple", "circuit_id": -3, "circuit_name": "Third Circuit", "circuit_abbreviation": "3rd", "project_id": -1, "project_name": "My Project", "steps": []},\
"-4": {"version": "1.2", "circuit_type": "simple", "circuit_id": -4, "circuit_name": "Fourth Circuit", "circuit_abbreviation": "4th", "project_id": -1, "project_name": "My Project", "steps": []}\
}');
    }
  }
  
  /* use Django REST API to save circuit */
  export function save_circuit(circuitId, yaml){

    let xmlHttpReq = new XMLHttpRequest();

    xmlHttpReq.timeout = 10000;
    xmlHttpReq.ontimeout = function () {
      if (!window.alertedOnFaliedSavingCircuit) {
        alert("For some unknown reason saving one of your circuits has failed, please try again a bit later.");
        window.alertedOnFaliedSavingCircuit = true;
      }
    };

    xmlHttpReq.onerror = function () {
      if (!window.alertedOnFaliedSavingCircuit) {
        alert("For some unknown reason saving one of your circuits has failed, please try again a bit later.");
        window.alertedOnFaliedSavingCircuit = true;
      }
    };

    let url = '/projects/circuits-api/?circuitid='.concat(circuitId);
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