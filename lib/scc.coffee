class S.SCC
  @inject: ->
    scc = new S.SCC()
    scc.inject()

  # fn(ele, url)
  scan: (fn)->
    $("#content a[href^='download/']").each ->
      pd this
      fn.call null, $(this), this.href

  inject: ->
    @scan (ele, url)->
      for i in [0...S.Rc.counts]
        rssimg = S.RSSImg.create_ele(url, i)
        ele.after(rssimg)
