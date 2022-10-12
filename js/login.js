const loginIdValidator = new FieldValidator('txtLoginId', function (val) {
    if (!val) {
      return '请填写账号';
    }
  });
  
  const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
      return '请填写密码';
    }
  });

  const form = $('.user-form');

  form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validator(
        loginIdValidator,
        loginPwdValidator,
    )
    if(!result){
        return;
    }

    const formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());//拿到转换后的表单数据对象
    
    //所有准备工作就绪，发送请求
    const resp = await API.login(data);
    if(resp.code === 0){
        alert('登录成功');
        location.href = './index.html';
    }else{
        loginIdValidator.p.innerHTML = '账号密码错误';
        loginIdValidator.input.value = "";
    }
  }