import { curl, redirect_server } from "../..";
import { CurlOptions } from "../../globals/curl_opts";
import { log } from "../../logger";

export function hook_curl_easy_setopt() {
  const curl_easy_setopt = curl.getExportByName("curl_easy_setopt");

  Interceptor.attach(curl_easy_setopt, {
    onEnter(args) {
      const handle = args[0];
      const curloption = args[1].toInt32();
      const parameter = args[2];

      switch (curloption) {
        case CurlOptions.Url: // CURLOPT_URL    
          const originalUrl = parameter.readUtf8String();

          if (!originalUrl) {
            return;
          }

          log(`[CURL ${handle}]: Original URL: ${originalUrl}`);

          // Manual URL parsing to extract path and query  
          const urlMatch = originalUrl.match(/^https?:\/\/[^\/]+(\/[^?#]*)?(\?[^#]*)?(#.*)?$/);
          const path = urlMatch ? (urlMatch[1] || '/') : '/';
          const query = urlMatch ? (urlMatch[2] || '') : '';
          const redirectedUrl = redirect_server + path + query;

          // Write the redirect URL with preserved path  
          parameter.writeUtf8String(redirectedUrl);
          log(`[CURL ${handle}]: Redirected to: ${redirectedUrl}`);
          break;
      }
    },
    onLeave(retval) {
      if (retval.toInt32() != 0)
        log(`[curl_easy_setopt] failed: ${retval}`);
    },
  });
}