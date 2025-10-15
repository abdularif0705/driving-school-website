/*
 * COMPREHENSIVE PAGINATION GUIDE - From Beginner to Advanced
 * This file progressively teaches pagination concepts with increasing complexity
 */

// ============================================
// LEVEL 1: BASIC PAGINATION (Beginner)
// ============================================

console.log("=== LEVEL 1: BASIC PAGINATION ===\n");

// Core variables
let currentPage = 1;
let postsPerPage = 8;
let allPosts = [];

// Find all blog posts
function findAllPosts() {
    const postElements = document.querySelectorAll(".blog-post");
    allPosts = Array.from(postElements);
    console.log(`✓ Found ${allPosts.length} total blog posts`);
    return allPosts;
}

// Calculate total pages needed
function calculateTotalPages() {
    if (allPosts.length === 0) return 0;
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    console.log(`✓ Need ${totalPages} pages for ${allPosts.length} posts`);
    return totalPages;
}

// Show posts for a specific page
function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    console.log(`Page ${pageNumber}: Posts ${startIndex} to ${Math.min(endIndex - 1, allPosts.length - 1)}`);
    
    // Hide all posts first
    allPosts.forEach(post => {
        post.style.display = "none";
    });
    
    // Show only posts for this page (with bounds checking!)
    for (let i = startIndex; i < endIndex && i < allPosts.length; i++) {
        allPosts[i].style.display = "block";
    }
}

// ============================================
// LEVEL 2: ERROR HANDLING & VALIDATION (Intermediate)
// ============================================

console.log("\n=== LEVEL 2: ERROR HANDLING ===\n");

function goToPageSafe(pageNumber) {
    const totalPages = calculateTotalPages();
    
    // Input validation
    if (typeof pageNumber !== 'number') {
        console.error(`❌ Invalid page number: ${pageNumber} (must be a number)`);
        return false;
    }
    
    if (pageNumber < 1) {
        console.warn(`⚠️ Page ${pageNumber} is too low, showing page 1 instead`);
        pageNumber = 1;
    }
    
    if (pageNumber > totalPages) {
        console.warn(`⚠️ Page ${pageNumber} exceeds max ${totalPages}, showing last page`);
        pageNumber = totalPages;
    }
    
    if (pageNumber === currentPage) {
        console.log(`ℹ️ Already on page ${pageNumber}`);
        return true;
    }
    
    currentPage = pageNumber;
    showPage(currentPage);
    console.log(`✓ Navigated to page ${currentPage}`);
    return true;
}

// ============================================
// LEVEL 3: ADVANCED FEATURES (Advanced)
// ============================================

console.log("\n=== LEVEL 3: ADVANCED FEATURES ===\n");

// State management object
const PaginationState = {
    currentPage: 1,
    itemsPerPage: 8,
    allItems: [],
    filteredItems: [],
    searchQuery: '',
    sortOrder: 'default',
    
    // Reset state
    reset() {
        this.currentPage = 1;
        this.filteredItems = [...this.allItems];
    },
    
    // Get current page info
    getInfo() {
        const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredItems.length);
        
        return {
            currentPage: this.currentPage,
            totalPages: totalPages,
            totalItems: this.filteredItems.length,
            startIndex: startIndex,
            endIndex: endIndex,
            itemsOnPage: endIndex - startIndex
        };
    }
};

// ============================================
// LEVEL 4: PAGINATION WITH SEARCH/FILTER
// ============================================

console.log("\n=== LEVEL 4: SEARCH & FILTER ===\n");

function searchAndPaginate(searchQuery) {
    console.log(`🔍 Searching for: "${searchQuery}"`);
    
    // Filter posts based on search
    if (!searchQuery || searchQuery.trim() === '') {
        PaginationState.filteredItems = [...PaginationState.allItems];
    } else {
        const query = searchQuery.toLowerCase();
        PaginationState.filteredItems = PaginationState.allItems.filter(post => {
            const text = post.textContent.toLowerCase();
            return text.includes(query);
        });
    }
    
    // Important: Reset to page 1 after search
    PaginationState.currentPage = 1;
    PaginationState.searchQuery = searchQuery;
    
    const info = PaginationState.getInfo();
    console.log(`✓ Found ${info.totalItems} results (${info.totalPages} pages)`);
    
    // Show results
    showFilteredPage(1);
    
    // Handle no results
    if (info.totalItems === 0) {
        showNoResultsMessage(searchQuery);
    } else {
        hideNoResultsMessage();
    }
}

