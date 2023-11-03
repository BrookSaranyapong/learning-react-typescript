function AppFooter() {
  const company = "Brook Saranyapong";
  return (
    <>
      <p>created by {company}</p>
      <p>{new Date().getFullYear()}</p>
    </>
  );
}

export default AppFooter;
