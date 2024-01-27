/**
 * @file 新增待办弹窗
 */
import { Form, Input, Modal, ModalProps, message } from "antd";
import ClassSelect from "../ClassSelect";

interface Props extends ModalProps {
  /** 是否展示 */
  open: boolean;
  /** 原有todo list */
  todoList: any[];
  /** set todo list */
  setTodoList: (e: any) => void;
}

function AddItemModal(props: Props) {
  const { open, onCancel, todoList, setTodoList } = props;
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const fields = [
    {
      key: "class",
      label: "分组",
      rules: [{ required: true, message: "必填项" }],
      render: () => <ClassSelect classes={todoList?.map((i) => i?.label)} />,
    },
    {
      key: "tag",
      label: "标签",
      render: () => (
        <Input maxLength={7} placeholder="请输入标签内容，最多7个字" />
      ),
    },
    {
      key: "todo",
      label: "待办事项",
      rules: [{ required: true, message: "必填项" }],
      render: () => (
        <Input.TextArea
          placeholder="请输入待办事项内容"
          maxLength={128}
          showCount
          autoSize={{ minRows: 4, maxRows: 6 }}
        />
      ),
    },
  ];

  const handleAdd = () => {
    validateFields().then((values) => {
      const isAdd = todoList?.every((i) => i?.label !== values?.class);
      const newItem = {
        label: values?.todo,
        tag: values?.tag,
      };
      const newTodoList = isAdd
        ? [
            ...todoList,
            {
              label: values?.class,
              children: [newItem],
            },
          ]
        : todoList?.map((i: any) =>
            i?.label === values?.class
              ? {
                  ...i,
                  children: [...i?.children, newItem],
                }
              : i
          );
      setTodoList(newTodoList);
      message.success("添加成功");
      resetFields();
      onCancel?.(undefined as any);
    });
  };

  return (
    <Modal
      title="新建待办"
      centered
      open={open}
      okText="确认"
      cancelText="取消"
      onOk={handleAdd}
      onCancel={() => {
        resetFields();
        onCancel?.(undefined as any);
      }}
      width={"60vw"}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
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
export default AddItemModal;
