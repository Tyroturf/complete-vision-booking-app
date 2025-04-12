const APP_ID = import.meta.env.VITE_INTERCOM_APP_ID;

export const loadIntercom = () => {
  const storedUser = localStorage.getItem("user");
  const intercomSettings = { app_id: APP_ID };

  if (storedUser) {
    const { user_id, first_name, last_name, email } = JSON.parse(storedUser);
    intercomSettings.name = `${first_name} ${last_name}`;
    intercomSettings.email = email;
    intercomSettings.user_id = user_id;
  }

  window.intercomSettings = intercomSettings;

  (function () {
    var w = window;
    var ic = w.Intercom;
    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w.intercomSettings);
    } else {
      var d = document;
      var i = function () {
        i.c(arguments);
      };
      i.q = [];
      i.c = function (args) {
        i.q.push(args);
      };
      w.Intercom = i;
      var l = function () {
        var s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = `https://widget.intercom.io/widget/${APP_ID}`;
        var x = d.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === "complete") {
        l();
      } else if (w.attachEvent) {
        w.attachEvent("onload", l);
      } else {
        w.addEventListener("load", l, false);
      }
    }
  })();
};
