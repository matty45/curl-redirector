import { bypass_ssl_pinning, curl } from "../..";
import { CurlOptions } from "../../globals/curl_opts";

export function hook_curl_easy_init() {
    const curl_easy_init_ptr = curl.getExportByName("curl_easy_init");
    const curl_easy_setopt = new NativeFunction(curl.getExportByName('curl_easy_setopt'), 'int', ['pointer', 'int', 'pointer']);


    Interceptor.attach(curl_easy_init_ptr, {

        onLeave(retval) {

            if (bypass_ssl_pinning) {
                curl_easy_setopt(retval, CurlOptions.SslVerifyPeer, ptr(0));
                curl_easy_setopt(retval, CurlOptions.SslVerifyhost, ptr(0));
            }

        }
    });
}
