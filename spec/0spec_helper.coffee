jasmine.getFixtures().fixturesPath = "/assets/spec_fixtures"

$.fn.outerHTML = ->
  $(this).clone().wrap('<div></div>').parent().html()
