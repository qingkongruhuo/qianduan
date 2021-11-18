class Book{
    //声明属性类型
    title:string;
    price:number;
    page:number|undefined;

    writer:string = 'zhang'//如果构造函数里没写这里必须要赋值
    constructor(title:string,price:number,page?:number){//如果在构造函数后面填一个返回值比如string直接报错
        this.title = title;
        this.price = price;
        this.page = page;
    }
}
class jsBook extends Book{
    color:string; 
    constructor(title:string,price:number,color:string){
        super(title,price);
        //添加属性，要声明
        this.color = color;
    }
}