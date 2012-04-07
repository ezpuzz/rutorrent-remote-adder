minispade.register('./core', "(function() {// ==UserScript==\n// @name          saber-addtorrent\n// @description   x \n// @version       1.1\n// @author        Guten\n// @namespace     http://GutenYe.com\n// @updateURL     https://raw.github.com/GutenYe/saber-addtorrent/master/dist/saber-addtorrent.meta.js\n// @icon          http://i.imgur.com/xEjOM.png\n//\n// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js\n// @require       https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js\n//\n// @include       *://*what.cd/torrents.php*\n// @include       *://*what.cd/collages.php*\n// @include       *://*what.cd/artist.php*\n//\n// @match         *://broadcasthe.net/torrents.php*\n// @match         *://broadcasthe.net/collages.php*\n// @match         *://broadcasthe.net/series.php*\n//\n// @include       *://*passthepopcorn.me/torrents.php*\n// @include       *://*passthepopcorn.me/collages.php*\n// @include       *://*passthepopcorn.me/bookmarks.php\n//\n// @match        *://www.sceneaccess.org/browse\n// @match        *://www.sceneaccess.org/spam\n// @match        *://www.sceneaccess.org/archive\n// @match        *://www.sceneaccess.org/foreign\n// @match        *://www.sceneaccess.org/xxx\n// @match        *://www.sceneaccess.org/details*\n//\n// @match        http://bibliotik.org/torrents/*\n// @match        http://bibliotik.org/collections/*\n// @match        http://bibliotik.org/publishers/*/torrents/*\n// @match        http://bibliotik.org/creators/*/torrents/*\n//\n// @match        http://animebyt.es/torrents.php*\n// @match        http://animebyt.es/torrents2.php*\n// @match        http://animebyt.es/collage.php*\n// @match        http://animebyt.es/series.php*\n//\n// @match        https://baconbits.org/torrents.php*\n// @match        https://baconbits.org/top10.php\n//\n// @match        http://thepiratebay.se/browse/*\n// @match        http://thepiratebay.se/torrent/*\n//\n// @match        http://www.demonoid.me/files/*\n// ==/UserScript==\n;\nvar A, Saber, debug, pd, puts;\n\npd = console.log;\n\ndebug = pd;\n\nputs = console.log;\n\nSaber = (function() {\n\n  function Saber() {}\n\n  Saber.DEBUG = true;\n\n  Saber.Rc = {};\n\n  Saber.STYLE = \"img.rssimg { \\n  cursor: pointer; \\n}\";\n\n  Saber.GM_CONFIG_STYLE = \"#GM_config .config_var span { \\n  width: 25%; \\n}\\n\\n#GM_config .config_var input {\\n  width: 75%;\\n}\";\n\n  Saber.fire = function() {\n    var setting;\n    setting = $(\"<button>saber-addtorrent configuration</button>\");\n    setting.appendTo($(\"body\"));\n    return setting.bind(\"click\", function() {\n      return GM_config.open();\n    });\n  };\n\n  return Saber;\n\n})();\n\nA = Saber;\n\nGM_config.init(\"Saber Addtorrent Configuration\", {\n  base_url: {\n    section: [\"rutorrent setting\"],\n    label: \"Base URL\",\n    type: \"text\",\n    \"default\": \"http://localhost/rutorrent\",\n    title: \"rutorrent url\"\n  },\n  username: {\n    label: \"username\",\n    type: \"text\",\n    \"default\": \"foo\",\n    title: \"username for login rutorrent\"\n  },\n  password: {\n    label: \"password\",\n    type: \"text\",\n    \"default\": \"bar\",\n    title: \"password for login rutorrent\"\n  },\n  counts: {\n    section: [\"main setting\", \"seperate value by comma\"],\n    label: \"Counts\",\n    type: \"int\",\n    \"default\": 2,\n    title: \"number of addtorrent icons\"\n  },\n  labels: {\n    label: \"Labels\",\n    type: \"text\",\n    \"default\": \"saber, saber1\",\n    title: \"add to rutorrent under the label\"\n  },\n  unchecked_icons: {\n    label: \"Unchecked Icons\",\n    type: \"text\",\n    \"default\": \"http://i.imgur.com/C8xAX.png, http://i.imgur.com/C8xAX.png\",\n    title: \"icon for uncheched\"\n  },\n  checked_icons: {\n    label: \"Checked Icons\",\n    type: \"text\",\n    \"default\": \"http://i.imgur.com/Obx5Y.png, http://i.imgur.com/Obx5Y.png\",\n    title: \"icon for checked\"\n  }\n}, A.GM_CONFIG_STYLE);\n\nA.Rc.base_url = GM_config.get(\"base_url\");\n\nA.Rc.username = GM_config.get(\"username\");\n\nA.Rc.password = GM_config.get(\"password\");\n\nA.Rc.counts = GM_config.get(\"counts\");\n\nA.Rc.labels = GM_config.get(\"labels\").split(/[ ]*, */).reverse();\n\nA.Rc.unchecked_icons = GM_config.get(\"unchecked_icons\").split(/[ ]*, */).reverse();\n\nA.Rc.checked_icons = GM_config.get(\"checked_icons\").split(/[ ]*, */).reverse();\n\n})();\n//@ sourceURL=./core");minispade.register('./ext', "(function() {var Util,\n  __hasProp = Object.prototype.hasOwnProperty;\n\nUtil = (function() {\n\n  function Util() {}\n\n  Util.reopenClass = function(klass, attrs, overwrite) {\n    var k, v, _results;\n    _results = [];\n    for (k in attrs) {\n      if (!__hasProp.call(attrs, k)) continue;\n      v = attrs[k];\n      if (!klass[k]) {\n        _results.push(Object.defineProperty(klass, k, {\n          value: v,\n          writable: true\n        }));\n      } else {\n        _results.push(void 0);\n      }\n    }\n    return _results;\n  };\n\n  return Util;\n\n})();\n\n})();\n//@ sourceURL=./ext");minispade.register('saber-addtorrent', "(function() {var inject;\nminispade.require(\"./core\");\nminispade.require(\"./tracker\");\n\nA.TRACKERS = [[/what\\.cd$/, A.What], [/broadcasthe\\.net$/, A.BTN], [/passthepopcorn\\.me$/, A.PTP], [/sceneaccess\\.org$/, A.SCC], [/bibliotik\\.org$/, A.BIB], [/animebyt\\.es$/, A.AB], [/baconbits\\.org$/, A.BB], [/thepiratebay\\.se$/, A.TPB], [/demonoid\\.me$/, A.Demonoid]];\n\nGM_addStyle(A.STYLE);\n\nA.fire();\n\ninject = function(host) {\n  var pat, tracker_klass, v, _i, _len, _ref, _results;\n  _ref = A.TRACKERS;\n  _results = [];\n  for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n    v = _ref[_i];\n    pat = v[0], tracker_klass = v[1];\n    if (host.match(pat)) {\n      tracker_klass.inject();\n      break;\n    } else {\n      _results.push(void 0);\n    }\n  }\n  return _results;\n};\n\ninject(window.location.hostname);\n\n})();\n//@ sourceURL=saber-addtorrent");minispade.register('./tracker', "(function() {var __hasProp = Object.prototype.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };\n\nA.Base = (function() {\n\n  function Base() {}\n\n  Base.SELECTOR = \"body\";\n\n  Base.SEPERATOR = \"\";\n\n  Base.inject = function() {\n    var img;\n    img = new this;\n    img.inject();\n    return img.fire();\n  };\n\n  Base.prototype.scan = function(callback) {\n    return $(this.constructor.SELECTOR).each(function() {\n      return callback.call(null, $(this), this.href);\n    });\n  };\n\n  Base.prototype.inject = function() {\n    var _this = this;\n    return this.scan(function(ele, url) {\n      var i, rssimg, _ref, _results;\n      _results = [];\n      for (i = 0, _ref = A.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {\n        rssimg = _this.create_ele(url, i);\n        ele.after(rssimg);\n        _results.push(rssimg.before(_this.constructor.SEPERATOR));\n      }\n      return _results;\n    });\n  };\n\n  Base.prototype.fire = function() {\n    var _this = this;\n    return $(\"img.rssimg\").live(\"click.saber\", function(e) {\n      var checked, img, index, settings;\n      img = $(e.target);\n      index = img.data(\"index\");\n      if (img.data(\"checked\")) {\n        checked = \"uncheck\";\n      } else {\n        checked = \"check\";\n      }\n      if (A.DEBUG) debug(\"click-\" + checked);\n      if (img.data(\"checked\")) {\n        img.data(\"checked\", false);\n        img.attr(\"src\", A.Rc.unchecked_icons[index]);\n      } else {\n        settings = {\n          url: img.data(\"url\"),\n          method: img.data(\"method\"),\n          data: img.data(\"params\"),\n          headers: {\n            \"Content-Type\": \"application/x-www-form-urlencoded\"\n          },\n          user: A.Rc.username,\n          password: A.Rc.password,\n          onload: function(rep) {\n            if (rep.responseText.match(/addTorrentFailed/)) {\n              return alert(\"saber-addtorrent failed.\");\n            }\n          }\n        };\n        _this.request(settings);\n        img.data(\"checked\", true);\n        img.attr(\"src\", A.Rc.checked_icons[index]);\n      }\n      return false;\n    });\n  };\n\n  Base.prototype.request = function(settings) {\n    if (A.DEBUG) debug(\"request\", settings);\n    settings[\"data\"] = $.param(settings[\"data\"]);\n    return GM_xmlhttpRequest(settings);\n  };\n\n  Base.prototype.create_ele = function(url, index) {\n    return $(\"<img>\", {\n      src: A.Rc.unchecked_icons[index],\n      \"class\": \"rssimg\",\n      data: {\n        checked: false,\n        index: index,\n        url: \"\" + A.Rc.base_url + \"/php/addtorrent.php\",\n        method: \"post\",\n        params: {\n          label: A.Rc.labels[index],\n          url: url\n        }\n      }\n    });\n  };\n\n  return Base;\n\n})();\n\nA.Gazelle = (function(_super) {\n\n  __extends(Gazelle, _super);\n\n  function Gazelle() {\n    Gazelle.__super__.constructor.apply(this, arguments);\n  }\n\n  Gazelle.SELECTOR = \"#content a[title='Download']\";\n\n  Gazelle.SEPERATOR = \" | \";\n\n  return Gazelle;\n\n})(A.Base);\n\nA.What = (function(_super) {\n\n  __extends(What, _super);\n\n  function What() {\n    What.__super__.constructor.apply(this, arguments);\n  }\n\n  return What;\n\n})(A.Gazelle);\n\nA.BTN = (function(_super) {\n\n  __extends(BTN, _super);\n\n  function BTN() {\n    BTN.__super__.constructor.apply(this, arguments);\n  }\n\n  BTN.SEPERATOR = \"\";\n\n  return BTN;\n\n})(A.Gazelle);\n\nA.PTP = (function(_super) {\n\n  __extends(PTP, _super);\n\n  function PTP() {\n    PTP.__super__.constructor.apply(this, arguments);\n  }\n\n  return PTP;\n\n})(A.Gazelle);\n\nA.AB = (function(_super) {\n\n  __extends(AB, _super);\n\n  function AB() {\n    AB.__super__.constructor.apply(this, arguments);\n  }\n\n  return AB;\n\n})(A.Gazelle);\n\nA.BB = (function(_super) {\n\n  __extends(BB, _super);\n\n  function BB() {\n    BB.__super__.constructor.apply(this, arguments);\n  }\n\n  return BB;\n\n})(A.Gazelle);\n\nA.BIB = (function(_super) {\n\n  __extends(BIB, _super);\n\n  function BIB() {\n    BIB.__super__.constructor.apply(this, arguments);\n  }\n\n  BIB.SELECTOR = \"#body a[title='Download']\";\n\n  BIB.SEPERATOR = \"\";\n\n  return BIB;\n\n})(A.Gazelle);\n\nA.SCC = (function(_super) {\n\n  __extends(SCC, _super);\n\n  function SCC() {\n    SCC.__super__.constructor.apply(this, arguments);\n  }\n\n  SCC.SELECTOR = \"#content a[href^='download/']\";\n\n  return SCC;\n\n})(A.Base);\n\nA.TPB = (function(_super) {\n\n  __extends(TPB, _super);\n\n  function TPB() {\n    TPB.__super__.constructor.apply(this, arguments);\n  }\n\n  TPB.SELECTOR = \"#content a[href^='magnet:']\";\n\n  return TPB;\n\n})(A.Base);\n\nA.Demonoid = (function(_super) {\n\n  __extends(Demonoid, _super);\n\n  function Demonoid() {\n    Demonoid.__super__.constructor.apply(this, arguments);\n  }\n\n  Demonoid.SELECTOR = \"a[href^='/files/downloadmagnet/']\";\n\n  Demonoid.prototype.request = function(settings) {\n    var _this = this;\n    if (A.DEBUG) debug(\"request\", settings);\n    return GM_xmlhttpRequest({\n      url: settings[\"data\"][\"url\"],\n      method: \"GET\",\n      failOnRedirect: true,\n      onreadystatechange: function(resp) {\n        if (resp.status === 302) {\n          settings[\"data\"][\"url\"] = resp.responseHeaders.match(/Location: ([^\\n]*\\n)/)[1];\n          if (A.DEBUG) debug(\"location \" + settings[\"data\"][\"url\"]);\n          settings[\"data\"] = $.param(settings[\"data\"]);\n          return GM_xmlhttpRequest(settings);\n        }\n      }\n    });\n  };\n\n  return Demonoid;\n\n})(A.Base);\n\n})();\n//@ sourceURL=./tracker");