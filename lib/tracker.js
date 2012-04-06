(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  A.Base = (function() {

    function Base() {}

    Base.SELECTOR = "body";

    Base.SEPERATOR = "";

    Base.prototype.scan = function(fn) {
      return $(this.constructor.SELECTOR).each(function() {
        return fn.call(null, $(this), this.href);
      });
    };

    Base.prototype.inject = function() {
      return this.scan(function(ele, url) {
        var i, rssimg, _ref, _results;
        _results = [];
        for (i = 0, _ref = A.Rc.counts; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          rssimg = A.RSSImg.create_ele(url, i);
          ele.after(rssimg);
          _results.push(rssimg.before(this.constructor.SEPERATOR));
        }
        return _results;
      });
    };

    return Base;

  })();

  A.Gazelle = (function(_super) {

    __extends(Gazelle, _super);

    function Gazelle() {
      Gazelle.__super__.constructor.apply(this, arguments);
    }

    Gazelle.SELECTOR = "#content a[title='Download']";

    Gazelle.SEPERATOR = " | ";

    return Gazelle;

  })(A.Base);

  A.What = (function(_super) {

    __extends(What, _super);

    function What() {
      What.__super__.constructor.apply(this, arguments);
    }

    return What;

  })(A.Gazelle);

  A.BTN = (function(_super) {

    __extends(BTN, _super);

    function BTN() {
      BTN.__super__.constructor.apply(this, arguments);
    }

    BTN.SEPERATOR = "";

    return BTN;

  })(A.Gazelle);

  A.PTP = (function(_super) {

    __extends(PTP, _super);

    function PTP() {
      PTP.__super__.constructor.apply(this, arguments);
    }

    return PTP;

  })(A.Gazelle);

  A.AB = (function(_super) {

    __extends(AB, _super);

    function AB() {
      AB.__super__.constructor.apply(this, arguments);
    }

    return AB;

  })(A.Gazelle);

  A.BB = (function(_super) {

    __extends(BB, _super);

    function BB() {
      BB.__super__.constructor.apply(this, arguments);
    }

    return BB;

  })(A.Gazelle);

  A.BIB = (function(_super) {

    __extends(BIB, _super);

    function BIB() {
      BIB.__super__.constructor.apply(this, arguments);
    }

    BIB.SELECTOR = "#body a[title='Download']";

    BIB.SEPERATOR = "";

    return BIB;

  })(A.Gazelle);

  A.SCC = (function(_super) {

    __extends(SCC, _super);

    function SCC() {
      SCC.__super__.constructor.apply(this, arguments);
    }

    SCC.SELECTOR = "#content a[href^='download/']";

    return SCC;

  })(A.Base);

}).call(this);
