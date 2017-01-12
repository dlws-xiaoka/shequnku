// 使用function初始化array，相比var initSubMenuDisplay = [] 既避免的引用复制的，同时方式更灵活，将来可以是多种方式实现，个数也不定的
function initSubMenuDisplay() {
    return ['hidden', 'hidden', 'hidden'];
}

Page({
    data:{
        subMenuDisplay:initSubMenuDisplay(),
        currentNavtab:"0",
        city:"0"
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

        this.setData({
          currentNavtab: e.currentTarget.dataset.index
        });
        
    },
    tapCity:function(e){
        this.setData({
          city: e.currentTarget.dataset.index
        });
    }
    
})
