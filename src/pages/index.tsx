/** @jsxImportSource theme-ui **/
import { useStateValue } from "../state/state";
import Layout from "../components/Layout/Layout";
import SortNav from "../components/Home/SortNav/SortNav";
import ApiGrid from "../components/Home/ApiGrid/ApiGrid";

const Home = () => {
  return (
    <Layout>
      <section className="content">
        <SortNav />
        <ApiGrid />
      </section>
    </Layout>
  );
};

export default Home;
