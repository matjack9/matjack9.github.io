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
                    alert('leet hekker!'); // TODO
                    konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        })
    }

    function addEventListeners() {
        addKonamiListener();
    }

    addEventListeners();
}
