import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
      <Link to="/" replace={true}>
        กลับหน้าหลัก
      </Link>
    </>
  );
}

export default AboutPage;
