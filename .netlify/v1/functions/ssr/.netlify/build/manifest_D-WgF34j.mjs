import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_D71txMbz.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/louloup/github/personal/aidayjavi/","cacheDir":"file:///Users/louloup/github/personal/aidayjavi/node_modules/.astro/","outDir":"file:///Users/louloup/github/personal/aidayjavi/dist/","srcDir":"file:///Users/louloup/github/personal/aidayjavi/src/","publicDir":"file:///Users/louloup/github/personal/aidayjavi/public/","buildClientDir":"file:///Users/louloup/github/personal/aidayjavi/dist/","buildServerDir":"file:///Users/louloup/github/personal/aidayjavi/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-rsvp","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-rsvp\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-rsvp","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-rsvp.ts","pathname":"/api/submit-rsvp","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CE6zsvGe.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/louloup/github/personal/aidayjavi/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/submit-rsvp@_@ts":"pages/api/submit-rsvp.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D-WgF34j.mjs","/Users/louloup/github/personal/aidayjavi/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/louloup/github/personal/aidayjavi/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DdQe6vJt.mjs","/Users/louloup/github/personal/aidayjavi/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CGohRvoH.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/louloup/github/personal/aidayjavi/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const i=document.querySelectorAll(\".hero-image\"),l=document.querySelectorAll(\".dot\");let h=0,a,c=!1;function y(t){i.forEach(o=>o.classList.remove(\"active\")),l.forEach(o=>o.classList.remove(\"active\")),i[t]&&l[t]&&(i[t].classList.add(\"active\"),l[t].classList.add(\"active\"),h=t)}function q(){if(!c){const t=(h+1)%i.length;y(t)}}function p(){a&&clearInterval(a),a=setInterval(q,5e3)}function B(){a&&(clearInterval(a),a=null)}l.forEach((t,o)=>{t.addEventListener(\"click\",()=>{y(o),c||p()})});const f=document.querySelector(\".slideshow-container\");f&&(f.addEventListener(\"mouseenter\",()=>{c=!0,B()}),f.addEventListener(\"mouseleave\",()=>{c=!1,p()})),setTimeout(p,1e3);const L=document.getElementById(\"attending-yes\"),E=document.getElementById(\"attending-no\"),d=document.getElementById(\"attending-yes-questions\"),u=document.getElementById(\"attending-no-questions\");function b(){L.checked?(d.classList.add(\"show\"),u.classList.remove(\"show\")):E.checked?(d.classList.remove(\"show\"),u.classList.add(\"show\")):(d.classList.remove(\"show\"),u.classList.remove(\"show\"))}L.addEventListener(\"change\",b),E.addEventListener(\"change\",b);const O=document.cookie.split(\";\").some(t=>t.trim().startsWith(\"rsvp_submitted=\")),w=document.getElementById(\"form-content\"),S=document.getElementById(\"already-submitted\");O&&(w.style.display=\"none\",S.style.display=\"block\");const m=document.getElementById(\"rsvpForm\"),n=m.querySelector(\".rsvp-button\");m.addEventListener(\"submit\",async function(t){t.preventDefault(),n.disabled=!0,n.classList.add(\"loading\");const o=new FormData(m),e=Object.fromEntries(o);if(!e.name||!e.email||!e.attending){alert(\"Por favor, completa todos los campos obligatorios.\"),n.disabled=!1,n.classList.remove(\"loading\");return}if(e.attending===\"yes\"){if(!e[\"plus-one\"]||!e.transport||!e[\"teide-activity\"]||!e[\"guided-tour\"]||!e.guachinche||!e.preboda){alert(\"Por favor, responde todas las preguntas obligatorias.\"),n.disabled=!1,n.classList.remove(\"loading\");return}if(e[\"plus-one\"]===\"yes\"&&!e[\"plus-one-name\"]){alert(\"Por favor, indica el nombre de tu acompañante.\"),n.disabled=!1,n.classList.remove(\"loading\");return}}try{const s=await fetch(\"/api/submit-rsvp\",{method:\"POST\",body:JSON.stringify(e),headers:{\"Content-Type\":\"application/json\"}}),v=await s.json();if(!s.ok)throw new Error(v.error||\"Error al enviar los datos\");const g=new Date;g.setFullYear(g.getFullYear()+1),document.cookie=`rsvp_submitted=true; expires=${g.toUTCString()}; path=/`;let r=\"¡Gracias por tu confirmación! \";e.attending===\"yes\"?(r+=\"Estamos emocionados de celebrar contigo\",e[\"plus-one-name\"]&&(r+=` y con ${e[\"plus-one-name\"]}`),r+=\". \"):r+=\"Sentimos que no puedas acompañarnos, pero sabemos que estarás con nosotros en espíritu. \",r+=\"Nos pondremos en contacto pronto.\",alert(r),m.reset(),d.classList.remove(\"show\"),u.classList.remove(\"show\"),w.style.display=\"none\",S.style.display=\"block\"}catch(s){console.error(\"Error:\",s),alert(\"Lo siento, ha ocurrido un error al enviar tu confirmación. Por favor, inténtalo de nuevo más tarde.\")}finally{n.disabled=!1,n.classList.remove(\"loading\")}}),document.querySelectorAll(\".nav-menu a\").forEach(t=>{t.addEventListener(\"click\",function(o){o.preventDefault();const e=this.getAttribute(\"href\"),s=document.querySelector(e);if(s){const v=s.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:v,behavior:\"smooth\"})}})}),document.querySelectorAll(\".read-more-btn\").forEach(t=>{t.addEventListener(\"click\",function(){const o=this.previousElementSibling;o.classList.toggle(\"expanded\"),this.textContent=o.classList.contains(\"expanded\")?\"Leer menos\":\"Leer más\"})});const k=document.querySelector('input[name=\"plus-one\"][value=\"yes\"]'),C=document.querySelector('input[name=\"plus-one\"][value=\"no\"]'),D=document.getElementById(\"plus-one-name-group\");function I(){D.style.display=k.checked?\"block\":\"none\"}k.addEventListener(\"change\",I),C.addEventListener(\"change\",I)});"]],"assets":["/_astro/index.CE6zsvGe.css","/09223095-167a-4429-b712-81a5ead5ac48.JPG","/0fc0ed37-e841-47ce-aa20-bd6b9e1393a7.JPG","/5b3be316-73fc-4168-bad5-e7cee115358a.JPG","/753899c3-1e31-414e-81b5-905db152ad5f.JPG","/ae89d35d-2ed8-4563-9759-fecb50ccd151.JPG","/champagne.png","/champagne_beach.png","/dresscode.png","/favicon.svg","/flowers.png","/las-teresitas.jpg","/lemon-strelitzia.png","/lemon.png","/papas.webp","/senderismo-teide.png","/strelitzia.png","/teide-amanecer.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"/DCLiF7Y/hL/u8FQPIOkRSwI4ggYJWfXHnyIBuRa1FI=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/louloup/github/personal/aidayjavi/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
