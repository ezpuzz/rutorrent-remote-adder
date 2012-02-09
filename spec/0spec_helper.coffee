jasmine.getFixtures().fixturesPath = "/assets/spec_fixtures"

$.fn.outerHTML = ->
  $(this).clone().wrap('<div></div>').parent().html()


S.Rc.base_url = "base_url"
S.Rc.username = "username"
S.Rc.password = "password"
S.Rc.counts = 2
S.Rc.labels = ["label0", "label1"]
S.Rc.unchecked_icons = [ "unicon0", "unicon1"]
S.Rc.checked_icons = [ "icon0", "icon1"]
