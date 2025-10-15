/*
 * PAGINATION CONSOLE TESTING GUIDE
 * Copy and paste these examples into your browser console (F12) to experiment!
 */

console.log("=== PAGINATION TESTING GUIDE ===\n");

// =====================================================
// TEST 1: Understanding Math.ceil (Rounding Up)
// =====================================================
console.log("TEST 1: Math.ceil (Round Up)");
console.log("-----------------------------");
console.log("22 posts ÷ 8 per page =", 22 / 8);           // 2.75
console.log("Math.ceil(2.75) =", Math.ceil(22 / 8));      // 3 pages
console.log("16 posts ÷ 8 per page =", Math.ceil(16 / 8)); // 2 pages
console.log("7 posts ÷ 8 per page =", Math.ceil(7 / 8));   // 1 page
console.log("");

// =====================================================
// TEST 2: Array Indexing (Start at 0)
// =====================================================
console.log("TEST 2: Array Indexing");
console.log("-----------------------------");
const posts = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5"];
console.log("posts[0] =", posts[0]);  // First item
console.log("posts[1] =", posts[1]);  // Second item
console.log("posts[4] =", posts[4]);  // Fifth item (last one)
console.log("");

// =====================================================
// TEST 3: Array Slicing
// =====================================================
console.log("TEST 3: Array Slicing");
console.log("-----------------------------");
const allPosts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

console.log("Page 1 - slice(0, 8):", allPosts.slice(0, 8));
// Result: [0, 1, 2, 3, 4, 5, 6, 7]

console.log("Page 2 - slice(8, 16):", allPosts.slice(8, 16));
// Result: [8, 9, 10, 11, 12, 13, 14, 15]

console.log("Notice: slice(8, 16) gives you items 8-15 (NOT 16!)");
console.log("");

// =====================================================
// TEST 4: The Pagination Formula
// =====================================================
console.log("TEST 4: The Pagination Formula");
console.log("-----------------------------");

function calculatePageRange(pageNumber, itemsPerPage) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
}

console.log("Page 1:", calculatePageRange(1, 8));  // {start: 0, end: 8}
console.log("Page 2:", calculatePageRange(2, 8));  // {start: 8, end: 16}
console.log("Page 3:", calculatePageRange(3, 8));  // {start: 16, end: 24}
console.log("");

// =====================================================
// TEST 5: Complete Pagination Example
// =====================================================
console.log("TEST 5: Complete Pagination");
console.log("-----------------------------");

// Simulate 22 blog posts
const blogPosts = Array.from({ length: 22 }, (_, i) => `Blog Post ${i + 1}`);
console.log(`Total posts: ${blogPosts.length}`);

const postsPerPage = 8;
const totalPages = Math.ceil(blogPosts.length / postsPerPage);
console.log(`Total pages needed: ${totalPages}`);
console.log("");

// Function to get posts for a specific page
function getPostsForPage(pageNum) {
    const start = (pageNum - 1) * postsPerPage;
    const end = start + postsPerPage;
    return blogPosts.slice(start, end);
}

console.log("Page 1 posts:", getPostsForPage(1));
console.log("Page 2 posts:", getPostsForPage(2));
console.log("Page 3 posts:", getPostsForPage(3));
console.log("");

// =====================================================
// TEST 6: Testing Your Actual Pagination
// =====================================================
console.log("TEST 6: Test Your Blog Pagination");
console.log("-----------------------------");
console.log("Run these commands in your browser console on blog.html:");
console.log("");
console.log("1. Check if pagination exists:");
console.log("   window.blogPaginationInstance");
console.log("");
console.log("2. See current page:");
console.log("   window.blogPaginationInstance.currentPage");
console.log("");
console.log("3. Go to page 2:");
console.log("   window.blogPaginationInstance.goToPage(2)");
console.log("");
console.log("4. See all blog posts:");
console.log("   window.blogPaginationInstance.allBlogPosts");
console.log("");
console.log("5. See filtered posts:");
console.log("   window.blogPaginationInstance.filteredBlogPosts");
console.log("");

// =====================================================
// PRACTICE EXERCISES
// =====================================================
console.log("=== PRACTICE EXERCISES ===");
console.log("Try solving these yourself!\n");

console.log("Exercise 1: You have 50 posts, show 12 per page. How many pages?");
console.log("Answer: Math.ceil(50 / 12) =", Math.ceil(50 / 12));
console.log("");

console.log("Exercise 2: User is on page 3, showing 10 per page. What's the start index?");
console.log("Answer: (3 - 1) × 10 =", (3 - 1) * 10);
console.log("");

console.log("Exercise 3: You have 100 posts. User clicks page 5, showing 15 per page.");
console.log("What posts should be visible?");
const ex3Start = (5 - 1) * 15;
const ex3End = ex3Start + 15;
console.log(`Answer: Posts ${ex3Start} to ${ex3End - 1}`);
console.log("");

// =====================================================
// INTERACTIVE FUNCTION
// =====================================================
console.log("=== INTERACTIVE FUNCTION ===");
console.log("Try this function in your console:\n");

function paginationCalculator(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📊 Pagination Calculator`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Total Items: ${totalItems}`);
    console.log(`Items Per Page: ${itemsPerPage}`);
    console.log(`Total Pages: ${totalPages}`);
    console.log(`Current Page: ${currentPage}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Start Index: (${currentPage} - 1) × ${itemsPerPage} = ${startIndex}`);
    console.log(`End Index: ${startIndex} + ${itemsPerPage} = ${startIndex + itemsPerPage}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`✅ Show items ${startIndex} to ${endIndex - 1}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    return {
        totalPages,
        startIndex,
        endIndex,
        itemsOnThisPage: endIndex - startIndex
    };
}

console.log("\nExample usage:");
console.log("paginationCalculator(22, 8, 2);");
paginationCalculator(22, 8, 2);

console.log("\n🎉 Copy this function and try different values!");
console.log("paginationCalculator(50, 12, 3);");
console.log("paginationCalculator(100, 20, 5);");
