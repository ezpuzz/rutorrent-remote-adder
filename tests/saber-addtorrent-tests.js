
jasmine.getFixtures().fixturesPath = "/spec/fixtures";

$.fn.outerHTML = function() {
  return $(this).clone().wrap('<div></div>').parent().html();
};

A.Rc.base_url = "base_url";

A.Rc.username = "username";

A.Rc.password = "password";

A.Rc.counts = 2;

A.Rc.labels = ["label0", "label1"];

A.Rc.unchecked_icons = ["unicon0", "unicon1"];

A.Rc.checked_icons = ["icon0", "icon1"];

describe("A.RSSImg", function() {
  return describe(".create_ele", function() {
    return it("works", function() {
      var img;
      img = A.RSSImg.create_ele("url", 0);
      expect(img.outerHTML()).toEqual("<img class=\"rssimg\" src=\"unicon0\">");
      return expect(img.data()).toEqual({
        checked: false,
        index: 0,
        url: "base_url/php/addtorrent.php",
        method: "post",
        params: {
          label: "label0",
          url: "url"
        }
      });
    });
  });
});

describe("A.What", function() {
  return describe("#scan", function() {
    return it("works", function() {
      var links, what;
      loadFixtures("what.html");
      links = [];
      what = new A.What();
      what.scan(function(ele, url) {
        return links.push(url);
      });
      return expect(links[0]).toContain("/torrents.php?action=download&id=");
    });
  });
});