function showFilteredPage(pageNumber) {
    const info = PaginationState.getInfo();
    
    // Hide all posts
    PaginationState.allItems.forEach(post => {
        post.style.display = "none";
    });
    
    // Show only filtered posts for this page
    const startIndex = (pageNumber - 1) * PaginationState.itemsPerPage;
    const endIndex = startIndex + PaginationState.itemsPerPage;
    
    for (let i = startIndex; i < endIndex && i < PaginationState.filteredItems.length; i++) {
        PaginationState.filteredItems[i].style.display = "block";
    }
}

// ============================================
// LEVEL 5: PERFORMANCE OPTIMIZATION
// ============================================

console.log("\n=== LEVEL 5: PERFORMANCE ===\n");

// Debounce function for search (waits for user to stop typing)
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Optimized search with debouncing
const optimizedSearch = debounce((query) => {
    console.log(`⚡ Debounced search: "${query}"`);
    searchAndPaginate(query);
}, 300); // Wait 300ms after user stops typing

// Virtual scrolling concept (for 1000+ items)
function calculateVisibleRange(scrollTop, itemHeight, containerHeight) {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
    const buffer = 5; // Render a few extra items as buffer
    
    return {
        start: Math.max(0, startIndex - buffer),
        end: Math.min(allPosts.length, endIndex + buffer)
    };
}

// ============================================
// LEVEL 6: URL-BASED PAGINATION (SEO)
// ============================================

console.log("\n=== LEVEL 6: URL PAGINATION ===\n");

function initURLPagination() {
    // Read page from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromURL = parseInt(urlParams.get('page')) || 1;
    
    console.log(`📄 URL parameter: page=${pageFromURL}`);
    
    // Navigate to that page
    goToPageSafe(pageFromURL);
}

function updateURL(pageNumber) {
    const url = new URL(window.location);
    url.searchParams.set('page', pageNumber);
    
    // Update URL without page reload
    window.history.pushState({ page: pageNumber }, '', url);
    console.log(`✓ Updated URL: ${url.pathname}${url.search}`);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        console.log(`← Browser back/forward to page ${event.state.page}`);
        goToPageSafe(event.state.page);
    }
});

// ============================================
// LEVEL 7: ACCESSIBILITY FEATURES
// ============================================

console.log("\n=== LEVEL 7: ACCESSIBILITY ===\n");

function createAccessiblePaginationButton(pageNum, isActive = false) {
    const button = document.createElement('button');
    button.textContent = pageNum;
    button.setAttribute('data-page', pageNum);
    button.className = `page-link ${isActive ? 'active' : ''}`;
    
    // ARIA attributes for screen readers
    if (isActive) {
        button.setAttribute('aria-current', 'page');
        button.setAttribute('aria-label', `Current page, page ${pageNum}`);
        button.disabled = true; // Can't click current page
    } else {
        button.setAttribute('aria-label', `Go to page ${pageNum}`);
    }
    
    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToPageAndAnnounce(pageNum);
        }
    });
    
    return button;
}

function goToPageAndAnnounce(pageNum) {
    goToPageSafe(pageNum);
    
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only'; // Screen reader only
    announcement.textContent = `Page ${pageNum} loaded`;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => announcement.remove(), 1000);
    
    // Scroll to top of content
    const contentTop = document.querySelector('.blog-content');
    if (contentTop) {
        contentTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
        contentTop.focus(); // Move keyboard focus
    }
}

// ============================================
// LEVEL 8: INFINITE SCROLL ALTERNATIVE
// ============================================

