//添加新标签
app.controller('selectTagCtrl', function($scope){
    var arrRepeat = $scope.selectJson = ['111','222','333','444','555','666'];
    $scope.selectFunc = function(){
        $scope.selectSwitch = !$scope.selectSwitch;
    }
    $scope.addFunc = function(tagName){
      $scope.addTag=  tagName;
      $scope.selectSwitch = false;
  }
  $scope.addForm = function(){
    var newTag = $scope.newTag; 
    var flag = false;
    if(newTag != undefined){//是否为空
        for (var i = 0; i < arrRepeat.length; i++) {
            if(arrRepeat[i] == newTag){//是否重复
             flag = true;
             break;
         };    
     };
    if(!flag){
        arrRepeat.push(newTag);
        $scope.selectJson = arrRepeat;
        $scope.addTag = newTag;
        $scope.selectSwitch = false;
        $('#myModal').modal('hide');
    }else{
        alert('标签已存在！');
    }
} else{
    alert('添加标签不能为空！');
};
}

})
