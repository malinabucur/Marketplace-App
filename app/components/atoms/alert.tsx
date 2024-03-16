const SuccessAlert = ({ message }: any) => {
  return (
    <div className="fixed bottom-1 right-1 z-index:9999 border-2 border-green-600 rounded-lg bg-green-200 py-2 px-6 content-center ">
      <h5 className="text-lg font-semibold text-green-600">{message}</h5>
    </div>
  );
};

export default SuccessAlert;
