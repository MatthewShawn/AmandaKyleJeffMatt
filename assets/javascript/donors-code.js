AIzaSyAzE0So3-6gKzJKPt3D-NAhYTJQhLJZZmc


var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Awo0Pw0g9K5ZzMvdUtLMqukEjVsz5LoF&q="+gifName+"&limit=10&offset=0"
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
