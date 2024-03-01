export default function Input({ placeholder, onChange }: any) {
  return (
    <div>
      <input type="text" id="default-search" placeholder={placeholder} onChange={onChange} className="focus:outline-none bg-[#EEE5E3]" />
    </div>
  );
}
