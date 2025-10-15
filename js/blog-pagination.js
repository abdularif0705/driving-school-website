/*
 * Blog Pagination functionality for Rajput Driving School website
 * Handles blog post pagination, filtering, and display
 */

class BlogPagination {
  constructor() {
    this.currentPage = 1;
    this.itemsPerPage = 8; // Show 8 blog posts per page
    this.totalItems = 0;
    this.totalPages = 0;
    this.allBlogPosts = [];
    this.filteredBlogPosts = [];
    this.searchQuery = "";
    this.currentCategory = "all";
    this.init();
  }

  init() {
    this.parseSearchParams();
    this.countBlogPosts();
    this.bindEvents();
    this.updatePagination();
    this.updateBlogDisplay();
  }

  parseSearchParams() {
    const urlParams = new URLSearchParams(window.location.search);
    this.searchQuery = urlParams.get("q") || urlParams.get("search") || "";
    this.currentCategory = urlParams.get("category") || "all";

    if (this.searchQuery) {
      console.log(`Search query detected: "${this.searchQuery}"`);
    }
    if (this.currentCategory !== "all") {
      console.log(`Category filter detected: "${this.currentCategory}"`);
    }
  }

  countBlogPosts() {
    // ===================================================================
    // THIS FUNCTION COUNTS HOW MANY BLOG POSTS WE HAVE
    // ===================================================================
    
    // -------------------------------------------------------------------
    // STEP 1: Find all blog post elements in the HTML
    // -------------------------------------------------------------------
    // querySelectorAll finds ALL elements that match ".blog-content .blog-post"
    // It returns a NodeList (similar to an array)
    const blogItems = document.querySelectorAll(".blog-content .blog-post");

    // Convert NodeList to a real Array so we can use array methods like .filter() and .slice()
    this.allBlogPosts = Array.from(blogItems);
    
    console.log(`Found ${this.allBlogPosts.length} total blog posts`);

    // -------------------------------------------------------------------
    // STEP 2: Filter to only include VISIBLE posts
    // -------------------------------------------------------------------
    // Why? Because the search feature might have hidden some posts
    // We only want to paginate the posts that are currently visible
    this.filteredBlogPosts = this.allBlogPosts.filter(post => {
      return post.style.display !== "none";  // Keep only posts that aren't hidden
    });

    console.log(
      `Filtered ${this.filteredBlogPosts.length} blog posts from ${this.allBlogPosts.length} total`
    );

    // -------------------------------------------------------------------
    // STEP 3: Show "no results" message if search returned nothing
    // -------------------------------------------------------------------
    if (this.filteredBlogPosts.length === 0) {
      this.showNoResultsMessage();
    } else {
      this.hideNoResultsMessage();
    }

    // -------------------------------------------------------------------
    // STEP 4: Calculate how many pages we need
    // -------------------------------------------------------------------
    this.totalItems = this.filteredBlogPosts.length;
    
    // THE KEY MATH: Divide total posts by posts per page, round UP
    // Examples:
    //   22 posts ÷ 8 per page = 2.75 → Math.ceil(2.75) = 3 pages
    //   16 posts ÷ 8 per page = 2.00 → Math.ceil(2.00) = 2 pages
    //   7 posts ÷ 8 per page = 0.875 → Math.ceil(0.875) = 1 page
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    console.log(
      `Found ${this.totalItems} blog posts, ${this.totalPages} pages needed`
    );

    // Always show pagination section, even if only one page
    const paginationSection = document.querySelector(".blog-pagination-section");
    if (paginationSection) {
      paginationSection.style.display = "block";
    }
  }

  bindEvents() {
    // ===================================================================
    // THIS FUNCTION SETS UP CLICK LISTENERS FOR PAGINATION BUTTONS
    // ===================================================================
    
    const paginationContainer = document.querySelector(".blog-pagination");
    if (paginationContainer) {
      // -------------------------------------------------------------------
      // Listen for ANY click inside the pagination container
      // -------------------------------------------------------------------
      // This is called "event delegation" - instead of adding a listener to each button,
      // we add ONE listener to the container and check what was clicked
      paginationContainer.addEventListener("click", (e) => {
        e.preventDefault();  // Stop the link from jumping to "#" in the URL
        
        // Check if the user clicked a link (the pagination buttons are <a> tags)
        if (e.target.tagName === "A") {
          // Get the page number from the data-page attribute
          // Example: <a data-page="2">2</a> → pageNumber = "2"
          const pageNumber = e.target.getAttribute("data-page");
          
          if (pageNumber) {
            const page = parseInt(pageNumber);  // Convert "2" to number 2
            
            // Only change pages if it's different from current page
            if (page && page !== this.currentPage) {
              this.goToPage(page);  // Navigate to the new page
            }
          }
        }
      });
    }
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages) return;

