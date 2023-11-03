function AppFooter() {
  const company = "Brook Saranyapong";
  const isShow = false;

  const showMsg = () => {
    alert("Hello TypeScript");
  };
  return (
    <>
      <button onClick={showMsg}>Click Me!</button>
      <p>created by {company}</p>
      <p>{new Date().getFullYear()}</p>
      {isShow && <p>Hello React 18</p>}
    </>
  );
}

export default AppFooter;
