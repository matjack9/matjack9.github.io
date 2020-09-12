function app() {
    function addKonamiListener() {
        const konamiCode = [
            'ArrowUp',
            'ArrowUp',
            'ArrowDown',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowLeft',
            'ArrowRight',
            'b',
            'a',
        ];
        let konamiCodePosition = 0;

        document.addEventListener('keydown', function(e) {
            const requiredKey = konamiCode[konamiCodePosition];
            if (e.key === requiredKey) {
                konamiCodePosition++;
                if (konamiCodePosition === konamiCode.length) {
                    alert('Congratulations! You won my email address! \n matjack9@gmail.com');
                    konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        })
    }

    function initServiceWorker() {
        const isUsingSw = ("serviceWorker" in navigator);
        let swRegistration;
        let sw;

        function onControllerChange() {
            sw = navigator.serviceWorker.controller;
        }
    
        async function init() {
            if ('serviceWorker' in navigator) {
                swRegistration = await navigator.serviceWorker.register('/sw.js', {
                    updateViaCache: 'none'
                }).catch(console.error);
    
                sw = swRegistration.installing || swRegistration.waiting || swRegistration.active;
    
                navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)
            } else {
                console.log('Service worker is not supported.');
            }
        }

        init();
    }

    async function initServiceWorker() {
        let sw;
        
        function onControllerChange() {
            sw = navigator.serviceWorker.controller;
        }

        if ('serviceWorker' in navigator) {
            const swRegistration = await navigator.serviceWorker.register('/sw.js', {
                updateViaCache: 'none'
            }).catch(console.error);

            sw = swRegistration.installing || swRegistration.waiting || swRegistration.active;

            navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)
        } else {
            console.log('Service worker is not supported.');
        }
    }

    function addEventListeners() {
        addKonamiListener();
    }

    addEventListeners();
    initServiceWorker();
}
