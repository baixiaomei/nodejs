$.ajax({
  url: 'abc.php',
  async: false, // 变成同步的
  success: function (res) {
    console.log(res)
  }
})