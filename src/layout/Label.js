export default function Label(props) {
  return (
    <label className="block text-gray-700 text-sm font-bold my-2" htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
}
