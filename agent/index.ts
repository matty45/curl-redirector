import { hook_curl_easy_init } from "./hooks/curl/curl_easy_init";
import { hook_curl_easy_setopt } from "./hooks/curl/curl_easy_setopt";



//Initialize globals/settings
export const curl = Process.getModuleByName("libcurl.dll"); // Change this depending on the OS you are using!  

/*
 Hostname and optional port to redirect requests to.
*/
export const redirect_server = "127.0.0.1:3000"

// Bypass ssl pinning
export const bypass_ssl_pinning = true;

// Execute hooks
hook_curl_easy_init()
hook_curl_easy_setopt()

