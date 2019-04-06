/* http://lorem.in  @author Loeify@gmail.com */
var API = {
  section_height: 0,
  section_pos: "#home",
  scroll_mark: !0,
  slider_pos: 0,
  work_pos: "#00",
  img_attr: {},
  img_width: 1600,
  img_height: 1066
};
API.cursor = function(a) {
  $(a).on("mouseover", function(a) {
      var b = a.currentTarget.id,
          c = a.pageX / window.innerWidth,
          d = a.pageY / window.innerHeight;
      switch (b) {
          case "home":
              $("#home").css("cursor", "s-resize");
              break;
          case "portfolio":
              0 == API.slider_pos ? c > .5 ? $("#portfolio").css("cursor", "e-resize") : d > 1.5 ? $("#portfolio").css("cursor", "s-resize") : $("#portfolio").css("cursor", "n-resize") : API.slider_pos == $(".item").length - 1 ? .5 > c ? $("#portfolio").css("cursor", "w-resize") : d > 1.5 ? $("#portfolio").css("cursor", "s-resize") : $("#portfolio").css("cursor", "n-resize") : c > .5 ? $("#portfolio").css("cursor", "e-resize") : $("#portfolio").css("cursor", "w-resize");
              break;
          case "about":
              2.5 > d ? $("#about").css("cursor", "n-resize") : $("#about").css("cursor", "default")
      }
  })
}, API.pageControl = function(a, b) {
  if (a) {
      var b = "#" + $("#" + b).next()[0].id;
      if ("#pot" == b) return
  } else {
      if (!$(API.section_pos).prev()[0]) return;
      var b = "#" + $(API.section_pos).prev()[0].id
  }
  var c = API.pageInfo(b);
  API.sectionMove(c.pos * API.section_height), API.section_pos = b, history.pushState(null, c.title, c.url), document.title = c.title
}, API.pageInfo = function(a) {
  var b, c, d;
  switch (a) {
      case "#home":
          b = 0, c = "Lorem Ipsum 2014", d = "/version/v1/";
          break;
      case "#portfolio":
          b = 1, c = "Portfolio | Lorem Ipsum 2014", d = "/version/v1/";
          break;
      case "#about":
          b = 2, c = "About | Lorem Ipsum 2014", d = "/version/v1/"
  }
  return {
      pos: b,
      title: c,
      url: d
  }
}, API.setSize = function(a) {
  $(a).css("height", window.innerHeight), $(a).css("width", window.innerWidth)
}, API.loadImage = function(a, b) {
  $('<img class="db abs" src="/version/v1/static/image/works/' + a + "/" + b + '.jpg" />').css({
      opacity: 0
  }).appendTo("#" + a + b).load(function() {
      $(this).css({
          opacity: 1,
          marginLeft: -$(this).width() / 2 + "px",
          marginTop: -$(this).height() / 2 + "px"
      })
  })
}, API.touchDevice = function() {
  return !!("ontouchstart" in window)
}, API.sectionMove = function(a, b) {
  var b = b || function() {};
  $("body, html").animate({
      scrollTop: a
  }, 700, "easeInOutQuint", function() {
      b()
  })
}, API.tapPlot = function(a, b, c) {
  $(a).hammer({
      prevent_default: !0
  }).on("tap", function(a) {
      var d = a.position[0].x,
          e = a.position[0].y;
      $(b).css({
          visibility: "visible",
          width: "30px",
          height: "30px",
          left: d - 15 + "px",
          top: e - 15 + "px",
          opacity: .4
      }).animate({
          height: "40px",
          width: "40px",
          opacity: 0,
          left: "-=5px",
          top: "-=5px"
      }, 300, function() {
          $(b).css("visibility", "hidden")
      }), a.target.id && c(a.target.id, d, e)
  })
}, API.sliderMove = function(a, b) {
  $(a).animate({
      left: -b * window.innerWidth
  }, 700, "easeInOutQuint", function() {
      0 == b && $(a).css("left", 0)
  })
}, API.sliderControl = function(a, b) {
  b ? API.slider_pos++ : API.slider_pos--;
  var c = $(a).length;
  return API.slider_pos > c - 1 ? void(API.slider_pos = c - 1) : API.slider_pos < 0 ? void(API.slider_pos = 0) : void API.sliderMove("#slider", API.slider_pos)
}, API.svgDraw = function(a, b) {
  for (var c = 0, d = 60, e = new Array, f = new Array, g = 0, h = 0; a > h; h++) e[h] = document.getElementById(b + h), l = e[h].getTotalLength(), f[h] = l, e[h].style.strokeDasharray = l + " " + l, e[h].style.strokeDashoffset = l;
  var i = function() {
      var a = c / d;
      if (a > 1) window.cancelAnimationFrame(g);
      else {
          c++;
          for (var b = 0; b < e.length; b++) e[b].style.strokeDashoffset = Math.floor(f[b] * (1 - a));
          g = window.requestAnimationFrame(i)
      }
  };
  i()
}, API.canvasBlur = function(a, b) {
  this.element = a, this.image = b, this.element.width = this.image.width, this.element.height = this.image.height, this.context = this.element.getContext("2d"), this.context.drawImage(this.image, 0, 0)
}, API.canvasBlur.prototype.blur = function(a) {
  this.context.globalAlpha = .5;
  for (var b = -a; a >= b; b += 2)
      for (var c = -a; a >= c; c += 2) this.context.drawImage(this.element, c + 1, b + 1), c >= 0 && b >= 0 && this.context.drawImage(this.element, -(c - 1), -(b - 1));
  this.context.globalAlpha = 1
}, API.workItem = function(a, b, c) {
  for (var d = '<div class="info item bb w h rel"><div class="infoinner w h bb abs"><h3>' + a.title + "</h3><p>" + a.content + '</p><a class="abs link" target="_blank" href="' + a.url + '">' + a.url + '</a><div class="next abs"></div></div></div>', e = 0; e < a.sum; e++) d += '<div id="' + b + e + '" class="item image w h rel"></div>';
  $(c).append(d)
}, API.appendImg = function(a, b) {
  for (var c = 0; b > c; c++) API.loadImage(a, c)
}, API.sliderInfo = function(a) {
  var b, c, d;
  switch (a) {
      case 0:
          b = "Guo.Lu — Website", c = "A WordPress theme for picture showcase. use Isotope for magical layouts. use basket.js for caching & loading scripts with localStorage. use history API & ajax for page jump without refreshing", url = "http://guo.lu", d = 4;
          break;
      case 1:
          b = "Jaku Icon — Website", c = "Jaku Icon showcase, all icons via http://jakurepo.com/ All icons are the property of their respective artists and may not be modified, sold, or redistributed without their consent", url = "http://jaku.guo.lu", d = 5
  }
  return {
      title: b,
      content: c,
      url: url,
      sum: d
  }
}, API.fullImage = function(a, b, c) {
  var d = window.innerHeight,
      e = window.innerWidth,
      f = c / b;
  return d / e > f ? $(a).height(d).width(d / f) : $(a).width(e).height(e * f), $(a).css("left", (e - $(a).width()) / 2), $(a).css("top", (d - $(a).height()) / 2), {
      w: $(a).width(),
      h: $(a).height()
  }
}, $(function() {
  function a() {
      API.section_height = window.innerHeight, API.setSize("#home, #portfolio, #about"), "" != API.section_pos && (API.sectionMove(API.pageInfo(API.section_pos).pos * API.section_height), $("#slider").css("width", $(".item").length * window.innerWidth), API.sliderMove("#slider", API.slider_pos), $(".item").each(function() {
          $(this).css("width", window.innerWidth).find("img").css({
              marginLeft: -$(this).find("img").width() / 2 + "px",
              marginTop: -$(this).find("img").height() / 2 + "px"
          })
      }), $("#orimg").length && (API.fullImage("#blur", API.img_width, API.img_height), API.img_attr = API.fullImage("#orimg", API.img_width, API.img_height)))
  }
  window.scrollTo(0, 0), $("#home").css("top", 0), a();
  var b = API.sliderInfo(0),
      c = API.sliderInfo(1);
  API.workItem(b, 0, "#slider"), API.workItem(c, 1, "#slider"), $(window).on("resize orientationchange", function() {
      setTimeout(a, 0)
  }), setTimeout(function() {
      a(), API.appendImg(0, b.sum), API.appendImg(1, c.sum), API.svgDraw(2, "i")
  }, 0);
  var d = window.location.pathname; - 1 != d.indexOf("portfolio") && API.pageControl(!0, "home"), -1 != d.indexOf("about") && API.pageControl(!0, "portfolio");
  var e = new Image;
  e.src = "/version/v1/static/image/about.jpg", e.onload = function() {
      if ($("#about > div").prepend('<img class="rel" src="' + e.src + '" id="orimg" />'), API.img_attr = API.fullImage("#orimg", API.img_width, API.img_height), !API.touchDevice()) {
          var a = new API.canvasBlur($("#blur")[0], this);
          a.blur(6), API.fullImage("#blur", API.img_width, API.img_height), $("#blurimg").hover(function() {
              $("#blur, #orimg").animate({
                  width: API.img_attr.w + 30 + "px",
                  height: API.img_attr.h + 30 * API.img_height / API.img_width + "px"
              })
          }, function() {
              $("#blur, #orimg").animate({
                  width: API.img_attr.w + "px",
                  height: API.img_attr.h + "px"
              })
          })
      }
  }, API.tapPlot("#home, #portfolio, #about, .link", "#pot", function(a, b, c) {
      var d = b / window.innerWidth,
          e = c / window.innerHeight;
      switch (a) {
          case "home":
              API.pageControl(!0, a);
              break;
          case "portfolio":
              API.slider_pos < $(".item").length - 1 && d > .5 ? API.sliderControl(".item", !0) : API.slider_pos > 0 && .5 > d ? API.sliderControl(".item", !1) : 1.5 > e ? API.pageControl(!1, a) : API.pageControl(!0, a);
              break;
          case "about":
              2.5 > e && API.pageControl(!1, a)
      }
  }), $(document).keydown(function(a) {
      switch (a.keyCode) {
          case 40:
              API.pageControl(!0, API.section_pos.split("#")[1]);
              break;
          case 38:
              API.pageControl(!1, API.section_pos.split("#")[1]);
              break;
          case 39:
              -1 != window.location.pathname.indexOf("portfolio") && API.sliderControl(".item", !0);
              break;
          case 37:
              -1 != window.location.pathname.indexOf("portfolio") && API.sliderControl(".item", !1)
      }
  }), $("#home, #portfolio, #about").on("mousewheel DOMMouseScroll", function(a) {
      a.preventDefault();
      var b = a.originalEvent.wheelDelta || -1 * a.originalEvent.detail,
          c = 500;
      ("MacIntel" == navigator.platform || "MacPPC" == navigator.platform) && (c = 1e3), API.scroll_mark && (API.scroll_mark = !1, 0 > b && API.pageControl(!0, API.section_pos.split("#")[1]), b > 0 && API.pageControl(!1, API.section_pos.split("#")[1]), setTimeout(function() {
          API.scroll_mark = !0
      }, c))
  }), window.addEventListener("popstate", function() {
      var a = window.location.pathname,
          a = a.substring(1, a.length - 1);
      "/" == a && (a = "home");
      var b = API.pageInfo("#" + a);
      API.sectionMove(b.pos * API.section_height, function() {
          document.title = b.title
      })
  }), $("html").hammer({
      prevent_default: !0
  }).on("swipe", function(a) {
      switch (a.direction) {
          case "up":
              API.pageControl(!0, API.section_pos.split("#")[1]);
              break;
          case "down":
              API.pageControl(!1, API.section_pos.split("#")[1]);
              break;
          case "left":
              -1 != window.location.pathname.indexOf("portfolio") && API.sliderControl(".item", !0);
              break;
          case "right":
              -1 != window.location.pathname.indexOf("portfolio") && API.sliderControl(".item", !1)
      }
  }), $("section").css("visibility", "visible"), console.info("https://github.com/LoeiFy")
});
