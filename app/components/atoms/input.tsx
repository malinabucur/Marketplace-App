export default function Input({ placeholder }: any) {
  return (
    <div>
      <input type="text" id="default-search" placeholder={placeholder} className="focus:outline-none" />
    </div>
  );
}
