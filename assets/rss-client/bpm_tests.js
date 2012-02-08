/* ===========================================================================
   BPM Combined Asset File
   MANIFEST: rss-client ()
   This file is generated automatically by the bpm (http://www.bpmjs.org)
   =========================================================================*/

jasmine.getFixtures().fixturesPath = "/assets/spec_fixtures";describe("hello", function() {
  return it("works", function() {
    loadFixtures("what.html");
    pd($("#foo").html());
    return expect(1).toEqual(1);
  });
});