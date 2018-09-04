
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function (reg) {
      	//registration successful
        console.log('Service Worker Registration Successful: ' + reg.scope);
      })
      .catch(function(error) {
      	//registration failed
        console.log('Service Worker Registration Failed: ' + error);
      });
}