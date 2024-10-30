const ProtectedPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 bg-gray-100">
      <div className="h-[calc(100vh-76px)] flex items-center justify-center">
        <p className="text-xl text-gray-800 text-center">This is a Protected page. Only Accessible after Login</p>
      </div>
    </div>
  );
};

export default ProtectedPage;