    console.log(`Going to page ${page}`);
    this.currentPage = page;
    this.updatePagination();
    this.updateBlogDisplay();
    this.scrollToBlogPosts();
  }

  updatePagination() {
    // ===================================================================
    // THIS FUNCTION DRAWS THE PAGINATION BUTTONS (‹ 1 2 3 4 5 ›)
    // ===================================================================
    
    const paginationContainer = document.querySelector(".blog-pagination");
    const paginationInfo = document.querySelector(".pagination-info");

    if (!paginationContainer) return;

    // -------------------------------------------------------------------
    // STEP 1: Update the info text "Page 2 of 5 (22 posts)"
    // -------------------------------------------------------------------
    if (paginationInfo) {
      if (this.totalPages > 0) {
        paginationInfo.textContent = `Page ${this.currentPage} of ${this.totalPages} (${this.totalItems} posts)`;
      } else {
        paginationInfo.textContent = `No posts found`;
      }
    }

    // Clear existing pagination buttons (start fresh)
    paginationContainer.innerHTML = "";

    // -------------------------------------------------------------------
    // STEP 2: Don't show buttons if only one page
    // -------------------------------------------------------------------
    if (this.totalPages <= 1) {
      paginationContainer.style.display = "none";
      return;
    } else {
      paginationContainer.style.display = "flex";
    }

    // -------------------------------------------------------------------
    // STEP 3: Calculate which page numbers to show (max 5 visible)
    // -------------------------------------------------------------------
    // We want to center the current page in the button list
    // Example: If on page 10, show: 8 9 [10] 11 12
    const maxVisiblePages = 5;
    
    // Try to center current page: currentPage - 2 (floor of 5/2)
    // But don't go below 1
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    
    // Calculate end page (start + 4 more pages = 5 total)
    // But don't go beyond total pages
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    // If we're near the end, adjust start page
    // Example: If totalPages=10 and we're on page 9:
    // endPage=10, startPage should be 6 (to show 6,7,8,9,10)
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // -------------------------------------------------------------------
    // STEP 4: Add Previous button (‹) if not on first page
    // -------------------------------------------------------------------
    if (this.currentPage > 1) {
      const prevLink = this.createPageLink("‹", this.currentPage - 1, false);
      paginationContainer.appendChild(prevLink);
    }

    // -------------------------------------------------------------------
    // STEP 5: Add page number buttons (1, 2, 3, etc.)
    // -------------------------------------------------------------------
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === this.currentPage;  // Highlight current page
      const pageLink = this.createPageLink(i.toString(), i, isActive);
      paginationContainer.appendChild(pageLink);
    }

    // -------------------------------------------------------------------
    // STEP 6: Add Next button (›) if not on last page
    // -------------------------------------------------------------------
    if (this.currentPage < this.totalPages) {
      const nextLink = this.createPageLink("›", this.currentPage + 1, false);
      paginationContainer.appendChild(nextLink);
    }
  }

  createPageLink(text, pageNumber, isActive) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = text;
    link.setAttribute("data-page", pageNumber);
    link.className = `page-link ${isActive ? 'active' : ''}`;

    if (isActive) {
      link.setAttribute("aria-current", "page");
      link.setAttribute("aria-label", `Current page, page ${pageNumber}`);
    } else {
      link.setAttribute("aria-label", `Go to page ${pageNumber}`);
    }

    // Add hover effect
    link.addEventListener("mouseenter", () => {
      if (!isActive) {
        link.style.transform = "scale(1.1)";
        link.style.transition = "transform 0.2s ease";
      }
    });

    link.addEventListener("mouseleave", () => {
      if (!isActive) {
        link.style.transform = "scale(1)";
      }
    });

    return link;
  }

  scrollToBlogPosts() {
    const blogSection = document.querySelector(".blog-content");
    if (blogSection) {
      blogSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  updateBlogDisplay() {
    // ===================================================================
    // THIS IS THE MOST IMPORTANT FUNCTION - IT SHOWS/HIDES BLOG POSTS
    // ===================================================================
    
    // If only one page or no pages, show all filtered posts
    if (this.totalPages <= 1) {
      this.allBlogPosts.forEach((item) => {
        if (this.filteredBlogPosts.includes(item)) {
          item.style.display = "block";
          item.style.opacity = "1";
        } else {
          item.style.display = "none";
        }
      });
      console.log("Showing all filtered blog posts - no pagination needed");
      return;
    }

    // -------------------------------------------------------------------
    // STEP 1: Calculate which posts belong on this page
    // -------------------------------------------------------------------
    // Example: If we're on page 2 and showing 8 posts per page:
    // startIndex = (2 - 1) × 8 = 8  (start at post #8)
    // endIndex = 8 + 8 = 16         (end at post #16)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    // -------------------------------------------------------------------
    // STEP 2: Get ONLY the posts for this page using .slice()
    // -------------------------------------------------------------------
    // slice(8, 16) means: "Give me items from position 8 to 15"
    // (Note: endIndex is exclusive, so 16 means "up to but not including 16")
    const currentPagePosts = this.filteredBlogPosts.slice(
      startIndex,
      endIndex
    );

    console.log(
      `Showing blog posts ${startIndex} to ${endIndex - 1} (page ${
        this.currentPage
      })`
    );
    console.log(`Total filtered posts: ${this.filteredBlogPosts.length}`);

    // -------------------------------------------------------------------
    // STEP 3: Hide ALL blog posts first (clean slate)
    // -------------------------------------------------------------------
    this.allBlogPosts.forEach((item) => {
      item.style.display = "none";  // Make every post invisible
    });

    // -------------------------------------------------------------------
    // STEP 4: Show ONLY the posts for the current page with animation
    // -------------------------------------------------------------------
    currentPagePosts.forEach((item, index) => {
      item.style.display = "block";   // Make this post visible
      item.style.opacity = "0";       // But start invisible for fade-in
      
      // Fade in effect - each post fades in 50ms after the previous one
      // Post 0: fades in after 0ms
      // Post 1: fades in after 50ms
      // Post 2: fades in after 100ms, etc.
      setTimeout(() => {
        item.style.transition = "opacity 0.3s ease";  // Smooth transition
        item.style.opacity = "1";                      // Fade to visible
      }, index * 50); // Stagger the fade-in effect
    });
  }

  filterBlogPosts(posts, query, category) {
    let filtered = posts;

    // Filter by category first
    if (category !== "all") {
      filtered = filtered.filter((post) => {
        const postText = post.textContent.toLowerCase();
        const categoryKeywords = {
          "driving-tips": ["driving tips", "road test", "g2", "g test", "parallel park", "defensive driving"],
          "test-preparation": ["g1", "g2", "g test", "road test", "driving test", "exam", "examiner"],
          "licensing": ["license", "licensing", "g1", "g2", "g", "graduated", "mto"],
          "safety": ["safety", "emergency", "winter driving", "night driving", "defensive"],
          "insurance": ["insurance", "premium", "coverage", "policy"],
          "maintenance": ["maintenance", "vehicle", "car care", "oil change", "tire"]
        };

        const keywords = categoryKeywords[category] || [];
        return keywords.some(keyword => postText.includes(keyword));
      });
    }

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((post) => {
        const postText = post.textContent.toLowerCase();
        return postText.includes(lowerQuery);
      });
    }

    return filtered;
  }

  // Method to update total pages (useful for dynamic content)
  updateTotalPages(totalItems) {
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.updatePagination();
  }

  showNoResultsMessage() {
    let noResultsDiv = document.querySelector(".no-results-message");

    if (!noResultsDiv) {
      noResultsDiv = document.createElement("div");
      noResultsDiv.className = "no-results-message";
      noResultsDiv.innerHTML = `
        <div class="row">
          <div class="col-12 text-center py-5">
            <div class="alert alert-info">
              <h4 class="alert-heading">No Blog Posts Found</h4>
              <p>Sorry, no blog posts match your search criteria.</p>
              <hr>
              <p class="mb-0">
                <a href="blog.html" class="btn btn-primary">View All Posts</a>
                <a href="contact.html" class="btn btn-outline-primary ms-2">Contact Us</a>
              </p>
            </div>
          </div>
        </div>
      `;

      // Insert after the blog content
      const blogContent = document.querySelector(".blog-content .container");
      if (blogContent) {
        blogContent.appendChild(noResultsDiv);
      }
    }

    noResultsDiv.style.display = "block";
  }

  hideNoResultsMessage() {
    const noResultsDiv = document.querySelector(".no-results-message");
    if (noResultsDiv) {
      noResultsDiv.style.display = "none";
    }
  }
}

// Initialize pagination when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const pagination = new BlogPagination();
  window.blogPaginationInstance = pagination;
});
