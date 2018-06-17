j._$request=j._$request._$aop(
    function(event){
        var args=event.args||[],
            opt=args[1]||{},
            url=(args[0]||'').split('?')[0]||'',
            data=DT_MOCKER[url];
        if(typeof data==='function'){
            data=data(opt);
        }
        if(data&&opt.onload){
            event.stopped=!0;
            window.setTimeout(function(){
                opt.onload.call(null,data);
            },0);
        }
    }
);

export.setupProChecker=function(def,ret){
    ret=u._$merge({},def,ret);
    return function(expect,inst){
        u._$forIn(ret,function(value,key){
            expect(inst.data[key]).to.eql(value,key);
        });
    }
}

export.runRegularTest=function(class,klass,cases){
    u._$loop(cases,function(list,key){
        describe(klass+'#'+key,function(){
            u._$forEach(list,function(item){
                it(item.case,prepareTest(item,key,class));
            });
        });
    });
};

export.runNEJTest=function(ns,klass,cases){
    u._$loop(cases,function(list,key){
        describe(klass+'#'+key,function(){
            it(item.case,prepareTest(item,key,ns[klass],ns));
        });
    });
};

exports.buildMock=function(ud,meta){
    var sed=+new Date,
        ret=u._$merge(
            meta,{id:id}
        );
    u._$forIn(meta,function(value,key,map){
        map[key]=value+'-'+sed;
    });
    return ret;
};


exports.buildMockList=function(number,meta){
    var ret=[],
        sed=+new Date;
    for(var i=0;i<number;i++){
        ret.push(exports.buildMock(
            sed+1,meta
        ));
    }
    return ret;
}