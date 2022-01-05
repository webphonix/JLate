/*!
 * jlate JavaScript Library v0.0.2
 * https://webphonix.com/
 *
 *
 * Copyright webphonix
 * Released under the MIT license
 * Author: Gurudev Kumar
 * Date: 01-05-2022
 */

(function() {
  Number.prototype.toCurrency = function () {
    return numberFormatting(this);
  };
  String.prototype.toCurrency = function () {
    return numberFormatting(this);
  };
  let brand_element=document.getElementsByClassName("wp-branding")[0];
  if(brand_element){
    brand_element.addEventListener("mouseover", mouseOver);
    brand_element.addEventListener("mouseout", mouseOut);
  };
  function mouseOver() {
    brand_element.setAttribute('title', 'Webphonix' );
  };
  function mouseOut() {
    brand_element.removeAttribute("title");
  };
})();

var jlate= jl = ($$ = function (selector) {
  const self = {
    element: document.querySelector(selector),
    jlate: (dataObj) => {
      load_jlate(selector, dataObj);
    },
    on: (event, dataObj, callback) => {
      if (event == "jlate") {
        load_jlate(selector, dataObj);
        callback(dataObj);
      } else {
        throw "jlateError: event listener name is not correct";
      }
    },
    hide: () => {
      self.element.style.display = "none";
    },
    attr: (name, value) => {
      if (value == null) {
        self.element.getAttribute(name);
      } else {
        self.element.setAttribute(name, value);
      }
    },
  };
  return self;
});

jlate.url = {
  href: window.location.href,
  searchKey: function (searchKey) {
    return getParameterByName(searchKey);
  },
};

jl.import = jlate.import = function (path){
  path.forEach((e)=>{
    load_custom_tag(e)
  })
}

function load_custom_tag(filePath) {
  fetch(filePath).then((file) => {
    file.text().then((content) => {
      var el = document.createElement('html');
      el.innerHTML=content;
      var temp=el.getElementsByTagName("jlate")[0];
      var tag_name=temp.getAttribute("name");
      var used_tag=document.getElementsByTagName(tag_name);
      var jlate_string=content;
      [...used_tag].forEach((e)=>{
        data=e.getAttribute("data");
        data=JSON.parse(data);
        var jlateFn = _.template(jlate_string);
        var jlateHTML = jlateFn(data);
        e.insertAdjacentHTML("beforeend", jlateHTML);
      });
    });
  });
};

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function load_jlate(selector, dataObj) {
  const template_tag = document.querySelectorAll(selector);
  _.each(template_tag, (i) => {
    var jlate_type = i.getAttribute("type");
    switch (jlate_type) {
      case "template":
        load_dynamic_template(i, dataObj);
        break;
      case "select":
        load_dropdown(i, dataObj);
        break;
      default:
        console.warn("jlate Type not defined.");
        load_dynamic_template(i, dataObj);
        break;
    }
  });
};

function load_dropdown(i, dataObj) {
  attrs_array = [];
  if (dataObj.length == 0)
    console.warn("jlate select warning: empty options data");
  _.each(i.attributes, (attr) => {
    if (attr.name != "type")
      attrs_array.push(attr.name + " = '" + attr.value + "'");
  });

  attrs = attrs_array.join(" ");
  options = [];

  dataObj.map((item, i) => {
    options.push(`<option value="${item.value}">${item.text}</option>`);
  });
  options = options.join("");
  templateHTML = `<select ${attrs}>${options}</select>`;

  i.insertAdjacentHTML("afterend", templateHTML);
  i.remove();
};

function load_dynamic_template(i, dataObj) {
  let filePath = i.getAttribute("src");
  fetch(filePath).then((file) => {
    file.text().then((content) => {
      var templateFn = _.template(content);
      var templateHTML = templateFn(dataObj);
      i.innerHTML = "";
      i.insertAdjacentHTML("beforeend", templateHTML);
    });
  });
};

let numberFormatting = function (number) {
  const numberString = String(number).replace(/^\d+/, (number) =>
    [...number]
      .map(
        (digit, index, digits) =>
          (!index || (digits.length - index) % 3 ? "" : ",") + digit
      )
      .join("")
  );
  return numberString;
};
