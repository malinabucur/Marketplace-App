export default function Input({ placeholder, value, onChange }: any) {
  return (
    <div>
      <input type="text" id="default-search" placeholder={placeholder} value={value} onChange={onChange} className="focus:outline-none bg-[#EEE5E3]" />
    </div>
  );
}
