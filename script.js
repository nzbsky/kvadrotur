document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    menuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 30, 30, 1)';
            header.style.padding = '15px 0';
        } else {
            header.style.background = 'rgba(30, 30, 30, 0.9)';
            header.style.padding = '20px 0';
        }
    });
    
    // Price Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // Form Validation
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            const phone = this.querySelector('input[type="tel"]');
            if (!phone.value.match(/^\+?[\d\s\-\(\)]{10,}$/)) {
                e.preventDefault();
                alert('Будь ласка, введіть коректний номер телефону');
                phone.focus();
            }
        });
    }
    
    // Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgUrl = this.style.backgroundImage.slice(5, -2);
            modal.innerHTML = `<img src="${imgUrl}" alt="Gallery Image">`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    modal.addEventListener('click', function() {
        this.style.display = 'none';
        document.body.style.overflow = '';
    });
});
document.getElementById("order-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Зупиняємо стандартну відправку
    
    const form = e.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Приховати форму
            form.style.display = "none";
            // Показати повідомлення
            document.getElementById("thank-you-message").style.display = "block";
        } else {
            alert("Помилка при відправці форми. Спробуйте ще раз.");
        }
    })
    .catch(error => {
        alert("Помилка: " + error.message);
    });
});