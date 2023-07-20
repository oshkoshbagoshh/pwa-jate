// in this file we will add the logic to install the app
// we need to add a button to the page that will trigger the install event when clicked
const butInstall = document.getElementById("buttonInstall");

// add event listener to the install button
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log("event" + event)
    event.preventDefault();
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

// add event listener to the install button
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    // console.log(promptEvent)
    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    console.log('install hit')
    window.deferredPrompt = null;
}); 