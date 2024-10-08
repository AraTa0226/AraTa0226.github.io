document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    gsap.registerPlugin(ScrollTrigger);

    // 浮遊するキャンディのアニメーション
    function createFloatingCandies() {
        const candyContainer = document.getElementById('floatingCandies');
        const candyImages = [
            '/images/アイス1.png',
            '/images/アイス2.png',
            '/images/アイス3.png',
            '/images/アイス4.png'
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

    createFloatingCandies();

    // ヒーローセクションのアニメーション
    gsap.from(".hero-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });

    // キャンディアイテムのアニメーション
    gsap.utils.toArray('.candy-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            rotation: 10,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 60; // ヘッダーの高さ

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // SNSアイコンのアニメーション
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        gsap.from(icon, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 1 + (index * 0.2),
            ease: "power2.out",
            onStart: function() {
                gsap.set(icon, {visibility: "visible"});
            }
        });
    });

    // ヘッダーのスクロールトリガー
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;

    function handleScroll() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // スクロールダウン
            header.classList.remove('visible');
        } else {
            // スクロールアップ
            header.classList.add('visible');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // モバイルやネガティブスクロールの対応

        // スクロールしたらヘッダーを表示
        if (scrollTop > 100) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, false);

    // 初期状態でヘッダーを非表示に
    header.classList.remove('visible');
});