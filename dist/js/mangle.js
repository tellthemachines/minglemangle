function work(){var e=document.getElementById("txtOne").value,t=document.getElementById("txtTwo").value;if(""!=e||""!=t){e=e.replace(/<|>/g,""),t=t.replace(/<|>/g,"");var r;if(document.getElementById("sentence").checked)r=mingle(e,t);else if(document.getElementById("word").checked)r=mangle(e,t,!1);else{if(!document.getElementById("ecksWords").checked)return;r=mangle(e,t,!0)}displayIt(r)}}function mangle(e,t,r){var n=document.getElementById("randomise").checked;e=paragRepl(e,!1),e=lowerChar(e),e=noSpacesStart(e),t=paragRepl(t,!1),t=lowerChar(t),t=noSpacesStart(t),t=t.charAt(0).toLowerCase()+t.slice(1),n===!0&&(e=e.charAt(0).toLowerCase()+e.slice(1));var a=e.split(" "),c=t.split(" ");if(r===!0){var o=Math.round(document.getElementById("numWords").value);o=o>10?10:1>o?1:o,a=everyEcks(a,o),c=everyEcks(c,o)}var u=togetherIt(a,c);n===!0&&(u=shuffle(u),u[0]=noSpacesStart(u[0]),u[0]=u[0].charAt(0).toUpperCase()+u[0].slice(1));var l=u.join(" ");l=upperChar(l),l=noSpacesEnd(l);var s=l.split("(grarg) ");return prepParags(s)}function mingle(e,t){var r=document.getElementById("randomise").checked;e=paragRepl(e,!0),t=paragRepl(t,!0),e=highlightPunct(e),t=highlightPunct(t);var n=e.split("(puup)"),a=t.split("(puup)"),c=togetherIt(n,a);r===!0&&(c=shuffle(c),-1!==c[0].search(/\(grarg\)/)&&(c[0]=" "+c[0]));var o=c.join(" "),u=o.split(" (grarg)");return prepParags(u)}function displayIt(e){var t=document.getElementById("output");t.className="text-display",document.getElementById("ocontainer").className="ocontainer",document.getElementById("butblock").className+=" odd";for(var r=e.length,n="",a=0;r>a;a++)n+="<p>"+e[a]+"</p>";t.innerHTML=n}function paragRepl(e,t){return e=e.replace(/\s*\r*\n*[\r\n]/g,function(){return t===!0?" (grarg)":"(grarg) "})}function noSpacesStart(e){return" "===e[0]?(e=e.slice(1),noSpacesStart(e)):e}function noSpacesEnd(e){return" "===e[e.length-1]?(e=e.slice(0,-1),noSpacesEnd(e)):e}function punctParags(e){return"."!==e[e.length-1]&&"?"!==e[e.length-1]&&"!"!==e[e.length-1]&&(","===e[e.length-1]||";"===e[e.length-1]||":"===e[e.length-1]?e=e.slice(0,-1)+".":e+="."),e}function prepParags(e){for(var t=e.length,r=0;t>r;r++)if(/\S/.test(e[r]))e[r]=noSpacesStart(e[r]),e[r]=noSpacesEnd(e[r]),e[r]=punctParags(e[r]);else{{e.splice(r,1)}t--,r--}return e}function highlightPunct(e){return e.replace(/(\.|\?|\!)(\s)/g,function(e,t){return t+"(puup)"})}function lowerChar(e){return e.replace(/(\.\s|\?\s|\!\s|\(grarg\)\s)([A-Z])/g,function(e,t,r){return t+r.toLowerCase()})}function upperChar(e){return e.replace(/(\.\s|\?\s|\!\s|\(grarg\)\s)([a-z])/g,function(e,t,r){return t+r.toUpperCase()})}function everyEcks(e,t){for(var r=e.length,n="",a=[],c=0;r>c;c++)n+=e[c],c+1!==r&&c%t!==t-1?n+=" ":(c%t==t-1||c+1===r)&&(a.push(n),n="");return a}function shuffle(e){for(var t,r,n=e.length;0!==n;)r=Math.floor(Math.random()*n),n-=1,t=e[n],e[n]=e[r],e[r]=t;return e}function togetherIt(e,t){var r,n,a,c=e.length,o=t.length;c>o?(r=o,n=c-r,a=e):(r=c,n=o-r,a=t);for(var u=[],l=0;r>l;l++)u.push(e[l]),u.push(t[l]);for(var s=0;n>s;s++)u.push(a[r+s]);return u}var button=document.getElementById("butInput");button.onclick=work;