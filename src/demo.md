## Markdown 转微信公众号格式化工具

GitHub 地址：[https://github.com/cnych/online-markdown](https://github.com/cnych/online-markdown)

> 使用微信公众号编辑器有一个十分头疼的问题——粘贴出来的代码，格式错乱，而且特别丑。这块编辑器能够解决这个问题。

### Changelog

- 直接复制内容到粘贴板，不要手动复制
- 替换`google-code-prettify`源为国内`CDN`源
- 支持更换代码样式主题
- 代码长度溢出时横向滚动
- **Minikube：** 请先部署并第一个启动 Minikube 。在这个项目的根目录下，有一个脚本 ```createMinikubeEnv.sh``` ，用于销毁之前创建的 Minikube 环境，并用适当的 Kubernetes 上下文初始化一个新的环境。
- **IBM 私有云:** IBM 私有云提供了 [configure client](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/manage_cluster/cfc_cli.html)，将配置 Kubernetes CLI 指向一个给定的 IBM 私有云设备。

### 代码示例

```javascript
var OnlineMarkdown = {
  init: function() {
    var self = this;
    self.load().then(function() {
      self.start()
    }).fail(function(){
      self.start();
    });
  },
  start: function() {
    this.updateOutput();
  },
  load: function() {
    return $.ajax({
      type: 'GET',
      url: params.path || './demo.md',
      dateType: 'text',
      timeout: 2000
    }).then(function(data) {
      $('#input').val(data);
    });
  },
  updateOutput: function () {
    var val = this.converter.makeHtml($('#input').val());
    $('#output .wrapper').html(val);
    PR.prettyPrint();
  }
};

OnlineMarkdown.init();
```
---

上面是 `JavaScript`，下面是 `php`：

```php
echo 'hello,world'
```

### 表格示例

| 品类 | 个数 | 备注 |
|-----|-----|------|
| 苹果 | 1   | nice |
| 橘子 | 2   | job |

### 关于阳明

![微信公众号](https://blog.qikqiak.com/img/posts/qrcode_for_gh_d6dd87b6ceb4_430.jpg)

