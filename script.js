//デバッグ
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    const socialIcons = document.querySelectorAll('.social-icon');
    console.log("Number of social icons:", socialIcons.length);
    socialIcons.forEach((icon, index) => {
        console.log(`Icon ${index + 1} visibility:`, window.getComputedStyle(icon).visibility);
        console.log(`Icon ${index + 1} opacity:`, window.getComputedStyle(icon).opacity);
    });
});

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
gsap.from(".social-icon", {
    opacity: 0,
    y: 20, // x方向ではなくy方向に移動
    stagger: 0.2,
    duration: 0.8,
    delay: 1,
    ease: "power2.out",
    onStart: function() {
        gsap.set(".social-icon", {visibility: "visible"}); // アニメーション開始時に可視性を設定
    }
});

// ヘッダーのスクロールトリガー
const header = document.querySelector('.header');
let lastScrollTop = 0;
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        // スクロールダウン
        header.classList.remove('visible');
    } else {
        // スクロールアップ
        header.classList.add('visible');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // モバイルやネガティブスクロールの対応
}, false);

// ページ読み込み時にヘッダーを非表示に
window.addEventListener('load', () => {
    header.classList.remove('visible');
});

// スクロールしたらヘッダーを表示
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
});