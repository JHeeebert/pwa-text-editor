const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event so it can be triggered later.
    window.deferredPrompt = event;

    // Remove hidden class from the button container
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    const promptEvent = await window.deferredPrompt.prompt();
    if (!promptEvent) {
        // The prompt was dismissed by the user
        return;
    }
    // Show the user the prompt
    promptEvent.prompt();
    // Reset the deferred prompt variable to null
    window.deferredPrompt = null;
    // Hide the button container
    butInstall.classList.toggle('hidden', true);
});
// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt event
    window.deferredPrompt = null;
});
