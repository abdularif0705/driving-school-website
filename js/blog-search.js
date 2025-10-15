/*
 * Blog Search functionality for Rajput Driving School website
 * Handles real-time blog search and filtering without page reload
 */

class BlogSearch {
  constructor() {
    this.searchForm = document.querySelector(".blog-search-form");
    this.searchInput = document.querySelector(".blog-search-input");
    this.searchButton = document.querySelector(".blog-search-button");
    this.categoryFilter = document.querySelector(".blog-category-filter");
    this.allBlogPosts = [];
    this.currentCategory = "all";
    this.init();
  }

  init() {
    if (this.searchForm || this.searchInput) {
      this.getAllPosts();
      this.bindEvents();
    }
  }

  getAllPosts() {
    this.allBlogPosts = Array.from(document.querySelectorAll(".blog-content .blog-post"));
    console.log(`Search initialized with ${this.allBlogPosts.length} blog posts`);
  }

  bindEvents() {
    // Handle form submission
    if (this.searchForm) {
      this.searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.performSearch();
      });
    }

    // Handle real-time search
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.performSearch();
      });
    }

    // Handle search button click
    if (this.searchButton) {
      this.searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.performSearch();
      });
    }

    // Handle category filter changes
    if (this.categoryFilter) {
      this.categoryFilter.addEventListener("change", (e) => {
        this.currentCategory = e.target.value;
        this.performSearch();
      });
    }

    // Handle category button clicks
    const categoryButtons = document.querySelectorAll(".category-filter-btn");
    categoryButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const category = button.getAttribute("data-category");
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        
        // Add active class to clicked button
        button.classList.add("active");
        
        // Update the select dropdown
        if (this.categoryFilter) {
          this.categoryFilter.value = category;
        }
        
        this.currentCategory = category;
        this.performSearch();
      });
    });
  }

  performSearch() {
    const query = this.searchInput ? this.searchInput.value.trim().toLowerCase() : "";
    
    let visibleCount = 0;

    this.allBlogPosts.forEach(post => {
      const postText = post.textContent.toLowerCase();
      const matchesSearch = !query || postText.includes(query);
      const matchesCategory = this.matchesCategory(postText, this.currentCategory);

      if (matchesSearch && matchesCategory) {
        post.style.display = "block";
        visibleCount++;
      } else {
        post.style.display = "none";
      }
    });

    console.log(`Search: "${query}", Category: "${this.currentCategory}", Results: ${visibleCount}`);

    // Show/hide no results message
    if (visibleCount === 0) {
      this.showNoResults();
    } else {
      this.hideNoResults();
    }

    // Trigger pagination update
    if (window.blogPaginationInstance) {
      window.blogPaginationInstance.countBlogPosts();
      window.blogPaginationInstance.currentPage = 1;
      window.blogPaginationInstance.updatePagination();
      window.blogPaginationInstance.updateBlogDisplay();
    }
  }

  matchesCategory(postText, category) {
    if (category === "all") return true;

    // Convert to lowercase for case-insensitive matching
    const lowerPostText = postText.toLowerCase();

    // Define specific blog post patterns for accurate categorization
    const categoryMatchers = {
      "driving-tips": () => {
        return (
          lowerPostText.includes("parallel park") ||
          lowerPostText.includes("defensive driving") ||
          lowerPostText.includes("roundabout") ||
          lowerPostText.includes("highway merging") ||
          lowerPostText.includes("top 5 tips")
        );
      },
      "test-preparation": () => {
        return (
          (lowerPostText.includes("g2") && (lowerPostText.includes("pass") || lowerPostText.includes("test") || lowerPostText.includes("exam"))) ||
          (lowerPostText.includes("g test") && lowerPostText.includes("fail")) ||
          lowerPostText.includes("examination sheet") ||
          lowerPostText.includes("test routes") ||
          (lowerPostText.includes("g1") && lowerPostText.includes("fail"))
        ) && !lowerPostText.includes("teen driver");
      },
      "licensing": () => {
        return (
          lowerPostText.includes("licensing roadmap") ||
          lowerPostText.includes("graduated licensing") ||
          (lowerPostText.includes("g1") && lowerPostText.includes("g2") && lowerPostText.includes("complete"))
        ) && !lowerPostText.includes("teen driver");
      },
      "safety": () => {
        return (
          lowerPostText.includes("teen driver safety") ||
          lowerPostText.includes("emergency driving") ||
          lowerPostText.includes("winter driving safety") ||
          lowerPostText.includes("night driving safety")
        );
      },
      "insurance": () => {
        return lowerPostText.includes("insurance") && 
               (lowerPostText.includes("save money") || lowerPostText.includes("new driver insurance"));
      },
      "maintenance": () => {
        return lowerPostText.includes("vehicle maintenance") || 
               lowerPostText.includes("car care");
      }
    };

    const matcher = categoryMatchers[category];
    return matcher ? matcher() : false;
  }

  showNoResults() {
    let noResultsDiv = document.querySelector(".no-results-message");

    if (!noResultsDiv) {
      noResultsDiv = document.createElement("div");
      noResultsDiv.className = "no-results-message alert alert-info text-center my-5";
      noResultsDiv.innerHTML = `
        <h4 class="alert-heading">No Blog Posts Found</h4>
        <p>Sorry, no blog posts match your search criteria.</p>
        <hr>
        <button class="btn btn-primary" onclick="window.location.reload()">View All Posts</button>
      `;

      const blogContent = document.querySelector(".blog-content");
      if (blogContent) {
        blogContent.appendChild(noResultsDiv);
      }
    }

    noResultsDiv.style.display = "block";
  }

  hideNoResults() {
    const noResultsDiv = document.querySelector(".no-results-message");
    if (noResultsDiv) {
      noResultsDiv.style.display = "none";
    }
  }
}

// Initialize search functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const blogSearch = new BlogSearch();
  window.blogSearchInstance = blogSearch;
});

// Export for potential use in other scripts
window.BlogSearch = BlogSearch;
