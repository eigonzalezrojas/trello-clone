export default function Task({ task }) {
    return (
        <div className="border p-4 mb-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <span className="text-sm">{task.status}</span>
        </div>
    );
}