class Module{
    constructor(config){
        this._parent=config.parent;
    }
    build(options){
        //子类生成this._body
    }
    show(context){
        if(this._body){
            this._parent.appendChild(this._body);
        }
    }
    refresh(){
        if(this._body){
            this._parent.appendChild(this._body);
        }
    }
    hide(){
        if(this._body){
            fragment.appendChild(this._body);
        }
    }
    destory(){

    }
}