(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-connect-connect-module"], {
  /***/
  "./node_modules/@ionic-native/qr-scanner/ngx/index.js":
  /*!************************************************************!*\
    !*** ./node_modules/@ionic-native/qr-scanner/ngx/index.js ***!
    \************************************************************/

  /*! exports provided: QRScanner */

  /***/
  function node_modulesIonicNativeQrScannerNgxIndexJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "QRScanner", function () {
      return QRScanner;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic-native/core */
    "./node_modules/@ionic-native/core/index.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");

    var QRScanner =
    /** @class */
    function (_super) {
      Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QRScanner, _super);

      function QRScanner() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      QRScanner.prototype.prepare = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "prepare", {
          "callbackStyle": "node"
        }, arguments);
      };

      QRScanner.prototype.scan = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "scan", {
          "callbackStyle": "node",
          "observable": true,
          "clearFunction": "cancelScan"
        }, arguments);
      };

      QRScanner.prototype.show = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "show", {}, arguments);
      };

      QRScanner.prototype.hide = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "hide", {}, arguments);
      };

      QRScanner.prototype.enableLight = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "enableLight", {
          "callbackStyle": "node"
        }, arguments);
      };

      QRScanner.prototype.destroy = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "destroy", {}, arguments);
      };

      QRScanner.prototype.disableLight = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "disableLight", {
          "callbackStyle": "node"
        }, arguments);
      };

      QRScanner.prototype.useFrontCamera = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "useFrontCamera", {
          "callbackStyle": "node"
        }, arguments);
      };

      QRScanner.prototype.useBackCamera = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "useBackCamera", {
          "callbackStyle": "node"
        }, arguments);
      };

      QRScanner.prototype.useCamera = function (camera) {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "useCamera", {
          "callbackStyle": "node"
        }, arguments);
      };

      QRScanner.prototype.pausePreview = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "pausePreview", {}, arguments);
      };

      QRScanner.prototype.resumePreview = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "resumePreview", {}, arguments);
      };

      QRScanner.prototype.getStatus = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getStatus", {}, arguments);
      };

      QRScanner.prototype.openSettings = function () {
        return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "openSettings", {
          "sync": true
        }, arguments);
      };

      QRScanner.pluginName = "QRScanner";
      QRScanner.plugin = "cordova-plugin-qrscanner";
      QRScanner.pluginRef = "QRScanner";
      QRScanner.repo = "https://github.com/bitpay/cordova-plugin-qrscanner";
      QRScanner.platforms = ["Android", "Browser", "iOS", "Windows"];
      QRScanner = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], QRScanner);
      return QRScanner;
    }(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3FyLXNjYW5uZXIvbmd4L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sOEJBQXNDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7SUFnSEgsNkJBQWlCOzs7O0lBUTlDLDJCQUFPO0lBYVAsd0JBQUk7SUFTSix3QkFBSTtJQVNKLHdCQUFJO0lBV0osK0JBQVc7SUFTWCwyQkFBTztJQVdQLGdDQUFZO0lBV1osa0NBQWM7SUFXZCxpQ0FBYTtJQVliLDZCQUFTLGFBQUMsTUFBYztJQVN4QixnQ0FBWTtJQVNaLGlDQUFhO0lBU2IsNkJBQVM7SUFVVCxnQ0FBWTs7Ozs7O0lBN0lELFNBQVM7UUFEckIsVUFBVSxFQUFFO09BQ0EsU0FBUztvQkFsSHRCO0VBa0grQixpQkFBaUI7U0FBbkMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFFSU2Nhbm5lclN0YXR1cyB7XG4gIC8qKlxuICAgKiBPbiBpT1MgYW5kIEFuZHJvaWQgNi4wKywgY2FtZXJhIGFjY2VzcyBpcyBncmFudGVkIGF0IHJ1bnRpbWUgYnkgdGhlIHVzZXIgKGJ5IGNsaWNraW5nIFwiQWxsb3dcIiBhdCB0aGUgZGlhbG9nKS5cbiAgICogVGhlIGF1dGhvcml6ZWQgcHJvcGVydHkgaXMgYSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgb25seSB3aGVuIHRoZSB1c2VyIGhhcyBhbGxvd2VkIGNhbWVyYSBhY2Nlc3MgdG8geW91ciBhcHAgKEFWQXV0aG9yaXphdGlvblN0YXR1cy5BdXRob3JpemVkKS5cbiAgICogT24gcGxhdGZvcm1zIHdpdGggcGVybWlzc2lvbnMgZ3JhbnRlZCBhdCBpbnN0YWxsIChBbmRyb2lkIHByZS02LjAsIFdpbmRvd3MgUGhvbmUpIHRoaXMgcHJvcGVydHkgaXMgYWx3YXlzIHRydWUuXG4gICAqL1xuICBhdXRob3JpemVkOiBib29sZWFuO1xuICAvKipcbiAgICogQSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgaWYgdGhlIHVzZXIgcGVybWFuZW50bHkgZGVuaWVkIGNhbWVyYSBhY2Nlc3MgdG8gdGhlIGFwcCAoQVZBdXRob3JpemF0aW9uU3RhdHVzLkRlbmllZCkuXG4gICAqIE9uY2UgZGVuaWVkLCBjYW1lcmEgYWNjZXNzIGNhbiBvbmx5IGJlIGdhaW5lZCBieSByZXF1ZXN0aW5nIHRoZSB1c2VyIGNoYW5nZSB0aGVpciBkZWNpc2lvbiAoY29uc2lkZXIgb2ZmZXJpbmcgYSBsaW5rIHRvIHRoZSBzZXR0aW5nIHZpYSBvcGVuU2V0dGluZ3MoKSkuXG4gICAqL1xuICBkZW5pZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggaXMgdHJ1ZSBpZiB0aGUgdXNlciBpcyB1bmFibGUgdG8gZ3JhbnQgcGVybWlzc2lvbnMgZHVlIHRvIHBhcmVudGFsIGNvbnRyb2xzLCBvcmdhbml6YXRpb24gc2VjdXJpdHkgY29uZmlndXJhdGlvbiBwcm9maWxlcywgb3Igc2ltaWxhciByZWFzb25zLlxuICAgKi9cbiAgcmVzdHJpY3RlZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpcyB0cnVlIGlmIFFSU2Nhbm5lciBpcyBwcmVwYXJlZCB0byBjYXB0dXJlIHZpZGVvIGFuZCByZW5kZXIgaXQgdG8gdGhlIHZpZXcuXG4gICAqL1xuICBwcmVwYXJlZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpcyB0cnVlIHdoZW4gdGhlIHByZXZpZXcgbGF5ZXIgaXMgdmlzaWJsZSAoYW5kIG9uIGFsbCBwbGF0Zm9ybXMgYnV0IGJyb3dzZXIsIHRoZSBuYXRpdmUgd2VidmlldyBiYWNrZ3JvdW5kIGlzIHRyYW5zcGFyZW50KS5cbiAgICovXG4gIHNob3dpbmc6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggaXMgdHJ1ZSBpZiBRUlNjYW5uZXIgaXMgYWN0aXZlbHkgc2Nhbm5pbmcgZm9yIGEgUVIgY29kZS5cbiAgICovXG4gIHNjYW5uaW5nOiBib29sZWFuO1xuICAvKipcbiAgICogQSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgaWYgUVJTY2FubmVyIGlzIGRpc3BsYXlpbmcgYSBsaXZlIHByZXZpZXcgZnJvbSB0aGUgZGV2aWNlJ3MgY2FtZXJhLiBTZXQgdG8gZmFsc2Ugd2hlbiB0aGUgcHJldmlldyBpcyBwYXVzZWQuXG4gICAqL1xuICBwcmV2aWV3aW5nOiBib29sZWFuO1xuICAvKipcbiAgICogQSBib29sZWFuIHZhbHVlIHdoaWNoIGlzIHRydWUgaWYgdGhlIGxpZ2h0IGlzIGVuYWJsZWQuXG4gICAqL1xuICBsaWdodEVuYWJsZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggaXMgdHJ1ZSBvbmx5IGlmIHRoZSB1c2Vycycgb3BlcmF0aW5nIHN5c3RlbSBpcyBhYmxlIHRvIFFSU2Nhbm5lci5vcGVuU2V0dGluZ3MoKS5cbiAgICovXG4gIGNhbk9wZW5TZXR0aW5nczogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpcyB0cnVlIG9ubHkgaWYgdGhlIHVzZXJzJyBkZXZpY2UgY2FuIGVuYWJsZSBhIGxpZ2h0IGluIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnRDYW1lcmEuXG4gICAqL1xuICBjYW5FbmFibGVMaWdodDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpcyB0cnVlIG9ubHkgaWYgdGhlIGN1cnJlbnQgZGV2aWNlIFwic2hvdWxkXCIgaGF2ZSBhIGZyb250IGNhbWVyYS5cbiAgICogVGhlIGNhbWVyYSBtYXkgc3RpbGwgbm90IGJlIGNhcHR1cmFibGUsIHdoaWNoIHdvdWxkIGVtaXQgZXJyb3IgY29kZSAzLCA0LCBvciA1IHdoZW4gdGhlIHN3aXRjaCBpcyBhdHRlbXB0ZWQuXG4gICAqIChPbiB0aGUgYnJvd3NlciBwbGF0Zm9ybSwgdGhpcyB2YWx1ZSBpcyBmYWxzZSB1bnRpbCB0aGUgcHJlcGFyZSBtZXRob2QgaXMgY2FsbGVkLilcbiAgICovXG4gIGNhbkNoYW5nZUNhbWVyYTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnRDYW1lcmEuIDAgaXMgdGhlIGJhY2sgY2FtZXJhLCAxIGlzIHRoZSBmcm9udC5cbiAgICovXG4gIGN1cnJlbnRDYW1lcmE6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBAbmFtZSBRUiBTY2FubmVyXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgZmFzdCwgZW5lcmd5IGVmZmljaWVudCwgaGlnaGx5LWNvbmZpZ3VyYWJsZSBRUiBjb2RlIHNjYW5uZXIgZm9yIENvcmRvdmEgYXBwcy5cbiAqXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogYGNvcmRvdmEtcGx1Z2luLXFyc2Nhbm5lcmAuIEZvciBtb3JlIGluZm8sIHBsZWFzZSBzZWUgdGhlIFtRUiBTY2FubmVyIHBsdWdpbiBkb2NzXShodHRwczovL2dpdGh1Yi5jb20vYml0cGF5L2NvcmRvdmEtcGx1Z2luLXFyc2Nhbm5lcikuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBRUlNjYW5uZXIsIFFSU2Nhbm5lclN0YXR1cyB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvcXItc2Nhbm5lci9uZ3gnO1xuICpcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIHFyU2Nhbm5lcjogUVJTY2FubmVyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiAvLyBPcHRpb25hbGx5IHJlcXVlc3QgdGhlIHBlcm1pc3Npb24gZWFybHlcbiAqIHRoaXMucXJTY2FubmVyLnByZXBhcmUoKVxuICogICAudGhlbigoc3RhdHVzOiBRUlNjYW5uZXJTdGF0dXMpID0+IHtcbiAqICAgICAgaWYgKHN0YXR1cy5hdXRob3JpemVkKSB7XG4gKiAgICAgICAgLy8gY2FtZXJhIHBlcm1pc3Npb24gd2FzIGdyYW50ZWRcbiAqXG4gKlxuICogICAgICAgIC8vIHN0YXJ0IHNjYW5uaW5nXG4gKiAgICAgICAgbGV0IHNjYW5TdWIgPSB0aGlzLnFyU2Nhbm5lci5zY2FuKCkuc3Vic2NyaWJlKCh0ZXh0OiBzdHJpbmcpID0+IHtcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKCdTY2FubmVkIHNvbWV0aGluZycsIHRleHQpO1xuICpcbiAqICAgICAgICAgIHRoaXMucXJTY2FubmVyLmhpZGUoKTsgLy8gaGlkZSBjYW1lcmEgcHJldmlld1xuICogICAgICAgICAgc2NhblN1Yi51bnN1YnNjcmliZSgpOyAvLyBzdG9wIHNjYW5uaW5nXG4gKiAgICAgICAgfSk7XG4gKlxuICogICAgICB9IGVsc2UgaWYgKHN0YXR1cy5kZW5pZWQpIHtcbiAqICAgICAgICAvLyBjYW1lcmEgcGVybWlzc2lvbiB3YXMgcGVybWFuZW50bHkgZGVuaWVkXG4gKiAgICAgICAgLy8geW91IG11c3QgdXNlIFFSU2Nhbm5lci5vcGVuU2V0dGluZ3MoKSBtZXRob2QgdG8gZ3VpZGUgdGhlIHVzZXIgdG8gdGhlIHNldHRpbmdzIHBhZ2VcbiAqICAgICAgICAvLyB0aGVuIHRoZXkgY2FuIGdyYW50IHRoZSBwZXJtaXNzaW9uIGZyb20gdGhlcmVcbiAqICAgICAgfSBlbHNlIHtcbiAqICAgICAgICAvLyBwZXJtaXNzaW9uIHdhcyBkZW5pZWQsIGJ1dCBub3QgcGVybWFuZW50bHkuIFlvdSBjYW4gYXNrIGZvciBwZXJtaXNzaW9uIGFnYWluIGF0IGEgbGF0ZXIgdGltZS5cbiAqICAgICAgfVxuICogICB9KVxuICogICAuY2F0Y2goKGU6IGFueSkgPT4gY29uc29sZS5sb2coJ0Vycm9yIGlzJywgZSkpO1xuICpcbiAqXG4gKiBgYGBcbiAqIEBpbnRlcmZhY2VzXG4gKiBRUlNjYW5uZXJTdGF0dXNcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdRUlNjYW5uZXInLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1xcnNjYW5uZXInLFxuICBwbHVnaW5SZWY6ICdRUlNjYW5uZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2JpdHBheS9jb3Jkb3ZhLXBsdWdpbi1xcnNjYW5uZXInLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdCcm93c2VyJywgJ2lPUycsICdXaW5kb3dzJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUVJTY2FubmVyIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogUmVxdWVzdCBwZXJtaXNzaW9uIHRvIHVzZSBRUiBzY2FubmVyLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnXG4gIH0pXG4gIHByZXBhcmUoKTogUHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB0aGlzIG1ldGhvZCB0byBlbmFibGUgc2Nhbm5pbmcuIFlvdSBtdXN0IHRoZW4gY2FsbCB0aGUgYHNob3dgIG1ldGhvZCB0byBtYWtlIHRoZSBjYW1lcmEgcHJldmlldyB2aXNpYmxlLlxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHN0cmluZz59IHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBzY2FubmVkIHRleHQuIFVuc3Vic2NyaWJlIGZyb20gdGhlIG9ic2VydmFibGUgdG8gc3RvcCBzY2FubmluZy5cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZScsXG4gICAgb2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBjbGVhckZ1bmN0aW9uOiAnY2FuY2VsU2NhbidcbiAgfSlcbiAgc2NhbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBuYXRpdmUgd2VidmlldyB0byBoYXZlIGEgdHJhbnNwYXJlbnQgYmFja2dyb3VuZCwgdGhlbiBzZXRzIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSA8Ym9keT4gYW5kIDxodG1sPiBET00gZWxlbWVudHMgdG8gdHJhbnNwYXJlbnQsIGFsbG93aW5nIHRoZSB3ZWJ2aWV3IHRvIHJlLXJlbmRlciB3aXRoIHRoZSB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBzaG93KCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIG5hdGl2ZSB3ZWJ2aWV3IHRvIGJlIG9wYXF1ZSB3aXRoIGEgd2hpdGUgYmFja2dyb3VuZCwgY292ZXJpbmcgdGhlIHZpZGVvIHByZXZpZXcuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGhpZGUoKTogUHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogRW5hYmxlIHRoZSBkZXZpY2UncyBsaWdodCAoZm9yIHNjYW5uaW5nIGluIGxvdy1saWdodCBlbnZpcm9ubWVudHMpLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdub2RlJ1xuICB9KVxuICBlbmFibGVMaWdodCgpOiBQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBzY2FubmVyIGluc3RhbmNlLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBkZXN0cm95KCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc2FibGUgdGhlIGRldmljZSdzIGxpZ2h0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ25vZGUnXG4gIH0pXG4gIGRpc2FibGVMaWdodCgpOiBQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgZnJvbnQgY2FtZXJhXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgdXNlRnJvbnRDYW1lcmEoKTogUHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogVXNlIGJhY2sgY2FtZXJhXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgdXNlQmFja0NhbWVyYSgpOiBQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgY2FtZXJhIHRvIGJlIHVzZWQuXG4gICAqIEBwYXJhbSBjYW1lcmEge251bWJlcn0gUHJvdmlkZSBgMGAgZm9yIGJhY2sgY2FtZXJhLCBhbmQgYDFgIGZvciBmcm9udCBjYW1lcmEuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnbm9kZSdcbiAgfSlcbiAgdXNlQ2FtZXJhKGNhbWVyYTogbnVtYmVyKTogUHJvbWlzZTxRUlNjYW5uZXJTdGF0dXM+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIHRoZSB2aWRlbyBwcmV2aWV3IG9uIHRoZSBjdXJyZW50IGZyYW1lIGFuZCBwYXVzZXMgc2Nhbm5pbmcuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcGF1c2VQcmV2aWV3KCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3Vtc2UgdGhlIHZpZGVvIHByZXZpZXcgYW5kIHJlc3VtZXMgc2Nhbm5pbmcuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcmVzdW1lUHJldmlldygpOiBQcm9taXNlPFFSU2Nhbm5lclN0YXR1cz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHBlcm1pc3Npb24gc3RhdHVzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UVJTY2FubmVyU3RhdHVzPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0U3RhdHVzKCk6IFByb21pc2U8UVJTY2FubmVyU3RhdHVzPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHNldHRpbmdzIHRvIGVkaXQgYXBwIHBlcm1pc3Npb25zLlxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN5bmM6IHRydWVcbiAgfSlcbiAgb3BlblNldHRpbmdzKCk6IHZvaWQge31cbn1cbiJdfQ==

    /***/

  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/add-robot-button/add-robot-button.component.html":
  /*!*******************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/add-robot-button/add-robot-button.component.html ***!
    \*******************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsAddRobotButtonAddRobotButtonComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-fab-button color=\"tertiary\">\n  <ion-icon name=\"add\"></ion-icon>\n</ion-fab-button>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/robot-card/robot-card.component.html":
  /*!*******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/robot-card/robot-card.component.html ***!
    \*******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsRobotCardRobotCardComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-card id=\"card\" style=\"opacity:0.5\">\n  <ion-item  (click)=\"connect()\">\n    <ion-icon slot=\"start\" src=\"../../assets/icon/robot.svg\"></ion-icon>\n    <ion-label>{{ robot.alias }}</ion-label>\n    <ion-badge *ngIf=\"connected\" color=\"success\">CONNECTED</ion-badge>\n    <ion-icon slot=\"end\" name=\"battery-full\"></ion-icon>\n  </ion-item>\n\n  <ion-item>\n    <ion-icon slot=\"start\" name=\"speedometer\">{{ speed }}</ion-icon> \n    \n      <ion-badge color=\"secondary\" id=\"low\" class=\"speedSelectors\" (click)=\"changeSpeed(this, 'low')\">LOW</ion-badge>\n      <ion-badge color=\"warning\" id=\"medium\" class=\"speedSelectors\" (click)=\"changeSpeed(this, 'medium')\">MEDIUM</ion-badge>\n      <ion-badge color=\"danger\" id=\"fast\" class=\"speedSelectors\" (click)=\"changeSpeed(this, 'fast')\">FAST</ion-badge>\n\n    <!-- <ion-range color=\"secondary\" [(ngModel)]=\"speed\" min=\"1\" max=\"5\" step=\"1\"> \n    </ion-range> -->\n  </ion-item>\n\n  <ion-card-content> <strong>ID:</strong> {{ robot.id }}</ion-card-content>\n</ion-card>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/robot-list/robot-list.component.html":
  /*!*******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/robot-list/robot-list.component.html ***!
    \*******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsRobotListRobotListComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-robot-card\n  *ngFor=\"let robot of robots\"\n  [robot]=\"robot\"\n  (click)=\"presentModal(robot)\"\n></app-robot-card>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/connect.page.html":
  /*!***************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/connect.page.html ***!
    \***************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesConnectConnectPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-robot-list [robot$]=\"robots\"></app-robot-list>\n\n<ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" type=\"button\">\n  <app-add-robot-button (click)=\"goToQrScan()\"></app-add-robot-button>\n</ion-fab>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/edit-robot/edit-robot.page.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/edit-robot/edit-robot.page.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesEditRobotEditRobotPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button\n        (click)=\"closeModal(false)\"\n        defaultHref=\"connect\"\n      ></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{robot.alias}}</ion-title>\n    <ion-button fill=\"outline\" slot=\"end\">connect</ion-button>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item color=\"medium-shade\">\n    <ion-label position=\"fixed\" disabled>ID: {{robot.id}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Alias:</ion-label>\n    <ion-input [(ngModel)]=\"robot.alias\"></ion-input>\n  </ion-item>\n\n  <ion-button (click)=\"saveChanges()\" expand=\"block\" color=\"secondary\"\n    >save</ion-button\n  >\n  <ion-button\n    *ngIf=\"robot.alias\"\n    (click)=\"deleteRobot(robot.id)\"\n    expand=\"block\"\n    color=\"danger\"\n    >remove</ion-button\n  >\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/components/add-robot-button/add-robot-button.component.ts":
  /*!***************************************************************************!*\
    !*** ./src/app/components/add-robot-button/add-robot-button.component.ts ***!
    \***************************************************************************/

  /*! exports provided: AddRobotButtonComponent */

  /***/
  function srcAppComponentsAddRobotButtonAddRobotButtonComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AddRobotButtonComponent", function () {
      return AddRobotButtonComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let AddRobotButtonComponent = class AddRobotButtonComponent {
      constructor() {}

      ngOnInit() {}

    };
    AddRobotButtonComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-add-robot-button",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./add-robot-button.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/add-robot-button/add-robot-button.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], AddRobotButtonComponent);
    /***/
  },

  /***/
  "./src/app/components/robot-card/robot-card.component.scss":
  /*!*****************************************************************!*\
    !*** ./src/app/components/robot-card/robot-card.component.scss ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsRobotCardRobotCardComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "ion-badge {\n  --padding-top: 8px;\n}\n\n.selected {\n  border: 1px solid black;\n  opacity: 1 !important;\n}\n\n.speedSelectors {\n  width: 30%;\n  color: white;\n  margin: 0 5px;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RpYW5hL0RvY3VtZW50b3MvUm9ib3RpY2EvSmlua29Sb2JvdGljcy9qaW5rb2JvdC9zcmMvYXBwL2NvbXBvbmVudHMvcm9ib3QtY2FyZC9yb2JvdC1jYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21wb25lbnRzL3JvYm90LWNhcmQvcm9ib3QtY2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FDQ0o7O0FERUU7RUFDRSx1QkFBQTtFQUNBLHFCQUFBO0FDQ0o7O0FERUU7RUFDRSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3JvYm90LWNhcmQvcm9ib3QtY2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1iYWRnZSB7XG4gICAgLS1wYWRkaW5nLXRvcDogOHB4O1xuICB9XG5cbiAgLnNlbGVjdGVkIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuc3BlZWRTZWxlY3RvcnMge1xuICAgIHdpZHRoOjMwJTtcbiAgICBjb2xvcjp3aGl0ZTtcbiAgICBtYXJnaW46IDAgNXB4O1xuICAgIG9wYWNpdHk6MC41O1xuICB9XG5cbiAgIiwiaW9uLWJhZGdlIHtcbiAgLS1wYWRkaW5nLXRvcDogOHB4O1xufVxuXG4uc2VsZWN0ZWQge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xufVxuXG4uc3BlZWRTZWxlY3RvcnMge1xuICB3aWR0aDogMzAlO1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbjogMCA1cHg7XG4gIG9wYWNpdHk6IDAuNTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/components/robot-card/robot-card.component.ts":
  /*!***************************************************************!*\
    !*** ./src/app/components/robot-card/robot-card.component.ts ***!
    \***************************************************************/

  /*! exports provided: RobotCardComponent */

  /***/
  function srcAppComponentsRobotCardRobotCardComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RobotCardComponent", function () {
      return RobotCardComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let RobotCardComponent = class RobotCardComponent {
      constructor() {
        this.connected = false;
        this.speeds = {
          low: 0.5,
          medium: 1.5,
          fast: 3
        };
      }

      ngOnInit() {}

      connect() {
        console.log("Robot " + this.robot.alias + ' contectado;');
        let card = document.getElementById("card");
        card.style.opacity = '1';
        card.style.border = "1px solid #107a8b";
        this.connected = true;
      }

      changeSpeed(element, speedString) {
        this.badgetsSpeedInit();
        console.log(element);
        element.speed = this.speeds[speedString];
        let badget = document.getElementById(speedString);
        console.log(badget);
        badget.classList.add('selected');
      }

      badgetsSpeedInit() {
        let low = document.getElementById('low');
        let medium = document.getElementById('medium');
        let fast = document.getElementById('fast');
        low.classList.remove('selected');
        medium.classList.remove('selected');
        fast.classList.remove('selected');
      }

    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)], RobotCardComponent.prototype, "robot", void 0);
    RobotCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-robot-card",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./robot-card.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/robot-card/robot-card.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./robot-card.component.scss */
      "./src/app/components/robot-card/robot-card.component.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], RobotCardComponent);
    /***/
  },

  /***/
  "./src/app/components/robot-list/robot-list.component.ts":
  /*!***************************************************************!*\
    !*** ./src/app/components/robot-list/robot-list.component.ts ***!
    \***************************************************************/

  /*! exports provided: RobotListComponent */

  /***/
  function srcAppComponentsRobotListRobotListComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RobotListComponent", function () {
      return RobotListComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var src_app_pages_edit_robot_edit_robot_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/pages/edit-robot/edit-robot.page */
    "./src/app/pages/edit-robot/edit-robot.page.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/services/storage.service */
    "./src/app/services/storage.service.ts");

    let RobotListComponent = class RobotListComponent {
      constructor(modalCtrl, storage) {
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.robots = [];
      }

      ngOnInit() {
        this.robot$.subscribe(data => {
          this.robots = data;
        });
      }

      ngOnChanges() {
        this.ngOnInit();
      }

      presentModal(robot) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
          const modal = yield this.modalCtrl.create({
            component: src_app_pages_edit_robot_edit_robot_page__WEBPACK_IMPORTED_MODULE_3__["EditRobotPage"],
            componentProps: {
              robot
            }
          });
          yield modal.present();
          const {
            data
          } = yield modal.onDidDismiss();
          this.closeModal(data.savedChanges);
        });
      }

      closeModal(data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
          data && (this.robot$ = this.storage.getRobots());
        });
      }

    };

    RobotListComponent.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"]
    }, {
      type: src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"]
    }];

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])], RobotListComponent.prototype, "robot$", void 0);
    RobotListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-robot-list",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./robot-list.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/robot-list/robot-list.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"], src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"]])], RobotListComponent);
    /***/
  },

  /***/
  "./src/app/pages/connect/connect.module.ts":
  /*!*************************************************!*\
    !*** ./src/app/pages/connect/connect.module.ts ***!
    \*************************************************/

  /*! exports provided: ConnectPageModule */

  /***/
  function srcAppPagesConnectConnectModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConnectPageModule", function () {
      return ConnectPageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _connect_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./connect.page */
    "./src/app/pages/connect/connect.page.ts");
    /* harmony import */


    var _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @ionic-native/qr-scanner/ngx */
    "./node_modules/@ionic-native/qr-scanner/ngx/index.js");
    /* harmony import */


    var src_app_components_add_robot_button_add_robot_button_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! src/app/components/add-robot-button/add-robot-button.component */
    "./src/app/components/add-robot-button/add-robot-button.component.ts");
    /* harmony import */


    var _edit_robot_edit_robot_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../edit-robot/edit-robot.page */
    "./src/app/pages/edit-robot/edit-robot.page.ts");
    /* harmony import */


    var _ionic_storage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @ionic/storage */
    "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
    /* harmony import */


    var src_app_components_robot_list_robot_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! src/app/components/robot-list/robot-list.component */
    "./src/app/components/robot-list/robot-list.component.ts");
    /* harmony import */


    var src_app_components_robot_card_robot_card_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! src/app/components/robot-card/robot-card.component */
    "./src/app/components/robot-card/robot-card.component.ts");

    let ConnectPageModule = class ConnectPageModule {};
    ConnectPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
      imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{
        path: "",
        component: _connect_page__WEBPACK_IMPORTED_MODULE_6__["ConnectPage"]
      }])],
      declarations: [_connect_page__WEBPACK_IMPORTED_MODULE_6__["ConnectPage"], _edit_robot_edit_robot_page__WEBPACK_IMPORTED_MODULE_9__["EditRobotPage"], src_app_components_robot_list_robot_list_component__WEBPACK_IMPORTED_MODULE_11__["RobotListComponent"], src_app_components_add_robot_button_add_robot_button_component__WEBPACK_IMPORTED_MODULE_8__["AddRobotButtonComponent"], src_app_components_robot_card_robot_card_component__WEBPACK_IMPORTED_MODULE_12__["RobotCardComponent"]],
      entryComponents: [_edit_robot_edit_robot_page__WEBPACK_IMPORTED_MODULE_9__["EditRobotPage"], src_app_components_robot_card_robot_card_component__WEBPACK_IMPORTED_MODULE_12__["RobotCardComponent"]],
      providers: [_ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_7__["QRScanner"], _ionic_storage__WEBPACK_IMPORTED_MODULE_10__["IonicStorageModule"]]
    })], ConnectPageModule);
    /***/
  },

  /***/
  "./src/app/pages/connect/connect.page.ts":
  /*!***********************************************!*\
    !*** ./src/app/pages/connect/connect.page.ts ***!
    \***********************************************/

  /*! exports provided: ConnectPage */

  /***/
  function srcAppPagesConnectConnectPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConnectPage", function () {
      return ConnectPage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _pages_edit_robot_edit_robot_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../pages/edit-robot/edit-robot.page */
    "./src/app/pages/edit-robot/edit-robot.page.ts");
    /* harmony import */


    var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/services/storage.service */
    "./src/app/services/storage.service.ts");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @ionic-native/qr-scanner/ngx */
    "./node_modules/@ionic-native/qr-scanner/ngx/index.js");

    let ConnectPage = class ConnectPage {
      constructor(modalCtrl, storage, qrScanCtrl) {
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.qrScanCtrl = qrScanCtrl;
        this.robots = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"]();
        this.encodedData = "";
        this.isOn = false;
        this.robots = this.storage.getRobots();
      }

      presentModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
          const modal = yield this.modalCtrl.create({
            component: _pages_edit_robot_edit_robot_page__WEBPACK_IMPORTED_MODULE_3__["EditRobotPage"],
            componentProps: {
              robot: {
                id: this.scannedText,
                alias: ""
              }
            }
          });
          yield modal.present();
          const {
            data
          } = yield modal.onDidDismiss();
          this.closeModal(data.savedChanges);
        });
      }

      goToQrScan() {
        this.qrScanCtrl.prepare().then(status => {
          if (status.authorized) {
            // camera permission was granted
            this.isOn = true; // start scanning

            const scanSub = this.qrScanCtrl.scan().subscribe(text => {
              console.log("Scanned something", text);
              this.isOn = false;
              this.QRSCANNED_DATA = text;

              if (this.QRSCANNED_DATA !== "") {
                this.scannedText = text;
                this.closeScanner();
                scanSub.unsubscribe();
                this.presentModal();
              }
            });
            this.qrScanCtrl.show();
          } else if (status.denied) {
            console.log("camera permission denied");
            this.qrScanCtrl.openSettings();
          } else {}
        }).catch(e => console.log("Error is", e));
      }

      closeScanner() {
        this.isOn = false;
        this.qrScanCtrl.hide();
        this.qrScanCtrl.destroy();
      }

      closeModal(data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
          data && (this.robots = this.storage.getRobots());
        });
      }

    };

    ConnectPage.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
    }, {
      type: src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"]
    }, {
      type: _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_6__["QRScanner"]
    }];

    ConnectPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./connect.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/connect.page.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"], _ionic_native_qr_scanner_ngx__WEBPACK_IMPORTED_MODULE_6__["QRScanner"]])], ConnectPage);
    /***/
  },

  /***/
  "./src/app/pages/edit-robot/edit-robot.page.ts":
  /*!*****************************************************!*\
    !*** ./src/app/pages/edit-robot/edit-robot.page.ts ***!
    \*****************************************************/

  /*! exports provided: EditRobotPage */

  /***/
  function srcAppPagesEditRobotEditRobotPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditRobotPage", function () {
      return EditRobotPage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/storage.service */
    "./src/app/services/storage.service.ts");

    let EditRobotPage = class EditRobotPage {
      constructor(modalCtrl, storage) {
        this.modalCtrl = modalCtrl;
        this.storage = storage;
      }

      ngOnInit() {}

      ngOnChange(changes) {
        console.log(changes);
      }

      closeModal(savedChanges) {
        this.modalCtrl.dismiss({
          savedChanges
        });
      }

      saveChanges() {
        this.storage.pushRobot(this.robot.id, this.robot.alias);
        this.closeModal(true);
      }

      deleteRobot(id) {
        this.storage.removeRobot(id);
        this.closeModal(true);
      }

    };

    EditRobotPage.ctorParameters = () => [{
      type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
    }, {
      type: src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"]
    }];

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)], EditRobotPage.prototype, "robot", void 0);
    EditRobotPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-edit-robot",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./edit-robot.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/edit-robot/edit-robot.page.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"]])], EditRobotPage);
    /***/
  },

  /***/
  "./src/app/services/storage.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/services/storage.service.ts ***!
    \*********************************************/

  /*! exports provided: StorageService */

  /***/
  function srcAppServicesStorageServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StorageService", function () {
      return StorageService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _ionic_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @ionic/storage */
    "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let StorageService = class StorageService {
      constructor(storage) {
        this.storage = storage;
      }

      pushRobot(id, alias) {
        let existRobot;
        this.robots.forEach(robot => {
          robot.id.includes(id) && (robot.alias = alias) && (existRobot = true);
        });
        existRobot ? null : this.robots.push({
          id,
          alias
        });
        this.storage.set("robots", this.robots);
      }

      removeRobot(id) {
        this.robots.forEach((robot, index) => {
          robot.id.includes(id) && this.robots.splice(index);
        });
        this.storage.set("robots", this.robots);
      }

      getRobots() {
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](observer => {
          this.storage.get("robots").then(data => {
            data ? (this.robots = data) && observer.next(this.robots) : this.robots = [];
          }).catch(error => observer.error(error));
        });
      }

    };

    StorageService.ctorParameters = () => [{
      type: _ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"]
    }];

    StorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
      providedIn: "root"
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"]])], StorageService);
    /***/
  }
}]);
//# sourceMappingURL=pages-connect-connect-module-es5.js.map