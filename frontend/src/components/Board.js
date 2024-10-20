export default function Board({ board }) {
    return (
      <div className="border p-4 mb-4">
        <h2 className="text-xl font-semibold">{board.name}</h2>
      </div>
    );
  }