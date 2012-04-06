require "./core"
require "./rssimg"
require "./tracker"

A.TRACKERS = [
  [ /what\.cd$/, A.What ],
  [ /broadcasthe\.net$/, A.BTN ],
  [ /passthepopcorn\.me$/, A.PTP ],
  [ /www\.sceneaccess\.org$/, A.SCC ],
  [ /bibliotik\.org$/, A.BIB ],
  [ /animebyt\.es$/, A.AB ],
  [ /baconbits\.org$/, A.BB] ]


GM_addStyle(A.STYLE)
A.fire()
A.RSSImg.fire() # fire rssimg event
