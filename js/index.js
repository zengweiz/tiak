//验证用户是否登录，登录才能进入聊天页,没有登录则跳转到登录页

(async function () {
    
    const resp = await API.profile();
    if(!resp.data){
        alert('当前未登录,请先登录');
        location.href = './login.html';
        return;
    }
//如果没有进if就证明用户已登录

const doms = {//获取需要的dom放在一个对象里面
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId'),
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    msgContainer: $('.msg-container'),
  };
  //设置用户的状态
  setUserInfo();

  //加载消息记录
  await loadHistory();

  //设置滚动条高度
  scrollBottom();

  //注销事件
  doms.close.onclick = function () {
    alert('确定要注销吗');
    API.loginOut();
    location.href = './login.html';
  }

  //用户发送事件
  doms.msgContainer.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
  }




  //设置用户的状态信息
  function setUserInfo(){
    doms.aside.nickname.innerText = resp.data.nickname;
    doms.aside.loginId.innerText = resp.data.loginId;
  }
  //加载消息记录
  async function loadHistory() {
    const resp = await API.getHistory();
    for (const item of resp.data) {
        addChat(item);
    }
  }
  //渲染消息记录,根据一个消息对像
  /**
   * content: "你好，你今年多大了？"
    createdAt: 1665222630537
    from: "zengweizu"
    to: null
   */
  function addChat(chatInfo) {
    //首先判断这个消息是机器人回复的还是用户自己发的
    const div = $$$('div');
    div.classList.add('chat-item');
    if(chatInfo.from){
        div.classList.add('me');
    }
    const img = $$$('img');
    img.classList.add('chat-avatar');
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    const content = $$$('div');
    content.classList.add('chat-content');
    content.innerText = chatInfo.content;
    const time = $$$('div');
    time.classList.add('chat-date');
    time.innerText = frameDate(chatInfo.createdAt)

    //依次加入到 chat-container元素 里面
    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(time);
    doms.chatContainer.appendChild(div);
}
  
  //根据时间戳来返回一个字符串格式的时间
  function frameDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2,'0');
    const day = date.getDate().toString().padStart(2,'0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  //让聊天界面的滚动条滚到底部
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }
  //用户发送事件
 async function sendChat() {
    const content = doms.txtMsg.value.trim();
    if(!content){
        return;
    }
    addChat({
        content,
        createdAt: Date.now(),
        from: resp.data.loginId,
        to: null,
    });
    doms.txtMsg.value = "";
    scrollBottom();//每次发送消息都将滚动条滑倒底部
    const cresp = await API.sendChat(content);
    addChat({
        ...cresp.data,
        from: null,
        to: resp.data.loginId
    });
    scrollBottom();//每次回送消息都将滚动条滑倒底部
  }
  window.sendChat = sendChat;
})() 
