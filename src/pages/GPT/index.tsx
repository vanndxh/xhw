/**
 * @file chat gpt 国内镜像
 */
import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Input,
  message,
  Modal,
  Select,
  Spin,
} from "antd";
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";
import { RestOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import PageLayout from "../../components/PageLayout";
import { iconUrl } from "@/utils/constants";
import styles from "./index.module.less";

function GPT() {
  const [history, setHistory] = useState<ObjectType[]>([]);
  const [questionValue, setQuestionValue] = useState<string>();
  const [loading, setLoading] = useState(false);

  /** openai config */
  const configuration = new Configuration({
    organization: "org-EENErx6nDg1dVhDSZd8HBbyc",
    apiKey: "",
  });
  const openai = new OpenAIApi(configuration);
  const models = [
    {
      label: "gpt-3.5",
      value: "gpt-3.5-turbo",
    },
    {
      label: "gpt-4(等我有钱)",
      value: "gpt-4",
      disabled: true,
    },
  ];

  /** 发送对话请求 */
  const queryGptApi = async () => {
    if (!questionValue) {
      message.error("请先输入问题！");
      return;
    }
    setLoading(true);
    setHistory([
      ...history,
      {
        role: "user",
        content: questionValue,
      },
    ]);
    setQuestionValue("");
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...history, { role: "user", content: questionValue }],
    } as CreateChatCompletionRequest);
    const returnMessage = res?.data?.choices?.[0]?.message;
    if (returnMessage) {
      setHistory([
        ...history,
        { role: "user", content: questionValue },
        returnMessage,
      ]);
    }
    setLoading(false);
  };

  return (
    <PageLayout>
      <Card title="GPT国内镜像" bordered={false}>
        <div className={styles["gpt"]}>
          <div className={styles["gpt-history"]}>
            <Spin tip="Loading..." spinning={loading}>
              {history?.map((i, index) => (
                <div key={index} className={styles["gpt-history-item"]}>
                  {i?.role === "user" ? (
                    <Avatar
                      shape="square"
                      size="small"
                      icon={<UserOutlined />}
                    />
                  ) : (
                    <Avatar shape="square" size="small" src={iconUrl.gpt} />
                  )}
                  <span style={{ marginLeft: 10 }}>{i?.content}</span>
                </div>
              ))}
            </Spin>

            {!history?.length && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="您还没提问~"
              />
            )}
          </div>

          <div className={styles["gpt-input"]}>
            <Select
              defaultValue="gpt-3.5-turbo"
              style={{ marginRight: 10, width: 180 }}
              options={models}
            />
            <Input
              value={questionValue}
              placeholder="请输入您的问题~"
              onChange={(e) => {
                setQuestionValue(e?.target?.value);
              }}
              onPressEnter={queryGptApi}
            />
            <Button
              onClick={queryGptApi}
              style={{ marginLeft: 10 }}
              loading={loading}
              icon={<SendOutlined />}
            />
            <Button
              onClick={() => {
                Modal.confirm({
                  title: "确定要清空历史记录么",
                  onOk: () => {
                    setHistory([]);
                    message.success("清空历史记录成功!");
                  },
                });
              }}
              style={{ marginLeft: 10 }}
              loading={loading}
              icon={<RestOutlined />}
            />
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}
export default GPT;
