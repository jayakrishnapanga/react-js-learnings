// import { useParams } from "react-router-dom";

// export function Userprofile() {
//   console.log("the value from useParams", useParams());
//   const { jk_id } = useParams();
//   return <div>userId:{jk_id}</div>;
// }

import { useParams, useLocation, useNavigate } from "react-router-dom";

export function UserProfile() {
  const { jk_id } = useParams(); // /user/:id → dynamic route param
  const location = useLocation(); // gives { pathname, search, hash, state }
  const navigate = useNavigate(); // used to navigate programmatically
  console.log("location", location);
  // ✅ Extract query params
  const query = new URLSearchParams(location.search);
  const tab = query.get("tab") || "info"; // default tab = info

  // ✅ Function to change tab dynamically
  const handleTabChange = (newTab) => {
    navigate(`/user/${jk_id}?tab=${newTab}`);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h2>User Profile</h2>
      <p>
        User ID (from route param): <b>{jk_id}</b>
      </p>
      <p>
        Active Tab (from query param): <b>{tab}</b>
      </p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleTabChange("info")}>Info</button>
        <button onClick={() => handleTabChange("posts")}>Posts</button>
        <button onClick={() => handleTabChange("settings")}>Settings</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {tab === "info" && <p>🧾 Showing user info...</p>}
        {tab === "posts" && <p>📝 Showing user posts...</p>}
        {tab === "settings" && <p>⚙️ Showing user settings...</p>}
      </div>
    </div>
  );
}
