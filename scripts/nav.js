// Navigation system for Pope Solutions AI Platform
// Handles product card clicks and page routing

document.addEventListener('DOMContentLoaded', function() {
    initProductNavigation();
});

function initProductNavigation() {
    const productCards = document.querySelectorAll('.product-card.clickable');
    
    productCards.forEach(card => {
        // Add cursor pointer styling
        card.style.cursor = 'pointer';
        
        // Add click event listener
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const page = this.getAttribute('data-page');
            const product = this.getAttribute('data-product');
            
            if (page) {
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Navigate to product dashboard
                setTimeout(() => {
                    window.location.href = `platform/${page}.html`;
                }, 200);
            }
        });
        
        // Add enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 80px rgba(71, 149, 166, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Back to products navigation (for dashboard pages)
function goBackToProducts() {
    window.location.href = '../index.html';
}

// Smooth page transitions
function navigateToPage(page) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = page;
    }, 300);
}