document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blog-form');
    const errorMessage = document.getElementById('error-message');
    const toggleModeButton = document.getElementById('toggle-mode');
    const backButton = document.getElementById('back-button');
  
    // Form submission event
    if (blogForm) {
      blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
  
        if (username && title && content) {
          const blogPost = { username, title, content };
          saveToLocalStorage(blogPost);
          window.location.href = 'posts.html';
        } else {
          errorMessage.textContent = 'Please complete the form.';
        }
      });
    }
  
    // Save blog post to localStorage
    function saveToLocalStorage(blogPost) {
      const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
      posts.push(blogPost);
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
  
    // Load blog posts on posts page
    if (window.location.pathname.includes('posts.html')) {
      loadBlogPosts();
    }
  
    function loadBlogPosts() {
      const blogPostsContainer = document.getElementById('blog-posts');
      const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  
      if (posts.length > 0) {
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p><em>By ${post.username}</em></p>
          `;
          blogPostsContainer.appendChild(postElement);
        });
      } else {
        blogPostsContainer.innerHTML = '<p>No blog posts yet.</p>';
      }
    }
  
    // Light/Dark mode toggle
    if (toggleModeButton) {
      toggleModeButton.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        toggleModeButton.textContent = document.body.dataset.theme === 'dark' ? 'Light Mode' : 'Dark Mode';
      });
    }
  
    // Back button event
    if (backButton) {
      backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  });
  