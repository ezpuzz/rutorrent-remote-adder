class A.RSSImg
  @SELECTOR = "img.rssimg"

  @create_ele: (url, index)->
    $ "<img>", 
      src: A.Rc.unchecked_icons[index]
      class: "rssimg"
      data: 
        checked: false
        index: index
        url: "#{A.Rc.base_url}/php/addtorrent.php"  
        method: "post"
        params: {label: A.Rc.labels[index], url: url}

  @fire: ->
    img = new A.RSSImg()
    img.inject()
    img.fire()

  inject: ->
    host = window.location.hostname

    for v in A.TRACKERS
      [reg, tracker_klass] = v
      if host.match(reg)
        tracker = new tracker_klass
        tracker.inject()
        return

  fire: ->
    $(A.RSSImg.SELECTOR).live "click.saber", (e) =>
      img = $(e.target)
      index = img.data("index")

      if img.data("checked")
        img.data "checked", false
        img.attr "src", A.Rc.unchecked_icons[index]

      else
        @request(img)
      
        img.data "checked", true
        img.attr "src", A.Rc.checked_icons[index]
        
      false

  request: (ele) ->
    settings = 
      url: ele.data("url")
      method: ele.data("method")
      data: $.param(ele.data("params"))
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
      user: A.Rc.username
      password: A.Rc.password
      onload: (rep)->
        if rep.responseText.match(/addTorrentFailed/)
          alert "saber-addtorrent failed."

    GM_xmlhttpRequest settings
