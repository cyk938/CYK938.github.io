// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// 添加粒子背景效果
function createParticles() {
    const particlesContainer = document.getElementById('particles-bg');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 添加粒子样式
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: float linear infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 初始化粒子
document.addEventListener('DOMContentLoaded', createParticles);

// 法语单词数据
const frenchWords = [
    { 
        french: "Bonjour", 
        pinyin: "bɔ̃ʒuʁ", 
        chinese: "你好",
        audio: "./assets/audio/bonjour.mp3"
    },
    { 
        french: "Merci", 
        pinyin: "mɛʁsi", 
        chinese: "谢谢",
        audio: "./assets/audio/merci.mp3"
    },
    { 
        french: "Au revoir", 
        pinyin: "o ʁəvwaʁ", 
        chinese: "再见",
        audio: "./assets/audio/au_revoir.mp3"
    },
    { 
        french: "S'il vous plaît", 
        pinyin: "sil vu plɛ", 
        chinese: "请",
        audio: "./assets/audio/sil_vous_plait.mp3"
    },
    { 
        french: "Je t'aime", 
        pinyin: "ʒə tɛm", 
        chinese: "我爱你",
        audio: "./assets/audio/je_taime.mp3"
    },
    { 
        french: "Comment allez-vous", 
        pinyin: "kɔmɑ̃t ale vu", 
        chinese: "你好吗",
        audio: "https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/co/comment_allez_vous_fr_1.mp3"
    },
    { 
        french: "Oui", 
        pinyin: "wi", 
        chinese: "是的",
        audio: "https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/ou/oui_fr_1.mp3"
    },
    { 
        french: "Non", 
        pinyin: "nɔ̃", 
        chinese: "不",
        audio: "https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/no/non_fr_1.mp3"
    },
    { 
        french: "Excusez-moi", 
        pinyin: "ɛkskyzε mwa", 
        chinese: "对不起",
        audio: "https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/ex/excusez_moi_fr_1.mp3"
    },
    { 
        french: "Bonne nuit", 
        pinyin: "bɔn nɥi", 
        chinese: "晚安",
        audio: "https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/bo/bonne_nuit_fr_1.mp3"
    }
];

// 获取今天的日期作为随机种子
function getTodaysSeed() {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

// 使用日期作为种子的伪随机数生成器
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// 获取今天的五个单词
function getTodaysWords() {
    const seed = getTodaysSeed();
    const selectedWords = [];
    const tempWords = [...frenchWords];
    
    for (let i = 0; i < 5 && tempWords.length > 0; i++) {
        const index = Math.floor(seededRandom(seed + i) * tempWords.length);
        selectedWords.push(tempWords.splice(index, 1)[0]);
    }
    
    return selectedWords;
}

// 显示单词到页面
function displayDailyWords() {
    const wordList = document.getElementById('wordList');
    const todaysWords = getTodaysWords();
    
    wordList.innerHTML = todaysWords.map(word => `
        <div class="word-card">
            <div class="word-header">
                <div class="word-french">${word.french}</div>
                <button class="play-button" onclick="playAudio('${word.audio}')">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="word-pinyin">${word.pinyin}</div>
            <div class="word-chinese">${word.chinese}</div>
        </div>
    `).join('');
}

// 修改播放音频的函数，添加错误处理和加载提示
function playAudio(url) {
    if (!url) {
        console.log('没有音频链接');
        return;
    }
    
    const audio = new Audio(url);
    const button = event.currentTarget;
    const originalIcon = button.innerHTML;
    
    // 添加加载状态
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    audio.play()
        .then(() => {
            // 播放成功，恢复原始图标
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 1000);
        })
        .catch(error => {
            console.log('播放失败:', error);
            // 播放失败，显示错误图标
            button.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 2000);
        });
}

// 页面加载时显示单词
document.addEventListener('DOMContentLoaded', function() {
    displayDailyWords();
}); 