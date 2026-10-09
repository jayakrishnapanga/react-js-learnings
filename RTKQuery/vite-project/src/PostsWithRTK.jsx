import React, { useState } from 'react';
import { useGetPostsQuery, useAddPostMutation } from './features/apiSlice';

export default function PostsWithRTK() {
  const [newPostTitle, setNewPostTitle] = useState('');

  // 1. Fetching logic encapsulated!
  const { data: posts = [], isLoading, isError, error, isFetching } = useGetPostsQuery();
  
  // 2. Mutation logic encapsulated!
  const [addPost, { isLoading: isAdding }] = useAddPostMutation();

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    try {
      // 3. Automated cache invalidation will trigger a refetch of posts seamlessly!
      await addPost({ title: newPostTitle, body: 'Sample body', userId: 1 }).unwrap();
      setNewPostTitle('');
    } catch (err) {
      console.error('Failed to add post', err);
    }
  };

  if (isLoading) return <div>Loading initial posts for RTK...</div>;
  if (isError) return <div>Error: {error?.error}</div>;

  return (
    <div style={{ padding: '20px', border: '2px solid #646cff', borderRadius: '8px' }}>
      <h2>With RTK Query {isFetching ? '(Refetching...)' : ''}</h2>
      <p style={{ fontSize: '0.9em', color: '#666', lineHeight: '1.2' }}>
        <i>Note: JSONPlaceholder API doesn't actually save new items on the server. <br/>
        After successfully adding, RTK-Query automatically refetches the original list of 5 from the server.</i>
      </p>
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
