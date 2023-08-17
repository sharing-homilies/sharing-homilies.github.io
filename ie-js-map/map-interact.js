function isTouchEnabled() {
  return (("ontouchstart" in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}
jQuery(function () {
  jQuery("path[id^=iejs]").each(function (i, e) {
    ieaddEvent( jQuery(e).attr("id"));
  });
});
jQuery(function () {
  jQuery('#lakes').find('path').attr({'fill':iejsconfig.general.lakesFill}).css({'stroke':iejsconfig.general.lakesOutline});
});
function ieaddEvent(id,relationId) {
  var _obj = jQuery("#" + id);
  var arr = id.split("");
  var _Textobj = jQuery("#" + id + "," + "#iejsvn" + arr.slice(4).join(""));
  jQuery("#" + ["visnames"]).attr({"fill":iejsconfig.general.visibleNames});
  _obj.attr({"fill":iejsconfig[id].upColor, "stroke":iejsconfig.general.borderColor});
  _Textobj.attr({"cursor": "default"});
  if (iejsconfig[id].active === true) {
    _Textobj.attr({"cursor": "pointer"});
    _Textobj.hover(function () {
      jQuery("#iejstip").show().html(iejsconfig[id].hover);
      _obj.css({"fill":iejsconfig[id].overColor});
    }, function () {
      jQuery("#iejstip").hide();
      jQuery("#" + id).css({"fill":iejsconfig[id].upColor});
    });
    if (iejsconfig[id].target !== "none") {
      _Textobj.mousedown(function () {
        jQuery("#" + id).css({"fill":iejsconfig[id].downColor});
      });
    }
    _Textobj.mouseup(function () {
      jQuery("#" + id).css({"fill":iejsconfig[id].overColor});
      if (iejsconfig[id].target === "new_window") {
        window.open(iejsconfig[id].url);	
      } else if (iejsconfig[id].target === "same_window") {
        window.parent.location.href = iejsconfig[id].url;
      } else if (iejsconfig[id].target === "modal") {
        jQuery(iejsconfig[id].url).modal("show");
      }
    });
    _Textobj.mousemove(function (e) {
      var x = e.pageX + 10, y = e.pageY + 15;
      var tipw =jQuery("#iejstip").outerWidth(), tiph =jQuery("#iejstip").outerHeight(),
      x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw - (20 * 2) : x ;
      y = (y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() - tiph - 10 : y ;
      jQuery("#iejstip").css({left: x, top: y});
    });
    if (isTouchEnabled()) {
      _Textobj.on("touchstart", function (e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX + 10, y = touch.pageY + 15;
        var tipw =jQuery("#iejstip").outerWidth(), tiph =jQuery("#iejstip").outerHeight(),
        x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw -(20 * 2) : x ;
        y =(y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() -tiph - 10 : y ;
        jQuery("#" + id).css({"fill":iejsconfig[id].downColor});
        jQuery("#iejstip").show().html(iejsconfig[id].hover);
        jQuery("#iejstip").css({left: x, top: y});
      });
      _Textobj.on("touchend", function () {
        jQuery("#" + id).css({"fill":iejsconfig[id].upColor});
        if (iejsconfig[id].target === "new_window") {
          window.open(iejsconfig[id].url);
        } else if (iejsconfig[id].target === "same_window") {
          window.parent.location.href = iejsconfig[id].url;
        } else if (iejsconfig[id].target === "modal") {
          jQuery(iejsconfig[id].url).modal("show");
        }
      });
    }
	}
}