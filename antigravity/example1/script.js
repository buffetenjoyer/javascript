document.addEventListener('DOMContentLoaded', () => {
    const bell = document.getElementById('christmas-bell');
    
    // Pre-load synth voices if possible to avoid delay
    let voices = [];
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
    };

    bell.addEventListener('click', () => {
        const msg = new SpeechSynthesisUtterance("Ho! Ho! Ho!");
        
        // Try to find a deep male voice if available, otherwise default
        // This is heuristic and might vary by OS/Browser
        const deepVoice = voices.find(voice => 
            voice.name.includes('Google US English') || 
            voice.name.includes('David') || // Windows
            voice.name.includes('Daniel')   // Mac
        );

        if (deepVoice) {
            msg.voice = deepVoice;
        }

        msg.rate = 0.6; // Slower for that Santa feel
        msg.pitch = 0.5; // Lower pitch
        msg.volume = 1;

        window.speechSynthesis.speak(msg);

        // Add a visual 'ring' animation class if we wanted, 
        // but the CSS active/hover states handle most of it.
        bell.style.transform = 'rotate(-10deg)';
        setTimeout(() => {
            bell.style.transform = '';
        }, 200);
    });
});
