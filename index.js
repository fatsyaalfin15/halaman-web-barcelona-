// Toggle mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    
    
    const icon = this.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.addEventListener('click', function(event) {
    const isDropdown = event.target.matches('.dropdown a') || 
                      event.target.closest('.dropdown a');
    
    if (!isDropdown) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = 'none';
        }
    }
});


function animateStatBars() {
    const statLevels = document.querySelectorAll('.stat-level');
    statLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0';
        
        setTimeout(() => {
            level.style.transition = 'width 1s ease-in-out';
            level.style.width = width;
        }, 300);
    });
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}


document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            const isVisible = dropdownContent.style.display === 'block';
            
          
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
            
      
            dropdownContent.style.display = isVisible ? 'none' : 'block';
        }
    });
});


function updateCountdown() {
    const matchDate = new Date('October 28, 2023 20:45:00').getTime();
    const now = new Date().getTime();
    const distance = matchDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "MATCH LIVE NOW!";
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


setInterval(updateCountdown, 1000);
updateCountdown();


let currentNewsIndex = 0;
const newsCards = document.querySelectorAll('.news-card');

function showNews(index) {
    newsCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

if (window.innerWidth <= 768) {
    showNews(0);
    setInterval(() => {
        currentNewsIndex = (currentNewsIndex + 1) % newsCards.length;
        showNews(currentNewsIndex);
    }, 5000);
}
