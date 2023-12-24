import * as React from "react";
import IndexPage, { IndexPageTemplate, IndexPageType } from "../../pages";
import { ChakraProvider } from "@chakra-ui/react";

type Prop = {
  entry: {
    getIn: Function;
  };
  getAsset: Function;
};
const IndexPagePreview = ({ entry, getAsset }: Prop) => {
  const data = entry.getIn(["data"]).toJS() as unknown as IndexPageType;

  console.log(data);

  if (data) {
    return (
        <IndexPageTemplate markdownRemark={data.markdownRemark} />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;
