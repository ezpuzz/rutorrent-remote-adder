# animebytes
class S.AB
  @inject: ->
    ab = new S.AB()
    ab.inject()

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
