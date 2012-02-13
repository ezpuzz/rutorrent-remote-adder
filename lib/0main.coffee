`// ==UserScript==
// @name          saber-addtorrent
// @description   x 
// @version       0.1
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
// @match        http://animebyt.es/collage.php*
// @match        http://animebyt.es/series.php*
// ==/UserScript==
`
pd = console.log
puts = pd

STYLE="""
img.rssimg { cursor: pointer; }
"""

class Saber
  @fire: ->
    pd "fire"
    setting = $("<button>saber-addtorrent configuration</button>") 
    setting.appendTo($("body"))
    setting.bind "click", ->
      GM_config.open()

S = Saber
S.Rc = {}
    
GM_config.init "Saber Addtorrent Configuration"
  base_url: {
    section: ["rutorrent setting"],
    label: "Base URL", type: "text", default: "http://localhost/rutorrent", title: "rutorrent url"}
  username: {label: "username", type: "text", default: "foo", title: "username for login rutorrent"}
  password: {label: "password", type: "text", default: "bar", title: "password for login rutorrent"}

  counts: {
    section: ["main setting", "seperate value by comma"],
    label: "Counts", type: "int", default: 2, title: "number of addtorrent icons"}
  labels: {label: "Labels", type: "text", default: "saber, saber1", title: "add to rutorrent under the label"}
  unchecked_icons: {label: "Unchecked Icons", type: "text",  default: "http://i.imgur.com/C8xAX.png, http://i.imgur.com/C8xAX.png", title: "icon for uncheched"}
  checked_icons: {label: "Checked Icons", type: "text", default: "http://i.imgur.com/Obx5Y.png, http://i.imgur.com/Obx5Y.png", title: "icon for checked"}

S.Rc.base_url = GM_config.get("base_url")
S.Rc.username = GM_config.get("username")
S.Rc.password = GM_config.get("password")
S.Rc.counts = GM_config.get("counts")
S.Rc.labels = GM_config.get("labels").split(/[ ]*, */)
S.Rc.unchecked_icons = GM_config.get("unchecked_icons").split(/[ ]*, */)
S.Rc.checked_icons = GM_config.get("checked_icons").split(/[ ]*, */)

# <img data-checked="false" data-url="http://host/add" data-method="post" data-params="x" data-index="0" />
class S.RSSImg
  @selector = "img.rssimg"

  @create_ele: (url, index)->
    $ "<img>", 
      src: S.Rc.unchecked_icons[index]
      class: "rssimg"
      data: 
        checked: false
        index: index
        url: "#{S.Rc.base_url}/php/addtorrent.php"  
        method: "post"
        params: {label: S.Rc.labels[index], url: url}

  @fire: ()->
    img = new S.RSSImg()
    img.fire()

  fire: ->
    $(S.RSSImg.selector).live "click.saber", (e) =>
      img = $(e.target)
      index = img.data("index")

      if img.data("checked")
        img.data "checked", false
        img.attr "src", S.Rc.unchecked_icons[index]

      else
        @request(img)
      
        img.data "checked", true
        img.attr "src", S.Rc.checked_icons[index]
        
      false

  request: (ele) ->
    setting = 
      url: ele.data("url")
      method: ele.data("method")
      data: $.param(ele.data("params"))
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
      user: S.Rc.username
      password: S.Rc.password
      onload: (rep)->
        if rep.responseText.match(/addTorrentFailed/)
          alert "saber-addtorrent failed."

    GM_xmlhttpRequest setting

$ ->
  GM_addStyle(STYLE)
  Saber.fire()
  S.RSSImg.fire()

  host = window.location.hostname
  if host.match(/what\.cd$/)
    S.What.inject()
  else if host.match(/broadcasthe\.net$/)
    S.BTN.inject()
  else if host.match(/passthepopcorn\.me$/)
    S.PTP.inject()
  else if host.match(/www\.sceneaccess\.org$/)
    S.SCC.inject()
  else if host.match(/bibliotik\.org$/)
    S.BIB.inject()
  else if host.match(/animebyt\.es$/)
    S.AB.inject()
