chrome.tabs.executeScript({
    code: `
      var links = document.querySelectorAll('a#video-title[href^=\"\/watch\"]');
      var data = Array.from(links).map(link => ({title: link.innerText, url: link.href}));
      data;
    `
  }, function(result) {
    // This callback function is called when the script has finished running
    // The result of the script is passed as an argument
  
    // Display the result in the popup
    var contentDiv = document.getElementById('dataList');
    
    contentDiv.innerHTML = ""; // Clear previous data

    // display data as json string
    const data = JSON.stringify(result[0], null, 2);
    contentDiv.innerHTML = data;

    // display count of items 
    const countDiv = document.getElementById('count');
    countDiv.innerHTML = "Count: " + result[0].length;

    // download data as json file
    const downloadButton = document.getElementById('download');
    downloadButton.onclick = function() {
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // set the file name
        a.download = 'data.json';
        a.click();
    }       

  });