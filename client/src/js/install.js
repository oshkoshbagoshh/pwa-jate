const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent default 
    event.preventDefault();
    // window deferredPrompt
    window.deferredPrompt = event;
    // show install button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    // prompt event 
    const promptEvent = window.deferredPrompt;
    // if prompt event
    if (!promptEvent) {
        return;
    }
    // prompt event prompt
    promptEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true); // hide install button if installed


});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
