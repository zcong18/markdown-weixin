var $ = require("../jquery-3.1.1.js");

var themes = [
  '适合代码',
  '窄屏模式',
  '宽屏模式'
];
var currentTheme = '宽屏模式';

let PageTheme = function () {
  this.init();
};

PageTheme.prototype.init = function() {
  this.bindEvt();
};

PageTheme.prototype.bindEvt = function() {
  var $options = $.map(themes, function(item) {
    var selected = currentTheme === item ? ' selected' : '';
    return '<option value="' + item + '"' + selected + '>' + item +'</option>';
  });
  $('.page-theme').html($options);
  $('.page-theme').on('change', function() {
    var val = $(this).val();
    $("#pageThemeId").attr('href', './pageThemes/' + val + '.css');
  }).trigger('change');
};


module.exports = PageTheme;
