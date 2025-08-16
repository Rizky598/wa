document.addEventListener("DOMContentLoaded", function() {
    const backgroundVideo = document.getElementById("background-video");
    const enableAudioBtn = document.getElementById("enable-audio-btn");

    // Show the button if the video is muted (which it is by default)
    if (backgroundVideo.muted) {
        enableAudioBtn.style.display = "block";
    }

    enableAudioBtn.addEventListener("click", function() {
        backgroundVideo.muted = false;
        backgroundVideo.play();
        enableAudioBtn.style.display = "none";
    });

    // Clock functionality for Padang timezone (WIB - UTC+7)
    function updateClock() {
        const now = new Date();
        
        // Convert to Padang time (WIB - UTC+7)
        const padangTime = new Date(now.getTime() + (7 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
        
        const hours = padangTime.getHours().toString().padStart(2, '0');
        const minutes = padangTime.getMinutes().toString().padStart(2, '0');
        const seconds = padangTime.getSeconds().toString().padStart(2, '0');
        
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        
        const dayName = days[padangTime.getDay()];
        const day = padangTime.getDate();
        const month = months[padangTime.getMonth()];
        const year = padangTime.getFullYear();
        
        const dateString = `${dayName}, ${day} ${month} ${year}`;
        
        document.getElementById('clock-time').textContent = timeString;
        document.getElementById('clock-date').textContent = dateString;
    }
    
    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);

    // Floating particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        document.getElementById('particles').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);

    // Background video controls
    const playPauseBtn = document.querySelector(".play-pause");
    const volumeBtn = document.querySelector(".volume");
    const progressBar = document.querySelector(".progress-bar");
    const progress = document.querySelector(".progress");
    const timeDisplay = document.querySelector(".time");
    
    // Password functionality
    const passwordInput = document.querySelector(".password-input");
    const enterBtn = document.querySelector(".enter-btn");
    
    // WhatsApp button
    const whatsappBtn = document.querySelector(".whatsapp-btn");
    
    // Video controls
    let isPlaying = true;
    let isMuted = true;
    
    // Play/Pause functionality
    playPauseBtn.addEventListener("click", function() {
        if (isPlaying) {
            backgroundVideo.pause();
            playPauseBtn.textContent = "▶️";
            isPlaying = false;
        } else {
            backgroundVideo.play();
            playPauseBtn.textContent = "⏸️";
            isPlaying = true;
        }
    });
    
    // Volume control
    volumeBtn.addEventListener("click", function() {
        if (backgroundVideo.muted) {
            backgroundVideo.muted = false;
            volumeBtn.textContent = "🔊";
        } else {
            backgroundVideo.muted = true;
            volumeBtn.textContent = "🔇";
        }
    });
    
    // Progress bar update
    backgroundVideo.addEventListener("timeupdate", function() {
        const currentTime = backgroundVideo.currentTime;
        const duration = backgroundVideo.duration;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = progressPercent + "%";
            
            // Update time display
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = Math.floor(currentTime % 60);
            const durationMinutes = Math.floor(duration / 60);
            const durationSeconds = Math.floor(duration % 60);
            
            timeDisplay.textContent = 
                `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")} / ${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`;
        }
    });
    
    // Progress bar click
    progressBar.addEventListener("click", function(e) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const clickPercent = clickX / width;
        
        if (backgroundVideo.duration) {
            backgroundVideo.currentTime = clickPercent * backgroundVideo.duration;
        }
    });
    
    // Password functionality with enhanced feedback
    async function checkPassword() {
        const password = passwordInput.value;
        
        if (password.length === 0) {
            showNotification('Silakan masukkan password!', 'warning');
            return;
        }
        
        // Add loading state
        enterBtn.textContent = 'Checking...';
        enterBtn.disabled = true;
        
        try {
            const response = await fetch('https://rizky598.github.io/api/password.json');
            const data = await response.json();
            const correctPassword = data.password;

            if (password === correctPassword) {
                showNotification('Password benar! Mengarahkan ke website tujuan.', 'success');
                setTimeout(() => {
                    window.location.href = 'https://rizky598.github.io/Ai';
                }, 1500);
            } else {
                showNotification('Password salah! Coba lagi.', 'error');
                passwordInput.value = '';
                passwordInput.focus();
            }
        } catch (error) {
            console.error('Error fetching password:', error);
            showNotification('Gagal mengambil password. Silakan coba lagi nanti.', 'error');
        } finally {
            enterBtn.textContent = 'Enter';
            enterBtn.disabled = false;
        }
    }
    
    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            animation: slideDown 0.3s ease-out;
        `;
        
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
                break;
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    enterBtn.addEventListener("click", checkPassword);
    
    passwordInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            checkPassword();
        }
    });
    
    // Enhanced password input effects
    passwordInput.addEventListener("focus", function() {
        this.parentElement.style.transform = "scale(1.02)";
    });
    
    passwordInput.addEventListener("blur", function() {
        this.parentElement.style.transform = "scale(1)";
    });
    
    // WhatsApp button functionality
    whatsappBtn.addEventListener("click", function() {
        const whatsappLink = "https://chat.whatsapp.com/Jmbs0K52j3fB4FOP5wViWX";
        window.open(whatsappLink, "_blank");
        
        // Add click effect
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);
    });
    
    // Navigation functionality
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');
    
    navLeft.addEventListener('click', function() {
        window.location.href = 'prices.html';
        showNotification('Menuju halaman harga...', 'success');
    });
    
    navRight.addEventListener('click', function() {
        // Already on home page, just show notification
        showNotification('Anda sudah di halaman utama', 'warning');
    });
    
    // Touch/Swipe detection for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    });
    
    // Mouse swipe detection for desktop
    let isMouseDown = false;
    
    document.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        startX = e.clientX;
        startY = e.clientY;
    });
    
    document.addEventListener('mouseup', function(e) {
        if (isMouseDown) {
            endX = e.clientX;
            endY = e.clientY;
            handleSwipe();
            isMouseDown = false;
        }
    });
    
    function handleSwipe() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go to home (already on home)
                showNotification('Swipe terdeteksi! Anda sudah di halaman utama', 'warning');
            } else {
                // Swipe left - go to prices
                window.location.href = 'prices.html';
                showNotification('Swipe terdeteksi! Menuju halaman harga...', 'success');
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            window.location.href = 'prices.html';
            showNotification('Navigasi keyboard: Menuju halaman harga...', 'success');
        } else if (e.key === 'ArrowRight') {
            showNotification('Navigasi keyboard: Anda sudah di halaman utama', 'warning');
        }
    });
    
    // Social media and contact functions
    window.openAdminChat = function() {
        const adminNumber = "6283850540570";
        const message = "Halo Admin, saya ingin bertanya tentang RIZRCH Tools";
        const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        showNotification('Mengarahkan ke chat admin...', 'success');
    };
    
    window.openTikTok = function() {
        const tiktokUrl = "https://www.tiktok.com/@rizky.cyber";
        window.open(tiktokUrl, "_blank");
        showNotification('Membuka TikTok @rizky.cyber', 'success');
    };
    
    window.openGitHub = function() {
        const githubUrl = "https://github.com/Rizky598";
        window.open(githubUrl, "_blank");
        showNotification('Membuka GitHub Rizky598', 'success');
    };
    
    // Enhanced visual effects
    function addGlowEffect() {
        const logo = document.querySelector(".logo");
        logo.style.boxShadow = "0 0 50px rgba(255, 107, 53, 0.8)";
        
        setTimeout(() => {
            logo.style.boxShadow = "0 0 30px rgba(255, 107, 53, 0.6)";
        }, 2000);
    }
    
    // Apply glow effect every 5 seconds
    setInterval(addGlowEffect, 5000);
    
    // Mouse movement parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const logo = document.querySelector('.logo');
        const translateX = (mouseX - 0.5) * 20;
        const translateY = (mouseY - 0.5) * 20;
        
        logo.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
    
    // Scroll animations
    function handleScroll() {
        const elements = document.querySelectorAll('.description, .video-player, .password-section, .whatsapp-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initial setup
    backgroundVideo.muted = true;
    backgroundVideo.play();
    
    // Welcome animation
    setTimeout(() => {
        showNotification('Selamat datang di RIZRCH Tools! 🚀', 'success');
    }, 1000);
});

