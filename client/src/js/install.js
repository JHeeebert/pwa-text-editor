const butInstall = document.getElementById('buttonInstall');
// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent earlier web browser version from automatically showing the prompt
    event.preventDefault();
    // Store the event so it can be triggered later.
    window.deferredPrompt = event;
    // Make the install button visible
    butInstall.classList.toggle('hidden', false);
});

// click event handler on the `buttonInstall` element
butInstall.addEventListener('click', async () => {
    const installed = window.deferredPrompt;
    // Wait for the user to respond to the prompt
    if (!installed) {
        return;
    }
    // Show the prompt
    installed.prompt();
    // Hide the install button
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});
// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt event
    window.deferredPrompt = null;
});
