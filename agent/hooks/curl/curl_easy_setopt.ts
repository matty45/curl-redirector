import { curl, redirect_server } from "../..";
import { CurlOptions } from "../../globals/curl_opts";
import { log } from "../../logger";

export function hook_curl_easy_setopt() {
  const curl_easy_setopt = curl.getExportByName("curl_easy_setopt");

  var string_buf = null

  Interceptor.attach(curl_easy_setopt, {
    onEnter(args) {
      const handle = args[0];
      const curloption = args[1].toInt32();
      const parameter = args[2];

      switch (curloption) {
        case CurlOptions.Url: // CURLOPT_URL    
          const originalUrl = parameter.readCString();

          if (!originalUrl) {
            return;
          }

          log(`[CURL ${handle}]: Original URL: ${originalUrl}`);

          var splitURL = originalUrl.toString().split("/");
          splitURL[0] = "http:"
          splitURL[2] = redirect_server

          const redirectedUrl = splitURL.join("/");
          
          string_buf = Memory.allocAnsiString(redirectedUrl);

          this.buf = string_buf; // keep alive  
          // Write the redirect URL with preserved path  
          args[2] = string_buf;
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