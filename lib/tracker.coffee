class A.Base
  @SELECTOR = "body"
  @SEPERATOR = ""

  @inject: ->
    img = new this
    img.inject()
    img.fire()

  # callback(ele, url)
  scan: (callback)->
    $(@constructor.SELECTOR).each ->
      callback.call null, $(this), this.href

  inject: ->
    @scan (ele, url) =>
      for i in [0...A.Rc.counts]
        link = @build_link(url)
        rssimg = @create_ele(link, i)
        ele.after(rssimg)
        rssimg.before(@constructor.SEPERATOR)

  fire: ->
    $("img.rssimg").live "click.saber", (e) =>
      img = $(e.target)
      index = img.data("index")
      if img.data("checked") then checked="uncheck" else checked="check"
      debug "click-#{checked}" if A.DEBUG

      if img.data("checked")
        img.data "checked", false
        img.attr "src", A.Rc.unchecked_icons[index]

      else
        settings = 
          url: img.data("url")
          method: img.data("method")
          data: img.data("params")
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
          user: A.Rc.username
          password: A.Rc.password
          #ignoreRedirect: true
          onload: (rep)->
            if rep.responseText.match(/addTorrentFailed/)
              alert "saber-addtorrent failed."

        @request(settings)
      
        img.data "checked", true
        img.attr "src", A.Rc.checked_icons[index]
        
      false

  request: (settings) ->
    debug "request", settings if A.DEBUG
    settings["data"] = $.param(settings["data"])
    GM_xmlhttpRequest settings

  create_ele: (url, index)->
    $ "<img>", 
      src: A.Rc.unchecked_icons[index]
      class: "rssimg"
      data: 
        checked: false
        index: index
        url: "#{A.Rc.base_url}/php/addtorrent.php"  
        method: "post"
        params: {label: A.Rc.labels[index], url: url}

  build_link: (link)->
    link

# a Gazelle base class
class A.Gazelle extends A.Base
  @SELECTOR = "#content a[title='Download']"
  @SEPERATOR = " | "

# what.cd
class A.What extends A.Gazelle

# Broadcast.the
class A.BTN extends A.Gazelle
  @SEPERATOR = ""

# PassThePopcorn
class A.PTP extends A.Gazelle

# animebytes
class A.AB extends A.Gazelle

# baconBITS
class A.BB extends A.Gazelle

# bliotik
class A.BIB extends A.Gazelle
  @SELECTOR = "#body a[title='Download']"
  @SEPERATOR = ""

  constructor: ->
    super
    @rsskey = $("link[href*='rsskey']")[0].href.match(/rsskey=([^&]+)/)[1]

  # http://bibliotik.org/torrents/91236
  build_link: (link)->
    id = link.match(/torrents\/([^/]+)/)[1]
    "#{location.protocol}//#{location.host}/rss/download/#{id}?rsskey=#{@rsskey}"

# SceneAccess.org
class A.SCC extends A.Base
  @SELECTOR = "#content a[href^='download/']"

# thepriatebay
class A.TPB extends A.Base
  @SELECTOR = "#content a[href^='magnet:']"

# demonoid
class A.Demonoid extends A.Base
  @SELECTOR = "a[href^='/files/downloadmagnet/']"

  request: (settings) ->
    debug "request", settings if A.DEBUG
    GM_xmlhttpRequest
      url: settings["data"]["url"]
      method: "GET"
      failOnRedirect: true
      onreadystatechange: (resp) =>
        if resp.status == 302
          settings["data"]["url"] = resp.responseHeaders.match(/Location: ([^\n]*\n)/)[1]
          debug "location #{settings["data"]["url"]}" if A.DEBUG

          settings["data"] = $.param(settings["data"])
          GM_xmlhttpRequest settings

class A.DAddicts extends A.Base
  @SELECTOR = "a[href^='magnet:']"

