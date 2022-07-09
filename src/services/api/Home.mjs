/** GET /home/test home页的get测试接口 */
export const getHomeTest = (req, res) => {
  console.log('home test');
  res.send({
    "code": 200,
    "message": "/home/test ok"
  });
};
