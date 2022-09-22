let SuperMojo = function () {
    this.setConfig = function (id, name) {
        console.log("id url", id)
        let url = `http://localhost:3000`;
        let div = document.createElement('div')
        console.log("width", window.screen)
        div.classList.add("container-div")
        var styles = `
            .container-div { 
                width: ${window.screen.width}px;
                height: ${window.screen.height}px;
            },
            .container-div, iframe {
                width: 100px;
                height: 50px;
                margin: 0 auto;
                background-color: #777;
            }
            
            iframe {
                display: block;
                border-style:none;
            }
        `

        var styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)

        let iframe = document.createElement('iframe');
        iframe.src = url;
        div.appendChild(iframe);
        document.body.appendChild(div)
        let fun = function () {
            console.log("callback")
        }
        let config_ = {
            id, name, origin: "supermojo", callback: encodeURI(fun)

        }
        window.addEventListener('message', function (event) {
            console.log("Message received from the child: " + event.data); // Message received from child
        });
        iframe.onload = function () {
            iframe.contentWindow.postMessage(JSON.stringify(config_), 'http://localhost:3000');
        }
    }
};