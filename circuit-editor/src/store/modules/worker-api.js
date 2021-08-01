// wrapper over worker.js

import Worker from 'worker-loader!./worker.js';

const worker = new Worker();

worker.addEventListener('message', (e) => {
  let message = e.data;
  if (message){
    alert(message);
  }
});

export function sendWorkerMessage(msg){
  worker.postMessage(msg);
}