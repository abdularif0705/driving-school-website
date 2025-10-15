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
    const blogItems = document.querySelectorAll(".blog-content .blog-post");

    // Store all blog posts
    this.allBlogPosts = Array.from(blogItems);
    
    console.log(`Found ${this.allBlogPosts.length} total blog posts`);

    // Only include visible posts (not filtered out by search)
    this.filteredBlogPosts = this.allBlogPosts.filter(post => {
      return post.style.display !== "none";
    });

    console.log(
      `Filtered ${this.filteredBlogPosts.length} blog posts from ${this.allBlogPosts.length} total`
    );

    // Show no results message if no posts match
    if (this.filteredBlogPosts.length === 0) {
      this.showNoResultsMessage();
    } else {
      this.hideNoResultsMessage();
    }

    this.totalItems = this.filteredBlogPosts.length;
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
    const paginationContainer = document.querySelector(".blog-pagination");
    if (paginationContainer) {
      paginationContainer.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.tagName === "A") {
          const pageNumber = e.target.getAttribute("data-page");
          if (pageNumber) {
            const page = parseInt(pageNumber);
            if (page && page !== this.currentPage) {
              this.goToPage(page);
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
    const paginationContainer = document.querySelector(".blog-pagination");
    const paginationInfo = document.querySelector(".pagination-info");

    if (!paginationContainer) return;

    // Update pagination info
    if (paginationInfo) {
      if (this.totalPages > 0) {
        paginationInfo.textContent = `Page ${this.currentPage} of ${this.totalPages} (${this.totalItems} posts)`;
      } else {
        paginationInfo.textContent = `No posts found`;
      }
    }

    // Clear existing pagination
    paginationContainer.innerHTML = "";

    // Don't show pagination controls if only one page or no pages
    if (this.totalPages <= 1) {
      paginationContainer.style.display = "none";
      return;
    } else {
      paginationContainer.style.display = "flex";
    }

    // Calculate which pages to show
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add previous button if not on first page
    if (this.currentPage > 1) {
      const prevLink = this.createPageLink("‹", this.currentPage - 1, false);
      paginationContainer.appendChild(prevLink);
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === this.currentPage;
      const pageLink = this.createPageLink(i.toString(), i, isActive);
      paginationContainer.appendChild(pageLink);
    }

    // Add next button if not on last page
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

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
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

    // Hide all posts first
    this.allBlogPosts.forEach((item) => {
      item.style.display = "none";
    });

    // Show only current page posts
    currentPagePosts.forEach((item, index) => {
      item.style.display = "block";
      item.style.opacity = "0";
      // Fade in effect
      setTimeout(() => {
        item.style.transition = "opacity 0.3s ease";
        item.style.opacity = "1";
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
