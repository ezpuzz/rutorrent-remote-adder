`
// ==UserScript==
// @name          saber-rss-client
// @description		x 
// @version				1.0
// @auhor					Guten
// @namespace     http://GutenYe.com
//
// @include       http://google.com/* 
// @exclude				http://google.com/foo
//
// @require				http://userscripts.org/scripts/source/85365.user.js 
// @icon          http://a.png  // 32x32
// ==/UserScript==
`
pd = console.log

class Saber
  # pass

S = Saber
S.Rc = 
  host: "http://seedbox/rutorrent"
  username: "foo"
  password: "bar"
  label: "saber"

  img: 
    unchecked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAscD5An4q0AAAFUSURBVCjPfVI7T8NADLbvjEp7DSkUVkDJ1v8%2FIv4DSDw6MABLSV%2Fp9YGinG0GVxELeLmz9Z2%2Fhw7v7%2B9eXqaICH%2BXqpZlQc%2FPr5PJRERshIjeOwBgFmsBwDk3nb6S975tWxFR1RAGo1EeQh8AdrtDXW8Oh29EdM4RnZCIiAgzj8fnZXk7HIaON8bt29v7el2rqog4VU0p9funRXETwsCeMbOIZNmwKK57vZ61zqhHo7MsG6qq6UNEu%2Bf5WZ5nhnE2CmHQ2TJ2QyNCCP2jADmW%2FpUUsxrCiUjTNHW96TZ1WSKiKmw2ddM0R1tt285m1Wq1ds51Ki2j%2BXxRVYuUkqoebcUYHx6eFoul956IiMh7V1Xzx8enGLemlewQkdnsa7%2Ffj8cXeZ4BQF3H5XK12%2B0RkZlVlWy5SYxxG%2BOWyANASvxbfUqJyrL4%2BPgkon%2B%2BCzNfXV3%2BAEYPJ0HfxSAhAAAAAElFTkSuQmCC"

  checked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAsWNazE05UAAAJESURBVCjPjZJBSJNhHMZ%2F77dv6pxRynChc1OckrPpRAdpBAV67BBdIjyEihV4iCgiukQFdctjnaJuBd27ZJca1XTiSK3NQqeFNDalfaKb3%2Fu%2BHVRC6tBzf3ie%2F%2F%2F5ieHhC28nJ6eP27bN%2F8g0TdpbW9%2BJUCikw%2BGwVkoJAKUUpumgrKwcgGKxiJQSYRgAuEtSH51ZEaYQglKpJKSUaK3x%2B%2F1EIp34fD601mQyGWaSSVZWvlNX2ObkwrrIF0uYSils20ZKSTTaw9DQEH5%2FYF%2B9VDrFq3sPORyLk%2FW4eepax1BKUSqVqK%2BvY3h09C8TgGf1Fx3vv7JUZfC6wcWG08CQUgLQGYlwcPkn8fNXWHz2EgCNxlpcJnHxFocibdhnT2EJjZJyJ9EwDHwNPrZWc6x9SPJp7C7fnrxAIEiO3QEEzddGCPZFMcTuA%2FduVLZN7Zl%2Bmn%2Bskr7%2FmLmrDyjMplmLJQjevMSBaJjtdBLblsi9RMuySKUWAGi%2BPEjNiR6Ew0Hm0XMOdrfTPDYIQDq9gGVZf4ybm5vEYjHm5mYBaLkxSnltDVWhIMHrI5guF4nEFPH4R4rFIkopHG63%2B3ZlZSW5XI6lpSWamhpp7AhT0xak8dxpqvu6mZqaZHx8nPn5zwgh2NjYQHi9Xu3xeFBKoZQiEAjQ1RWhJXQELRWp%2BS9MT0%2BTyWRwOBwYhkE%2Bn0dUV1drr9eL1po95IQQVFTsILe1VURrjbGLnBCCbDaLOTDQz8TEG5xO577RC4XCPyG3bZve3mP8BlkiEm1onjOnAAAAAElFTkSuQmCC"


# <img data-checked="false" data-url="http://host/add" data-method="post" data-data="x" />
class S.RSSImg
  @selector = "img[data-method]"

  @create_ele = (url)->
    $ "<img>", 
      src: S.Rc.img.unchecked
      data: 
        checked: false
        url: "#{S.Rc.host}/php/addtorrent.php"  
        method: "post"
        data: {label: S.Rc.label, url: url}

  fire: ->
    $(S.RSSImg.selector).live "click.saber", (e) =>
      img = $(e.target)

      return if img.data("checked")

      method = img.data("method")  
      data  = img.data("params")

      @request(img)
      
      img.data "checked", true
      img.attr "src", S.Rc.img.checked
        
      false

  request: (ele) ->
    setting = 
      url: ele.data("url")
      method: ele.data("method")
      data: ele.data("data")
      user: S.Rc.username
      password: S.Rc.password

    GM_xmlhttpRequest setting

class S.What
  # fn(ele, url)
  scan: (fn)->
    $("#torrent_table a[title='Download']").each ->
      fn.call null, $(this), this.href

  inject: ->
    @scan (ele, url)->
      ele.after S.RSSImg.create_ele(url)
      
$ ->
  rssimg = new S.RSSImg()
  rssimg.fire()
