let app={
    start:function(options){
        spa.add(rest(options));
        spa.add(hist());
        spa.add(rewrite(options));
        spa.add(filter.mw);
        filter.add(AuthFilter);
        spa.add(router(options));

        let monitor=new Monitor({
            onchange:function(event){
                let context={
                    request:new URL(event.newValue)
                };
                spa.dispatch(context);
            }
        });
    }
}