;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-search2" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M886.720915 793.185101 777.209756 683.684174c-10.07138-10.083659-26.412556-10.083659-36.492122 0l-2.949168 2.947122c0 0-54.103222-53.791114-55.537897-54.692646 42.85811-53.354162 68.520583-121.108289 68.520583-194.864106 0-171.993213-139.423423-311.413566-311.407426-311.413566-171.984003 0-311.406402 139.4224-311.406402 311.413566 0 171.97377 139.4224 311.406402 311.406402 311.406402 73.768097 0 141.53041-25.668613 194.883549-68.536956 0.902556 1.431605 54.689576 55.524594 54.689576 55.524594l-2.953262 2.951215c-10.07138 10.084683-10.07138 26.437116 0 36.506449l109.50502 109.503996c10.081613 10.083659 26.421766 10.083659 36.503379 0l54.750975-54.751998C896.795365 819.594587 896.795365 803.26569 886.720915 793.185101zM439.343725 628.522854c-105.736183 0-191.447287-85.712127-191.447287-191.44831 0-105.760742 85.711104-191.472869 191.447287-191.472869 105.748463 0 191.470823 85.712127 191.470823 191.472869C630.814548 542.809703 545.093211 628.522854 439.343725 628.522854z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-taobao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M152.576 353.12l-50.944 78.688 93.856 58.496s62.528 32.192 32.544 92.512C200.352 640 64 764.992 64 764.992l122.112 76.64c84.608-184.576 79.04-160 100.128-226.432 21.792-67.488 26.624-119.264-10.4-156.8-47.424-47.968-52.672-52.512-123.264-105.28z m66.784-29.632c44.384 0 80.352-32.384 80.352-72.32 0-40.192-35.968-72.672-80.352-72.672-44.736 0-80.448 32.512-80.448 72.672 0.032 39.968 35.712 72.32 80.448 72.32z m725.632 8.96s-26.688-207.744-478.24-79.136c19.488-33.824 28.544-55.68 28.544-55.68L382.56 165.696S337.024 315.328 255.776 384.96c0 0 78.72 45.76 77.92 44.448 22.528-22.688 42.848-45.824 60.096-68.192 18.144-8.064 35.488-15.424 52.352-22.368-21.056 37.888-54.464 94.56-88.288 130.432l47.424 41.888s32.48-31.424 67.84-69.184h40.288v69.824H356.224v55.872h157.184v133.696l-5.984-0.256c-17.312-0.864-44.224-3.744-54.944-20.576-12.704-20.576-3.264-57.984-2.72-81.248H341.152l-3.904 2.24s-39.84 179.424 114.688 175.488c144.576 3.936 227.488-40.736 267.296-71.488l15.84 59.488 89.152-37.632-60.32-148.576-72.416 22.688 13.344 50.816c-18.304 14.048-39.712 24.448-62.688 32.192V567.648H795.36v-55.872H642.144v-69.824h153.824v-55.808H522.464c19.712-24.192 35.168-46.496 39.264-60.32l-47.808-13.12c204.704-74.048 318.72-61.248 317.824 59.936v318.816s12.032 109.44-112.512 101.696l-67.456-14.56-15.712 64.448S926.912 926.976 950.72 701.6c23.808-225.28-5.728-369.152-5.728-369.152z" fill="#272636" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)