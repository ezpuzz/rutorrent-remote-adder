describe "S.What", ->
  describe "#scan", ->
    it "works", ->
      loadFixtures("what.html")

      links = []
      what = new S.What()
      what.scan (ele, url)->
        links.push url
      expect(links[0]).toContain "/torrents.php?action=download&id="
