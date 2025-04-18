/**
 * @file 原神抽卡记录导出
 */
import { useEffect, useState } from "react";
import { Button, Card, Flex, Input, message, Popover, Space } from "antd";
import { CopyOutlined, SendOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { useDebounce } from "ahooks";

import GoldTotal from "./components/GoldTotal";
import { openNewPage } from "@/utils";
import { GachaType, GachaTypeKey } from "./constants";

import styles from "./index.module.less";

function PCGenshin() {
  const initGachaParams = {
    endId: "0",
    currentPage: 1,
    gachaType: GachaTypeKey.ROLE,
  };
  message.config({ maxCount: 1 });

  const [gachaParams, setGachaParams] = useState<ObjectType | undefined>();
  const [tempData, setTempData] = useState<ObjectType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [allGoldData, setAllGoldData] = useState<ObjectType[]>([]);

  /** 接口请求操作 */
  const fetchData = async () => {
    /** 0.判断是否执行：没有参数不执行 */
    if (!gachaParams) {
      return;
    }

    message.loading(`获取${GachaType[gachaParams.gachaType].label}池第${gachaParams.currentPage}页中，耐心等待哟~`, 1);

    const token = inputValue?.split("?")?.[1].split("#")?.[0];
    const params = {
      gacha_type: GachaType[gachaParams.gachaType].code,
      page: gachaParams.currentPage,
      size: 20,
      end_id: gachaParams.endId,
    };
    const queryString = Object.keys(params)
      .map((i) => `&${i}=${params[i]}`)
      .join("");
    const fetchUrl = `/api/mihoyo/gacha_info/api/getGachaLog?${token}${queryString}`;

    const res = await axios.get(fetchUrl, { baseURL: "" });

    /** 1.请求失败 */
    if (!res?.data?.data) {
      message.error(res?.data?.message || "请求失败");
      setLoading(false);
      return;
    }

    /** 2.有数据，则处理数据 */
    if (res.data.data.list.length) {
      setGachaParams({
        ...gachaParams,
        endId: res?.data?.data?.list[res.data.data.list.length - 1]?.id || "",
        currentPage: gachaParams.currentPage + 1,
      });
      setTempData([...tempData, ...res?.data?.data?.list]);

      return;
    }

    /** 3.没更多数据了，当前卡池结束 */
    const gachaList = Object.keys(GachaType);
    const curIndex = gachaList.findIndex((i) => i === gachaParams.gachaType);
    const nextGacha = gachaList[curIndex + 1] || gachaList[0];

    const handleRawData = (rawData) => {
      return rawData?.reduce((acc, current) => {
        if (current.rank_type === "5") {
          acc.push({
            name: current.name,
            count: 1,
            gacha_type: current.gacha_type,
          });
        } else {
          if (acc.length === 0) {
            acc.push({
              name: "已垫",
              count: 0,
              gacha_type: rawData[0]?.gacha_type,
            });
          }
          acc[acc.length - 1].count += 1;
        }
        return acc;
      }, []);
    };

    setAllGoldData((prev) => [...prev, ...handleRawData(tempData)]);
    setTempData([]);

    if (curIndex === gachaList?.length - 1) {
      setLoading(false);
      setGachaParams(undefined);
      message.success("获取成功！");
    } else {
      setGachaParams({
        gachaType: nextGacha as GachaTypeKey,
        endId: "0",
        currentPage: 1,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [useDebounce(gachaParams, { wait: 500 })]);

  return (
    <div className={styles["genshin"]}>
      <Flex
        className={styles["genshin-body"]}
        gap={16}
        style={{ height: allGoldData.length ? "calc(100% - 60px)" : 0 }}
      >
        {Object.keys(GachaType).map((i) => (
          <Card title={GachaType[i].label} key={GachaType[i].code} className={styles["genshin-body-item"]}>
            <GoldTotal
              isRole={GachaType[i].label === "角色"}
              data={allGoldData?.filter((j) => {
                if (GachaType[i].label === "角色") {
                  return ["301", "400"].includes(j.gacha_type);
                }
                return j.gacha_type === GachaType[i].code;
              })}
            />
          </Card>
        ))}
      </Flex>

      <div className={styles["genshin-input-line"]} style={{ bottom: allGoldData.length ? 0 : "50%" }}>
        <Space.Compact style={{ width: allGoldData.length ? "100%" : "60%", transition: "all 0.3s" }}>
          <Button color="gold" variant="solid" onClick={() => openNewPage("yuanshengame://")} style={{ height: 42 }}>
            原神，启动！
          </Button>

          <Input
            placeholder="请输入导出链接"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
          />

          {inputValue ? (
            <Button
              variant="solid"
              color="default"
              icon={<SendOutlined />}
              onClick={() => {
                setLoading(true);
                setAllGoldData([]);
                setGachaParams(initGachaParams);
              }}
              loading={loading}
              style={{ height: 42 }}
            >
              开始获取
            </Button>
          ) : (
            <Popover
              title="如何获取导出链接？"
              content={
                <div>
                  <div>1、打开游戏抽卡记录页面，最好多翻几页</div>
                  <div>2、打开电脑终端 windows powershell</div>
                  <div>
                    {`3、输入iex(irm 'https://img.lelaer.com/cn.ps1')`}
                    <CopyToClipboard
                      text={`iex(irm 'https://img.lelaer.com/cn.ps1')`}
                      onCopy={() => message.success("复制成功")}
                    >
                      <CopyOutlined className={styles["genshin-tip-copy"]} />
                    </CopyToClipboard>
                  </div>
                  <div>4、命令运行结束时链接已经自动复制到剪贴板，直接使用即可</div>
                </div>
              }
              trigger="click"
            >
              <Button style={{ height: 42 }} variant="solid" color="default">
                如何获得？
              </Button>
            </Popover>
          )}
        </Space.Compact>
      </div>
    </div>
  );
}
export default PCGenshin;
