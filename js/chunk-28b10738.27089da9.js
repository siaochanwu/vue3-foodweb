(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28b10738"],{"0441":function(t,e,i){t.exports=i.p+"img/img7.106ef9aa.jpg"},"11e9":function(t,e,i){var s=i("52a7"),n=i("4630"),a=i("6821"),c=i("6a99"),o=i("69a8"),r=i("c69a"),l=Object.getOwnPropertyDescriptor;e.f=i("9e1e")?l:function(t,e){if(t=a(t),e=c(e,!0),r)try{return l(t,e)}catch(i){}if(o(t,e))return n(!s.f.call(t,e),t[e])}},"15cb":function(t,e,i){t.exports=i.p+"img/img10.175b81fb.jpg"},1771:function(t,e,i){var s={"./_components/menu.scss":"3527","./_components/message.scss":"3cc2","./_components/navbar.scss":"2041","./_views/customerOrder.scss":"185d","./_views/home.scss":"7b73","./_views/login.scss":"1871","./_views/main.scss":"730c","./_views/orderDone.scss":"fc34","./_views/product.scss":"8a7a","./all.scss":"68df","./drink.jpg":"b74c","./img1.jpg":"5ea3","./img10.jpg":"15cb","./img11.jpg":"b2e4","./img12.jpg":"7078","./img2.jpg":"cdd8","./img3.jpg":"e041","./img4.jpg":"6cb7","./img5.jpg":"8e57","./img6.jpg":"277d","./img7.jpg":"0441","./img8.jpg":"c510","./img9.jpg":"9645","./light.jpg":"959a","./logo.png":"cf05","./main.jpg":"ae49","./sweet.jpg":"3941"};function n(t){var e=a(t);return i(e)}function a(t){if(!i.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=a,t.exports=n,n.id="1771"},"185d":function(t,e,i){},1871:function(t,e,i){},2041:function(t,e,i){},"277d":function(t,e,i){t.exports=i.p+"img/img6.1adff769.jpg"},3527:function(t,e,i){},3941:function(t,e,i){t.exports=i.p+"img/sweet.80d1ead8.jpg"},"3cc2":function(t,e,i){},"5ea3":function(t,e,i){t.exports=i.p+"img/img1.dbc41876.jpg"},"68df":function(t,e,i){},"6cb7":function(t,e,i){t.exports=i.p+"img/img4.2540f9d1.jpg"},7078:function(t,e,i){t.exports=i.p+"img/img12.5a3383f2.jpg"},"730c":function(t,e,i){},"7b73":function(t,e,i){},"8a7a":function(t,e,i){},"8e57":function(t,e,i){t.exports=i.p+"img/img5.be2b3713.jpg"},"8e6e":function(t,e,i){var s=i("5ca1"),n=i("990b"),a=i("6821"),c=i("11e9"),o=i("f1ae");s(s.S,"Object",{getOwnPropertyDescriptors:function(t){var e,i,s=a(t),r=c.f,l=n(s),p={},g=0;while(l.length>g)i=r(s,e=l[g++]),void 0!==i&&o(p,e,i);return p}})},9093:function(t,e,i){var s=i("ce10"),n=i("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return s(t,n)}},"959a":function(t,e,i){t.exports=i.p+"img/light.6cc609a6.jpg"},9645:function(t,e,i){t.exports=i.p+"img/img9.e251f7c5.jpg"},"990b":function(t,e,i){var s=i("9093"),n=i("2621"),a=i("cb7c"),c=i("7726").Reflect;t.exports=c&&c.ownKeys||function(t){var e=s.f(a(t)),i=n.f;return i?e.concat(i(t)):e}},ade3:function(t,e,i){"use strict";function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}i.d(e,"a",(function(){return s}))},ae49:function(t,e,i){t.exports=i.p+"img/main.037a92e0.jpg"},b2e4:function(t,e,i){t.exports=i.p+"img/img11.b5b947df.jpg"},b74c:function(t,e,i){t.exports=i.p+"img/drink.52ad0c0b.jpg"},bb51:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home position-relative"},[s("div",{staticClass:"container"},[t._m(0),s("div",{staticClass:"mt-3"},[s("h1",{staticClass:"fs-2 text-warning mb-3"},[t._v("熱門分類")]),s("div",{staticClass:"row"},t._l(t.categories,(function(e,n){return s("div",{key:n,staticClass:"hot col-lg-3 col-md-6 col-sm-12 position-relative mb-3",on:{click:function(i){return i.preventDefault(),t.categoryBtn(e.title)}}},[s("img",{staticClass:"img",staticStyle:{width:"100%",height:"200px"},attrs:{src:i("1771")("./"+e.img),alt:""}}),s("h3",{staticClass:"text position-absolute top-50 start-50 translate-middle"},[t._v(t._s(e.title))])])})),0)]),t._m(1)]),s("div",{staticClass:"position-relative container"},[s("img",{staticClass:"mt-5",staticStyle:{width:"100%",height:"300px"},attrs:{src:i("7078"),alt:""}}),s("div",{staticClass:"subscribe position-absolute top-50 start-50 translate-middle border border-5 border-dark p-3 mt-3"},[s("div",{staticClass:"text-dark bg-white p-3"},[s("h3",{},[t._v("S u b s c r i b e")]),s("h5",{},[t._v("訂閱我們，隨時收到最新優惠通知！")]),s("label",{staticClass:"form-label",attrs:{for:"exampleInputEmail1"}},[t._v("Email address")]),s("div",{staticClass:"d-flex"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"exampleInputEmail1","aria-describedby":"emailHelp"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("button",{staticClass:"input-group-text btn bg-light",attrs:{id:"inputGroupPrepend"},on:{click:t.subscribe}},[t._v("訂閱")])])])])]),s("div",{staticClass:"coupons position-fixed top-50 start-50 translate-middle",class:{close:!t.modalOpen}},[s("i",{staticClass:"close fas fa-times-circle fs-3 text-dark",on:{click:t.modal}}),s("div",{staticClass:"coupon"},[s("div",{staticClass:"coupon-intro text-dark"},[s("h4",[t._v("首次登入即可領取折扣碼")]),s("ul",{staticClass:"text-dark"},[s("li",[t._v("滿300即可使用")]),s("li",[t._v("限 2021-05-01-2021-12-31 使用")]),s("li",[t._v("折扣碼 : "),s("span",{attrs:{id:"coupon"}},[t._v("FIRSTLOGIN")]),s("button",{staticClass:"btn btn-warning btn-sm ms-3",on:{click:t.copycoupon}},[t._v("複製折扣碼")])])])]),s("div",{staticClass:"coupon-value"},[t._v("\r\n        8折\r\n      ")])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"position-relative"},[s("img",{staticClass:"container-fluid",staticStyle:{height:"500px"},attrs:{src:i("0441"),alt:""}}),s("div",{staticClass:"imgtext position-absolute top-50 start-0 p-3"},[s("h3",{staticClass:"text-white"},[t._v("新鮮 | 美味 | 健康 | 無負擔")]),s("h5",{staticClass:"text-white"},[t._v("品嘗食物的原味")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row mt-5"},[s("div",{staticClass:"col-lg-5 col-md-12 m-0 p-0"},[s("img",{staticStyle:{width:"100%"},attrs:{src:i("b2e4"),alt:""}})]),s("div",{staticClass:"col-lg-7 col-md-12 bg-light p-4 pt-5"},[s("div",{staticClass:"d-flex justify-content-around mb-3"},[s("h3",{staticClass:"text-center text-warning fw-bold"},[t._v("Healthy")]),s("h3",{staticClass:"text-center text-warning fw-bold"},[t._v("Real")]),s("h3",{staticClass:"text-center text-warning fw-bold"},[t._v("Natural")])]),s("div",{staticClass:"d-flex justify-content-around"},[s("i",{staticClass:"fas fa-running fs-1 text-warning"}),s("i",{staticClass:"fas fa-fish fs-1 text-warning"}),s("i",{staticClass:"fas fa-seedling fs-1 text-warning"})]),s("ul",{staticClass:"mt-3 ms-5"},[s("li",[t._v("挑選當季在地新鮮蔬菜，使用國產肉類")]),s("li",[t._v("選用大量天然食材；吃食物圓型，不吃加工食品")]),s("li",[t._v("烹煮使用水煮、水炒、清蒸等；不添加過多的調味料，保留食物原始的味道")])])])])}],a=(i("8e6e"),i("ac6a"),i("456d"),i("ade3")),c=i("2f62");function o(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function r(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?o(Object(i),!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var l={data:function(){return{categories:[{name:"main",title:"主餐",img:"main.jpg"},{name:"light",title:"輕食",img:"light.jpg"},{name:"sweet",title:"甜點",img:"sweet.jpg"},{name:"drink",title:"飲品",img:"drink.jpg"}],email:"",modalOpen:!0}},methods:{categoryBtn:function(t){this.$router.push({path:"/menu",query:{category:t}})},subscribe:function(){""===this.email?this.$store.dispatch("msg",{Boolean:!0,msg:"請輸入正確EMAIL格式",msgState:"error"}):this.$store.dispatch("msg",{Boolean:!0,msg:"訂閱成功"})},modal:function(){this.modalOpen=!this.modalOpen,this.$store.dispatch("mask",!1)},copycoupon:function(){this.modalOpen=!1;var t=document.createRange();t.selectNode(document.getElementById("coupon"));var e=window.getSelection();e.rangeCount>0&&e.removeAllRanges(),e.addRange(t),document.execCommand("copy"),this.$store.dispatch("msg",{msg:"複製折扣碼成功",Boolean:!0})}},mounted:function(){this.$store.dispatch("mask",!0)},computed:r({},Object(c["b"])(["msgMask"]))},p=l,g=i("2877"),m=Object(g["a"])(p,s,n,!1,null,null,null);e["default"]=m.exports},c510:function(t,e,i){t.exports=i.p+"img/img8.c3e00f80.jpg"},cdd8:function(t,e,i){t.exports=i.p+"img/img2.2c06bd56.jpg"},cf05:function(t,e,i){t.exports=i.p+"img/logo.82b9c7a5.png"},e041:function(t,e,i){t.exports=i.p+"img/img3.696ed3b6.jpg"},f1ae:function(t,e,i){"use strict";var s=i("86cc"),n=i("4630");t.exports=function(t,e,i){e in t?s.f(t,e,n(0,i)):t[e]=i}},fc34:function(t,e,i){}}]);
//# sourceMappingURL=chunk-28b10738.27089da9.js.map