//取得URL参数值
function getUrlQuery(url, name) {
  if (url + "" == "undefined")
    return;
  var index = url.indexOf("?");
  if (index >= 0) {
    url = url.substr(index + 1);
  }
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = url.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getQuery(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}