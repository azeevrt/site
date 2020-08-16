var NSfTIF=window.NSfTIF||{};NSfTIF.ts="2020-04-02T06:35:16Z";NSfTIF.cnr=6911;NSfTIF.pid=1146;NSfTIF.pType="CP";NSfTIF.section="undef/undef";
NSfTIF.tax_id="1";NSfTIF.cr="";NSfTIF.sktg="Diverse/Diverse/Diverse";NSfTIF.cc="de";NSfTIF.rc="de";NSfTIF.frabo=true;NSfTIF.has_ads=true;
NSfTIF.options={};NSfTIF.sectionList={produkte:"89"};NSfTIF._validateSection=function(b){if(/^[a-z0-9@./_-]+$/i.test(b)){var a=String(b).toLowerCase();
a=a.replace(new RegExp("//+","g"),"/");return a}else{return this.section}};NSfTIF._setSection=function(a){this.section=this._validateSection(a);
this._setIdCode()};NSfTIF._setIdCode=function(){var a=this.section.length;if(this._isDef(this.sectionList[this.section])){this.tax_id=this.sectionList[this.section]
}else{for(var b in this.sectionList){if(a>=b.length&&this.section.substr(0,b.length)===b){this.tax_id=this.sectionList[b];
break}}}};NSfTIF._replaceVariables=function(a){a=a.replace(/__SC__/g,this.section);a=a.replace(/__TYPE__/g,this.pType);a=a.replace(/__CODE__/g,this.tax_id);
a=a.replace(/__SKTG__/g,this.sktg);a=a.replace(/__CRG__/g,this.cr);a=a.replace(/__CR__/g,this.cr);a=a.replace(/__CC__/g,this.cc);
a=a.replace(/__REGION__/g,this.rc);a=a.replace(/__R__/g,escape(document.referrer));a=a.replace(/__D__/g,this._getRandom());
a=a.replace(/__CNR__/g,this.cnr);a=a.replace(/__PID__/g,this.pid);for(var b in this.options){a=a.replace(new RegExp("__"+b.toUpperCase()+"__","g"),this.options[b])
}a=a.replace(/__[A-Z0-9_-]+__/g,"");return a};NSfTIF._rvmv=function(b){for(var a in b){b[a]=NSfTIF._replaceVariables(b[a])
}return b};NSfTIF._isDef=function(b){return typeof(b)!=="undefined"};NSfTIF.init=function(a){if(!this._isDef(a)){return}if(typeof a.frabo==="boolean"){this.frabo=a.frabo
}if(typeof a.has_ads==="boolean"){this.has_ads=a.has_ads}if(a.cr){this.cr=a.cr}if(a.cc){this.cc=a.cc.toLowerCase()}if(a.region){this.rc=a.region.toLowerCase()
}this.initUniv(a);if(a.pageidentifier){this._setSection(a.pageidentifier)}if(a.contentclass){this.tax_id=a.contentclass}if(a.sktg){this.sktg=a.sktg
}};NSfTIF.initUniv=function(a){if(a){for(var b in a){if(/^[a-z0-9_-]+$/i.test(b)){this.options[b]=a[b]}}}};NSfTIF.checkFraBo=function(){return this.frabo&&window.location.protocol==="http:"&&document.readyState!=="complete"
};NSfTIF.rlsTrc=function(a){(new Image()).src=this._replaceVariables(a)};NSfTIF.rlsTrcRed=function(a){window.location=this._replaceVariables(a)
};NSfTIF._trim=function(a){return a.replace(/\s+$/,"").replace(/^\s+/,"")};NSfTIF._getRandom=function(){return Math.round(Math.random()*100000)
};NSfTIF.track=function(b){if(b){this.init(b)}if(window.AdService&&typeof AdService.getParam==="function"){this.options.ff=AdService.getParam("deviceclass")
}if(!/^(s|m|b)$/.test(this.options.ff)){if(/android(?!.*mobile)|ipad|kindle|playbook|\btab|surface/i.test(navigator.userAgent)){this.options.ff="m"
}else{if(/mobi|windows phone|iphone|blackberry/i.test(navigator.userAgent)){this.options.ff="s"}else{this.options.ff="b"}}}if(this.options.ff==="s"){this.options.deviceclass="mobile"
}else{this.options.deviceclass="desktop"}if(/^(android|ios|winphone|demo)\//.test(this.section)){this.options.deviceclient="app"
}else{this.options.deviceclient="browser"}if(this.options.deviceclass==="tab"){this.options.deviceclass="desktop"}var r=this.options.deviceclass;
var c="undefined";if(this.options.brand){var f=this.options.brand.replace(/\./g,"").toLowerCase();var h={"1and1":"1und1",gmxch:"gmx",gmxat:"gmx",gmxde:"gmx",gmxnet:"gmx"};
if(typeof h[f]!=="undefined"){f=h[f]}this.options.brand=f;var d="";var k="";if(("mobile"===r||"app"===r)&&f.search("m-")===-1){d="m-"
}if("gmx"===f){if("int"===this.rc||"us"===this.rc){k="com"}else{if("mobile"===r||"app"===r){k=this.rc}else{if("desktop"===r){if("ch"===this.rc||"at"===this.rc){k="_"+this.rc
}else{if(/es|fr|couk|com/.test(this.rc)){k=this.rc}}}}}}c=d+f+k}if(!this.options.brand){this.options.brand="undefined"}var q=this._replaceVariables("//t.uimserv.net/traffic_p/?md="+c+"&et=__TYPE__&agof=__CODE__&sc=__SC__&brand=__BRAND__&region=__REGION__&dclass=__DEVICECLASS__&lclass=__LAYOUTCLASS__&dclient=__DEVICECLIENT__&hid=__HID__&cr=__CR__&crx=__CRX__&wid=__WID__&salesarea=__SALESAREA__&lang=__LANGUAGE__&mbn=__MAILBOXNAME__&ul=__UL__&ff=__FF__&conpartner=__PARTNER__&conpartnerid=__PARTNERID__&category=__CATEGORY__&uid_debug=__UID_DEBUG__&eueid=__EUEID__&categorytype=__CATEGORYTYPE__&adsectionlong=__SECTIONLONG__&tif=__CNR__&d=__D__&r=__R__");
var t=new RegExp("&[a-z0-9_-]+=&","gi");var p=q.replace(t,"&");while(p.length<q.length){q=p;p=q.replace(t,"&")}(new Image()).src=p;
if(NSfTIF.options.brand==="gmx"&&this.rc==="ch"){var e="//gmx";if("https:"===window.location.protocol){e+="-ssl"}else{e+="ch"
}this.rlsTrc(e+".wemfbox.ch/cgi-bin/ivw/__TYPE__/__CODE__?r=__R__&d=__D__")}if(window.iom&&this.options.brand&&this.has_ads&&(this.rc==="de"||this.rc==="at")){if(NSfTIF.section==="mail/logout/ad_dynamisch"){window.iam_fadeout_flash=false;
window.iam_fadeout_iframe=false;window.iam_fadeout_form=false}const s=this.options.deviceclass||"desktop";const u=/^((search|themen)\/)|(\/?[^/]+\/logout\/)/.test(NSfTIF.section);
if(this.rc==="de"&&this.options.autoplay!=="true"){const m=this.options.deviceclient||"browser";let f=this.options.brand;
let angebotskennung;if("app"===m){if(/^ios/.test(this.section)){if("webde"===f){angebotskennung="appwebde"}else{if("gmx"===f){angebotskennung="appgmxde"
}}}else{if(/^android/.test(this.section)){if("webde"===f){angebotskennung="aadwebde"}else{if("gmx"===f){angebotskennung="aadgmxma"
}else{if("1und1"===f){angebotskennung="aad1und1"}}}}}}else{if("mobile"===s){angebotskennung="mob"+f}else{if("desktop"===s){if("webde"===f){angebotskennung="webdessl"
}}}}if(!angebotskennung){angebotskennung=f}let survey;if(this.frabo&&(u||f==="autoser")){if("desktop"===s){survey="i2"}else{window.iam_skiponload=true;
survey="mo"}}else{survey="ke"}if(NSfTIF.section==="mail/logout/ad_dynamisch"){window.iam_fadeout_flash=false;window.iam_fadeout_iframe=false;
window.iam_fadeout_form=false}const a={st:angebotskennung,cp:this.tax_id,sv:survey,sur:"yes",sc:"no"};if(this.options.category==="magazine"){iom.h(a,2)
}else{iom.c(a,2)}}if(this.options.brand==="gmx"&&this.rc==="at"&&!/^(ios|android)\//.test(this.section)){NSfTIF.sktg=NSfTIF._trim(NSfTIF.sktg);
const v=window.location.hostname;let angebotskennung="gmx";if(v.match(/gmx\.at$/)){angebotskennung="at_w_atgmx";if(!NSfTIF.sktg.match(/gmx\.at$/)){NSfTIF.sktg+="/gmx.at"
}}else{if(v.match(/gmx\.net$/)){angebotskennung="at_w_netgmx";if(!NSfTIF.sktg.match(/gmx\.net$/)){NSfTIF.sktg+="/gmx.net"
}}}const o="mobile"===s||"app"===s;let frabo="ke";if(NSfTIF.frabo&&u){frabo=o?"mo":"in"}if(!/\/moewa\/$/.test(NSfTIF.sktg)&&o){NSfTIF.sktg+="/moewa/"
}if(NSfTIF.section==="mail/logout/ad_dynamisch"){window.iam_fadeout_flash=false;window.iam_fadeout_iframe=false;window.iam_fadeout_form=false
}const j={cn:"at",st:angebotskennung,ps:"lin",cp:NSfTIF.sktg,sv:frabo,sur:"yes",sc:"no"};iom.c(j,2)}}};NSfTIF._loadJavaScript=function(b){var a=document.createElement("script");
a.setAttribute("type","text/javascript");a.setAttribute("src",b);if(document.head){document.head.appendChild(a)}};NSfTIF._writeJS=function(a){document.write('<script type="text/javascript" src="'+a+'"><\/script>')
};var szmvars="";var iom=iom||(function(){var am="dummy",W="de.ioam.de/tx.io",z="de.ioam.de/aid.io",B="de.ioam.de/optin.php?re=",g="irqs.ioam.de",X=".ioam.de/tx.io",j=".ioam.de/aid.io",Y=".ioam.de/optin.php?re=",an=["imarex"],Z=".iocnt.net/tx.io",K=".iocnt.net/aid.io",aE=".iocnt.net/optin.php?re=",f="irqs.iocnt.net",A=["at"],d=["","inst","init","open","clse","play","resm","stop","fowa","bakw","recd","paus","forg","bakg","dele","refr","kill","view","alve","fini","mute","aforg","abakg","aclse","sple","scvl","serr","spyr","smdr","sfpl","sfqt","ssqt","stqt","soqt","sofc","scfc","scqt","splr","spli","sprs","spre","smrs","smre","sors","sore","sack","sapl","sapa","snsp"],v=[],at=1,ae=0,al=1,aH="",aI="Leercode_nichtzuordnungsfaehig",aq={onfocus:"aforg",onblur:"abakg",onclose:"aclse"},U=2,q=[],o="ioam2018",a=0,G="private",T="ioamout",k=60000,L=5000,I=10000,n=30000,az=10000,R=30000,c=60000,F=300000,ay;
var D=null,s=null,E={},t=86400000,aG={},aa,aA=0,S=0,au=0;var e=86400000,V=180000,h="me.ioam.de";function N(){if((ae==1||aG.tb=="on")&&aG.tb!="off"&&!aA){aA=1;
aa=1;for(var aL in aq){(function(aN){var aM=window[aN];window[aN]=function(){if(aH!=aq[aN]){aH=aq[aN];J(aq[aN])}if(typeof aM=="function"){aM()
}}})(aL)}}}function ab(){if((U&2)?((typeof aG.nt=="undefined")?(U&1):aG.nt):U&1){if(window.navigator.msDoNotTrack&&window.navigator.msDoNotTrack=="1"){return true
}if(window.navigator.doNotTrack&&(window.navigator.doNotTrack=="yes"||window.navigator.doNotTrack=="1")){return true}}return false
}var aK=function(aL){if(aL&&aL.hasOwnProperty("block-status")){var aM=("NONE"===aL["block-status"].toUpperCase());if(aM){if(s){s.parentNode.removeChild(s)
}s=aj(aL["invite-url"])}}};function ap(){szmvars=aG.st+"//"+aG.pt+"//"+aG.cp+"//VIA_SZMNG";var aV=(aG.sv=="i2")?"in":aG.sv;
var aN=g;if(aG.cn){aV+="_"+aG.cn;if(aG.cn=="at"){aN=f}}E={siteIdentifier:aG.cp,offerIdentifier:aG.st,sampleType:aV,pixelType:aG.pt,contentType:aG.cp,host:aN,port:"",isFadeoutFlash:true,isFadeoutFrame:true,isFadeoutForm:true,positionTop:10,positionLeft:100,zIndex:1100000,popupBlockDuration:t,keysForQueryParam:["offerIdentifier","siteIdentifier","sampleType","pixelType","isFadeoutFlash","isFadeoutFrame","isFadeoutForm","positionTop","positionLeft","zIndex"]};
if(typeof window.iam_zindex!=="undefined"){E.zIndex=window.iam_zindex}if(typeof window.iam_fadeout_flash!=="undefined"){E.isFadeoutFlash=window.iam_fadeout_flash
}if(typeof window.iam_fadeout_iframe!=="undefined"){E.isFadeoutFrame=window.iam_fadeout_iframe}if(typeof window.iam_fadeout_form!=="undefined"){E.isFadeoutForm=window.iam_fadeout_form
}if(typeof window.iam_position_top!=="undefined"){E.positionTop=window.iam_position_top}if(typeof window.iam_position_left!=="undefined"){E.positionLeft=window.iam_position_left
}var aT=function(a1,a0){var aX={},aZ;var a2=a0.length;for(var aY=0;aY<a2;aY++){aZ=a0[aY];if(a1.hasOwnProperty(aZ)){aX[aZ]=a1[aZ]
}}return aX};var aM=function(aY){var aZ=[];for(var aX in aY){if(aY.hasOwnProperty(aX)){aZ.push(encodeURIComponent(aX)+"="+encodeURIComponent(aY[aX]))
}}return aZ.join("&")};var aU=function(aY){var aZ=new Date();aZ.setTime(aZ.getTime()+aY);var aX="expires="+aZ.toUTCString();
document.cookie="POPUPCHECK="+aZ.getTime().toString()+";"+aX+";path=/"};var aL=function(){var a1=document.cookie.split(";");
for(var a0=0;a0<a1.length;a0++){if(a1[a0].match("POPUPCHECK=.*")){var aY=new Date();var aZ=aY.getTime();aY.setTime(a1[a0].split("=")[1]);
var aX=aY.getTime();if(aZ<=aX){return true}}}return false};if(aL()){return}if(al&&!S&&aG.sv!=="ke"&&aG.sv==="dz"){S=1;iam_ng_nxss()
}if(al&&!S&&aG.sv!=="ke"&&(aG.sv==="in"||aG.sv==="mo"||aG.sv==="i2")){S=1;aU(E.popupBlockDuration);var aW="https:";var aR="identitystatus";
var aQ=aT(E,E.keysForQueryParam);var aP="?"+aM(aQ);if(window.XDomainRequest&&document.documentMode===9){var aS=aW+"//"+E.host+"/"+aR+"/identity.js"+aP+"&callback=iom.gi&c="+Math.random();
aj(aS)}else{var aS=aW+"//"+E.host+"/"+aR+aP+"&c="+Math.random();var aO=new XMLHttpRequest();aO.onreadystatechange=function(){if(aO.readyState===XMLHttpRequest.DONE&&200===aO.status){var aX=JSON.parse(aO.responseText);
aK(aX)}};aO.open("GET",aS,true);aO.withCredentials=true;aO.send(null)}}}function P(aM){var aN=0;for(var aL=0;aL<aM.length;
++aL){aN+=aM.charCodeAt(aL);aN+=(aN<<10);aN^=(aN>>6)}aN+=(aN<<3);aN^=(aN>>11);aN+=(aN<<15);aN=Math.abs(aN&aN);return aN.toString(36)
}function ai(){var aL="",aO,aN=["7790769C-0471-11D2-AF11-00C04FA35D02","89820200-ECBD-11CF-8B85-00AA005B4340","283807B5-2C60-11D0-A31D-00AA00B92C03","4F216970-C90C-11D1-B5C7-0000F8051515","44BBA848-CC51-11CF-AAFA-00AA00B6015C","9381D8F2-0288-11D0-9501-00AA00B911A5","4F216970-C90C-11D1-B5C7-0000F8051515","5A8D6EE0-3E18-11D0-821E-444553540000","89820200-ECBD-11CF-8B85-00AA005B4383","08B0E5C0-4FCB-11CF-AAA5-00401C608555","45EA75A0-A269-11D1-B5BF-0000F8051515","DE5AED00-A4BF-11D1-9948-00C04F98BBC9","22D6F312-B0F6-11D0-94AB-0080C74C7E95","44BBA842-CC51-11CF-AAFA-00AA00B6015B","3AF36230-A269-11D1-B5BF-0000F8051515","44BBA840-CC51-11CF-AAFA-00AA00B6015C","CC2A9BA0-3BDD-11D0-821E-444553540000","08B0E5C0-4FCB-11CF-AAA5-00401C608500","D27CDB6E-AE6D-11CF-96B8-444553540000","2A202491-F00D-11CF-87CC-0020AFEECF20"];
document.body.addBehavior("#default#clientCaps");for(var aM=0;aM<aN.length;aM++){aO=document.body.getComponentVersion("{"+aN[aM]+"}","ComponentID");
if(aO!==null){aL+=aO}else{aL+="null"}}return aL}function w(){var aO=window.navigator,aM=aO.userAgent;aM+=aw();if(aO.plugins.length>0){for(var aL=0;
aL<aO.plugins.length;aL++){aM+=aO.plugins[aL].filename+aO.plugins[aL].version+aO.plugins[aL].description}}if(aO.mimeTypes.length>0){for(var aL=0;
aL<aO.mimeTypes.length;aL++){aM+=aO.mimeTypes[aL].type}}if(/MSIE (\d+\.\d+);/.test(aO.userAgent)){try{aM+=ai()}catch(aN){}}return P(aM)
}function aj(aL){var aN=document.createElement("script");aN.type="text/javascript";aN.src=aL;var aM=document.getElementsByTagName("head")[0];
if(aM){aM.appendChild(aN);return aN}else{return false}}function C(aM,aL){var aO=document.createElement("script");aO.type="text/javascript";
aO.src=aM;aO.onload=aL;aO.async=true;var aN=document.getElementsByTagName("head")[0];if(aN){aN.appendChild(aO);return aO}else{return false
}}function ar(aN,aO){if(aN.split("/")[2].slice(aN.split("/")[2].length-8)==".ioam.de"||aN.split("/")[2].slice(aN.split("/")[2].length-10)==".iocnt.net"){switch(aO){case 1:if(D){D.parentNode.removeChild(D)
}D=aj(aN+"&mo=1");if(!D){(new Image()).src=aN+"&mo=0"}break;case 2:(new Image()).src=aN+"&mo=0";break;case 3:var aM=document.getElementById("iamsendbox"),aL;
if(aM){document.body.removeChild(aM)}aM=document.createElement("iframe");aM.id="iamsendbox";aL=aM.style;aL.position="absolute";
aL.left=aL.top="-999px";aM.src=aN+"&mo=1";document.body.appendChild(aM);break;case 0:default:document.write('<script src="'+aN+'&mo=1"><\/script>')
}}}function aw(){return screen.width+"x"+screen.height+"x"+screen.colorDepth}function aC(aL,aN){var aM;for(aM=0;aM<aL.length;
aM++){if(aL[aM]==aN){return true}}return false}function af(aL){if(!aL){aL=""}aL=aL.replace(/[?#].*/g,"");aL=aL.replace(/[^a-zA-Z0-9,_\/-]+/g,".");
if(aL.length>255){aL=aL.substr(0,254)+"+"}return aL}function r(aL){if(!aL){aL=""}aL=aL.replace(/[^a-zA-Z0-9,_\/:-]+/g,".");
if(aL.length>255){aL=aL.substr(0,254)+"+"}return aL}function b(){var aL=document.referrer.split("/");return(aL.length>=3)?aL[2]:""
}function u(aO){aG={};var aM;for(aM in aO){if(aO.hasOwnProperty(aM)){if(aM!="cn"||(aM=="cn"&&(aC(an,aO[aM]))||(aC(A,aO[aM])))){aG[aM]=aO[aM]
}}}if(aG.hasOwnProperty("fp")){aG.fp=(aG.fp!=""&&typeof aG.fp!="undefined")?aG.fp:aI;aG.fp=af(aG.fp);aG.pt="FP"}if(aG.hasOwnProperty("np")){aG.np=(aG.np!=""&&typeof aG.np!="undefined")?aG.np:aI;
aG.np=af(aG.np);aG.pt="NP"}if(aG.hasOwnProperty("xp")){aG.xp=(aG.xp!=""&&typeof aG.xp!="undefined")?aG.xp:aI;aG.xp=af(aG.xp);
aG.pt="XP"}if(aG.hasOwnProperty("cp")){aG.cp=(aG.cp!=""&&typeof aG.cp!="undefined")?aG.cp:aI;aG.cp=af(aG.cp);aG.pt="CP"}if(!aG.pt){aG.cp=aI;
aG.pt="CP";aG.er="N13"}if(!aG.hasOwnProperty("ps")){aG.ps="lin";aG.er="N22"}else{if(!(aC(["ack","lin","pio","out"],aG.ps))){aG.ps="lin";
aG.er="N23"}}aG.rf=b();if(!aG.hasOwnProperty("sur")||(aG.hasOwnProperty("sur")&&aG.sur!="yes")){aG.r2=r(document.referrer)
}aG.ur=document.location.host;aG.xy=aw();aG.cb="8004";aG.vr="415";aG.id=w();aG.st=aG.st?aG.st:am;if(!aG.hasOwnProperty("sc")||(aG.hasOwnProperty("sc")&&aG.sc!="no")){var aL=p();
aG.i3=aL.cookie;aG.n1=aL.length}if(((aC(q,aG.st))||(aG.hasOwnProperty("sc")&&aG.sc=="yes"))&&aG.i3=="nocookie"){aG.i3=m()
}if(!aG.hasOwnProperty("cn")&&aG.st.charAt(2)=="_"){var aP=aG.st.substr(0,2);if(aC(an,aP)||aC(A,aP)){aG.cn=aP}else{aG.er="E12"
}}try{aG.dntt=((window.navigator.msDoNotTrack&&window.navigator.msDoNotTrack=="1")||(window.navigator.doNotTrack&&(window.navigator.doNotTrack=="yes"||window.navigator.doNotTrack=="1")))?"1":"0"
}catch(aN){}}function J(aP){var aM="";var aL;aP=aP||"";ac();if(au&&!ab()&&(!at||(at&&aC(d,aP)))&&aG.ps!=="out"){aG.lt=(new Date()).getTime();
aG.ev=aP;var aO="https:";var aN=W;if(aG.cn&&aC(an,aG.cn)){aN=aG.cn+X}else{if(aG.cn&&aC(A,aG.cn)){aN=aG.cn+Z}}if(!(aC(v,aG.st))&&(((/iPhone/.test(window.navigator.userAgent)||/iPad/.test(window.navigator.userAgent))&&/Safari/.test(window.navigator.userAgent)&&!(/Chrome/.test(window.navigator.userAgent))&&!(/CriOS/.test(window.navigator.userAgent)))||(/Maple_201/.test(window.navigator.userAgent)||/SMART-TV/.test(window.navigator.userAgent)||/SmartTV201/.test(window.navigator.userAgent)))){if(aG.cn&&aC(an,aG.cn)){aN=aG.cn+j
}else{if(aG.cn&&aC(A,aG.cn)){aN=aG.cn+K}else{aN=z}}aa=3;if(aG.hasOwnProperty("sur")&&aG.sur=="yes"){aG.u2=window.location.origin
}else{aG.u2=document.URL}}for(aL in aG){if(aG.hasOwnProperty(aL)&&aL!="cs"&&aL!="url"){aM=aM+encodeURIComponent(aL).slice(0,8)+"="+encodeURIComponent(aG[aL]).slice(0,2048)+"&"
}}aM=aM.slice(0,4096);aG.cs=P(aM);aG.url=aO+"//"+aN+"?"+aM+"cs="+aG.cs;ar(aG.url,aa);if(aC(["play","resm","alve","mute","sfqt","ssqt","stqt","sapl","snsp"],aP)&&(aa===1||aa===3)&&aG.hasOwnProperty("hb")){i()
}return aG}return{}}function ax(){if(aG.oer==="yes"&&!window.IVW&&!document.IVW){var aL=(window.location.protocol.slice(0,4)==="http")?window.location.protocol:"https:";
var aN=(aG.co)?aG.co+"_SENT_VIA_MIGRATION_TAG":"SENT_VIA_MIGRATION_TAG";var aM=(aG.oc)?aG.oc:((aG.cp)?((aG.cp==aI)?"":aG.cp):"");
var aO=(aG.pt!==null)?aG.pt:"CP";(new Image()).src=aL+"//"+aG.st+".ivwbox.de/cgi-bin/ivw/"+aO.toUpperCase()+"/"+aM+";"+aN+"?r="+escape(document.referrer)+"&d="+(Math.random()*100000)
}}function l(aM,aL){ad(aM,aL);return J(aG.ev)}function ad(aM,aL){aa=aL;u(aM);if(aG.sv){aG.sv=(aG.sv=="in"&&aa==1)?"i2":aG.sv
}N();ap();O();au=1;ax();return{}}function av(aP,aM){ad(aP,aM);var aN=(typeof localStorage==="object"&&typeof localStorage.getItem==="function")?localStorage.getItem("ioam_smi"):null;
var aL=(typeof localStorage==="object"&&typeof localStorage.getItem==="function")?localStorage.getItem("ioam_site"):null;
var aO=(typeof localStorage==="object"&&typeof localStorage.getItem==="function")?localStorage.getItem("ioam_bo"):null;if(aN!==null&&aL!==null&&aO!==null){aG.mi=aN;
aG.fs=aG.st;aG.st=aL;aG.bo=aO;if(aG.fs==aG.st){aG.cp=(aG.cp.slice(0,10)!=="___hyb2___")?"___hyb2___"+aG.fs+"___"+aG.cp:aG.cp
}else{aG.cp=(aG.cp.slice(0,9)!=="___hyb___")?"___hyb___"+aG.fs+"___"+aG.cp:aG.cp}return J(aG.ev)}else{if(aN!==null&&aO!==null){return{}
}else{if(window.location.protocol.slice(0,4)!=="http"||/IOAM\/\d+\.\d+/.test(window.navigator.userAgent)){return{}}else{return J(aG.ev)
}}}}function ah(aM){if(localStorage.getItem("ioam_smi")===null||localStorage.getItem("ioam_site")===null||localStorage.getItem("ioam_bo")===null||localStorage.getItem("ioam_smi")!==aM){aG.fs=aG.st;
var aL=null;var aO=null;if(typeof aM==="string"&&typeof JSON==="object"&&typeof JSON.parse==="function"){try{aL=JSON.parse(aM);
if(aL.hasOwnProperty("library")){if(aL.library.hasOwnProperty("offerIdentifier")){if(aL.library.offerIdentifier){aO=aL.library.offerIdentifier
}else{aG.er="JSON(E10): offerIdentifier not valid"}}else{aG.er="JSON(E10): no key offerIdentifier"}}else{aG.er="JSON(E10): no key library"
}}catch(aN){aG.er="JSON(E10): "+aN}}if(aO!==null){localStorage.setItem("ioam_site",aO)}aG.st=aO;aG.mi=aM;aG.bo=(new Date()).getTime();
localStorage.setItem("ioam_smi",aG.mi);localStorage.setItem("ioam_bo",aG.bo);if(aG.fs==aG.st){aG.cp=(aG.cp.slice(0,10)!=="___hyb2___")?"___hyb2___"+aG.fs+"___"+aG.cp:aG.cp
}else{aG.cp=(aG.cp.slice(0,9)!=="___hyb___")?"___hyb___"+aG.fs+"___"+aG.cp:aG.cp}return J(aG.ev)}return{}}if(window.postMessage||window.JSON&&{}.toString.call(window.JSON.parse)!=="[object Function]"&&{}.toString.call(window.JSON.stringify)!=="[object Function]"){var aF=function(aO){try{var aL=JSON.parse(aO.data)
}catch(aM){aL={type:false}}if({}.toString.call(aL)==="[object Object]"&&aL.type=="iam_data"){var aN={seq:aL.seq,iam_data:{st:aG.st,cp:aG.cp}};
aO.source.postMessage(JSON.stringify(aN),aO.origin)}};if(window.addEventListener){window.addEventListener("message",aF)}else{window.attachEvent("onmessage",aF)
}}function ao(){var aL=(window.location.protocol.slice(0,4)==="http")?window.location.protocol:"https://"+B;var aM=window.open(aL,"_blank");
aM.focus()}function i(){function aM(){return J("alve")}switch(aG.hb){case"adshort":k=L;break;case"admedium":k=I;break;case"adlong":k=n;
break;case"short":k=az;break;case"medium":k=R;break;case"long":k=c;break;case"extralong":k=F;break;default:k=0}if(k!=0){try{ay=setInterval(aM,k)
}catch(aL){}}}function ac(){try{clearInterval(ay)}catch(aL){}}function H(aO){var aM=[];for(var aP=0,aL=aO.length;aP<aL;aP++){var aN=Number(aO.charCodeAt(aP)).toString(16);
aM.push(aN)}return aM.join("")}function y(){var aL=999999999999;var aM=100000000000;return(Math.floor(Math.random()*(aL-aM+1))+aM).toString(16)+(Math.floor(Math.random()*(aL-aM+1))+aM).toString(16)+H(aG.cb)+(Math.floor(Math.random()*(aL-aM+1))+aM).toString(16)
}function M(){var aL=365;var aM=300;return Math.floor(Math.random()*(aL-aM+1))+aM}function p(){try{var aO=document.cookie.split(";");
for(var aN=0;aN<aO.length;aN++){if(aO[aN].match(o+"=.*")){var aQ=aO[aN].split("=")[1].replace("!",":");var aR=aQ.split(":");
var aL=aR.slice(0,aR.length-1).join(":");var aM=aR.slice(-1).pop();if(P(aL)===aM){if(!aG.hasOwnProperty("i3")||!aG.i3){aD(aQ)
}return{cookie:aQ,length:aO.length}}else{aG.er="N19";try{if(a<3){a++;m(2000)}else{aG.er="N20"}}catch(aP){aG.er="N20"}}}}}catch(aP){return{cookie:"nocookie",length:0}
}return{cookie:"nocookie",length:aO.length}}function ak(){var aL=p();if(aL.cookie!="nocookie"){return true}else{return false
}}function x(aR){var aU="acadaeafagaialamaoaqarasatauawaxazbabbbdbebfbgbhbibjbmbnbobrbsbtbwbybzcacccdcfcgchcickclcmcncocrcucvcwcxcyczdjdkdmdodzeceeegereseteufifjfkfmfofrgagdgegfggghgiglgmgngpgqgrgsgtgugwgyhkhmhnhrhthuidieiliminioiqirisitjejmjojpkekgkhkikmknkpkrkwkykzlalblclilklrlsltlulvlymamcmdmemgmhmkmlmmmnmompmqmrmsmtmumvmwmxmymznancnenfngninlnonpnrnunzompapepfpgphpkplpmpnprpsptpwpyqarerorsrurwsasbscsdsesgshsiskslsmsnsosrssstsvsxsysztctdtftgthtjtktltmtntotrtttvtwtzuaugukusuyuzvavcvevgvivnvuwfwsyeytzazmzw".match(/.{1,2}(?=(.{2})+(?!.))|.{1,2}$/g),aO=["www","m","mobile"],aM=aR.split("."),aV,aS=[],aP=[],aL="",aN="",aT=0,aQ=0;
if(!aR){return""}if(aC(aU,aM[aM.length-1])){for(aT=aM.length-1;aT>=0;aT-=1){if(aT>=aM.length-3&&aM[aT].length<=4){aS.push(aM[aT])
}else{aP.push(aM[aT]);break}}aS=aS.reverse();for(aT=0,aQ=aS.length;aT<aQ;aT+=1){if(!aC(aO,aS[aT])){aL+=aT<aQ?"."+aS[aT]:aS[aT]
}}aP=aP.reverse();aN=aP[aP.length-1]||"";if(aC(aO,aN)){aN=""}}else{aN=aM.slice(aM.length-2,aM.length).join(".")||""}aV=aN+aL;
if(aV&&aV.length>4&&aV.split(".").length>1){return"domain="+(aV[0]==="."?aV:(aV?"."+aV:""))+";"}return""}function aD(aP){var aQ=x(location.hostname);
var aS=aP.split(":")[1];var aT=parseInt(aP.split(":")[4])+1;var aL=new Date(new Date().setTime(aS));var aO=new Date();var aM=(aG.st)?aG.st:"nosite";
var aN=(aG.cp)?aG.cp:(aG.np)?aG.np:(aG.fp)?aG.fp:"nocode";var aU=(aG.ev)?aG.ev:"noevent";var aR=aP.split(":").slice(0,4).join(":")+":"+aT+":"+aM+":"+aN+":"+aU+":"+aO.getTime().toString();
aR=aR+":"+P(aR);document.cookie=o+"="+aR+";expires="+aL.toUTCString()+";"+aQ+";path=/;"}function m(aO){if(!aO){aO=M()*24*60*60*1000
}var aP=x(location.hostname);var aL=new Date(new Date().setTime(new Date().getTime()+aO));var aT=new Date();var aR;var aM=(aG.st)?aG.st:"nosite";
var aN=(aG.cp)?aG.cp:(aG.np)?aG.np:(aG.fp)?aG.fp:"nocode";var aU=(aG.ev)?aG.ev:"noevent";if(aG.hasOwnProperty("i2")){aR=aG.i2
}else{aR=y()}var aS=aR+":"+aL.getTime().toString()+":"+aT.getTime().toString()+":"+aP.replace("domain=","").replace(";","")+":1:"+aM+":"+aN+":"+aU+":"+aT.getTime().toString();
var aQ=aR+":"+aL.getTime().toString()+":"+aT.getTime().toString()+":"+aP.replace("domain=","").replace(";","")+":2:"+aM+":"+aN+":"+aU+":"+aT.getTime().toString();
aQ=aQ+":"+P(aQ);document.cookie=o+"="+aQ+";expires="+aL.toUTCString()+";"+aP+";path=/;";if(!ak()){document.cookie=o+"="+aQ+";expires="+aL.toUTCString()+";path=/;";
aG.er="N25";if(!ak()){aG.er="N26";return"nocookie"}}return aS}function aJ(aN,aM){var aL=new XMLHttpRequest();if("withCredentials" in aL){aL.open(aN,aM,true);
aL.withCredentials=true}else{if(typeof XDomainRequest!="undefined"){aL=new XDomainRequest();aL.open(aN,aM)}else{aL=null}}return aL
}function Q(aM){if(!aM){aM=1*24*60*60*1000}var aN=x(location.hostname);var aL=new Date(new Date().setTime(new Date().getTime()+aM));
document.cookie=T+"=stop;expires="+aL.toUTCString()+";"+aN+";path=/;";m(2000)}function O(){try{var aM=document.cookie.split(";");
for(var aL=0;aL<aM.length;aL++){if(aM[aL].match(T+"=.*")){aG.ps="out";return true}}return false}catch(aN){return false}}function aB(){Q(2000);
m(2000)}function ag(){if(typeof localStorage==="object"&&typeof localStorage.getItem==="function"){if(localStorage.getItem("ioamplusdata")!==null&&localStorage.getItem("ioamplusttl")!==null){var aL=new Date();
var aM=aL.getTime();aL.setTime(localStorage.getItem("ioamplusttl"));if(aM<=aL.getTime()){return true}}var aO="https://"+h+"/soziodata2.php?sc="+G+"&st="+aG.st+"&id="+aG.id;
var aN=aJ("GET",aO);if(aN){aN.onload=function(){var aP=aN.responseText;var aQ=new Date();try{if((aP.split(":")[1].split(",")[0])=="0"){aQ.setTime(aQ.getTime()+V);
localStorage.setItem("ioamplusttl",aQ.getTime().toString());if(localStorage.getItem("ioamplusdata")==null){localStorage.setItem("ioamplusdata",aP)
}}else{aQ.setTime(aQ.getTime()+e);localStorage.setItem("ioamplusdata",aP);localStorage.setItem("ioamplusttl",aQ.getTime().toString())
}}catch(aR){}};aN.send();return true}}return false}return{count:l,c:l,i:ad,init:ad,e:J,event:J,h:av,hybrid:av,setMultiIdentifier:ah,smi:ah,oi:ao,optin:ao,setoptout:Q,soo:Q,deloptout:aB,doo:aB,getInvitation:aK,gi:aK,getPlus:ag,gp:ag}
})();