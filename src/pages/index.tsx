/** @jsxImportSource theme-ui **/
import { useStateValue } from "../state/state";
import Layout from "../components/Layout";
import SortNav from "../components/SortNav";
import ApiGrid from "../components/ApiGrid";
import Header from "../components/Header";
import BottomSpace from "../components/BottomSpace";

import { Flex } from "theme-ui";

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
