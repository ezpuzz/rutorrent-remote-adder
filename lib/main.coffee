require "./ext"
require "./core"
require "./tracker"

A.TRACKERS = [
  [ /what\.cd$/, A.What ],
  [ /broadcasthe\.net$/, A.BTN ],
  [ /passthepopcorn\.me$/, A.PTP ],
  [ /www\.sceneaccess\.org$/, A.SCC ],
  [ /bibliotik\.org$/, A.BIB ],
  [ /animebyt\.es$/, A.AB ],
  [ /baconbits\.org$/, A.BB], 
  [ /thepiratebay\.se$/, A.TPB] ]

GM_addStyle(A.STYLE)
A.fire()

# inject rssimg
host = window.location.hostname

for v in A.TRACKERS
  [pat, tracker_klass] = v
  if host.match(pat)
    pd "inject", pat
    tracker_klass.inject()
    break

pd "guten"
