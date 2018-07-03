var $ = require("../jquery-3.1.1.js");

var themes = [
  {name: 'default-screen', text: '适合代码'},
  {name: 'narrow-screen', text: '窄屏模式'},
  {name: 'wide-screen', text: '宽屏模式'},
];
var currentTheme = 'wide-screen';

let pageTheme = function () {
  this.init();
};

pageTheme.prototype.init = function() {
  this.bindEvt();
};

pageTheme.prototype.bindEvt = function() {
  var $options = $.map(themes, function(item) {
    var selected = currentTheme === item.name ? ' selected' : '';
    return '<option value="' + item.name + '"' + selected + '>' + item.text +'</option>';
  });
  $('.page-theme').html($options);
  $('.page-theme').on('change', function() {
    var val = $(this).val();
    $("#pageThemeId").attr('href', './pageThemes/' + val + '.css');
  }).trigger('change');
};


module.exports = pageTheme;
