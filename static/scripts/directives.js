/**
 * 自定义指令
 * 2016.08.02
 * ypf
 */
app.directive('bsDatepicker', function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs, ctrl) {
            $('.date-time-defalut').daterangepicker();
            $('.date-time-long').daterangepicker({
                timePicker: true,
                timePickerIncrement: 1,
                format: 'YYYY-MM-DD HH:mm'
            });
            $('.date-defalut').daterangepicker({ startDate: moment().startOf('day'), singleDatePicker: true });
        }
    }
})

app.directive('addTag', function() {
    return {
        templateUrl: '../static/scripts/views/add-list-dialog.html',
        restrict: 'EA',
        scope: {
            list: '=forList',
            name: '@forName',
            callback: '&'
        },
        link: function postLink(scope, iElement, iAttrs) {
            var listArray = scope.list;
            //点击列表
            scope.addFunc = function(str) {
                scope.name = str;
                scope.selectSwitch = false;
            };
            scope.print = function() {
                scope.selectSwitch = true;
            };
            //发送表单
            scope.addForm = function(name) {
                $('#myModal').modal('hide');
                scope.callback({ param: "123" });
            };
            //保存
            scope.save = function(createTag) {
                var flag = false;
                if (createTag != undefined) { //是否为空
                    for (var i = 0; i < listArray.length; i++) {
                        if (listArray[i] == createTag) { //是否重复
                            flag = true;
                            break;
                        }
                    };
                    if (!flag) {
                        scope.createTag = '';
                        scope.inputSwitch = false;
                        scope.name = createTag;
                        listArray.push(createTag);
                        $('#myModal').modal('hide');
                    } else {
                        alert('标签已存在！');
                    }
                } else {
                    alert('标签不能为空！');
                }
            }
        }
    }
})


app.directive('dropSearch', function($compile) {
    return {
        templateUrl: '../static/scripts/views/select-drop-search.html',
        replace: true,
        transclude: true,
        restrict: 'EA',
        scope: {
            dropSwtich: '@dropListSwtich',
            createSwtich: '@createSwtich',
            dropList: '=dropList',
            forValue: '@',
            forItem: '@'
        },
        link: function(scope, iElement, iAttrs) {
            // console.log(scope.dropList);
            //点击下拉列表
            scope.touchOptFuc = function(selectItem) {
                    scope.forValue = selectItem;
                    scope.dropListSwtich = false;
                    scope.newTag = '';
                    scope.query = '';
                }
                //点击空白隐藏控件
            $(document.body).on('click', function(event) {
                //点击本身
                var isClickWapper = $(event.target).parents('.m-select-search').hasClass('m-select-search');
                //ul是否隐藏
                var isUlHidden = scope.dropListSwtich;
                if (!isClickWapper && isUlHidden) {
                    scope.$apply(function() {
                        scope.dropListSwtich = false;
                        scope.newTag = '';
                        scope.query = '';
                    })
                }
            })
            scope.dropListSwtich = false;

            scope.addTask = function(dropList, str) {
                    var flag = Tool.isArrayRepeat(dropList, str);
                    if (!(str == '' || str == undefined)) {
                        if (scope.createDivSwitch) { //有创建标签 
                            console.log(flag)
                            if (flag) {
                                alert('标签不能重复');
                            } else {
                                scope.forValue = str;
                                scope.dropListSwtich = false;
                                dropList.push(str);
                                scope.inputSwitch = false;
                                scope.createDivSwitch = false;
                                scope.newTag = '';
                            }
                        } else { //没有创建标签
                            if (flag) {
                                scope.forValue = str;
                            }
                            scope.query = '';
                        }

                    } else {
                        console.log('错误');
                    }
                }
                //新建标签保存
            scope.save = function(dropList, newTag) {
                var flag = Tool.isArrayRepeat(dropList, newTag);
                if (newTag != undefined) {
                    if (flag) {
                        alert('标签不能重复');
                    } else {
                        scope.forValue = newTag;
                        scope.dropListSwtich = false;
                        dropList.push(newTag);
                        scope.inputSwitch = false;
                        scope.createDivSwitch = false;
                        scope.newTag = '';
                    }
                } else {
                    alert('标签不能为空')
                }
            }
        }
    };
})


/**
 * 图标自定义指令 highchart
 */

app.directive('chart', ['', function() {
    // Runs during compile
    return {
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<div></div>',
        scope: {
            chartData: "=value",
            chartObj: "=?"
        },
        transclude: true,
        replace: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, $element, $attrs) {
            $scope.$watch('chartData', function(value) {
                if (!value)
                    return;

                // Initiate the chartData.chart if it doesn't exist yet
                $scope.chartData.chart = $scope.chartData.chart || {};

                // use default values if nothing is specified in the given settings
                $scope.chartData.chart.renderTo = $scope.chartData.chart.renderTo || $element[0];
                if ($attrs.type)
                    $scope.chartData.chart.type = $scope.chartData.chart.type || $attrs.type;
                if ($attrs.height)
                    $scope.chartData.chart.height = $scope.chartData.chart.height || $attrs.height;
                if ($attrs.width)
                    $scope.chartData.chart.width = $scope.chartData.chart.type || $attrs.width;

                $scope.chartObj = new Highcharts.Chart($scope.chartData);
            });
        }
    };
}]);


app.directive('my-confirm', function() {
    // Runs during compile
    return {
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: '../static/scripts/views/confirm.html',
        replace: true,
        transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            iElm.modal('toggle');
        }
    };
});
