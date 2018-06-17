$(function(){
  var app = {};
  app.Router = function(){
    function Router(){
    }
    Router.prototype.setup = function(routemap, defaultFunc){
      var that = this, rule, func;
      this.routemap = [];
      this.defaultFunc = defaultFunc;
      for (var rule in routemap) {
        if (!routemap.hasOwnProperty(rule)) continue;
        that.routemap.push({
          rule: new RegExp(rule, 'i'),
          func: routemap[rule]
        });       
      }
    };
    Router.prototype.start = function(){
      var hash = location.hash, route, matchResult;
      for (var routeIndex in this.routemap){
        route = this.routemap[routeIndex];
        matchResult = hash.match(route.rule);
        if (matchResult){
          route.func.apply(window, matchResult.slice(1));
          return; 
        }
      }
      this.defaultFunc();
    };
    return Router;
  }();
  var router = new app.Router();
  router.setup({
    '#/list/(.*)/(.*)': function(cate, id){
        console.log('list', cate, id);
      },
    '#/music/(.*)': function(id){
        $('.content-box .content-item').hide();
        $('#'+id).show();
      }
  }, function(){
  });
  app.operate=(function(){
    var btns=[$('#nav1'),$('#nav2'),$('#nav3')];
    $.each(btns,function(idx,item){
      var pageIdx=idx+1;
      item.on('click',function(){
        var oldUrl=location.href.split('#')[0];
        location.replace(oldUrl+"#/music/page"+pageIdx);        
        router.start();
      });
    });
  })();

app.Create=function(){
    $('body').append("<div></div>")
  }();
  app.Show=function(item){
    item.show();
  }();
  app.Refresh=function(item){

  }();
  app.Hide=function(item){
    item.hide();
  }();
  app.Destory=function(item){
    item.remove();
  }();
});

