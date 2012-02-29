// ==UserScript==
// @name          saber-addtorrent
// @description   x 
// @version       1.0
// @author        Guten
// @namespace     http://GutenYe.com
// @updateURL     https://raw.github.com/GutenYe/saber-addtorrent/master/output/saber-addtorrent.meta.js
// @icon          http://i.imgur.com/xEjOM.png
//
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require       https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
//
// @include       *://*what.cd/torrents.php*
// @include       *://*what.cd/collages.php*
// @include       *://*what.cd/artist.php*
//
// @match         *://broadcasthe.net/torrents.php*
// @match         *://broadcasthe.net/collages.php*
// @match         *://broadcasthe.net/series.php*
//
// @include       *://*passthepopcorn.me/torrents.php*
// @include       *://*passthepopcorn.me/collages.php*
// @include       *://*passthepopcorn.me/bookmarks.php
//
// @match        *://www.sceneaccess.org/browse
// @match        *://www.sceneaccess.org/spam
// @match        *://www.sceneaccess.org/archive
// @match        *://www.sceneaccess.org/foreign
// @match        *://www.sceneaccess.org/xxx
// @match        *://www.sceneaccess.org/details*
//
// @match        http://bibliotik.org/torrents/*
// @match        http://bibliotik.org/collections/*
// @match        http://bibliotik.org/publishers/*/torrents/*
// @match        http://bibliotik.org/creators/*/torrents/*
//
// @match        http://animebyt.es/torrents.php*
// @match        http://animebyt.es/torrents2.php*
// @match        http://animebyt.es/collage.php*
// @match        http://animebyt.es/series.php*
// ==/UserScript==
;
var S, STYLE, Saber, pd, puts;

pd = console.log;

puts = pd;

STYLE = "img.rssimg { cursor: pointer; }";

Saber = (function() {

  function Saber() {}

  Saber.fire = function() {
    var setting;
    pd("fire");
    setting = $("<button>saber-addtorrent configuration</button>");
    setting.appendTo($("body"));
    return setting.bind("click", function() {
      return GM_config.open();
    });
  };

  return Saber;

})();

S = Saber;

S.Rc = {};

GM_config.init("Saber Addtorrent Configuration", {
  base_url: {
    section: ["rutorrent setting"],
    label: "Base URL",
    type: "text",
    "default": "http://localhost/rutorrent",
    title: "rutorrent url"
  },
  username: {
    label: "username",
    type: "text",
    "default": "foo",
    title: "username for login rutorrent"
  },
  password: {
    label: "password",
    type: "text",
    "default": "bar",
    title: "password for login rutorrent"
  },
  counts: {
    section: ["main setting", "seperate value by comma"],
    label: "Counts",
    type: "int",
    "default": 2,
    title: "number of addtorrent icons"
  },
  labels: {
    label: "Labels",
    type: "text",
    "default": "saber, saber1",
    title: "add to rutorrent under the label"
  },
  unchecked_icons: {
    label: "Unchecked Icons",
    type: "text",
    "default": "http://i.imgur.com/C8xAX.png, http://i.imgur.com/C8xAX.png",
    title: "icon for uncheched"
  },
  checked_icons: {
    label: "Checked Icons",
    type: "text",
    "default": "http://i.imgur.com/Obx5Y.png, http://i.imgur.com/Obx5Y.png",
    title: "icon for checked"
  }
});

S.Rc.base_url = GM_config.get("base_url");

S.Rc.username = GM_config.get("username");

S.Rc.password = GM_config.get("password");

S.Rc.counts = GM_config.get("counts");

S.Rc.labels = GM_config.get("labels").split(/[ ]*, */);

S.Rc.unchecked_icons = GM_config.get("unchecked_icons").split(/[ ]*, */);

S.Rc.checked_icons = GM_config.get("checked_icons").split(/[ ]*, */);

S.RSSImg = (function() {

  function RSSImg() {}

  RSSImg.selector = "img.rssimg";

  RSSImg.create_ele = function(url, index) {
    return $("<img>", {
      src: S.Rc.unchecked_icons[index],
      "class": "rssimg",
      data: {
        checked: false,
        index: index,
        url: "" + S.Rc.base_url + "/php/addtorrent.php",
        method: "post",
        params: {
          label: S.Rc.labels[index],
          url: url
        }
      }
    });
  };

  RSSImg.fire = function() {
    var img;
    img = new S.RSSImg();
    return img.fire();
  };

  RSSImg.prototype.fire = function() {
    var _this = this;
    return $(S.RSSImg.selector).live("click.saber", function(e) {
      var img, index;
      img = $(e.target);
      index = img.data("index");
      if (img.data("checked")) {
        img.data("checked", false);
        img.attr("src", S.Rc.unchecked_icons[index]);
      } else {
        _this.request(img);
        img.data("checked", true);
        img.attr("src", S.Rc.checked_icons[index]);
      }
      return false;
    });
  };

  RSSImg.prototype.request = function(ele) {
    var setting;
    setting = {
      url: ele.data("url"),
      method: ele.data("method"),
      data: $.param(ele.data("params")),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      user: S.Rc.username,
      password: S.Rc.password,
      onload: function(rep) {
        if (rep.responseText.match(/addTorrentFailed/)) {
          return alert("saber-addtorrent failed.");
        }
      }
    };
    return GM_xmlhttpRequest(setting);
  };

  return RSSImg;

})();

