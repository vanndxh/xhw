import { useState } from "react";
import { Button, Flex, Space, Tooltip } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

import styles from "./index.module.less";

export default function BiliMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songList, setSongList] = useState();
  const [curSong, setCurSong] = useState();

  return (
    <div className={styles["music"]}>
      {/* <audio src=""></audio> */}
      <div className={styles["music-footer"]}>
        <div></div>
        <Flex className={styles["music-actions"]} gap={8}>
          <Button type="text" style={{ fontSize: 24 }} icon={<StepBackwardOutlined />} />
          <Button
            type="text"
            style={{ fontSize: 24 }}
            onClick={() => setIsPlaying(!isPlaying)}
            icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
          />
          <Button type="text" style={{ fontSize: 24 }} icon={<StepForwardOutlined />} />
        </Flex>

        <Space size={0}>
          <Tooltip title="添加歌曲" arrow={false}>
            <Button type="text" style={{ fontSize: 18, padding: 6 }} icon={<PlusCircleOutlined />} />
          </Tooltip>
          <Tooltip title="设置" arrow={false}>
            <Button type="text" style={{ fontSize: 18, padding: 6 }} icon={<SettingOutlined />} />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}
