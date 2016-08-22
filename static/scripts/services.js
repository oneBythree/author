//服务
app.service('isArrayRepeat', [function() {
    this.getIsArrayRepeat = function(listArray) {
        var flag = false;
        for (var i = 0; i < listArray.length; i++) {
            if (listArray[i] == createTag) { //是否重复
                flag = true;
                break;
            }
            return flag;
        };

    }
}])


app.factory('companyFactory', ['$http', '$log', '$q', function($http, $log, $q) {
    var companyUrl = '../static/api/company.json';
    var companyFactory = {};
    var deferred = $q.defer();
    var promise = deferred.promise;
    var progress;


    //获取公司列表
    companyFactory.getCompanyList = function() {
        // return $http.get(companyUrl);
        // return defer.promise;
        $http.get(companyUrl)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //获取单个公司
    companyFactory.getCompany = function(id) {
        return $http.get(companyUrl + '/' + id);
    }


    //更新公司信息
    companyFactory.updateCompany = function(company) {
        return $http.put(companyUrl + '/' + company.node_id, company);
    }

    //添加公司
    companyFactory.insertCompany = function(company) {
        return $http.post(urlBase, company);
    };

    //删除公司
    companyFactory.delCompany = function(id) {
        return $http.delete(companyUrl + '' + id);
    }

    return companyFactory;
}])



app.factory('tagsFactory', ['$http', '$log', '$q', function($http, $log, $q) {
    var tagsFactory = {};
    var tagsUrl = '../static/api/tags.json';
    var deferred = $q.defer();
    var promise = deferred.promise;
    var progress;

    //获取标签列表
    tagsFactory.getTagsList = function() {
        // return $http.get(companyUrl);
        // return defer.promise;
        $http.get(tagsUrl)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //获取单个标签
    tagsFactory.getTags = function(id) {
        return $http.get(tagsUrl + '/' + id);
    }


    //更新公司标签
    tagsFactory.updateTags = function(tags) {
        return $http.put(tagsUrl + '/' + tags.node_id, tags);
    }

    //添加标签
    tagsFactory.insertTags = function(tags) {
        return $http.post(tagsUrl, tags);
    };

    //删除标签
    tagsFactory.delTags = function(id) {
        return $http.delete(tagsUrl + '' + id);
    }

    return tagsFactory;
}])
