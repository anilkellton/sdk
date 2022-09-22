var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SuperMojoType_appUrl, _SuperMojoType_apiKey, _SuperMojoType_className, _SuperMojoType_buttonId, _SuperMojoType_buttonText, _SuperMojoType_callbackResponse, _SuperMojoType_referenceId, _SuperMojoType_customerId, _SuperMojoType_contractAddress, _SuperMojoType_tokenId, _SuperMojoType_type, _SuperMojoType_redirectUrl;
var SuperMojoType = /** @class */ (function () {
  function SuperMojoType(data) {
    var _this = this;
    _SuperMojoType_appUrl.set(this, void 0);
    _SuperMojoType_apiKey.set(this, void 0);
    _SuperMojoType_className.set(this, void 0);
    _SuperMojoType_buttonId.set(this, void 0);
    _SuperMojoType_buttonText.set(this, void 0);
    _SuperMojoType_callbackResponse.set(this, void 0);
    _SuperMojoType_referenceId.set(this, void 0);
    _SuperMojoType_customerId.set(this, void 0);
    _SuperMojoType_contractAddress.set(this, void 0);
    _SuperMojoType_tokenId.set(this, void 0);
    _SuperMojoType_type.set(this, void 0);
    _SuperMojoType_redirectUrl.set(this, void 0);
    /**
   * Method will initialize the sdk, check and validate the api key.
   * @param {string} option
   */
    this.init = function (option) {
      if (!option.customerId) {
        return "please provide api key.";
      }
      __classPrivateFieldSet(_this, _SuperMojoType_customerId, option.customerId, "f");
      __classPrivateFieldSet(_this, _SuperMojoType_redirectUrl, option.redirectUrl, "f");
      __classPrivateFieldSet(_this, _SuperMojoType_contractAddress, option.contractAddress, "f");
      __classPrivateFieldSet(_this, _SuperMojoType_referenceId, option.referenceId, "f");
      __classPrivateFieldSet(_this, _SuperMojoType_tokenId, option.tokenId, "f");
      __classPrivateFieldSet(_this, _SuperMojoType_type, option.type, "f");
    };
    /**
    * Method will initialize the sdk, check and validate the api key.
    * @param {string} apiKey
    * @param {string} name
    * @param {string} callbackResponse
    * @param {string} className
    * @param {string} buttonText
    */
    this.renderButton = function (_a) {
      var callbackResponse = _a.callbackResponse, className = _a.className, buttonId = _a.buttonId, buttonText = _a.buttonText;
      _this.validateApiKey(callbackResponse);
      var options = {
        referenceId: __classPrivateFieldGet(_this, _SuperMojoType_referenceId, "f"),
        customerId: __classPrivateFieldGet(_this, _SuperMojoType_customerId, "f"),
        contractAddress: __classPrivateFieldGet(_this, _SuperMojoType_contractAddress, "f"),
        tokenId: __classPrivateFieldGet(_this, _SuperMojoType_tokenId, "f"),
        type: __classPrivateFieldGet(_this, _SuperMojoType_type, "f"),
        redirectUrl: __classPrivateFieldGet(_this, _SuperMojoType_redirectUrl, "f")
      };
      var btn = document.createElement('button');
      btn.onclick = function () { return _this.openWindow(options, callbackResponse); };
      btn.id = buttonId || "supermojo-pay-button";
      btn.textContent = buttonText || "Pay with SuperMojo";
      btn.classList.add("supermojo-btn-wrapper");
      if (className)
        btn.classList.add(className);
      document.body.appendChild(btn);
    };
    this.validateApiKey = function (callback) {
      if (!__classPrivateFieldGet(_this, _SuperMojoType_customerId, "f")) {
        return callback({ status: "FAILED", event: null, data: { message: "Please provide api key" } });
      }
    };
    /**
     * Method is used to render the iframe and target the app url.
     * @param {string} id
     * @param {string} name
     * @param {string} callbackResponse
     */
    this.openWindow = function (options, callbackResponse) {
      console.log("api key ", __classPrivateFieldGet(_this, _SuperMojoType_apiKey, "f"));
      var url = __classPrivateFieldGet(_this, _SuperMojoType_appUrl, "f");
      var div = document.createElement('div');
      div.id = "#iframe-container";
      div.classList.add("container-div");
      var iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.referrerPolicy = "strict-origin-when-cross-origin"
      div.appendChild(iframe);
      document.body.appendChild(div);
      _this.eventListner(callbackResponse);
      console.log("window", window.location, window.parent.location)
      iframe.onload = function () {
        iframe.contentWindow.postMessage(JSON.stringify(options), __classPrivateFieldGet(_this, _SuperMojoType_appUrl, "f"));
        iframe.height = "";
        iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
      };
    };
    this.eventListner = function (callbackResponse) {
      window.addEventListener('message', function (event) {
        var case_ = "cancel";
        switch (case_) {
          case case_:
            _this.onCloseIframe(callbackResponse, event.data);
            return;
            break;
          default:
            break;
        }
      });
    };
    this.onCloseIframe = function (callbackResponse, response) {
      callbackResponse(response);
      document.getElementById("#iframe-container").remove();
      return;
    };
    __classPrivateFieldSet(this, _SuperMojoType_apiKey, data === null || data === void 0 ? void 0 : data.apiKey, "f");
    __classPrivateFieldSet(this, _SuperMojoType_className, data === null || data === void 0 ? void 0 : data.className, "f");
    __classPrivateFieldSet(this, _SuperMojoType_buttonId, data === null || data === void 0 ? void 0 : data.buttonId, "f");
    __classPrivateFieldSet(this, _SuperMojoType_buttonText, data === null || data === void 0 ? void 0 : data.buttonText, "f");
    __classPrivateFieldSet(this, _SuperMojoType_callbackResponse, data === null || data === void 0 ? void 0 : data.callbackResponse, "f");
    __classPrivateFieldSet(this, _SuperMojoType_customerId, "", "f");
    __classPrivateFieldSet(this, _SuperMojoType_contractAddress, "", "f");
    __classPrivateFieldSet(this, _SuperMojoType_tokenId, "", "f");
    __classPrivateFieldSet(this, _SuperMojoType_type, "", "f");
    __classPrivateFieldSet(this, _SuperMojoType_redirectUrl, "", "f");
    __classPrivateFieldSet(this, _SuperMojoType_appUrl, "https://groovy-events-front.vercel.app/", "f");
    var styles = "\n    .supermojo-btn-wrapper{\n      border:none;\n      color:#fff;\n      background: #1A73E8;\n      border-radius: 5px;\n      width: 300px;\n      font-size: 16px;\n      font-family: Arial, Helvetica, sans-serif;\n      height: 50px;\n      font-weight: 500;\n      cursor: pointer;\n      box-shadow: 0 3px 3px rgba(0,0,0,.2);\n    }\n    .container-div{\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        text-align: center;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: #1c18189e;\n      }\n      iframe{\n        max-width: 460px;\n        width: 95%;\n        margin: 50px auto 20px;\n        height: 650px;\n        border: none;\n      }\n    ";
    var styleSheet = document.createElement("style");
    styleSheet["innerText"] = styles;
    document.head.appendChild(styleSheet);
  }
  return SuperMojoType;
}());
_SuperMojoType_appUrl = new WeakMap(), _SuperMojoType_apiKey = new WeakMap(), _SuperMojoType_className = new WeakMap(), _SuperMojoType_buttonId = new WeakMap(), _SuperMojoType_buttonText = new WeakMap(), _SuperMojoType_callbackResponse = new WeakMap(), _SuperMojoType_referenceId = new WeakMap(), _SuperMojoType_customerId = new WeakMap(), _SuperMojoType_contractAddress = new WeakMap(), _SuperMojoType_tokenId = new WeakMap(), _SuperMojoType_type = new WeakMap(), _SuperMojoType_redirectUrl = new WeakMap();
