import { hook_curl_easy_init } from "./hooks/curl/curl_easy_init";
import { hook_curl_easy_setopt } from "./hooks/curl/curl_easy_setopt";



//Initialize globals/settings
export const curl = Process.getModuleByName("libcurl.dll"); // Change this depending on the OS you are using!  

//URL to redirect requests to.
export const redirect_server = "http://example.com"

// Bypass ssl pinning
export const bypass_ssl_pinning = true;

// Execute hooks
hook_curl_easy_init()
hook_curl_easy_setopt()

