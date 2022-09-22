
interface SuperMojoType extends OptionProps {
  apiKey: string;
  clientId: string;
}

interface OptionProps {
  className?: string;
  buttonId?: string;
  buttonText?: string;
  callbackResponse?: any;
}

interface buttonProps extends SuperMojoType {
  id?: string;
  name?: string;
}


interface CreateCheckout {
  referenceId: string;
  customerId: string;
  contractAddress: string;
  tokenId: string;
  type: string;
  redirectUrl?: string;
}

class SuperMojoType {
  #appUrl: string;
  #apiKey: string;
  #className?: string;
  #buttonId?: string;
  #buttonText?: string;
  #callbackResponse?: any;
  #referenceId: string;
  #customerId: string;
  #contractAddress: string;
  #tokenId: string;
  #type: string;
  #redirectUrl?: string;
  #clientId: string
  constructor(data: SuperMojoType) {
    this.#apiKey = data?.apiKey;
    this.#className = data?.className;
    this.#buttonId = data?.buttonId;
    this.#buttonText = data?.buttonText;
    this.#callbackResponse = data?.callbackResponse;
    this.#customerId = "";
    this.#clientId = "";
    this.#contractAddress = "";
    this.#tokenId = "";
    this.#type = "";
    this.#redirectUrl = "";
    this.#appUrl = `http://localhost:4000`;

    var styles = `
    .supermojo-btn-wrapper{
      border:none;
      color:#fff;
      background: #1A73E8;
      border-radius: 5px;
      width: 300px;
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
      height: 50px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 3px 3px rgba(0,0,0,.2);
    }
    .container-div{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1c18189e;
      }
      iframe{
        max-width: 460px;
        width: 95%;
        margin: 50px auto 20px;
        height: 650px;
        border: none;
      }
    `

    var styleSheet = document.createElement("style")
    styleSheet["innerText"] = styles
    document.head.appendChild(styleSheet)
  }

  /**
 * Method will initialize the sdk, check and validate the api key.
 * @param {string} option
 */
  init = (option: CreateCheckout) => {
    if (!option.customerId) {
      return "please provide api key."
    }
    this.#customerId = option.customerId
    this.#redirectUrl = option.redirectUrl
    this.#contractAddress = option.contractAddress
    this.#referenceId = option.referenceId
    this.#tokenId = option.tokenId
    this.#type = option.type
  }

  /**
  * Method will initialize the sdk, check and validate the api key.
  * @param {string} apiKey
  * @param {string} name
  * @param {string} callbackResponse
  * @param {string} className
  * @param {string} buttonText
  */
  renderButton = ({ callbackResponse, className, buttonId, buttonText }: buttonProps) => {
    this.validateApiKey(callbackResponse)
    let options = {
      referenceId: this.#referenceId,
      customerId: this.#customerId,
      contractAddress: this.#contractAddress,
      tokenId: this.#tokenId,
      type: this.#type,
      redirectUrl: this.#redirectUrl
    }

    let btn = document.createElement('button')
    btn.onclick = () => this.openWindow(options, callbackResponse)
    btn.id = buttonId || "supermojo-pay-button"
    btn.textContent = buttonText || "Pay with SuperMojo"
    btn.classList.add("supermojo-btn-wrapper")
    if (className) btn.classList.add(className)
    document.body.appendChild(btn)
  }

  validateApiKey = (callback: any) => {
    if (!this.#customerId) {
      return callback({ status: "FAILED", event: null, data: { message: "Please provide api key" } })
    }
  }

  /**
   * Method is used to render the iframe and target the app url.
   * @param {string} id
   * @param {string} name
   * @param {string} callbackResponse
   */
  openWindow = (options: CreateCheckout, callbackResponse) => {
    console.log("api key ", this.#apiKey)
    let url = this.#appUrl;
    let div = document.createElement('div')
    div.id = "#iframe-container"
    div.classList.add("container-div")


    let iframe: any = document.createElement('iframe');
    iframe.src = url;
    div.appendChild(iframe);
    document.body.appendChild(div)

    this.eventListner(callbackResponse)
    iframe.onload = () => {
      iframe.contentWindow.postMessage(JSON.stringify(options), this.#appUrl);
      iframe.height = "";
      iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
    }
  }


  eventListner = (callbackResponse: any) => {
    window.addEventListener('message', (event) => {
      let case_ = "cancel"
      switch (case_) {
        case case_: this.onCloseIframe(callbackResponse, event.data)
          return
          break;
        default:
          break;
      }
    });
  }

  onCloseIframe = (callbackResponse: any, response: any) => {
    callbackResponse(response)
    document.getElementById("#iframe-container").remove()
    return
  }

}
