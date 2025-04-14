document.addEventListener('DOMContentLoaded', () => {
    const zodiacSelection = document.getElementById('zodiac-selection');
    const predictionDisplay = document.getElementById('prediction-display');
    const selectedSignSpan = document.getElementById('selected-sign');
    const predictionContent = document.getElementById('prediction-content');
    const backButton = document.getElementById('back-button');
    const themeToggleButton = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Zodiac SVGs (Predictions are now generated dynamically)
    const zodiacSVGs = {
        Aries: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 30 70 Q 50 20 70 70 M 50 20 V 50"/></svg>',
        Taurus: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="40" r="25"/><path d="M 25 65 Q 50 95 75 65"/></svg>',
        Gemini: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 30 20 V 80 M 70 20 V 80 M 20 30 H 80 M 20 70 H 80"/></svg>',
        Cancer: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 30 30 Q 10 50 30 70"/><path d="M 70 70 Q 90 50 70 30"/></svg>',
        Leo: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="50" r="25"/><path d="M 50 75 Q 70 95 90 85"/></svg>',
        Virgo: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 20 20 V 80 M 40 20 V 80 M 60 20 V 80 L 85 60"/></svg>',
        Libra: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 10 70 H 90 M 30 50 Q 50 30 70 50"/></svg>',
        Scorpio: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 20 20 V 70 M 40 20 V 70 M 60 20 V 70 L 80 90 L 95 75"/></svg>',
        Sagittarius: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 20 80 L 80 20 M 50 20 H 80 V 50"/></svg>',
        Capricorn: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 20 50 V 20 L 50 40 L 80 20 V 80 Q 60 70 50 50"/></svg>',
        Aquarius: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 20 40 L 40 60 L 60 40 L 80 60 M 20 65 L 40 85 L 60 65 L 80 85"/></svg>',
        Pisces: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M 30 20 C 10 50 10 50 30 80 M 70 20 C 90 50 90 50 70 80 M 10 50 H 90"/></svg>'
    };

     // --- Prediction Generation Logic ---

    // Simple Pseudo-Random Number Generator (PRNG) based on seed
    function simplePRNG(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    // Get day of the year (1-366)
    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    // Prediction templates (expand these for more variety)
    const loveTemplates = [
        "Expect a surprising romantic gesture.", "Communication flows easily with loved ones.", "Focus on shared goals with your partner.", "A chance encounter could spark something new.", "Re-evaluate what you truly want in love.", "Passion is high, express your feelings.", "Seek harmony and understanding.", "Be open and honest about your emotions.", "A quiet evening brings closeness.", "Adventure awaits in your love life."
    ];
    const workTemplates = [
        "A challenging task leads to growth.", "Collaboration brings success.", "Your hard work will be recognized.", "Focus on organization and planning.", "An innovative idea takes shape.", "Seek feedback to improve your approach.", "Network and make new connections.", "Trust your instincts on a work matter.", "A change of pace is beneficial.", "Delegate tasks to lighten your load."
    ];
    const moneyTemplates = [
        "An unexpected expense may arise, budget carefully.", "Good news regarding finances is possible.", "Focus on long-term financial security.", "Re-evaluate your spending habits.", "An opportunity for extra income appears.", "Avoid impulsive purchases today.", "Seek financial advice if needed.", "Generosity now may pay off later.", "A practical approach to money is best.", "Review your investments or savings plan."
    ];

    // Function to generate daily predictions
    function getDailyPrediction(sign, date) {
        const dayOfYear = getDayOfYear(date);
        const signIndex = Object.keys(zodiacSVGs).indexOf(sign); // Get a number for the sign

        // Create seeds for each category based on date and sign
        const loveSeed = dayOfYear + signIndex * 10 + 1;
        const workSeed = dayOfYear + signIndex * 20 + 2;
        const moneySeed = dayOfYear + signIndex * 30 + 3;

        // Use PRNG to pick a template index
        const loveIndex = Math.floor(simplePRNG(loveSeed) * loveTemplates.length);
        const workIndex = Math.floor(simplePRNG(workSeed) * workTemplates.length);
        const moneyIndex = Math.floor(simplePRNG(moneySeed) * moneyTemplates.length);

        return {
            love: loveTemplates[loveIndex],
            work: workTemplates[workIndex],
            money: moneyTemplates[moneyIndex]
        };
    }

     // --- End Prediction Generation Logic ---


     // --- Theme Toggling Logic ---

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            bodyElement.classList.add('dark-theme');
        } else {
            bodyElement.classList.remove('dark-theme');
        }
    }

    // Function to toggle theme and save preference
    function toggleTheme() {
        const currentTheme = bodyElement.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('zodiacTheme', newTheme); // Save preference
    }

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('zodiacTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Optional: Detect system preference if no saved theme
        // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Add click listener to the theme toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

     // --- End Theme Toggling Logic ---


    // Populate zodiac signs
    for (const sign in zodiacSVGs) {
        const signElement = document.createElement('div');
        signElement.classList.add('zodiac-sign');
        signElement.dataset.sign = sign; // Store sign name

        const svgContainer = document.createElement('div');
        svgContainer.innerHTML = zodiacSVGs[sign]; // Use SVG from zodiacSVGs
        signElement.appendChild(svgContainer.firstChild); // Append the actual SVG element

        const nameSpan = document.createElement('span');
        nameSpan.textContent = sign;
        signElement.appendChild(nameSpan);

        // Add click listener
        signElement.addEventListener('click', () => showPrediction(sign));

        zodiacSelection.appendChild(signElement);
    }

    // Function to show prediction
    function showPrediction(sign) {
        const svg = zodiacSVGs[sign];
        if (!svg) return; // Sign not found

        const today = new Date();
        const predictions = getDailyPrediction(sign, today); // Generate predictions

        selectedSignSpan.textContent = sign;
        predictionContent.innerHTML = `
            <div>
                <h3>💖 Love</h3>
                <p>${predictions.love}</p>
            </div>
            <div>
                <h3>💼 Work</h3>
                <p>${predictions.work}</p>
            </div>
            <div>
                <h3>💰 Money</h3>
                <p>${predictions.money}</p>
            </div>
        `;

        zodiacSelection.style.display = 'none'; // Hide selection
        predictionDisplay.style.display = 'block'; // Show predictions
    }

    // Function to go back to selection
    function goBackToSelection() {
        predictionDisplay.style.display = 'none';
        zodiacSelection.style.display = 'grid'; // Show selection again
    }

    // Add click listener to the back button
    if (backButton) {
        backButton.addEventListener('click', goBackToSelection);
    }

    // Remove the title click listeners as they are replaced by the button
    // const titleElement = document.querySelector('h1');
    //  if (titleElement) {
    //      titleElement.style.cursor = 'pointer';
    //      titleElement.addEventListener('click', goBackToSelection);
    //  }
    //  const predictionTitle = predictionDisplay.querySelector('h2');
    //  if (predictionTitle) {
    //      predictionTitle.style.cursor = 'pointer';
    //      predictionTitle.addEventListener('click', goBackToSelection);
    //  }
});
