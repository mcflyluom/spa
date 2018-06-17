function router(options){
    let routes=option.routes||{};
    let current=null;
    return function(context,next){
        let name=context.request.pathname;
        let modules=routes[name];
        if(!modules){
            redirect('/404');
            return;
        }
        if(!(module instanceof Module)){
            module=new module();
            routes[name]=module;
            module.build(context);
        }
        if(module===current){
            module.refresh(context);
        }else{
            if(current){
                current.hide();
            }
            current=module;
            current.show(context);
        }
        next();
    };
}