export function Child({ count, setCount }) {
  console.log("childe rendereed");
  return (
    <div>
      <p>count:{count}</p>
      <button onClick={() => setCount((prev) => prev++)} />
    </div>
  );
}
