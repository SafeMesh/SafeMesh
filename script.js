document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        const isExpanded = navMenu.classList.contains('show');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (answer.classList.contains('show')) {
                answer.classList.remove('show');
                answer.style.maxHeight = null;
            } else {
                answer.classList.add('show');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('name').value.trim();
            if (name === '' || /\d/.test(name)) {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('nameError').style.display = 'none';
            }
            
            const email = document.getElementById('email').value.trim();
            if (email === '' || !isValidEmail(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
            }
            
            const subject = document.getElementById('subject').value;
            if (subject === '') {
                document.getElementById('subjectError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('subjectError').style.display = 'none';
            }
            
            const message = document.getElementById('message').value.trim();
            if (message === '') {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('messageError').style.display = 'none';
            }
            
            if (isValid) {
                document.getElementById('contactSuccess').textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                document.getElementById('contactSuccess').style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    document.getElementById('contactSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            let isValid = true;
            
            if (name === '') {
                document.getElementById('registerNameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('registerNameError').style.display = 'none';
            }
            
            if (email === '' || !isValidEmail(email)) {
                document.getElementById('registerEmailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('registerEmailError').style.display = 'none';
            }
            
            if (password.length < 6) {
                document.getElementById('registerPasswordError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('registerPasswordError').style.display = 'none';
            }
            
            if (password !== confirmPassword) {
                document.getElementById('passwordMatchError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('passwordMatchError').style.display = 'none';
            }
            
            if (isValid) {
                document.getElementById('registerSuccess').textContent = 'Cadastro realizado com sucesso!';
                document.getElementById('registerSuccess').style.display = 'block';
                registerForm.reset();
                switchTab('login');
                
                setTimeout(() => {
                    document.getElementById('registerSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            let isValid = true;
            
            if (email === '' || !isValidEmail(email)) {
                document.getElementById('loginEmailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('loginEmailError').style.display = 'none';
            }
            
            if (password === '') {
                document.getElementById('loginPasswordError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('loginPasswordError').style.display = 'none';
            }
            
            if (isValid) {
                document.getElementById('loginSuccess').textContent = 'Login realizado com sucesso!';
                document.getElementById('loginSuccess').style.display = 'block';
                loginForm.reset();
                
                setTimeout(() => {
                    document.getElementById('loginSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const teamMembers = document.querySelectorAll('.team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    teamMembers.forEach(member => {
        observer.observe(member);
    });
});

function switchTab(tab) {
    const loginTab = document.querySelector('.auth-tab:first-child');
    const registerTab = document.querySelector('.auth-tab:last-child');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
}
