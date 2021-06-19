data={"name":"Hello guru", "ar": ["hi","hello","bye"]};
$$("#test-weblate").attr("data", JSON.stringify(data));

weblate.import(["template/weblate_custom_tag.html","template/weblate_custom_tag2.html"]);

var data = {
  title: "Constructing HTML weblate",
};
var author = [
  { name: "Guru" },
  { name: "Gurudev" },
  { name: "Test" },
  { name: "Webphonix" },
];
var dd_data = [
  { value: "1", text: "webphonix" },
  { value: "2", text: "webphonix2" },
  { value: "3", text: "webphonix3" },
  { value: "4", text: "webphonix4" },
  { value: "5", text: "webphonix5" },
  { value: "6", text: "webphonix6" },
];
$$("#my_temp2").weblate({ names: author });
weblate("#my_temp").on("weblate", { title: data }, function (d) {
  console.log(d);
  //   console.log("Webphonix");
});
$$("#my_temp3").weblate(dd_data);
var num=5989520485;
var str_num="65365";
console.log(num.toCurrency());
console.log(str_num.toCurrency());
console.log(weblate.url.href);

//http://127.0.0.1:5500/test_project/index.html?name=guru
console.log(weblate.url.searchKey('name'));


