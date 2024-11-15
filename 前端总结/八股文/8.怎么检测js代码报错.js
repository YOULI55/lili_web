window.οnerrοr = function (sMsg, sUrl, sLine) {
    oErrorLog.innerHTML = "<b>An error was thrown and caught.</b><p>";
    oErrorLog.innerHTML += "Error: " + sMsg + "<br>";
    oErrorLog.innerHTML += "Line: " + sLine + "<br>";
    oErrorLog.innerHTML += "URL: " + sUrl + "<br>";
    return false;
}
