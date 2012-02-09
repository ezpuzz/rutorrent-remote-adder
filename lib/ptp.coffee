class S.PTP
  @inject: ->
    ptp = new S.PTP()
    ptp.inject()

  # fn(ele, url)
  scan: (fn)->
    $("#content a[title='Download']").each ->
      fn.call null, $(this), this.href

  inject: ->
    @scan (ele, url)->
      for i in [0...S.Rc.counts]
        rssimg = S.RSSImg.create_ele(url, i)
        ele.after(rssimg)
        rssimg.before(" | ")
