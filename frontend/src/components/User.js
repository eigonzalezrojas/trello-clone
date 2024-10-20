export default function User({ user }) {
    return (
        <div className="border p-4 mb-4">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p>{user.email}</p>
        </div>
    );
}