class S.BIB
  @inject: ->
    bib = new S.BIB()
    bib.inject()

  # fn(ele, url)
  scan: (fn)->
    $("#body a[title='Download']").each ->
      fn.call null, $(this), this.href

  inject: ->
    @scan (ele, url)->
      for i in [0...S.Rc.counts]
        rssimg = S.RSSImg.create_ele(url, i)
        ele.after(rssimg)