$(function() {
  var host;
  GM_addStyle(STYLE);
  Saber.fire();
  S.RSSImg.fire();
  host = window.location.hostname;
  if (host.match(/what\.cd$/)) {
    return S.What.inject();
  } else if (host.match(/broadcasthe\.net$/)) {
    return S.BTN.inject();
  } else if (host.match(/passthepopcorn\.me$/)) {
    return S.PTP.inject();
  } else if (host.match(/www\.sceneaccess\.org$/)) {
    return S.SCC.inject();
  } else if (host.match(/bibliotik\.org$/)) {
    return S.BIB.inject();
  } else if (host.match(/animebyt\.es$/)) {
    return S.AB.inject();
  }
});

S.AB = (function() {

  function AB() {}

  AB.inject = function() {
    var ab;
    ab = new S.AB();
    return ab.inject();
  };

  AB.prototype.scan = function(fn) {
    return $("#content a[title='Download']").each(function() {
      return fn.call(null, $(this), this.href);
    });
  };

  AB.prototype.inject = function() {
    return this.scan(function(ele, url) {
      var i, rssimg, _ref, _results;
      _results = [];
      for (i = 0, _ref = S.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        rssimg = S.RSSImg.create_ele(url, i);
        ele.after(rssimg);
        _results.push(rssimg.before(" | "));
      }
      return _results;
    });
  };

  return AB;

})();

S.BIB = (function() {

  function BIB() {}

  BIB.inject = function() {
    var bib;
    bib = new S.BIB();
    return bib.inject();
  };

  BIB.prototype.scan = function(fn) {
    return $("#body a[title='Download']").each(function() {
      return fn.call(null, $(this), this.href);
    });
  };

  BIB.prototype.inject = function() {
    return this.scan(function(ele, url) {
      var i, rssimg, _ref, _results;
      _results = [];
      for (i = 0, _ref = S.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        rssimg = S.RSSImg.create_ele(url, i);
        _results.push(ele.after(rssimg));
      }
      return _results;
    });
  };

  return BIB;

})();

S.BTN = (function() {

  function BTN() {}

  BTN.inject = function() {
    var btn;
    btn = new S.BTN();
    return btn.inject();
  };

  BTN.prototype.scan = function(fn) {
    return $("#content a[title='Download']").each(function() {
      return fn.call(null, $(this), this.href);
    });
  };

  BTN.prototype.inject = function() {
    return this.scan(function(ele, url) {
      var i, rssimg, _ref, _results;
      _results = [];
      for (i = 0, _ref = S.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        rssimg = S.RSSImg.create_ele(url, i);
        _results.push(ele.after(rssimg));
      }
      return _results;
    });
  };

  return BTN;

})();

S.PTP = (function() {

  function PTP() {}

  PTP.inject = function() {
    var ptp;
    ptp = new S.PTP();
    return ptp.inject();
  };

  PTP.prototype.scan = function(fn) {
    return $("#content a[title='Download']").each(function() {
      return fn.call(null, $(this), this.href);
    });
  };

  PTP.prototype.inject = function() {
    return this.scan(function(ele, url) {
      var i, rssimg, _ref, _results;
      _results = [];
      for (i = 0, _ref = S.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        rssimg = S.RSSImg.create_ele(url, i);
        ele.after(rssimg);
        _results.push(rssimg.before(" | "));
      }
      return _results;
    });
  };

  return PTP;

})();

S.SCC = (function() {

  function SCC() {}

  SCC.inject = function() {
    var scc;
    scc = new S.SCC();
    return scc.inject();
  };

  SCC.prototype.scan = function(fn) {
    return $("#content a[href^='download/']").each(function() {
      pd(this);
      return fn.call(null, $(this), this.href);
    });
  };

  SCC.prototype.inject = function() {
    return this.scan(function(ele, url) {
      var i, rssimg, _ref, _results;
      _results = [];
      for (i = 0, _ref = S.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        rssimg = S.RSSImg.create_ele(url, i);
        _results.push(ele.after(rssimg));
      }
      return _results;
    });
  };

  return SCC;

})();

S.What = (function() {

  function What() {}

  What.inject = function() {
    var what;
    what = new S.What();
    return what.inject();
  };

  What.prototype.scan = function(fn) {
    return $("#content a[title='Download']").each(function() {
      return fn.call(null, $(this), this.href);
    });
  };

  What.prototype.inject = function() {
    return this.scan(function(ele, url) {
      var i, rssimg, _ref, _results;
      _results = [];
      for (i = 0, _ref = S.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        rssimg = S.RSSImg.create_ele(url, i);
        ele.after(rssimg);
        _results.push(rssimg.before(" | "));
      }
      return _results;
    });
  };

  return What;

})();
