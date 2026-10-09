import { useState } from "react";
// export function Forms() {
//   let [name, setName] = useState("");
//   function handleSubmit(formdata) {
//     // console.log(e);
//     // e.preventDefault();
//     // console.log("formdataa", formdata);
//     for (const [key, value] of formdata.entries()) {
//       console.log(key, value);
//     }
//     const nameValue = formdata.get("name");
//     console.log(nameValue);
//     alert("form submitted sucessfully");
//   }
//   return (
//     <form action={handleSubmit}>
//       <label>
//         Name:
//         <input
//           name="name"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label>
//         Name:
//         <input
//           name="name"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <br></br>
//       <button type="submit">submit</button>
//     </form>
//   );
// }

// export function Forms() {
//   const [text, setText] = useState("");
//   const [bio, setBio] = useState("");
//   const [fruit, setFruit] = useState("apple");

//   return (
//     <form>
//       <input value={text} onChange={(e) => setText(e.target.value)} />
//       <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
//       <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
//         <option value="apple">Apple</option>
//         <option value="banana">Banana</option>
//       </select>
//     </form>
//   );
// }

export function Forms() {
  const [form, setForm] = useState({ username: "", email: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
  }

  function validate() {
    const err = {};
    if (!form.username) err.username = "Required";
    if (!form.email || !form.email.includes("@")) err.email = "Invalid email";
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setSubmitting(true);
    try {
      // simulate API
      await new Promise((res) => setTimeout(res, 800));
      alert("Submitted: " + JSON.stringify(form));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Username
        <input name="username" value={form.username} onChange={handleChange} />
      </label>
      {errors.username && <div role="alert">{errors.username}</div>}

      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </label>
      {errors.email && <div role="alert">{errors.email}</div>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
