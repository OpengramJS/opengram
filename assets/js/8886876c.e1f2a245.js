(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[9310],{5162:(e,n,t)=>{"use strict";t.d(n,{Z:()=>o});var a=t(7294),s=t(6010);const r="tabItem_Ymn6";function o(e){let{children:n,hidden:t,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,s.Z)(r,o),hidden:t},n)}},4866:(e,n,t)=>{"use strict";t.d(n,{Z:()=>w});var a=t(7462),s=t(7294),r=t(6010),o=t(2466),l=t(6775),i=t(1980),m=t(7392),p=t(12);function u(e){return function(e){return s.Children.map(e,(e=>{if((0,s.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:s}}=e;return{value:n,label:t,attributes:a,default:s}}))}function d(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=n??u(t);return function(e){const n=(0,m.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function c(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function k(e){let{queryString:n=!1,groupId:t}=e;const a=(0,l.k6)(),r=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i._X)(r),(0,s.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(a.location.search);n.set(r,e),a.replace({...a.location,search:n.toString()})}),[r,a])]}function h(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,r=d(e),[o,l]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!c({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:r}))),[i,m]=k({queryString:t,groupId:a}),[u,h]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,r]=(0,p.Nk)(t);return[a,(0,s.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:a}),g=(()=>{const e=i??u;return c({value:e,tabValues:r})?e:null})();(0,s.useLayoutEffect)((()=>{g&&l(g)}),[g]);return{selectedValue:o,selectValue:(0,s.useCallback)((e=>{if(!c({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),m(e),h(e)}),[m,h,r]),tabValues:r}}var g=t(2389);const y="tabList__CuJ",b="tabItem_LNqP";function v(e){let{className:n,block:t,selectedValue:l,selectValue:i,tabValues:m}=e;const p=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),d=e=>{const n=e.currentTarget,t=p.indexOf(n),a=m[t].value;a!==l&&(u(n),i(a))},c=e=>{var n;let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}null==(n=t)||n.focus()};return s.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":t},n)},m.map((e=>{let{value:n,label:t,attributes:o}=e;return s.createElement("li",(0,a.Z)({role:"tab",tabIndex:l===n?0:-1,"aria-selected":l===n,key:n,ref:e=>p.push(e),onKeyDown:c,onClick:d},o,{className:(0,r.Z)("tabs__item",b,null==o?void 0:o.className,{"tabs__item--active":l===n})}),t??n)})))}function N(e){let{lazy:n,children:t,selectedValue:a}=e;if(t=Array.isArray(t)?t:[t],n){const e=t.find((e=>e.props.value===a));return e?(0,s.cloneElement)(e,{className:"margin-top--md"}):null}return s.createElement("div",{className:"margin-top--md"},t.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==a}))))}function f(e){const n=h(e);return s.createElement("div",{className:(0,r.Z)("tabs-container",y)},s.createElement(v,(0,a.Z)({},e,n)),s.createElement(N,(0,a.Z)({},e,n)))}function w(e){const n=(0,g.Z)();return s.createElement(f,(0,a.Z)({key:String(n)},e))}},8282:(e,n,t)=>{"use strict";t.d(n,{Z:()=>o});var a=t(7294),s=t(7623),r=t(2949);const o=e=>{let{chart:n}=e;const t=(0,a.useRef)(null),[o]=(0,a.useState)("mermaid-"+Math.random().toString(36).slice(4)),{colorMode:l}=(0,r.I)();return(0,a.useEffect)((()=>{s.Z.mermaidAPI.initialize({startOnLoad:!0,securityLevel:"loose",logLevel:5})})),(0,a.useEffect)((()=>{t.current&&""!==n&&s.Z.mermaidAPI.render(o,`%%{init: {'theme':'${"dark"===l?"dark":"neutral"}'}}%%`+n,(e=>{t.current.innerHTML=e}))}),[n,l]),a.createElement("div",{key:o,ref:t})}},235:(e,n,t)=>{"use strict";t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>m,default:()=>k,frontMatter:()=>i,metadata:()=>p,toc:()=>d});var a=t(7462),s=(t(7294),t(3905)),r=t(8282),o=t(4866),l=t(5162);const i={},m="\ud83d\udcbe Sessions",p={unversionedId:"plugins/sessions",id:"plugins/sessions",title:"\ud83d\udcbe Sessions",description:"What are sessions for?",source:"@site/docs/plugins/sessions.mdx",sourceDirName:"plugins",slug:"/plugins/sessions",permalink:"/docs/plugins/sessions",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/plugins/sessions.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\ud83c\udfde Media group",permalink:"/docs/plugins/media-group"},next:{title:"\ud83d\udcab Stage & Scenes",permalink:"/docs/plugins/stage"}},u={},d=[{value:"What are sessions for?",id:"what-are-sessions-for",level:2},{value:"Use case",id:"use-case",level:2},{value:"How session works",id:"how-session-works",level:2},{value:"Flowchart of sessions:",id:"flowchart-of-sessions",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Availbale getters / setters",id:"availbale-getters--setters",level:2},{value:"Custom session key generator",id:"custom-session-key-generator",level:2},{value:"Changing session property name",id:"changing-session-property-name",level:2},{value:"Session Time-to-live (TTL) / Timeouts",id:"session-time-to-live-ttl--timeouts",level:2},{value:"Multi sessions",id:"multi-sessions",level:2},{value:"Write your own store",id:"write-your-own-store",level:2},{value:"Use with external storage (with keyv)",id:"use-with-external-storage-with-keyv",level:2},{value:"Additional Information",id:"additional-information",level:2}],c={toc:d};function k(e){let{components:n,...t}=e;return(0,s.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"-sessions"},"\ud83d\udcbe Sessions"),(0,s.kt)("h2",{id:"what-are-sessions-for"},"What are sessions for?"),(0,s.kt)("p",null,"Because, ",(0,s.kt)("strong",{parentName:"p"},"bot only has access to the information of the currently incoming update (e.g. message)"),", i.e. the\ninformation that is available on the context object ",(0,s.kt)("inlineCode",{parentName:"p"},"ctx"),".\nConsequently, if you do want to access old data, you have to store it as soon as it arrives. This means that you must\nhave a data storage, such as a file, a database, or an in-memory storage."),(0,s.kt)("p",null,"Sessions are a simple ",(0,s.kt)("em",{parentName:"p"},"key \u2192 value")," storage for data that is needed temporarily and their loss, etc., will not affect\nthe bot's work in any way."),(0,s.kt)("p",null,"Sessions provide a simple interface for storing and retrieving data\nin handlers when it needs to be received and stored in handlers over a time interval greater than 1 update lifecycle."),(0,s.kt)("p",null,"In other words, sessions are used to store information about the current dialogue between the user and the bot. This\nallows the bot to remember the state of the conversation between requests, and respond to user requests contextually."),(0,s.kt)("p",null,"For example:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Intermediate handler's data on a time interval greater than the update lifecycle"),(0,s.kt)("li",{parentName:"ul"},"User input data (using scenes / etc.)"),(0,s.kt)("li",{parentName:"ul"},"Other things like storing user locale (for i18n)")),(0,s.kt)("h2",{id:"use-case"},"Use case"),(0,s.kt)("p",null,"It is a very common thing for bots to store some piece of ",(0,s.kt)("strong",{parentName:"p"},"data per chat"),". For example, let's say we want to build\na bot that counts the number of received times that a message in current chat for every user.\nWhen our bot receives a message, it has to remember how many times it saw the message in that chat before.\nSessions are a way to store data per chat."),(0,s.kt)("h2",{id:"how-session-works"},"How session works"),(0,s.kt)("p",null,"By default, sessions tied to chat identifier and user identifier from context (",(0,s.kt)("inlineCode",{parentName:"p"},"ctx"),") and store data as object where\nkey is ",(0,s.kt)("inlineCode",{parentName:"p"},"ctx.from.id")," + ",(0,s.kt)("inlineCode",{parentName:"p"},"ctx.chat.id")," with ",(0,s.kt)("inlineCode",{parentName:"p"},":")," delimiter and value - your session data."),(0,s.kt)("p",null,"Example of stored object:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n "user_id:chat_id": { "someProp": "my data" }\n "user_id1:chat_id1": { "someProp": "other data" }\n  ...\n}\n')),(0,s.kt)("h2",{id:"flowchart-of-sessions"},"Flowchart of sessions:"),(0,s.kt)("details",null,(0,s.kt)("summary",null,"Click to expand"),(0,s.kt)("center",null,(0,s.kt)(r.Z,{chart:'\nflowchart TB\nsubgraph load["\n  Load session data by key\n"]\n   loadSession["Session (<code>ctx.session</code>)"] <--\x3e db[(Store)]\nend\nsubgraph ttl[TTL]\n  C{Session expired?}\n  C --\x3e|Yes| D[Clear session, continue]\n  C --\x3e|No| E[All okay, continue]\nend\nsubgraph save["\n Save session data by key\n"]\n    saveSession["Session (<code>ctx.session</code>)"] --\x3e db1[(Store)]\nend\nhandle[Handle update from telegram] --\x3e\nupstream["\n  Upstream middlewares<br><small>Note: Here sessions\n  <b>not available</b></small>\n"] --\x3e\ngen["\n   Generate session key from context\n   <small>\n     Note: By default -\n     <code>ctx.from.id</code> and <code>ctx.chat.id</code>\n     with <code>:</code> delimiter\n   </small>\n"] --\x3e\nload --\x3e\nttl --\x3e\nmw[Middlewares like Stage, and other handlers<br><small>Note: Here sessions available</small>] --\x3e\nsave --\x3e upstreamAwait["Upstream middlewares which wait for <code>next()</code>"] --\x3e End\n',mdxType:"Mermaid"}))),(0,s.kt)("h2",{id:"configuration"},"Configuration"),(0,s.kt)("p",null,"Accepted fields:"),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Property"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"),(0,s.kt)("th",{parentName:"tr",align:null},"Required"),(0,s.kt)("th",{parentName:"tr",align:null},"Default value"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"getSessionKey")),(0,s.kt)("td",{parentName:"tr",align:null},"Session key generator function, accepts context, returns key string or ",(0,s.kt)("inlineCode",{parentName:"td"},"null")),(0,s.kt)("td",{parentName:"tr",align:null},"No"),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"(ctx) => ctx.from && ctx.chat && ctx.from.id + ':' + ctx.chat.id"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"ttl")),(0,s.kt)("td",{parentName:"tr",align:null},"Time-to-live in seconds"),(0,s.kt)("td",{parentName:"tr",align:null},"No"),(0,s.kt)("td",{parentName:"tr",align:null},"-")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"property")),(0,s.kt)("td",{parentName:"tr",align:null},"Session property name for context"),(0,s.kt)("td",{parentName:"tr",align:null},"No"),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"session "))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"store")),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"},"Map")," compatible storage for storing session data. Can be handwritten storage / ",(0,s.kt)("a",{parentName:"td",href:"https://www.npmjs.com/package/keyv"},"keyv")," / native ",(0,s.kt)("inlineCode",{parentName:"td"},"Map")),(0,s.kt)("td",{parentName:"tr",align:null},"No"),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"new Map()"))))),(0,s.kt)("h2",{id:"availbale-getters--setters"},"Availbale getters / setters"),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Property"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"),(0,s.kt)("th",{parentName:"tr",align:null},"Type"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"store")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns current store"),(0,s.kt)("td",{parentName:"tr",align:null},"Getter")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"ttl")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns current TTL"),(0,s.kt)("td",{parentName:"tr",align:null},"Getter")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"ttl")),(0,s.kt)("td",{parentName:"tr",align:null},"Sets a new TTL for sessions"),(0,s.kt)("td",{parentName:"tr",align:null},"Setter")))),(0,s.kt)("h2",{id:"custom-session-key-generator"},"Custom session key generator"),(0,s.kt)("p",null,"You can write own key generator and pass into session middleware factory function."),(0,s.kt)("p",null,"For example, default session key generator doesn't support inline query, because inline queries doesn't have\n",(0,s.kt)("inlineCode",{parentName:"p"},"ctx.chat")," property, this means not accessible in inline queries by default, let's fix that for inline queries\nin bot direct messages (when chat type = sender)"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"bot.use(\n  session({\n    getSessionKey: (ctx) => {\n      // This same as in default session key generator\n      if (ctx.from?.id && ctx.chat?.id) {\n        return `${ctx.from.id}:${ctx.chat.id}`\n      }\n\n      // If inline mode called from bot direct messages, use same session key as used in \"private\"\n      if (ctx.inlineQuery?.chat_type === 'sender') {\n        return `${ctx.from.id}:${ctx.from.id}`\n      }\n\n      return null // Return null for other cases (for other - session not available)\n    }\n  })\n)\n")),(0,s.kt)("p",null,"Other examples of session storage for chat id and user id"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"{5-7} showLineNumbers","{5-7}":!0,showLineNumbers:!0},"bot.use(\n  session({\n    // Stores data per user.\n    getSessionKey: (ctx) => {\n      if (ctx.from?.id) {\n        return `${ctx.from.id}`\n      }\n\n      return null // Return null for other cases (for other - session not available)\n    }\n  })\n)\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"{5-7} showLineNumbers","{5-7}":!0,showLineNumbers:!0},"bot.use(\n  session({\n    // Stores data per chat\n    getSessionKey: (ctx) => {\n      if (ctx.chat?.id) {\n        return `${ctx.chat.id}`\n      }\n\n      return null // Return null for other cases (for other - session not available)\n    }\n  })\n)\n")),(0,s.kt)("h2",{id:"changing-session-property-name"},"Changing session property name"),(0,s.kt)("admonition",{type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"If you want to use a session with ",(0,s.kt)("inlineCode",{parentName:"p"},"Stage"),", you need to specify a new name of the session property in its settings, as the default is ",(0,s.kt)("inlineCode",{parentName:"p"},"ctx.session"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"{3,8} showLineNumbers","{3,8}":!0,showLineNumbers:!0},"bot.use(\n  session({\n    property: 'mySessionProp'\n  })\n)\n\nbot.on('message', ctx => {\n  ctx.mySessionProp // Session available in mySessionProp\n})\n")),(0,s.kt)("h2",{id:"session-time-to-live-ttl--timeouts"},"Session Time-to-live (TTL) / Timeouts"),(0,s.kt)("p",null,"You can define TTL for session. With the TTL set, the content of the session will be destroyed after it expires"),(0,s.kt)("admonition",{type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"When the session expires, data about the current scene and so on will also be deleted (the user will no longer be in the scene)")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"{3} showLineNumbers","{3}":!0,showLineNumbers:!0},"bot.use(\n  session({\n    ttl: 60 // 60 seconds\n  })\n)\n")),(0,s.kt)("h2",{id:"multi-sessions"},"Multi sessions"),(0,s.kt)("p",null,"You can create separated sessions with different session keys, just create two session middlewares with different key\ngenerator and/or property names:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"// Default session for chat id + user id\nbot.use(session())\n\n// Session stored per chat, same for all chat users\nbot.use(\n  session({\n    property: 'chatSession',\n    // Stores data per chat\n    getSessionKey: (ctx) => {\n      if (ctx.chat?.id) {\n        return `${ctx.chat.id}`\n      }\n\n      return null // Return null for other cases (for other - session not available)\n    }\n  })\n)\n\nbot.on('message', ctx => {\n  ctx.session // Default session for chat id + user id\n  ctx.chatSession // Session per chat\n})\n")),(0,s.kt)("h2",{id:"write-your-own-store"},"Write your own store"),(0,s.kt)("p",null,"You can write your own store, just make it compatible with the\n",(0,s.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys"},"Map API"),".\nAt the moment, at least the implementation of these methods is required -\n",(0,s.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get"},(0,s.kt)("inlineCode",{parentName:"a"},"get")),",\n",(0,s.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set"},(0,s.kt)("inlineCode",{parentName:"a"},"set")),".\nMethods can be either asynchronous (returning a\n",(0,s.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise"},"Promise"),"\n) or synchronous"),(0,s.kt)("h2",{id:"use-with-external-storage-with-keyv"},"Use with external storage (with keyv)"),(0,s.kt)(o.Z,{defaultValue:"mongodb",values:[{label:"MongoDB",value:"mongodb"},{label:"SQLite",value:"sqlite"},{label:"MySQL",value:"mysql"},{label:"Redis",value:"redis"},{label:"PostgreSQL",value:"postgreSQL"},{label:"Etcd",value:"etcd"},{label:"Memcache",value:"memcache"},{label:"File system",value:"file"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"mongodb",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv @keyv/mongo\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv @keyv/mongo\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv @keyv/mongo\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\nconst sessionsStore = new Keyv('mongodb://user:pass@localhost:27017/dbname', { namespace: 'sessions' });\n\n// Handle connection errors\nsessionsStore.on('error', err => console.log('Connection Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n"))),(0,s.kt)(l.Z,{value:"sqlite",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv @keyv/sqlite\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv @keyv/sqlite\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv @keyv/sqlite\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\nconst sessionsStore = new Keyv('sqlite://path/to/database.sqlite', { namespace: 'sessions' });\n\n// Handle connection errors\nsessionsStore.on('error', err => console.log('Connection Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n"))),(0,s.kt)(l.Z,{value:"mysql",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv @keyv/mysql\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv @keyv/mysql\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv @keyv/mysql\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\nconst sessionsStore = new Keyv('mysql://user:pass@localhost:3306/dbname', { namespace: 'sessions' });\n\n// Handle connection errors\nsessionsStore.on('error', err => console.log('Connection Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n"))),(0,s.kt)(l.Z,{value:"redis",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv @keyv/redis\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv @keyv/redis\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv @keyv/redis\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\nconst sessionsStore = new Keyv('redis://user:pass@localhost:6379', { namespace: 'sessions' });\n\n// Handle connection errors\nsessionsStore.on('error', err => console.log('Connection Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n"))),(0,s.kt)(l.Z,{value:"postgreSQL",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"  Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv @keyv/postgres\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv @keyv/postgres\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv @keyv/postgres\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\nconst sessionsStore = new Keyv('postgresql://user:pass@localhost:5432/dbname', { namespace: 'sessions' });\n\n// Handle connection errors\nsessionsStore.on('error', err => console.log('Connection Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n"))),(0,s.kt)(l.Z,{value:"etcd",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv @keyv/etcd\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv @keyv/etcd\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv @keyv/etcd\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\nconst sessionsStore = new Keyv('etcd://localhost:2379', { namespace: 'sessions' });\n\n// Handle connection errors\nsessionsStore.on('error', err => console.log('Connection Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n"))),(0,s.kt)(l.Z,{value:"memcache",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv @keyv/memcache\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv @keyv/memcache\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv @keyv/memcache\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\nconst KeyvMemcache = require('@keyv/memcache');\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\n\nconst memcache = new KeyvMemcache('user:pass@localhost:11211');\nconst sessionsStore = new Keyv({ store: memcache });\n\n// Handle connection errors\nsessionsStore.on('error', err => console.log('Connection Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n"))),(0,s.kt)(l.Z,{value:"file",mdxType:"TabItem"},(0,s.kt)("admonition",{type:"note"},(0,s.kt)("p",{parentName:"admonition"},"Before use, install the following dependencies:"),(0,s.kt)(o.Z,{defaultValue:"npm",values:[{label:"NPM",value:"npm"},{label:"Yarn",value:"yarn"},{label:"pnpm",value:"pnpm"}],mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm install keyv keyv-file\n")),"  "),(0,s.kt)(l.Z,{value:"yarn",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add keyv keyv-file\n")),"  "),(0,s.kt)(l.Z,{value:"pnpm",mdxType:"TabItem"},(0,s.kt)("pre",{parentName:"admonition"},(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add keyv keyv-file\n")),"  "))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const { Opengram, session } = require('opengram')\nconst Keyv = require('keyv');\nconst { KeyvFile } = require('keyv-file')\n\nconst bot = new Opengram(process.env.BOT_TOKEN)\n\nconst fileStore = new KeyvFile({\n  filename: `./sessions.json`,\n  writeDelay: 100\n})\n\nconst sessionsStore = new Keyv({ store: fileStore });\n\n// Handle errors\nsessionsStore.on('error', err => console.log('Error', err));\n\nbot.use(\n  session({\n    store: sessionsStore\n  })\n)\n\n// ...\n")))),(0,s.kt)("h2",{id:"additional-information"},"Additional Information"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Source:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/OpengramJS/opengram/blob/master/src/session.js"},"https://github.com/OpengramJS/opengram/blob/master/src/session.js")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Keyv:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/jaredwray/keyv/tree/main/packages/keyv"},"https://github.com/jaredwray/keyv/tree/main/packages/keyv")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Memcache adapter:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/jaredwray/keyv/tree/main/packages/memcache"},"https://github.com/jaredwray/keyv/tree/main/packages/memcache")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Mongo adapter:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/jaredwray/keyv/tree/main/packages/mongo"},"https://github.com/jaredwray/keyv/tree/main/packages/mongo")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Mysql adapter:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/jaredwray/keyv/tree/main/packages/mysql"},"https://github.com/jaredwray/keyv/tree/main/packages/mysql")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Postgres adapter:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/jaredwray/keyv/tree/main/packages/postgres"},"https://github.com/jaredwray/keyv/tree/main/packages/postgres")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Redis adapter:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/jaredwray/keyv/tree/main/packages/redis"},"https://github.com/jaredwray/keyv/tree/main/packages/redis")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Sqlite adapter:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/jaredwray/keyv/tree/main/packages/sqlite"},"https://github.com/jaredwray/keyv/tree/main/packages/sqlite")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Keyv-file adapter:")," ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/zaaack/keyv-file"},"https://github.com/zaaack/keyv-file"))))}k.isMDXComponent=!0},1748:(e,n,t)=>{var a={"./locale":9234,"./locale.js":9234};function s(e){var n=r(e);return t(n)}function r(e){if(!t.o(a,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=r,e.exports=s,s.id=1748}}]);