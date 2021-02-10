(function(d, t, e, m){
    
    // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){
                
        RW.init({
            huid: "472420",
            uid: "5ba1af18064428a6e578b9f3391ba00a",
            source: "website",
            options: {
                "advanced": {
                    "layout": {
                        "align": {
                            "hor": "center",
                            "ver": "bottom"
                        }
                    },
                    "font": {
                        "hover": {
                            "color": "#427E53"
                        },
                        "color": "#427E53",
                        "type": "\"Comic Sans MS\""
                    },
                    "text": {
                        "rateThis": "Rate us",
                        "vote": "Feedback",
                        "votes": "Feedbacks"
                    }
                },
                "size": "large",
                "boost": {
                    "rate": 4
                },
                "label": {
                    "background": "#B7D086"
                },
                "style": "quartz",
                "isDummy": false
            } 
        });
        RW.render();
    };
        // Append Rating-Widget JavaScript library.
    var rw, s = d.getElementsByTagName(e)[0], id = "rw-js",
        l = d.location, ck = "Y" + t.getFullYear() + 
        "M" + t.getMonth() + "D" + t.getDate(), p = l.protocol,
        f = ((l.search.indexOf("DBG=") > -1) ? "" : ".min"),
        a = ("https:" == p ? "secure." + m + "js/" : "js." + m);
    if (d.getElementById(id)) return;              
    rw = d.createElement(e);
    rw.id = id; rw.async = true; rw.type = "text/javascript";
    rw.src = p + "//" + a + "external" + f + ".js?ck=" + ck;
    s.parentNode.insertBefore(rw, s);
    }(document, new Date(), "script", "rating-widget.com/"));