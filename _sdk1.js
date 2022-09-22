class SuperMojoSdk {
  constructor(data) {
    this.api_key = null;
    this.user_id = data?.user_id;
    this.wallet_address = data?.wallet_address;
    this.nft_name = data?.nft_name

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
            max-width: 400px;
            width: 95%;
            margin: 50px auto 20px;
            height: 500px;
            box-shadow: 0 0 5px rgba(0,0,0,.2);
        }
        `

    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }

  init = ({ apiKey }) => {
    if (!apiKey) {
      return "please provide api key."
    }
    this.api_key = apiKey
    // this.openWindow()
  }

  renderButton = ({ id, name, callback, className, buttonId, buttonText }) => {
    this.validateApiKey(callback)
    let btn = document.createElement('button')
    btn.onclick = () => this.openWindow({ id, name, callback })
    btn.id = buttonId || "supermojo-pay-button"
    btn.textContent = buttonText || "Pay with SuperMojo"
    btn.classList.add("supermojo-btn-wrapper")
    if (className) btn.classList.add(className)
    document.body.appendChild(btn)
  }

  openWindow = ({ id, name, callback }) => {
    let url = `http://localhost:3000`;
    let div = document.createElement('div')
    div.id = "#iframe-container"
    div.classList.add("container-div")


    let iframe = document.createElement('iframe');
    iframe.src = url;
    div.appendChild(iframe);
    document.body.appendChild(div)
    let config_ = {
      id, name, origin: "supermojo"

    }

    this.eventListner(callback)
    iframe.onload = function () {
      iframe.contentWindow.postMessage(JSON.stringify(config_), 'http://localhost:3000');
    }
  }

  eventListner = (callback) => {
    window.addEventListener('message', (event) => {
      let case_ = "cancel"
      switch (case_) {
        case case_: this.onCloseIframe(callback, event.data)
          return
          break;
        default:
          break;
      }
    });
  }

  onCloseIframe = (callback, response) => {
    callback(response)
    document.getElementById("#iframe-container").remove()
  }

  validateApiKey = (callback) => {
    if (!this.api_key) {
      return callback({ status: "FAILED", event: null, data: { message: "Please provide api key" } })
    }
  }

}