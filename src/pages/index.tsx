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
      <Header />
      <Flex>
        <main>
          <div className="contents animate">
            <section className="content">
              <SortNav />
              {dapp?.apis ? <ApiGrid main apis={dapp.apis} /> : null}
            </section>
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  );
};

export default Home;
