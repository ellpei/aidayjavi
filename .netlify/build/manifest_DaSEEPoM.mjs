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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/louloup/github/personal/aidayjavi/","cacheDir":"file:///Users/louloup/github/personal/aidayjavi/node_modules/.astro/","outDir":"file:///Users/louloup/github/personal/aidayjavi/dist/","srcDir":"file:///Users/louloup/github/personal/aidayjavi/src/","publicDir":"file:///Users/louloup/github/personal/aidayjavi/public/","buildClientDir":"file:///Users/louloup/github/personal/aidayjavi/dist/","buildServerDir":"file:///Users/louloup/github/personal/aidayjavi/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-rsvp","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-rsvp\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-rsvp","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-rsvp.ts","pathname":"/api/submit-rsvp","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Bxyk00n1.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/louloup/github/personal/aidayjavi/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/submit-rsvp@_@ts":"pages/api/submit-rsvp.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DaSEEPoM.mjs","/Users/louloup/github/personal/aidayjavi/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/louloup/github/personal/aidayjavi/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DdQe6vJt.mjs","/Users/louloup/github/personal/aidayjavi/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CMszvMFC.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/louloup/github/personal/aidayjavi/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const r=document.querySelectorAll(\".hero-image\"),c=document.querySelectorAll(\".dot\");let h=0,s,i=!1;function p(e){r.forEach(t=>t.classList.remove(\"active\")),c.forEach(t=>t.classList.remove(\"active\")),r[e]&&c[e]&&(r[e].classList.add(\"active\"),c[e].classList.add(\"active\"),h=e)}function S(){if(!i){const e=(h+1)%r.length;p(e)}}function u(){s&&clearInterval(s),s=setInterval(S,5e3)}function b(){s&&(clearInterval(s),s=null)}c.forEach((e,t)=>{e.addEventListener(\"click\",()=>{p(t),i||u()})});const m=document.querySelector(\".slideshow-container\");m&&(m.addEventListener(\"mouseenter\",()=>{i=!0,b()}),m.addEventListener(\"mouseleave\",()=>{i=!1,u()})),setTimeout(u,1e3);const g=document.getElementById(\"attending-yes\"),L=document.getElementById(\"attending-no\"),l=document.getElementById(\"attending-yes-questions\"),d=document.getElementById(\"attending-no-questions\");function E(){g.checked?(l.classList.add(\"show\"),d.classList.remove(\"show\")):L.checked?(l.classList.remove(\"show\"),d.classList.add(\"show\")):(l.classList.remove(\"show\"),d.classList.remove(\"show\"))}g.addEventListener(\"change\",E),L.addEventListener(\"change\",E);const v=document.getElementById(\"rsvpForm\");v.addEventListener(\"submit\",async function(e){e.preventDefault();const t=new FormData(v),n=Object.fromEntries(t);if(!n.name||!n.email||!n.attending){alert(\"Por favor, completa todos los campos obligatorios.\");return}try{const o=await fetch(\"/api/submit-rsvp\",{method:\"POST\",body:JSON.stringify(n),headers:{\"Content-Type\":\"application/json\"}}),f=await o.json();if(!o.ok)throw new Error(f.error||\"Error al enviar los datos\");let a=\"¡Gracias por tu confirmación! \";n.attending===\"yes\"?(a+=\"Estamos emocionados de celebrar contigo\",n[\"plus-one-name\"]&&(a+=` y con ${n[\"plus-one-name\"]}`),a+=\". \"):a+=\"Sentimos que no puedas acompañarnos, pero sabemos que estarás con nosotros en espíritu. \",a+=\"Nos pondremos en contacto pronto.\",alert(a),v.reset(),l.classList.remove(\"show\"),d.classList.remove(\"show\")}catch(o){console.error(\"Error:\",o),alert(\"Lo siento, ha ocurrido un error al enviar tu confirmación. Por favor, inténtalo de nuevo más tarde.\")}}),document.querySelectorAll(\".nav-menu a\").forEach(e=>{e.addEventListener(\"click\",function(t){t.preventDefault();const n=this.getAttribute(\"href\"),o=document.querySelector(n);if(o){const f=o.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:f,behavior:\"smooth\"})}})}),document.querySelectorAll(\".read-more-btn\").forEach(e=>{e.addEventListener(\"click\",function(){const t=this.previousElementSibling;t.classList.toggle(\"expanded\"),this.textContent=t.classList.contains(\"expanded\")?\"Leer menos\":\"Leer más\"})});const y=document.querySelector('input[name=\"plus-one\"][value=\"yes\"]'),q=document.querySelector('input[name=\"plus-one\"][value=\"no\"]'),I=document.getElementById(\"plus-one-name-group\");function w(){I.style.display=y.checked?\"block\":\"none\"}y.addEventListener(\"change\",w),q.addEventListener(\"change\",w)});"]],"assets":["/_astro/index.Bxyk00n1.css","/09223095-167a-4429-b712-81a5ead5ac48.JPG","/0fc0ed37-e841-47ce-aa20-bd6b9e1393a7.JPG","/5b3be316-73fc-4168-bad5-e7cee115358a.JPG","/753899c3-1e31-414e-81b5-905db152ad5f.JPG","/ae89d35d-2ed8-4563-9759-fecb50ccd151.JPG","/champagne.png","/champagne_beach.png","/dresscode.png","/favicon.svg","/flowers.png","/las-teresitas.jpg","/lemon-strelitzia.png","/lemon.png","/papas.webp","/senderismo-teide.png","/strelitzia.png","/teide-amanecer.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"QaKeIBNqRVUSnkV1LMrkNMu0n6z6G912U9uZZuyL8co=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/louloup/github/personal/aidayjavi/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
