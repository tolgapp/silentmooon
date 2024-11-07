type UserPage = {
  onLogout: () => void;
};

const UserPage: React.FC<UserPage> = ({ onLogout }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <button className="bg-red-500 text-white px-64 py-4" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};
export default UserPage;
