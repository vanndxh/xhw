/**
 * @file 删除分组弹窗
 */
import { Form, Modal, Select, message } from "antd";

interface Props {
  /** 是否展示 */
  open: boolean;
  /** 原有todo list */
  todoList: ObjectType[];
  /** set todo list */
  setTodoList: (e: ObjectType[]) => void;

  onCancel: () => void;
}

function DelClassModal(props: Props) {
  const { open, onCancel, todoList, setTodoList } = props;
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const fields = [
    {
      key: "class",
      label: "分组",
      rules: [{ required: true, message: "必填项" }],
      render: () => (
        <Select
          allowClear
          placeholder="请选择分组"
          options={todoList?.map((i) => ({ label: i?.label, value: i?.label }))}
        />
      ),
    },
  ];

  const handleAdd = () => {
    validateFields().then((values) => {
      const newTodoList = todoList?.filter((i) => i?.label !== values?.class);
      setTodoList(newTodoList);
      message.success("删除成功");
      resetFields();
      onCancel?.();
    });
  };

  return (
    <Modal
      title="删除分组"
      centered
      open={open}
      okText="确认"
      cancelText="取消"
      onOk={handleAdd}
      onCancel={() => {
        resetFields();
        onCancel?.();
      }}
      width={"60vw"}
    >
      <Form
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        colon={false}
      >
        {fields?.map((i) => (
          <Form.Item
            key={i?.key}
            name={i?.key}
            label={i?.label}
            rules={i?.rules || []}
          >
            {i?.render?.()}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}
export default DelClassModal;
