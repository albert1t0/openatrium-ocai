Drupal.behaviors.activity_ajax = function(){
  var reloadTime = Drupal.settings.activity_ajax.reloadTime;
  /*set the function to execute every reloatTime*/
  setInterval(reloadActivityListing,reloadTime);
}

function reloadBlock(page,selector){
  var newContent = page.find(selector);
  $(selector).html(newContent.html());
}

function reloadPageBlocks(url){
  $.ajax({
    url:url,
    type: "GET",
    async: true,
    success: function(data){
      /*new document for parsing the dom*/
      var newPage = $(data);
      /*this way many elements are updated with just one request*/
      reloadBlock(newPage,"#block-views-activity_listing-block_1");
      reloadBlock(newPage,"#block-views-activity_listing-block_2");
      reloadBlock(newPage,"#block-views-blog_comments-block_1");
      reloadBlock(newPage,"#block-views-casetracker_cases-block_2");
      reloadBlock(newPage,"#atrium-shoutbox-launcher");
      reloadBlock(newPage,"#atrium-shoutbox-wrapper-2 .view-content");
      reloadBlock(newPage,"table.cases");
    }
  });
}

function reloadActivityListing(){
  $.ajax({
    url:"http://"+window.location.host + Drupal.settings.basePath+"activity_ajax/check_updates",
    type: "GET",
    async: true,
    success: function(data){
      var result = JSON.parse(data);
      if(result.update){
        /*update cookie value*/
        document.cookie='last_activity_check='+result.last_activity+'; path=/';
        var actualPage = window.location.pathname;
        reloadPageBlocks(actualPage);
      }
    }
  });
}

