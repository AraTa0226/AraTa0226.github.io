document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    gsap.registerPlugin(ScrollTrigger);

    // 浮遊するキャンディのアニメーション
    function createFloatingCandies() {
        const candyContainer = document.getElementById('floatingCandies');
        const candyImages = [
            '/api/placeholder/50/50',
            '/api/placeholder/50/50',
            '/api/placeholder/50/50',
            '/api/placeholder/50/50'
        ];

        for (let i = 0; i < 20; i++) {
            const candy = document.createElement('img');
            candy.src = candyImages[Math.floor(Math.random() * candyImages.length)];
            candy.style.left = `${Math.random() * 100}%`;
            candy.style.top = `${Math.random() * 100}%`;
            candy.style.animation = `float ${5 + Math.random() * 10}s infinite`;
            candyContainer.appendChild(candy);
        }
    }

    createFloatingCandies