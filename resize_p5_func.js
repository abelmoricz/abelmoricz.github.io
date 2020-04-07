//ALL credit for this function goes to the author of the url below
//https://www.dyn-web.com/javascript/viewport/


function dw_getWindowDims() {
    var doc = document, w = window;
    var docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')?
            doc.documentElement: doc.body;
    
    var width = docEl.clientWidth;
    var height = docEl.clientHeight;
    
    // mobile zoomed in?
    if ( w.innerWidth && width > w.innerWidth ) {
        width = w.innerWidth;
        height = w.innerHeight;
    }
    
    return {width: width+4, height: height};
}