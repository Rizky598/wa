document.addEventListener("DOMContentLoaded", function() {
    // Navigation functionality for prices page
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');
    
    if (navLeft) {
        navLeft.addEventListener('click', function() {
            showNotification('Anda sudah di halaman harga', 'warning');
        });
    }
    
    if (navRight) {
        navRight.addEventListener('click', function() {
            window.location.href = 'index.html';
            showNotification('Kembali ke halaman utama...', 'success');
        });
    }
    
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
                // Swipe right - go to home
                window.location.href = 'index.html';
                showNotification('Swipe terdeteksi! Kembali ke halaman utama...', 'success');
            } else {
                // Swipe left - already on prices
                showNotification('Swipe terdeteksi! Anda sudah di halaman harga', 'warning');
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showNotification('Navigasi keyboard: Anda sudah di halaman harga', 'warning');
        } else if (e.key === 'ArrowRight') {
            window.location.href = 'index.html';
            showNotification('Navigasi keyboard: Kembali ke halaman utama...', 'success');
        }
    });
    
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
});

