var app = angular.module('MyApp', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/goods', {
            templateUrl: 'goods.html',
        })
        .when('/goods', {
            templateUrl: 'goods.html',
        })
        .when('/rule', {
            templateUrl: 'rule.html',
        })
        .when('/msg', {
            templateUrl: 'msg.html',
        })
        .when('/log', {
            templateUrl: 'log.html',
        })
        .when('/goods/add', {
            templateUrl: 'add.html',
        })
        .when('/goods/batchadd', {
            templateUrl: 'batch-add.html',
        })
        .when('/rule/add', {
            templateUrl: 'rule-add.html',
        })
        .when('/daliy', {
            templateUrl: 'daliy.html',
        })
        .when('/record', {
            templateUrl: 'record.html',
        })
        .when('/record/add', {
            templateUrl: 'record-add.html',
        })
        .when('/record/giveic', {
            templateUrl: 'give-IC.html',
        })
        .when('/record/icinfo', {
            templateUrl: 'ic-info.html',
        })
        .when('/nod', {
            templateUrl: 'nod.html',
        })
        .when('/nod/add', {
            templateUrl: 'nod-add.html',
        })
        .when('/crosswalks', {
            templateUrl: 'crosswalks.html',
        })
        .when('/codetable', {
            templateUrl: 'codetable.html',
        })
        .when('/areatable', {
            templateUrl: 'areatable.html',
        })
        .otherwise({
            redirectTo: '/goods'
        });
}]);


//添加新标签
app.controller('selectTagCtrl', function($scope) {
    var arrRepeat = $scope.selectJson = ['111', '222', '333', '444', '555', '666', '测试'];
    $scope.selectFunc = function() {
        $scope.selectSwitch = !$scope.selectSwitch;
    }
    $scope.addFunc = function(tagName) {
        $scope.addTag = tagName;
        $scope.selectSwitch = false;
    }
    $scope.addForm = function() {
        var newTag = $scope.newTag;
        var flag = false;
        if (newTag != undefined) { //是否为空
            for (var i = 0; i < arrRepeat.length; i++) {
                if (arrRepeat[i] == newTag) { //是否重复
                    flag = true;
                    break;
                };
            };
            if (!flag) {
                arrRepeat.push(newTag);
                $scope.selectJson = arrRepeat;
                $scope.addTag = newTag;
                $scope.selectSwitch = false;
                $('#myModal').modal('hide');
            } else {
                alert('标签已存在！');
            }
        } else {
            alert('添加标签不能为空！');
        };
    }

})
