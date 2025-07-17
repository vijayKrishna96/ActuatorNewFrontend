// Sidebar Item Component 
// Sidebar Item Component 
function SidebarItem({ icon, label, isActive, onClick, disabled = false }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      title={disabled ? "This section is currently disabled" : ""}
      className={`flex items-center space-x-3 px-3 py-2 rounded text-sm transition
        ${isActive ? "bg-gray-200 text-gray-700" : ""}
        ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100 cursor-pointer"}
      `}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default SidebarItem;
