// set up service worker

if (navigator.serviceWorker) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function (reg) {
            console.log('Registration worked!');
        }).catch(function () {
        console.log('Registration failed');
    });
}

