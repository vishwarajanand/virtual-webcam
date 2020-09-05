// Ideally we'd use an editor or import shaders directly from the API.
import { shaderFlicker } from './shader-flicker.js';

import { shaderBW } from './shader-bw.js';

class ShaderSettings {

    constructor() {
        this.filterSettingValue = "shader-raw";
        this.filterSettingKey = "FilterSettingKey";

        if (chrome.storage) {
            // Fetch the appropriate shader setting from chrome extensions
            chrome.storage.sync.get([this.filterSettingKey], function (result) {
                this.filterSettingValue = result.key;
                console.log('Value currently is ' + result.key);
            });

            chrome.storage.onChanged.addListener(function (changes, namespace) {
                for (var key in changes) {
                    var storageChange = changes[key];
                    console.log('Storage key "%s" in namespace "%s" changed. ' +
                        'Old value was "%s", new value is "%s".',
                        key,
                        namespace,
                        storageChange.oldValue,
                        storageChange.newValue);
                    if (key === this.filterSettingKey) {
                        // update the shader setting
                        this.filterSettingValue = storageChange.newValue;
                    }
                }
            });
        } else {
            // Fetch the appropriate shader setting from local web session
            // this.filterSettingValue = "shader-raw"; // default
            this.filterSettingValue = sessionStorage.getItem(filterSettingKey);
            console.log("Install the extension from root of this repo to see the renderers");
        }

    }

    getShader() {
        this.shader = null;
        switch (this.filterSettingValue) {
            case "shader-bw": this.shader = shaderBW; break;
            case "shader-flicker": this.shader = shaderFlicker; break;
            default: this.shader = null;
        }
        return this.shader;
    }
}

export { ShaderSettings }
