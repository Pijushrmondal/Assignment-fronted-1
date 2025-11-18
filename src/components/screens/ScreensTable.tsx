import type { Screen } from "../../api/screens";

interface Props {
  items: Screen[];
  onToggle: (id: string) => void;
}

export default function ScreensTable({ items, onToggle }: Props) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border border-gray-300 text-left">Name</th>
          <th className="p-2 border border-gray-300 text-left">Status</th>
          <th className="p-2 border border-gray-300 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={3} className="p-4 text-center text-gray-500">
              No screens found
            </td>
          </tr>
        ) : (
          items.map((screen) => (
            <tr key={screen._id} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-300">{screen.name}</td>
              <td className="p-2 border border-gray-300">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    screen.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {screen.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => onToggle(screen._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  aria-label={`Toggle ${screen.name} status`}
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

