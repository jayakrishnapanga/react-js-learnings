
// Use Case: Search box is immediately ready for typing when page loads.

export default function SearchPage() {
    const searchRef = useRef(null);
  
    useEffect(() => {
      searchRef.current.focus(); // Focus on page load
    }, []);
  
    return (
      <div>
        <input 
          ref={searchRef} 
          placeholder="Search..." 
          type="search" 
        />
      </div>
    );
  }