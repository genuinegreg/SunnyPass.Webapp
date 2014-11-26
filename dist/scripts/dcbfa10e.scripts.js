"use strict";angular.module("SunnyPass.Webapp",["ngSanitize","ui.router","SunnyPass.Services"]).config(["$logProvider",function(a){a.debugEnabled(!0)}]).config(["$stateProvider","$urlRouterProvider",function(a,b){var c={lockers:function(){return["SunnyPass",function(a){return a.list()}]},locker:function(){return["$stateParams","SunnyPass",function(a,b){return b.getBySharedSecret(a.sharedSecret)}]},isLockerLocked:function(){return["$stateParams","SunnyPass","$q",function(a,b,c){return b.getBySharedSecret(a.sharedSecret).then(function(a){return a.isLocked()?c.reject(new Error("locked")):!0})}]},lockerItems:function(){return["$stateParams","SunnyPass",function(a,b){return b.getBySharedSecret(a.sharedSecret).then(function(a){return a.list()})}]},lockerItem:function(){return["$stateParams","SunnyPass",function(a,b){return b.getBySharedSecret(a.sharedSecret).then(function(b){return b.get(a.itemId)})}]}};b.otherwise("/"),a.state("landing",{url:"/",templateUrl:"views/landing.html",controller:"LandingCtrl",resolve:{lockers:c.lockers()}}).state("root",{"abstract":!0,templateUrl:"views/root.html",controller:"RootCtrl",resolve:{lockers:c.lockers()}}).state("root.more",{url:"/more",templateUrl:"views/more.html",controller:"MoreCtrl"}).state("root.create",{url:"/create",templateUrl:"views/locker/create.html",controller:"LockerCreateCtrl"}).state("root.locker",{url:"/locker/:sharedSecret",controller:"LockerCtrl","abstract":!0,templateUrl:"views/locker.html",resolve:{locker:c.locker()}}).state("root.locker.unlock",{url:"/unlock",templateUrl:"views/locker/unlock.html",controller:"LockerUnlockCtrl"}).state("root.locker.content",{url:"",templateUrl:"views/locker/content.html",controller:"LockerContentCtrl",resolve:{items:c.lockerItems()}}).state("root.locker.add",{url:"/add",templateUrl:"views/locker/add.html",controller:"LockerAddCtrl",resolve:{locked:c.isLockerLocked()}}).state("root.locker.details",{url:"/details",templateUrl:"views/locker/details.html",controller:"LockerDetailsCtrl",resolve:{locked:c.isLockerLocked()}}).state("root.locker.item",{url:"/:itemId",templateUrl:"views/locker/item.html",controller:"LockerItemCtrl",resolve:{item:c.lockerItem()}})}]),angular.module("SunnyPass.Webapp").controller("RootCtrl",["$scope","$state","lockers","SunnyPass",function(a,b,c,d){a.lockers=c,a.$state=b,a.$root.$on("$lockersListChange",function(){d.list().then(function(b){a.lockers=b})})}]),angular.module("SunnyPass.Webapp").controller("DashboardCtrl",["lockers","$scope",function(a,b){b.$root.lockers=a}]),angular.module("SunnyPass.Webapp").controller("LockerCreateCtrl",["$scope","$log","$state","SunnyPass","Crypto",function(a,b,c,d,e){b.debug("enter LockerCreateCtrl Controller..."),a.generate=function(){a.key=e.generateKey()},a.create=function(){a.form.$invalid||(b.debug("Create locker button pushed",a.key,a.password1),d.get(a.key).then(function(d){var e=d.unlock(a.password1);e.then(function(){a.$emit("$lockersListChange"),c.go("root.locker.content",{sharedSecret:d.secret.shared})},function(a){b.error("$scope.create()... FAILED... unlock rejected",a),window.alert("Unknown error ! sorry")})}))}}]),angular.module("SunnyPass.Webapp").controller("LockerContentCtrl",["locker","lockers","items","SunnyPass","$scope","$log","$state",function(a,b,c,d,e,f,g){function h(a,b){e.locker.unlockData(b).then(function(b){window.prompt("Copy to clipboard: Ctrl+C, Enter",b[a])})}f.debug("enter LockerContentCtrl()"),e.$root.lockers=b,e.locker=a,e.locked=a.isLocked(),e.list=c,e.deleteItem=function(a,b){f.debug("delete :",a._id),e.locker.deleteById(a._id).then(function(){g.reload()}),e.list.splice(b,1)},e.copyPassword=function(a){h("password",a)},e.copyLogin=function(a){h("login",a)},e.copyNotes=function(a){h("notes",a)}}]),angular.module("SunnyPass.Webapp").controller("MoreCtrl",["lockers","$scope","$state","$log","$q","SunnyPass",function(a,b,c,d,e,f){d.debug("enter MoreCtrl"),b.wipe=function(){b.wipeInput="",b.d=e.defer(),b.d.promise.then(function(){f.wipe(),d.debug("MoreCtrl.wipe()"),b.$emit("$lockersListChange")}),b.d.promise.finally(function(){b.d=void 0,c.go("landing")})}}]),angular.module("SunnyPass.Webapp").controller("LockerAddCtrl",function(){}),angular.module("SunnyPass.Webapp").controller("LockerDetailsCtrl",["locker","Locker","$scope","$q","$log","$state",function(a,b,c,d,e,f){c.locker=a,c.locked=a.isLocked(),e.debug("locker metadata",a.metadata),c.metadataModel=angular.copy(a.metadata),c.saveMetadata=function(b){var g=[];c.metadataForm.name.$dirty&&g.push(a.saveMetadata("NAME",b.name)),c.metadataForm.description.$dirty&&g.push(a.saveMetadata("DESCRIPTION",b.description)),d.all(g).then(function(){c.$emit("$lockersListChange"),a.loadMetadata().finally(f.reload),e.debug("saved")},function(){e.debug("rejected")})}}]),angular.module("SunnyPass.Webapp").controller("LockerItemCtrl",["item","$scope","$log",function(a,b,c){c.debug("item loaded",a),b.item=a}]),angular.module("SunnyPass.Webapp").controller("LockerCtrl",["$scope","$state","locker",function(a,b,c){a.locker=c}]),angular.module("SunnyPass.Webapp").controller("RoutesCtrl",["$rootScope","$state","$log",function(a,b,c){a.$on("$stateChangeError",function(d,e,f,g,h,i){c.debug("$stateChangeError",d,e,f,g,h,i),e.name.match(/root\.locker\..*/)&&"locked"===i.message&&(a.toState=e.name||"root.locker.content",a.toParams=f,b.go("root.locker.unlock",{sharedSecret:f.sharedSecret}))})}]),angular.module("SunnyPass.Webapp").controller("LockerUnlockCtrl",["$scope","$state","$stateParams",function(a,b,c){var d=a.$root.toState||"root.locker.content";angular.extend(c,a.$root.toParams||{}),a.redirectToState=function(){console.log("redirect to",d,c),b.go(d,c)},console.log("yo",a.redirectToState)}]),angular.module("SunnyPass.Webapp").controller("LandingCtrl",["$scope","lockers","$state","Crypto","SunnyPass","$log",function(a,b,c,d,e,f){b&&b.length>0&&c.go("root.locker.content",{sharedSecret:b[0].secret.shared}),a.randomSecret=function(){a.safeSecret=d.generateKey()},a.randomSecret(),a.cancel=function(){a.randomSecret(),a.safePassword=void 0,a.action=void 0},a.create=function(){f.debug("create safe",a.safeSecret,a.safePassword),e.get(a.safeSecret).then(function(b){var d=b.unlock(a.safePassword);d.then(function(){a.$emit("$lockersListChange"),c.go("root.locker.content",{sharedSecret:b.secret.shared})},function(a){f.error("$scope.create()... FAILED... unlock rejected",a),window.alert("Unknown error ! sorry")})})}}]),angular.module("SunnyPass.Webapp").directive("spMenu",function(){return{templateUrl:"views/directives/sp-menu.html",restrict:"EA",scope:{spLockers:"="},controller:["$scope","$state","$rootScope","SunnyPass","Locker",function(a,b,c,d,e){a.$state=b,a.isActiveLocker=function(a){return a===b.params.sharedSecret},a.lockAll=function(){e.lockAll(),b.reload()},a.clearSearch=function(){a.$root.searchInput=void 0}}]}});var app=angular.module("SunnyPass.Webapp");app.directive("spLockerHeader",function(){return{templateUrl:"views/directives/sp-locker-header.html",restrict:"E",replace:!0,controller:["$scope","$state","SunnyPass",function(a,b,c){a.lock=function(){a.locker.lock(),b.reload()},a.wipe=function(){c.wipeLocker(a.locker.secret).finally(function(){a.$emit("$lockersListChange"),b.go("root.dashboard")})}}],link:function(a,b,c){a.active={content:void 0!==c.content,details:void 0!==c.details,add:void 0!==c.add}}}}),angular.module("SunnyPass.Webapp").directive("spLockerUnlock",function(){return{templateUrl:"views/directives/sp-locker-unlock.html",restrict:"EA",scope:{spLocker:"=",spRedirectToState:"="},controller:["$scope",function(a){a.unlock=function(b){return b?void a.spLocker.unlock(b).then(function(){a.spRedirectToState()},function(){a.passwordError=!0}).finally(function(){a.unlockPassword=void 0}):void(a.passwordError=!0)}}]}}),angular.module("SunnyPass.Webapp").directive("spShowHideInput",function(){return{template:'<input type="password" />',restrict:"E",replace:!0}}),angular.module("SunnyPass.Webapp").directive("spLockerItemForm",["$state","$log","$q",function(a,b,c){return{templateUrl:"views/directives/sp-locker-item-form.html",restrict:"E",scope:{spLockerItem:"&",spLocker:"&",spCancelState:"@",spSuccessState:"@",spSubmit:"="},replace:!0,controller:["$scope",function(d){d.$watch("spLockerItem()",function(a){b.debug("spLockerItem updated",a),d.item=angular.copy(a)}),d.unlockAndSave=function(e,f){function g(){return b.debug("saving...",d.spLocker()),d.spLocker().save(e)}function h(){if(f)return b.debug("unlocking..."),d.spLocker().unlock(f);b.debug("not unlocking...");var a=c.defer();return a.resolve(),a.promise}b.debug("unlockAndSave()",e,f),d.loading=!0,h().then(g,function(){d.unlockPasswordError=!0}).then(function(){d.unlockPasswordError=void 0,a.go("root.locker.content",{sharedSecret:d.spLocker().secret.shared})},function(){d.locked=!0}).finally(function(){d.loading=!1,d.unlockPassword=void 0})}}]}}]),angular.module("SunnyPass.Webapp").directive("spHeader",["Version",function(a){return{templateUrl:"views/directives/sp-header.html",restrict:"EA",link:function(b){b.version=a}}}]),angular.module("SunnyPass.Webapp").factory("Version",function(){return{type:"alpha",version:"v0.2.0"}});