/** @jsxImportSource theme-ui **/
import { useStateValue } from "../state/state";
import Layout from "../components/Layout/Layout";
import SortNav from "../components/Home/SortNav/SortNav";
import ApiGrid from "../components/Home/ApiGrid/ApiGrid";

const Home = () => {
  const [{ dapp }] = useStateValue();

  return (
    <Layout>
      <section className="content">
        <SortNav />
        <ApiGrid apis={dapp?.apis} />
      </section>
    </Layout>
  );
};

export default Home;
