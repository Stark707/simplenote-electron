(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1119:function(e,t,n){"use strict";n.r(t),n.d(t,"NoteList",(function(){return B}));var o=n(0),r=n.n(o),a=n(1094);function i(){return r.a.createElement("svg",{className:"icon-feed",xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M2,8.667V12c5.515,0,10,4.485,10,10h3.333C15.333,14.637,9.363,8.667,2,8.667z M2,2v3.333 c9.19,0,16.667,7.477,16.667,16.667H22C22,10.955,13.045,2,2,2z M4.5,17C3.118,17,2,18.12,2,19.5S3.118,22,4.5,22S7,20.88,7,19.5 S5.882,17,4.5,17z"}))}var s,c,l=n(8),u=n.n(l),p=n(3),d=n(117),h=n(180),f=n(10),m=n(301),g=new Map,y=(s=function(e){return e.data.content},c=m.a,function(e){var t=g.get(e.id),n=s(e);if(void 0===t||n!==t.key){var o={key:n,value:c(e)};g.set(e.id,o),t=o}return t.value}),v=n(786),b=n.n(v),w=n(340),N=n(203),E=n(177),x=function(e,t){return e.reduce((function(e,t){var n=t.filter,o=t.replacer,r="string"==typeof n&&Object(N.d)(n),a=r&&r.length>0?new RegExp(Object(p.escapeRegExp)(r),"gi"):n;return b()(e,a,o)}),t).map((function(e,t){return e&&"string"!=typeof e?r.a.cloneElement(e,{key:t}):e}))},S={filter:E.b,replacer:function(e){var t=/x/i.test(e);return r.a.createElement(w.a,{checked:t})}},k=function(e){return{filter:e,replacer:function(e){if(e.length)return r.a.createElement("span",{className:"search-match"},e)}}},O=n(404),j=n(169);function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=_(e);if(t){var r=_(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return T(this,n)}}function T(e,t){return!t||"object"!==I(t)&&"function"!=typeof t?R(e):t}function R(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e){return function(e){if(Array.isArray(e))return M(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return M(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function F(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?F(Object(n),!0).forEach((function(t){H(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function H(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var K=new a.c({defaultHeight:135,fixedWidth:!0}),B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(l,e);var t,n,s,c=L(l);function l(){var e;P(this,l);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return H(R(e=c.call.apply(c,[this].concat(n))),"state",{selectedIndex:null}),H(R(e),"list",Object(o.createRef)()),H(R(e),"handleShortcut",(function(t){if(e.props.keyboardShortcuts){var n,o,r=t.ctrlKey,a=t.code,i=t.metaKey,s=t.shiftKey,c=e.props,l=c.isSmallScreen,u=c.notes,p=c.showNoteList,d=e.state.selectedIndex,h=e.getHighlightedIndex(e.props),f=r||i;return f&&s&&"KeyK"===a?(-1===h||d<0||!(null===(n=u[d-1])||void 0===n?void 0:n.id)||(e.props.onSelectNote(u[d-1]),t.stopPropagation(),t.preventDefault()),!1):f&&s&&"KeyJ"===a?(-1===h||d>=u.length||!(null===(o=u[d+1])||void 0===o?void 0:o.id)||(e.props.onSelectNote(u[d+1]),t.stopPropagation(),t.preventDefault()),!1):l&&f&&s&&"KeyL"===a?(e.props.toggleNoteList(),t.stopPropagation(),t.preventDefault(),!1):!l||!p||"Enter"!==a||null===h||(e.props.openNote(u[h]),t.stopPropagation(),t.preventDefault(),!1)}})),H(R(e),"toggleShortcuts",(function(t){t?window.addEventListener("keydown",e.handleShortcut,!0):window.removeEventListener("keydown",e.handleShortcut,!0)})),H(R(e),"getHighlightedIndex",(function(t){var n,o=t.notes,r=t.selectedNote,a=e.state.selectedIndex;if(0===o.length)return null;if(!r&&!a){var i=o.findIndex((function(e){return null==e?void 0:e.id}));return i>-1?i:null}if(r&&r.id===(null===(n=o[a])||void 0===n?void 0:n.id))return a;var s=o.findIndex((function(e){return(null==e?void 0:e.id)===(null==r?void 0:r.id)}));return r&&s>-1?s:r?Math.min(a,o.length-1):a})),e}return t=l,(n=[{key:"componentDidMount",value:function(){this.toggleShortcuts(!0)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t,n,o=e.notes,r=e.noteDisplay,a=e.openedTag,i=e.selectedNote,s=e.selectedNoteContent,c=e.showNoteList,l=e.showTrash,u=e.tagResultsFound,p=this.state.selectedIndex;if(r===this.props.noteDisplay&&o===this.props.notes&&u===this.props.tagResultsFound&&s===this.props.selectedNoteContent&&c===this.props.showNoteList||K.clearAll(),a!==this.props.openedTag||l!==this.props.showTrash){var d=o.length>0;return this.setState({selectedIndex:d?0:null}),void this.props.onSelectNote(d?o[0]:null)}if(0===o.length&&i&&(this.props.closeNote(),this.setState({selectedIndex:null})),!p||!i||(null===(t=o[p])||void 0===t?void 0:t.id)!==i.id||l!==this.props.showTrash||a!==this.props.openedTag){var h=this.getHighlightedIndex(e);if(null===h)return this.setState({selectedIndex:null});!o.length||i&&i.id===(null===(n=o[h])||void 0===n?void 0:n.id)||this.props.onSelectNote(o[Math.max(0,Math.min(o.length-1,h))]),this.setState({selectedIndex:h})}}},{key:"componentDidUpdate",value:function(e){e.noteDisplay===this.props.noteDisplay&&e.notes===this.props.notes&&e.tagResultsFound===this.props.tagResultsFound&&e.selectedNoteContent===this.props.selectedNoteContent&&e.showNoteList===this.props.showNoteList||K.clearAll()}},{key:"componentWillUnmount",value:function(){this.toggleShortcuts(!1)}},{key:"render",value:function(){var e=this,t=this.props,n=t.hasLoaded,s=t.noteDisplay,c=t.notes,l=t.openNote,p=t.onEmptyTrash,d=t.onPinNote,h=t.searchQuery,f=t.showTrash,m=t.tagResultsFound,g=this.state.selectedIndex,v=function(e,t,n){return 0===t.length||0===n?e:["tag-suggestions","notes-header"].concat(A(e.length>0?e:["no-notes"]))}(c,h,m),b=v.length-c.length,w=null!==g?g+b:null,E=function(e,t){var n=t.searchQuery,o=t.noteDisplay,s=t.highlightedIndex,c=t.onPinNote,l=t.openNote;return function(t){var p=t.index,d=t.key,h=t.parent,f=t.style,m=e[p];if("no-notes"===m)return r.a.createElement("div",{className:"note-list is-empty",style:z(z({},f),{},{height:200})},r.a.createElement("span",{className:"note-list-placeholder"},"No Notes"));if("tag-suggestions"===m||"notes-header"===m)return r.a.createElement(a.b,{cache:K,columnIndex:0,key:d,parent:h,rowIndex:p},"tag-suggestions"===m?r.a.createElement(O.a,null):r.a.createElement("div",{className:"note-list-header"},"Notes"));var g=y(m),v=g.title,b=g.preview,w=m.data.systemTags.includes("pinned"),E=!!m.data.publishURL,j=u()("note-list-item",{"note-list-item-selected":s===p,"note-list-item-pinned":w,"published-note":E}),I=Object(N.b)(n).map(k),P=[S].concat(A(I));return r.a.createElement(a.b,{cache:K,columnIndex:0,key:d,parent:h,rowIndex:p},r.a.createElement("div",{style:f,className:j},r.a.createElement("div",{className:"note-list-item-pinner",tabIndex:0,onClick:function(){return c(m,!w)}}),r.a.createElement("div",{className:"note-list-item-text theme-color-border",tabIndex:0,onClick:function(){return l(m)}},r.a.createElement("div",{className:"note-list-item-title"},r.a.createElement("span",null,x(P,v)),E&&r.a.createElement("div",{className:"note-list-item-published-icon"},r.a.createElement(i,null))),"condensed"!==o&&b.trim()&&r.a.createElement("div",{className:"note-list-item-excerpt"},x(P,b)))))}}(v,{searchQuery:h,highlightedIndex:w,noteDisplay:s,onPinNote:d,openNote:l}),j=0===v.length,I=r.a.createElement("div",{className:"note-list-empty-trash theme-color-border"},r.a.createElement("button",{type:"button",className:"button button-borderless button-danger",onClick:p},"Empty Trash"));return r.a.createElement("div",{className:u()("note-list",{"is-empty":j})},j?r.a.createElement("span",{className:"note-list-placeholder"},n?"No Notes":"Loading Notes"):r.a.createElement(o.Fragment,null,r.a.createElement("div",{className:"note-list-items ".concat(s)},r.a.createElement(a.a,null,(function(t){var n=t.height,o=t.width;return r.a.createElement(a.d,{ref:e.list,estimatedRowSize:126,height:n,noteDisplay:s,notes:v,rowCount:v.length,rowHeight:K.rowHeight,rowRenderer:E,scrollToIndex:w,width:o})}))),f&&I))}}])&&D(t.prototype,n),s&&D(t,s),l}(o.Component);H(B,"displayName","NoteList");var Q=h.a.actionCreators.emptyTrash;t.default=Object(d.b)((function(e){var t=e.appState,n=e.ui,o=n.filteredNotes,r=n.note,a=n.openedTag,i=n.searchQuery,s=n.showNoteList,c=n.showTrash,l=n.tagSuggestions,u=e.settings,d=u.keyboardShortcuts,h=u.noteDisplay,f=r&&y(r).preview;return{hasLoaded:null!==t.notes,keyboardShortcuts:d,noteDisplay:h,notes:o,openedTag:a,searchQuery:i,selectedNote:r,selectedNotePreview:f,selectedNoteContent:Object(p.get)(r,"data.content"),showNoteList:s,showTrash:c,tagResultsFound:l.length}}),(function(e,t){var n=t.noteBucket;return{closeNote:function(){return e(j.a.ui.closeNote())},onEmptyTrash:function(){return e(Q({noteBucket:n}))},onSelectNote:function(t){e(j.a.ui.selectNote(t)),f.a.tracks.recordEvent("list_note_opened")},onPinNote:function(t,n){return e(j.a.ui.pinNote(t,n))},openNote:function(t){return e(j.a.ui.openNote(t))},toggleNoteList:function(){return e(j.a.ui.toggleNoteList())}}}))(B)},177:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a}));var o={taskNode:".task-list-item",markdownRoot:"[data-markdown-root]"},r=/^(\s*)(-[ \t]+\[[xX\s]?\])/gm,a=/^(\s*)(-[ \t]+\[[xX\s]?\])(.+)/gm},340:function(e,t,n){"use strict";var o=n(0),r=n.n(o),a=n(13),i=n.n(a);function s(){return r.a.createElement("svg",{className:"icon-checkmark",xmlns:"http://www.w3.org/2000/svg",width:"24px",height:"24px",viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M11,17.768l-4.884-4.884l1.768-1.768L11,14.232l8.658-8.658C17.823,3.391,15.075,2,12,2C6.477,2,2,6.477,2,12 s4.477,10,10,10s10-4.477,10-10c0-1.528-0.353-2.971-0.966-4.266L11,17.768z"}))}function c(){return r.a.createElement("svg",{className:"icon-circle",xmlns:"http://www.w3.org/2000/svg",width:"24px",height:"24px",viewBox:"0 0 24 24"},r.a.createElement("g",{transform:"translate(2 2)"},r.a.createElement("path",{d:"m10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18.5c-4.694 0-8.5-3.806-8.5-8.5s3.806-8.5 8.5-8.5 8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5z"})))}var l=function(e){var t=e.checked,n=void 0!==t&&t,o=e.onChange;return r.a.createElement("span",{className:"checkbox",role:"checkbox","aria-checked":n,onClick:o,tabIndex:"0"},r.a.createElement("span",{className:"checkbox__icon","aria-hidden":"true"},n?r.a.createElement(s,null):r.a.createElement(c,null)))};l.propTypes={checked:i.a.bool,onChange:i.a.func};t.a=l}}]);