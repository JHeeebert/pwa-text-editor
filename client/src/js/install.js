const buttonInstall = document.getElementById('buttonInstall');
let deferredPrompt;
// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event so it can be triggered later.
    deferredPrompt = event;

    // Make the install button visible
    buttonInstall.classList.remove('hidden');
});

// click event handler on the `buttonInstall` element
buttonInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Log the result of the prompt
        console.log(`User response to the install prompt: ${outcome}`);
        // Clear the prompt
        deferredPrompt = null;
    }
    // Hide the install button
    buttonInstall.classList.add('hidden');
});
// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt event
    window.deferredPrompt = null;
});
