// ==UserScript==
// @name          saber-addtorrent
// @description   x 
// @version       1.1
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
//
// @match        https://baconbits.org/torrents.php*
// @match        https://baconbits.org/top10.php
// ==/UserScript==
;
var A, Saber, pd, puts;

pd = console.log;

puts = console.log;

Saber = (function() {

  function Saber() {}

  return Saber;

})();

A = Saber;

A.Rc = {};

A.STYLE = "img.rssimg { \n  cursor: pointer; \n}";

A.GM_CONFIG_STYLE = "#GM_config .config_var span { \n  width: 25%; \n}\n\n#GM_config .config_var input {\n  width: 75%;\n}";

_.reopenClass(A, {
  fire: function() {
    var setting;
    setting = $("<button>saber-addtorrent configuration</button>");
    setting.appendTo($("body"));
    return setting.bind("click", function() {
      return GM_config.open();
    });
  }
});

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
}, A.GM_CONFIG_STYLE);

A.Rc.base_url = GM_config.get("base_url");

A.Rc.username = GM_config.get("username");

A.Rc.password = GM_config.get("password");

A.Rc.counts = GM_config.get("counts");

A.Rc.labels = GM_config.get("labels").split(/[ ]*, */).reverse();

A.Rc.unchecked_icons = GM_config.get("unchecked_icons").split(/[ ]*, */).reverse();

A.Rc.checked_icons = GM_config.get("checked_icons").split(/[ ]*, */).reverse();

A.RSSImg = (function() {

  function RSSImg() {}

  RSSImg.SELECTOR = "img.rssimg";

  RSSImg.create_ele = function(url, index) {
    return $("<img>", {
      src: A.Rc.unchecked_icons[index],
      "class": "rssimg",
      data: {
        checked: false,
        index: index,
        url: "" + A.Rc.base_url + "/php/addtorrent.php",
        method: "post",
        params: {
          label: A.Rc.labels[index],
          url: url
        }
      }
    });
  };

  RSSImg.fire = function() {
    var img;
    img = new A.RSSImg();
    img.inject();
    return img.fire();
  };

  RSSImg.prototype.inject = function() {
    var host, reg, tracker, tracker_klass, v, _i, _len, _ref;
    host = window.location.hostname;
    _ref = A.TRACKERS;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      v = _ref[_i];
      reg = v[0], tracker_klass = v[1];
      if (host.match(reg)) {
        tracker = new tracker_klass;
        tracker.inject();
        return;
      }
    }
  };

  RSSImg.prototype.fire = function() {
    var _this = this;
    return $(A.RSSImg.SELECTOR).live("click.saber", function(e) {
      var img, index;
      img = $(e.target);
      index = img.data("index");
      if (img.data("checked")) {
        img.data("checked", false);
        img.attr("src", A.Rc.unchecked_icons[index]);
      } else {
        _this.request(img);
        img.data("checked", true);
        img.attr("src", A.Rc.checked_icons[index]);
      }
      return false;
    });
  };

  RSSImg.prototype.request = function(ele) {
    var settings;
    settings = {
      url: ele.data("url"),
      method: ele.data("method"),
      data: $.param(ele.data("params")),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      user: A.Rc.username,
      password: A.Rc.password,
      onload: function(rep) {
        if (rep.responseText.match(/addTorrentFailed/)) {
          return alert("saber-addtorrent failed.");
        }
      }
    };
    return GM_xmlhttpRequest(settings);
  };

  return RSSImg;

})();
var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

A.Base = (function() {

  function Base() {}

  Base.SELECTOR = "body";

  Base.SEPERATOR = "";

  Base.prototype.scan = function(fn) {
    return $(this.constructor.SELECTOR).each(function() {
      return fn.call(null, $(this), this.href);
    });
  };

  Base.prototype.inject = function() {
    return this.scan(function(ele, url) {
      var i, rssimg, _ref, _results;
      _results = [];
      for (i = 0, _ref = A.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        rssimg = A.RSSImg.create_ele(url, i);
        ele.after(rssimg);
        _results.push(rssimg.before(this.constructor.SEPERATOR));
      }
      return _results;
    });
  };

  return Base;

})();

A.Gazelle = (function(_super) {

  __extends(Gazelle, _super);

  function Gazelle() {
    Gazelle.__super__.constructor.apply(this, arguments);
  }

  Gazelle.SELECTOR = "#content a[title='Download']";

  Gazelle.SEPERATOR = " | ";

  return Gazelle;

})(A.Base);

A.What = (function(_super) {

  __extends(What, _super);

  function What() {
    What.__super__.constructor.apply(this, arguments);
  }

  return What;

})(A.Gazelle);

A.BTN = (function(_super) {

  __extends(BTN, _super);

  function BTN() {
    BTN.__super__.constructor.apply(this, arguments);
  }

  BTN.SEPERATOR = "";

  return BTN;

})(A.Gazelle);

A.PTP = (function(_super) {

  __extends(PTP, _super);

  function PTP() {
    PTP.__super__.constructor.apply(this, arguments);
  }

  return PTP;

})(A.Gazelle);

A.AB = (function(_super) {

  __extends(AB, _super);

  function AB() {
    AB.__super__.constructor.apply(this, arguments);
  }

  return AB;

})(A.Gazelle);

A.BB = (function(_super) {

  __extends(BB, _super);

  function BB() {
    BB.__super__.constructor.apply(this, arguments);
  }

  return BB;

})(A.Gazelle);

A.BIB = (function(_super) {

  __extends(BIB, _super);

  function BIB() {
    BIB.__super__.constructor.apply(this, arguments);
  }

  BIB.SELECTOR = "#body a[title='Download']";

  BIB.SEPERATOR = "";

  return BIB;

})(A.Gazelle);

A.SCC = (function(_super) {

  __extends(SCC, _super);

  function SCC() {
    SCC.__super__.constructor.apply(this, arguments);
  }

  SCC.SELECTOR = "#content a[href^='download/']";

  return SCC;

})(A.Base);
A.TRACKERS = [[/what\.cd$/, A.What], [/broadcasthe\.net$/, A.BTN], [/passthepopcorn\.me$/, A.PTP], [/www\.sceneaccess\.org$/, A.SCC], [/bibliotik\.org$/, A.BIB], [/animebyt\.es$/, A.AB], [/baconbits\.org$/, A.BB]];

GM_addStyle(A.STYLE);

A.fire();

A.RSSImg.fire();
