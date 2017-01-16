// 使用function初始化array，相比var initSubMenuDisplay = [] 既避免的引用复制的，同时方式更灵活，将来可以是多种方式实现，个数也不定的
function initSubMenuDisplay() {
    return ['hidden', 'hidden', 'hidden'];
}

Page({
    data:{
        subMenuDisplay:initSubMenuDisplay()
    },
    tapMainMenu: function(e) {
//        获取当前显示的一级菜单标识
        var index = parseInt(e.currentTarget.dataset.index);
        // 生成数组，全为hidden的，只对当前的进行显示
        var newSubMenuDisplay = initSubMenuDisplay();
//        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
        if(this.data.subMenuDisplay[index] == 'hidden') {
            newSubMenuDisplay[index] = 'show';
        } else {
            newSubMenuDisplay[index] = 'hidden';
        }
        // 设置为新的数组
        this.setData({
            subMenuDisplay: newSubMenuDisplay
        });
    },
    tapSubMenu: function(e) {
        // 隐藏所有一级菜单
        this.setData({
            subMenuDisplay: initSubMenuDisplay()
        });
        // 处理二级菜单，首先获取当前显示的二级菜单标识
        var indexArray = e.currentTarget.dataset.index.split('-');
        console.log("indexArray : " + indexArray);
        var newSubMenuHighLight = initSubMenuHighLight();
        // 与一级菜单不同，这里不需要判断当前状态，只需要点击就给class赋予highlight即可
        newSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
        console.log(newSubMenuHighLight);
        // 设置为新的数组
        this.setData({
            subMenuHighLight: newSubMenuHighLight
        });
    }
    
})

//声明初始化高亮状态数组
function initSubMenuHighLight() {
    return [
        ['','','','',''],
        ['',''],
        ['','','']
    ];
}