/** @jsxImportSource theme-ui **/
import { Layout, APIDetail } from "components";
import { useGetAPIfromENSParamInURL } from "hooks";

const ApiView = () => {
  const { data, fetchApiDetails } = useGetAPIfromENSParamInURL();
  return (
    <Layout>
      {!!data && <APIDetail api={data} update={fetchApiDetails} />}
    </Layout>
  );
};

export default ApiView;
