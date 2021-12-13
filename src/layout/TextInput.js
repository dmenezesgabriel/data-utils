export default function TextInput(props) {
  return (
    <input
      className="border appearance-none shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      name={props.name}
      id={props.id}
      defaultValue={props.defaultValue}
    />
  );
}