console.log("\n=== LEVEL 8: INFINITE SCROLL ===\n");

let isLoading = false;
let hasMorePages = true;

function initInfiniteScroll() {
    window.addEventListener('scroll', () => {
        // Don't load if already loading or no more pages
        if (isLoading || !hasMorePages) return;
        
        // Check if user scrolled near bottom
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.body.offsetHeight;
        const threshold = 200; // Load 200px before bottom
        
        if (scrollPosition >= pageHeight - threshold) {
            loadNextPage();
        }
    });
}

function loadNextPage() {
    const totalPages = calculateTotalPages();
    
    if (currentPage >= totalPages) {
        hasMorePages = false;
        console.log('📜 No more pages to load');
        return;
    }
    
    isLoading = true;
    console.log(`⬇️ Loading page ${currentPage + 1}...`);
    
    // Simulate loading delay (remove in production)
    setTimeout(() => {
        currentPage++;
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        
        // Append (not replace) new posts
        for (let i = startIndex; i < endIndex && i < allPosts.length; i++) {
            allPosts[i].style.display = "block";
            allPosts[i].classList.add('fade-in'); // Animation
        }
        
        isLoading = false;
        console.log(`✓ Loaded page ${currentPage}`);
    }, 500);
}

// ============================================
// LEVEL 9: COMPLETE INITIALIZATION
// ============================================

console.log("\n=== INITIALIZING PAGINATION ===\n");

document.addEventListener("DOMContentLoaded", function() {
    console.log("📦 DOM loaded, initializing pagination...");
    
    // Step 1: Find all posts
    findAllPosts();
    
    if (allPosts.length === 0) {
        console.warn("⚠️ No blog posts found!");
        return;
    }
    
    // Step 2: Initialize state
    PaginationState.allItems = allPosts;
    PaginationState.filteredItems = [...allPosts];
    
    // Step 3: Check URL for page number
    initURLPagination();
    
    // Step 4: Show first page
    showPage(currentPage);
    
    // Step 5: Setup event listeners
    setupEventListeners();
    
    console.log("✅ Pagination initialized successfully!");
    console.log("\n🎮 Try these commands in console:");
    console.log("  goToPageSafe(2)           - Go to page 2");
    console.log("  searchAndPaginate('test') - Search posts");
    console.log("  PaginationState.getInfo() - Get current state");
});

function setupEventListeners() {
    // Search input with debouncing
    const searchInput = document.querySelector('.blog-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            optimizedSearch(e.target.value);
        });
    }
    
    // Pagination buttons
    const paginationContainer = document.querySelector('.blog-pagination');
    if (paginationContainer) {
        paginationContainer.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-page')) {
                const pageNum = parseInt(e.target.getAttribute('data-page'));
                goToPageAndAnnounce(pageNum);
                updateURL(pageNum);
            }
        });
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function showNoResultsMessage(query) {
    console.log(`💭 No results found for "${query}"`);
    // Implementation here...
}

function hideNoResultsMessage() {
    // Implementation here...
}

// ============================================
// VISUAL EXAMPLES (Console Output)
// ============================================

console.log("\n=== VISUAL EXAMPLES ===\n");
console.log("Array indices for 22 posts:");
console.log("[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]");
console.log("\nPage 1: indices 0-7   → [✓✓✓✓✓✓✓✓ ✗✗✗✗✗✗✗✗ ✗✗✗✗✗✗]");
console.log("Page 2: indices 8-15  → [✗✗✗✗✗✗✗✗ ✓✓✓✓✓✓✓✓ ✗✗✗✗✗✗]");
console.log("Page 3: indices 16-21 → [✗✗✗✗✗✗✗✗ ✗✗✗✗✗✗✗✗ ✓✓✓✓✓✓]");

console.log("\n" + "=".repeat(60));
console.log("📚 Pagination initialized! Open blog.html to see it in action.");
console.log("=".repeat(60) + "\n");

// Export for testing/debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        goToPageSafe,
        searchAndPaginate,
        PaginationState,
        calculateTotalPages
    };
}
