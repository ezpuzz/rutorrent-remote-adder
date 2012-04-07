require "./core"
require "./tracker"

A.TRACKERS = [
  [ /what\.cd$/, A.What ],
  [ /broadcasthe\.net$/, A.BTN ],
  [ /passthepopcorn\.me$/, A.PTP ],
  [ /sceneaccess\.org$/, A.SCC ],
  [ /bibliotik\.org$/, A.BIB ],
  [ /animebyt\.es$/, A.AB ],
  [ /baconbits\.org$/, A.BB], 
  [ /thepiratebay\.se$/, A.TPB], 
  [ /demonoid\.me$/, A.Demonoid]]

GM_addStyle(A.STYLE)
A.fire()

inject = (host)->
  for v in A.TRACKERS
    [pat, tracker_klass] = v
    if host.match(pat)
      tracker_klass.inject()
      break

# inject rssimg
inject window.location.hostname
