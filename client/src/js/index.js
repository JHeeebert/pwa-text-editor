import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};
// Initialize the editor
const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Register the service worker
if ('serviceWorker' in navigator) {
  const workBoxSw = new Workbox('/src-sw.js');
  workBoxSw.register()
    .then(registration => {
      console.log(`Service Worker registered! Scope: ${registration.scope}`);
    })
    .catch(error => {
      console.log(`Service Worker registration failed: ${error}`);
    }
  );
} else {
  console.log('Service workers are not supported.');
}



