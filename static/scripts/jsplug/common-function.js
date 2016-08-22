//工具方法
(function(){
   Tool  = {
    //数组是否重复
    isArrayRepeat : function(listArray,createTag) {
      var flag = false;
      for (var i = 0; i < listArray.length; i++) {
            if(listArray[i] == createTag){//是否重复
               return flag = true;
               break;
           } 
           return flag;   
       }
   },
}
})()



