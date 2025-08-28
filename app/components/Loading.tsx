const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-100 min-h-[200px] rounded-xl shadow-inner">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-spin-slow" />
        <p className="text-xl font-medium text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
