import "../css/table.css";
export function Table() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jayakrishna Panga</td>
          <td>Software Engineer</td>
          <td>jayakrishna@example.com</td>
        </tr>
        <tr>
          <td>Anusha</td>
          <td>Frontend Developer</td>
          <td>anusha@example.com</td>
        </tr>
      </tbody>
    </table>
  );
}
