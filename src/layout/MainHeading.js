export default function MainHeading(props) {
  return (
    <div className="text-center my-8 text-4xl">
      <h1>{props.children}</h1>
    </div>
  );
}
