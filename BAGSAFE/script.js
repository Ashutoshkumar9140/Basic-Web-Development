// Modal functionality
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const loginSubmit = document.getElementById('loginSubmit');
const registerSubmit = document.getElementById('registerSubmit');
const logoutBtn = document.getElementById('logoutBtn');
const mainContent = document.getElementById('main-content');
const dashboard = document.getElementById('dashboard');
const userName = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const userType = document.getElementById('userType');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('nav ul');
const authButtons = document.querySelector('.auth-buttons');
const logoutContainer = document.getElementById('logoutContainer');
const mainNav = document.getElementById('mainNav');

// User type toggle
const studentBtn = document.getElementById('studentBtn');
const homeownerBtn = document.getElementById('homeownerBtn');
const studentFields = document.getElementById('studentFields');
const homeownerFields = document.getElementById('homeownerFields');

// Login type selection
const userTypeOptions = document.querySelectorAll('.user-type-option');

// FAQ toggle
const faqItems = document.querySelectorAll('.faq-item');

// Dashboard sections
const homeownerDashboard = document.getElementById('homeowner-dashboard');
const studentDashboard = document.getElementById('student-dashboard');

// Open login modal
loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
});

// Open register modal
registerBtn.addEventListener('click', () => {
    registerModal.classList.add('active');
});

// Close modals
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        registerModal.classList.remove('active');
    });
});

// Switch between login and register modals
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
    }
});

// User type toggle
studentBtn.addEventListener('click', () => {
    studentBtn.classList.add('active');
    homeownerBtn.classList.remove('active');
    studentFields.style.display = 'block';
    homeownerFields.style.display = 'none';
});

homeownerBtn.addEventListener('click', () => {
    homeownerBtn.classList.add('active');
    studentBtn.classList.remove('active');
    homeownerFields.style.display = 'block';
    studentFields.style.display = 'none';
});

// Login type selection
userTypeOptions.forEach(option => {
    option.addEventListener('click', () => {
        userTypeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// FAQ toggle
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Login functionality
loginSubmit.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if(email && password) {
        // Get selected user type
        const selectedType = document.querySelector('.user-type-option.active').dataset.type;
        
        // Simulate login success
        // loginModal.classList.remove('active');
        // Simulate login success with specific names
loginModal.classList.remove('active');

let name;
if (selectedType === 'homeowner') {
    name = 'Aarav Gupta';
} else {
    name = 'Raj Patel';
}

showDashboard(name, selectedType === 'homeowner' ? 'Homeowner' : 'Student', selectedType);

        // showDashboard('Raj Patel', selectedType === 'homeowner' ? 'Homeowner' : 'Student', selectedType);
    } else {
        alert('Please fill in all fields');
    }
});

// Registration functionality
registerSubmit.addEventListener('click', () => {
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if(password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if(name && email && phone && password) {
        // Get user type
        const isHomeowner = homeownerBtn.classList.contains('active');
        const userType = isHomeowner ? 'homeowner' : 'student';
        
        // Simulate registration success
        registerModal.classList.remove('active');
        showDashboard(name, isHomeowner ? 'Homeowner' : 'Student', userType);
    } else {
        alert('Please fill in all required fields');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    // Hide dashboard, show main content
    dashboard.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Show navigation and auth buttons
    mainNav.style.display = 'flex';
    authButtons.style.display = 'flex';
    logoutContainer.style.display = 'none';
});

// Show dashboard function
function showDashboard(name, type, userType) {
    // Hide main content, show dashboard
    mainContent.style.display = 'none';
    dashboard.style.display = 'block';
    
    // Update user info
    userName.textContent = name;
    userType.textContent = type + ' Account';
    userAvatar.textContent = name.charAt(0);
    
    // Hide navigation and auth buttons, show logout button
    mainNav.style.display = 'none';
    authButtons.style.display = 'none';
    logoutContainer.style.display = 'block';
    
    // Show the correct dashboard based on user type
    if(userType === 'homeowner') {
        homeownerDashboard.style.display = 'grid';
        studentDashboard.style.display = 'none';
    } else {
        homeownerDashboard.style.display = 'none';
        studentDashboard.style.display = 'grid';
    }
}

// Simulate booking functionality
document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Booking functionality would open a payment form in a real application. After payment, you would receive the homeowner contact details.');
    });
});

// Mobile menu functionality
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    authButtons.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Toggle menu icon
    if (navMenu.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        authButtons.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Hide logout button initially
    logoutContainer.style.display = 'none';
    
    // Hide dashboard initially
    dashboard.style.display = 'none';
    
    // Hide both dashboards initially
    homeownerDashboard.style.display = 'none';
    studentDashboard.style.display = 'none';
    
    // Add accept/reject functionality (only for homeowners)
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestCard = this.closest('.request-card');
            requestCard.style.borderLeft = '4px solid var(--accent)';
            this.textContent = 'Accepted';
            this.disabled = true;
            this.nextElementSibling.disabled = true;
            alert('Request accepted! Student has been notified.');
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestCard = this.closest('.request-card');
            requestCard.style.opacity = '0.6';
            this.textContent = 'Rejected';
            this.disabled = true;
            this.previousElementSibling.disabled = true;
            alert('Request rejected! Student has been notified.');
        });
    });
});