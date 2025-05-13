// Initialize like counters from localStorage or set to 0
document.addEventListener('DOMContentLoaded', function() {
    initializeLikeButtons();
    initializeReadMoreButtons();
    initializeNewsletterForm();
    initializeThemeToggle();
    
    // About page specific functionality
    initializeTeamMembers();
    initializeValuesList();
    initializeContactButton();
});

function initializeLikeButtons() {
    document.querySelectorAll('.like-btn').forEach((btn, index) => {
        const count = localStorage.getItem(`post-${index}-likes`) || 0;
        btn.querySelector('span').textContent = count;
        
        if (localStorage.getItem(`post-${index}-liked`) === 'true') {
            btn.classList.add('active');
        }
        
        // Add click event
        btn.addEventListener('click', function() {
            const countSpan = this.querySelector('span');
            const currentCount = parseInt(countSpan.textContent);
            
            if (this.classList.contains('active')) {
                // Unlike
                countSpan.textContent = currentCount - 1;
                this.classList.remove('active');
                localStorage.setItem(`post-${index}-liked`, 'false');
            } else {
                // Like
                countSpan.textContent = currentCount + 1;
                this.classList.add('active');
                localStorage.setItem(`post-${index}-liked`, 'true');
            }
            
            // Save updated count
            localStorage.setItem(`post-${index}-likes`, countSpan.textContent);
            
            // Add animation
            this.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.25)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease'
            });
        });
    });
}

function initializeReadMoreButtons() {
    // Read More button functionality
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const post = this.closest('.post');
            const title = post.querySelector('h2').textContent;
            
            alert(`Article "${title}" would open in a new page. This is just a demo.`);
        });
    });
}

function initializeNewsletterForm() {
    // Newsletter submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            // Display success message
            this.innerHTML = `<p style="text-align: center; color: var(--success-color);">Thank you! ${email} has been subscribed.</p>`;
        });
    }
}

function initializeThemeToggle() {
    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check if user has a preference saved
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });
}

// About page specific functions
function initializeTeamMembers() {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid) return;
    
    // Add hover effect and animation to team members
    teamGrid.querySelectorAll('.team-member').forEach((member, index) => {
        // Add staggered animation delay
        member.style.animationDelay = `${index * 0.15}s`;
        member.classList.add('fadeInUp');
        
        // Optional: Add click event to show more info
        member.addEventListener('click', function() {
            const memberName = this.querySelector('h4').textContent;
            const memberTitle = this.querySelector('.member-title').textContent;
            
            // Simple modal could be added here
            console.log(`${memberName}, ${memberTitle}`);
        });
    });
}

function initializeValuesList() {
    const valuesList = document.getElementById('values-list');
    if (!valuesList) return;
    
    // Add staggered animation to values
    valuesList.querySelectorAll('.value-item').forEach((item, index) => {
        // Add animation delay based on index
        item.style.animationDelay = `${index * 0.15}s`;
        item.classList.add('fadeInRight');
    });
}

function initializeContactButton() {
    const contactBtn = document.getElementById('contact-btn');
    if (!contactBtn) return;
    
    contactBtn.addEventListener('click', function() {
        // Redirect to contact page or open modal
        window.location.href = 'contact.html';
    });
}

// Add these animation classes
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for animations to the document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .fadeInUp {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        .fadeInRight {
            animation: fadeInRight 0.6s ease forwards;
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYou');
    const newMessageBtn = document.getElementById('newMessageBtn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.querySelector('.button-text');
    const buttonLoader = document.querySelector('.button-loader');
    
    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Reset error messages
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name';
            nameError.style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message';
            messageError.style.display = 'block';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Your message is too short (minimum 10 characters)';
            messageError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Simulated form submission
    function submitForm(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        buttonText.textContent = 'Sending...';
        buttonLoader.style.display = 'inline-block';
        submitButton.disabled = true;
        
        // Simulate API call with delay
        setTimeout(function() {
            // Hide form and show thank you message
            contactForm.style.display = 'none';
            thankYouMessage.classList.remove('hidden');
            thankYouMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            buttonText.textContent = 'Send Message';
            buttonLoader.style.display = 'none';
            submitButton.disabled = false;
        }, 1500);
    }
    
    // Send another message
    function resetForm() {
        thankYouMessage.classList.add('hidden');
        thankYouMessage.classList.remove('show');
        contactForm.style.display = 'block';
    }
    
    // Form input event listeners for real-time validation
    nameInput.addEventListener('blur', function() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name';
            nameError.style.display = 'block';
        } else {
            nameError.style.display = 'none';
        }
    });
    
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value) && emailInput.value.trim() !== '') {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });
    
    messageInput.addEventListener('blur', function() {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message';
            messageError.style.display = 'block';
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Your message is too short (minimum 10 characters)';
            messageError.style.display = 'block';
        } else {
            messageError.style.display = 'none';
        }
    });
    
    // Event listeners
    contactForm.addEventListener('submit', submitForm);
    newMessageBtn.addEventListener('click', resetForm);
});