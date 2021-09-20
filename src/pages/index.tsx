/** @jsxImportSource theme-ui **/
import { useStateValue } from "../state/state";
import Layout from "../components/Layout/Layout";
import SortNav from "../components/SortNav/SortNav";
import ApiGrid from "../components/ApiGrid/ApiGrid";

const Home = () => {
  const [{ dapp }] = useStateValue();
  return (
    <Layout>
      <section className="content">
        <SortNav />
        {dapp?.apis ? <ApiGrid main apis={dapp.apis} /> : null}
      </section>
    </Layout>
  );
};

export default Home;
