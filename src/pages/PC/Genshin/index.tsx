import React from "react";
import PageLayout from "../components/PageLayout";
import Genshin from "@/pages/Mobile/Workspace/Genshin";
// import styles from "./index.module.less";

interface Props {}

function PCGenshin(props: Props) {
  return (
    <PageLayout>
      <Genshin />
    </PageLayout>
  );
}
export default PCGenshin;
