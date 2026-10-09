import { useState, useEffect } from 'react';

export default function PostsWithoutRTK() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    setIsAdding(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newPostTitle, body: 'Sample body', userId: 1 }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newPost = await response.json();

      // JSONPlaceholder always returns id: 101 for POSTs. 
      // We manually add date to the ID so React keys don't duplicate visually
      newPost.id = Date.now();

      // Manually cache invalidating! 
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setNewPostTitle('');
    } catch (err) {
      console.error('Failed to add post', err);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) return <div>Loading initial posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Traditional Fetch (No RTK Query)</h2>
      <form onSubmit={handleAddPost} style={{ marginBottom: '10px' }}>
        <input
          placeholder="New Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          disabled={isAdding}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" disabled={isAdding} style={{ padding: '5px' }}>
          {isAdding ? 'Adding...' : 'Add Post'}
        </button>
      </form>

      <ul style={{ textAlign: 'left' }}>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
}
