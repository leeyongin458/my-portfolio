/**
 * 1. 스킬 호버 상세 설명 생성기 (Dynamic Tooltip)
 * HTML의 data-detail 속성을 읽어와서 동적으로 말풍선을 생성합니다.
 */
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const detailText = item.getAttribute('data-detail');
        const tooltip = document.createElement('div');
        tooltip.className = 'dynamic-tooltip';
        tooltip.innerText = detailText;
        
        // 말풍선 스타일 실시간 부여
        Object.assign(tooltip.style, {
            position: 'absolute',
            bottom: '130%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: '#fff',
            padding: '12px 18px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            width: '240px',
            textAlign: 'center',
            zIndex: '100',
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            opacity: '0',
            transition: '0.3s'
        });

        item.appendChild(tooltip);
        setTimeout(() => tooltip.style.opacity = '1', 10);
    });

    item.addEventListener('mouseleave', () => {
        const tooltip = item.querySelector('.dynamic-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }
    });
});

/**
 * 2. 스크롤 애니메이션 (Scroll Reveal)
 */
const revealOption = { threshold: 0.15 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, revealOption);

document.querySelectorAll('section, .project-box').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease-out";
    revealObserver.observe(el);
});

// 클래스 추가를 통한 애니메이션 활성화 (CSS 대신 JS로 직접 제어)
document.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.8) {
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }
    });
});