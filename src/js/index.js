require('../css/index.less');

var $ = require("./jquery-3.1.1.js");
var showdown = require("./showdown.js");
var CodeTheme = require("./theme/code-theme");
var PageTheme = require("./theme/page-theme");

require("./showdown-plugins/showdown-prettify-for-wechat.js");
require("./showdown-plugins/showdown-github-task-list.js");
require("./showdown-plugins/showdown-footnote.js");

require("./google-code-prettify/run_prettify.js");


var kv = location.href.split('?')[1];
kv = kv && kv.split('&') || [];
var params = {};
$.each(kv, function(index, item) {
  var m = (item || '').split('=');
  if (m && m[0] && m[1]) {
    params[m[0]]= m[1];
  }
});


var converter =  new showdown.Converter({
  extensions: ['prettify', 'tasklist', 'footnote'],
  tables: true
});

function showSnackbar() {
  var $snackbar = $('#snackbar');
  $snackbar.addClass('show');
  setTimeout(() => {
    $snackbar.removeClass('show');
  }, 3000);
}

function copyToClipboard(containerid, cb) {
  if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand("copy");
      cb();
  } else if (window.getSelection) {
      var range = document.createRange();
       range.selectNode(document.getElementById(containerid));
       window.getSelection().addRange(range);
       document.execCommand("copy");
       cb();
  }
}

/**
 * [OnlineMarkdown description]
 * @type {Object}
 */
var OnlineMarkdown = {
  currentState: 'edit',
  init: function() {
    var self = this;
    self.load().then(function() {
      self.start()
    }).fail(function(){
      self.start();
    });
  },
  start: function() {
    this.bindEvt();
    this.updateOutput();
    new CodeTheme();
    new PageTheme();
  },
  load: function() {
    return $.ajax({
      type: 'GET',
      url: params.path || './demo.md',
      dateType: 'text',
      data: {
        _t: new Date() * 1
      },
      timeout: 2000
    }).then(function(data) {
      $('#input').val(data);
    });
  },
  bindEvt: function() {
    $('#input').on('input keydown paste', this.updateOutput);
    
    var $copy = $('.copy-button');
    // 复制内容
    $copy.bind('click', () => {
      copyToClipboard('outputCtt', () => {
        showSnackbar();
      });
    });

    // 监听元素滚动
    var hasInputScroll = false;
    var hasOutputScroll = false;
    $('#input').on('scroll', event => {
      if (hasInputScroll) {
        hasInputScroll = false;
      } else {
        var $output = $('#outputCtt');
        var outputScrollHeight = (event.currentTarget.scrollTop / event.currentTarget.scrollHeight) * $output.prop("scrollHeight");
        hasOutputScroll = true;
        $output.scrollTop(outputScrollHeight);
      }
    });
    $('#outputCtt').on('scroll', event => {
      if (hasOutputScroll) {
        hasOutputScroll = false;
      } else {
        var $input = $('#input');
        var inputScrollHeight = (event.currentTarget.scrollTop / event.currentTarget.scrollHeight) * $input.prop("scrollHeight");
        hasInputScroll = true;
        $input.scrollTop(inputScrollHeight);
      }
    });

  },

  updateOutput: function () {
    var val = converter.makeHtml($('#input').val());
    $('#output .wrapper').html(val);
    PR.prettyPrint();
    $('#outputCtt li').each(function() {
      var content = $(this).html();
      if (content.indexOf('<p>') === 0) {
        content = content.substr(3, content.length-7);
      }
      $(this).html('<span><span>' + content + '</span></span>');
    });
  }

};

OnlineMarkdown.init();
