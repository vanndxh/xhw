/**
 * @file 我的文章
 */
import React from "react";
import PageLayout from "../components/PageLayout";

function Docs() {
  return (
    <PageLayout>
      <iframe
        src="https://www.yuque.com/vanndxh/coderv"
        title="docs"
        style={{ width: "100%", height: "99%", border: "none" }}
      />
    </PageLayout>
  );
}
export default Docs;
