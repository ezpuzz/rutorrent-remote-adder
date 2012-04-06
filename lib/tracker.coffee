class A.Base 
  @SELECTOR = "body"
  @SEPERATOR = ""

  # fn(ele, url)
  scan: (fn)->
    $(@constructor.SELECTOR).each ->
      fn.call null, $(this), this.href

  inject: ->
    @scan (ele, url)->
      for i in [0...A.Rc.counts]
        rssimg = A.RSSImg.create_ele(url, i)
        ele.after(rssimg)
        rssimg.before(@constructor.SEPERATOR)

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

# SceneAccess.org
class A.SCC extends A.Base
  @SELECTOR = "#content a[href^='download/']"
