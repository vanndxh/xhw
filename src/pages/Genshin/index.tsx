/**
 * @file 原神抽卡记录导出
 */
import { useState } from "react";
import { Button, Card, Input, message, Popover, Tabs, Tooltip } from "antd";
import axios from "axios";

import PageLayout from "@/components/PageLayout";
import GachaShow from "./components/GachaShow";
import { GachaDataType, GachaType, GachaTypeKey } from "./constants";
import { handleRawData } from "./util";
import styles from "./index.module.less";
import { CopyOutlined, InfoCircleOutlined } from "@ant-design/icons";

function PCGenshin() {
  const [messageApi, contextHolder] = message.useMessage();
  message.config({ maxCount: 1 });

  /** 用户提供参数链接 */
  const [inputValue, setInputValue] = useState("");
  /** 控制查询状态 */
  const [loading, setLoading] = useState(false);
  /** 获取到的数据 */
  const [gachaData, setGachaData] = useState<GachaDataType>({});

  /** 获取抽卡数据相关参数 */
  const fetchInterval = 1000;
  let gachaParams = {
    endId: "0",
    currentPage: 1,
    gachaType: GachaTypeKey.ROLE,
  };
  let tempData: ObjectType[] = [];
  let timer;

  const tabItems = [
    {
      key: "role",
      label: "角色",
      children: <GachaShow isRole data={gachaData.role || []} />,
    },
    {
      key: "weapon",
      label: "武器",
      children: <GachaShow data={gachaData.weapon || []} />,
    },
    {
      key: "normal",
      label: "常驻",
      children: <GachaShow data={gachaData.normal || []} />,
    },
  ];

  /** 一个卡池请求结束后操作 */
  const handleFinish = () => {
    /** 角色 */
    if (gachaParams?.gachaType === GachaTypeKey.ROLE) {
      gachaParams = {
        gachaType: GachaTypeKey.WEAPON,
        endId: "0",
        currentPage: 1,
      };
      const roleData = handleRawData(tempData);
      setGachaData((pre) => ({ ...pre, role: roleData }));
      tempData = [];
      return;
    }
    /** 武器 */
    if (gachaParams?.gachaType === GachaTypeKey.WEAPON) {
      gachaParams = {
        gachaType: GachaTypeKey.NORMAL,
        endId: "0",
        currentPage: 1,
      };
      const weaponData = handleRawData(tempData);
      setGachaData((pre) => ({ ...pre, weapon: weaponData }));
      tempData = [];
      return;
    }
    /** 常驻 */
    if (gachaParams?.gachaType === GachaTypeKey.NORMAL) {
      gachaParams = {
        gachaType: GachaTypeKey.ROLE,
        endId: "0",
        currentPage: 1,
      };
      const normalData = handleRawData(tempData);
      setGachaData((pre) => ({
        ...pre,
        normal: normalData,
      }));
      clearInterval(timer);
      setLoading(false);
      message.destroy("loading");
      messageApi.open({
        key: "success",
        type: "success",
        content: "获取成功！",
      });
      // localStorage.setItem("genshinGachaData", JSON.stringify(gachaData));
      tempData = [];
      return;
    }
  };

  /** 接口请求操作 */
  const fetchData = async () => {
    const loadingTipText = `获取${GachaType[gachaParams.gachaType].label}池第${
      gachaParams.currentPage
    }页中，耐心等待哟~`;
    messageApi.open({
      key: "loading",
      type: "loading",
      content: loadingTipText,
      duration: fetchInterval / 1000,
    });

    const getGachaUrl = "/api/mihoyo/event/gacha_info/api/getGachaLog?";
    const fetchUrl = `${getGachaUrl}${
      inputValue?.split("?")?.[1].split("#")?.[0]
    }&gacha_type=${GachaType[gachaParams.gachaType].code}&page=${
      gachaParams.currentPage
    }&size=20&end_id=${gachaParams.endId}`;
    const res = await axios.get(fetchUrl, { baseURL: "" });

    /** 请求失败 */
    if (!res?.data?.data) {
      messageApi.open({
        key: "error",
        type: "error",
        content: res?.data?.message || "请求失败",
      });
      clearInterval(timer);
      setLoading(false);
      return;
    }

    /** 有数据，则处理数据 */
    if (res.data.data.list.length) {
      gachaParams = {
        ...gachaParams,
        endId: res?.data?.data?.list[res.data.data.list.length - 1]?.id || "",
        currentPage: gachaParams.currentPage + 1,
      };
      tempData = [...[...tempData, ...res?.data?.data?.list]];
      return;
    }

    /** 没更多数据了，结束 */
    if (!res.data.data.list.length) {
      handleFinish();
      return;
    }
  };

  /** 获取原始数据（setInterval） */
  const getGachaData = () => {
    setLoading(true);
    if (timer === undefined) {
      timer = setInterval(() => {
        fetchData();
      }, fetchInterval);
    } else {
      clearInterval(timer);
    }
  };

  /** 复制命令操作 */
  const copyCommand = () => {
    navigator.clipboard
      .writeText(`iex(irm 'https://lelaer.com/d.ps1')`)
      .then(() => {
        messageApi.open({
          key: "tip",
          type: "success",
          content: "复制成功",
        });
      });
  };

  return (
    <PageLayout>
      <div className={styles["genshin"]}>
        <div className={styles["genshin-inputline"]}>
          <Input
            placeholder="请输入导出链接"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type="primary"
            onClick={getGachaData}
            loading={loading}
            style={{ marginLeft: 10 }}
          >
            开始获取
          </Button>

          <Popover
            title="如何获取导出链接？"
            content={
              <div>
                <div>1、打开游戏抽卡记录页面，最好多翻几页</div>
                <div>2、打开电脑终端 windows powershell</div>
                <div>
                  {`3、输入iex(irm 'https://lelaer.com/d.ps1')`}
                  <Tooltip title={"复制命令"} arrow={false}>
                    <CopyOutlined
                      onClick={copyCommand}
                      className={styles["genshin-tip-copy"]}
                    />
                  </Tooltip>
                </div>
                <div>
                  4、命令运行结束时链接已经自动复制到剪贴板，直接使用即可
                </div>
              </div>
            }
            trigger="click"
          >
            <Button type="link" style={{ padding: "0 0 0 10px" }}>
              如何获得？
            </Button>
          </Popover>
        </div>

        <Tabs items={tabItems} rootClassName={styles["genshin-body"]} />
      </div>

      {contextHolder}
    </PageLayout>
  );
}
export default PCGenshin;
