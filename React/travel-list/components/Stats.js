export default function Stats({ items }) {
  const total = items.length;
  const count = items.filter((item) => item.packed).length;
  const prompt = total !== 0 && count === total ? "You Got Everything 💯" : "";

  return (
    <footer className="stats">
      <em>
        You Have {total} Items On Your List. You packed{" "}
        {count === 0 ? 0 : count}/{total} items. {prompt}
      </em>
    </footer>
  );
}
