var sort = {
    debug:function(str){
        if(window.console && window.console.log){
            console.log(str);
        }
    },
    swap:function(arr,index1,index2){//数组数据交换
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    },
    bubbleSort:function(arr){ //冒泡排序
        this.debug("冒泡排序before:"+arr);
        var len = arr.length;
        for(var outer = 0;outer<len-1;outer++){//比较的轮数
            for(var inner = 0;inner<len-outer-1;inner++){//每轮比较的次数
                if(arr[inner] > arr[inner+1] ){
                    this.swap(arr,inner,inner+1)
                }
            }
            this.debug("第"+(outer+1)+"轮后:"+arr);
        }
        this.debug("冒泡排序after:"+arr);
    },
    selectionSort:function(arr){//选择排序
        this.debug("选择排序before:"+arr);
        var min,len = arr.length;
        for (var outer = 0; outer < len -1; outer++) {
            min = outer;
            // 比较最小项目和第outer项之后的剩余数组项, 以寻找更小项
            for (var inner = outer+1; inner < len; inner++) {
                if (arr[inner] <arr[min]) {
                    min = inner;
                    this.debug("min--"+min);
                }
            }
            this.swap(arr,outer, min);
            this.debug("第"+(outer+1)+"轮后:"+arr);
        }
        this.debug("选择排序after:"+arr);
    },
    insertionSort:function(arr){//插入排序
        this.debug("插入排序before:"+arr);
        var temp,inner,len = arr.length;
        for (var outer = 1; outer < len ; outer++) {
            temp = arr[outer];
            inner = outer;
            while(inner>0 && arr[inner-1] >= temp){
                arr[inner] = arr[inner-1];
                --inner;
            }
            arr[inner] = temp;
        }
        this.debug("插入排序after:"+arr);
    },
    shellSort:function(arr){//希尔排序
        this.debug("希尔排序before:"+arr);
        var gaps = [5,3,1],
            temp;
        for(var g = 0;g <gaps.length; g++){
            for(var i = gaps[g];i<arr.length;i++){
                temp = arr[i];
                for(var j = i;j >= gaps[g] && arr[j-gaps[g]] > temp;j -= gaps[g]){
                    arr[j] = arr[j-gaps[g]];
                }
                arr[j] = temp;
            }
        }
        this.debug("希尔排序after:"+arr);
    },
    shellSortDynamic:function(arr){//动态计算间隔序列的希尔排序
        this.debug("动态计算间隔序列的希尔排序before:"+arr);
        var N = arr.length,
            h = 1;
        while(h < N/3){
            h = 3*h +1;
        }
        while(h >= 1){
            for(var i = h;i < N;i++){
                for(var j = i;j >= h && arr[j] < arr[j-h];j -= h){
                   this.swap(arr,j,j-h);
                }
            }
            h = (h-1)/3;
        }
        this.debug("动态计算间隔序列的希尔排序after:"+arr);
    },
    mergeSort:function(arr){//归并排序
        this.debug("归并排序before:"+arr);
        var len = arr.length,
            step = 1,
            left,
            right;
        var mergeArray = function(arr,startLeft,stopLeft,startRight,stopRight){
            var rightArr = new Array(stopRight - startRight +1),
                leftArr =  new Array(stopLeft - startLeft +1),
                k = startRight,
                m = 0,
                n = 0;
            for(var i = 0;i < (rightArr.length - 1); ++i){
                rightArr[i] = arr[k];
                ++k;
            }
            k = startLeft;
            for(var i = 0;i < (leftArr.length - 1); ++i){
                leftArr[i] = arr[k];
                ++k;
            }
            rightArr[rightArr.length-1] = Infinity;  //哨兵值
            leftArr[leftArr.length-1] = Infinity;    //哨兵值
            for(var k = startLeft;k < stopRight; ++k){
                if(leftArr[m] <=rightArr[n]){
                    arr[k] = leftArr[m];
                    m++;
                }else{
                    arr[k] = rightArr[n];
                    n++
                }
            }
        }
        if(len < 2){
            return;
        }
        while(step < len){
            left = 0;
            right = step;
            while(right + step <= len){
                mergeArray(arr,left,left+step,right,right+step);
                left = right + step;
                right = left + step;
            }
            if(right < len){
                mergeArray(arr,left,left+step,right,len);
            }
            step *= 2;
        }
        this.debug("归并排序after:"+arr);
    },
    quickSort:function(arr){//快速排序
        this.debug("快速排序before:"+arr);
        var _quickSort = function(arr){
            var len = arr.length,
                lesser = [],
                greater = [],
                pivot,
                meCall = arguments.callee;
            if(len == 0){
                return [];
            }
            pivot = arr[0];
            for(var i = 1;i < len; i++){
                if(arr[i] < pivot ){
                    lesser.push(arr[i])
                }else{
                    greater.push(arr[i])
                }
            }
            return meCall(lesser).concat(pivot,meCall(greater));
        }
        this.debug("快速排序after:"+_quickSort(arr));
        return _quickSort(arr);
    }
}

var search = {
    linearSearch:function(arr,data){//线性查找
        for(var i = 0;i<arr.length;i++){
            if(arr[i] == data){
                return i;
            }
        }
        return -1;
    },
    binarySearch:function(arr,data){//二分查找 适用于已排好序的线性结构
        var lowerBound = 0,
            upperBound = arr.length - 1,
            mid;
        while(lowerBound <= upperBound){
            mid = Math.floor((lowerBound+upperBound)/2);
            if(arr[mid] < data){
                lowerBound = mid + 1;
            }else if(arr[mid] > data){
                upperBound = mid - 1;
            }else{
                return mid;
            }
            return -1;
        }
}
}
var tempArr = [3,6,4,2,11,10,5];

//sort.bubbleSort(tempArr);
//sort.selectionSort(tempArr);
//sort.insertionSort(tempArr);
//sort.shellSort(tempArr);
//sort.shellSortDynamic(tempArr);
//sort.mergeSort(tempArr);
sort.quickSort(tempArr);


// JavaScript版计数排序算法代码(Counting sort)
/*
 *计数排序(Counting sort)是一种稳定的排序算法。计数排序使用一个额外的数组arr_b，其中第i个元素是待排序数组arr_a中值等于i的元素的个数。然后根据数组arr_b来将arr_a中的元素排到正确的位置。 算法的步骤如下：1、找出待排序的数组arr_a中最大和最小的元素；2、统计数组arr_a中每个值为i的元素出现的次数，存入数组arr_b的第i项；3、对所有的计数累加（从arr_b
*/
function countingSort(arr, len){
    var arr_a = arr, arr_b = [], index = 0;
    var max= findMax(arr_a);//查找arr_a中的最大值
    var i, j;
    arr_b = createArr(max+1);//新那一个arr_b
    for(i = 0; i < len; i++){
        arr_b[arr_a[i]] += 1;//找出arr_a中每个值为i的元素出现的次数，存入数组arr_b的第i项
    }
    for(j = 0; j < arr_b.length; j++){
        while(arr_b[j] > 0){
            arr_a[index++] = j;//将每个元素i放在新数组的第arr_b(i)项
            arr_b[j]--;//每放一个元素就将arr_b(i)减去1
        }
    }
    return arr_a;
}
function findMax(arr){
    var pi = arr[0];
    var maxIndex;
    for(var i = 1; i < arr.length; i++){
        if(pi <= arr[i]){
            pi = arr[i];
        }
    }
    return pi;
}
function createArr(len){
    var arr = [];
    for(var i = 0; i < len; i++){
        arr[i] = 0;
    }
    return arr;
}
var src = [3,2,3,12,0,0,7,1,4,12];
var tar = countingSort(src, src.length);
console.log(tar);


// 睡眠排序法-javascript版
/*
 * 睡眠排序算法是一个天才程序员发明的，想法很简单，就是针对数组里的不同的数开多个线程，每个线程根据数的大小睡眠，自然睡的时间越长的，数越大，哈哈，搞笑吧，这种算法看起来很荒唐，但实际上很天才，它可以充分利用多核cpu进行计算。
*/
function lazySort(list, callback) {
    var result = [];
 
    list.forEach(function(i) {
        setTimeout(function() {
            result.push(i);
             
            if(result.length == list.length) {
                callback(result);
            }
        }, i);
    });
}
 
lazySort([4,5,7,1,2,4,5], alert);


// php快速排序的算法示例代码
/*
 * 快速排序算法是对冒泡排序算法的一种改进，这是我们实际开发中用得最多的一种算法，效率高、速度快，给大家提供一个php写的快速排序算法供参考。
*/
function qsort(&$arr)
{
    _quick_sort($arr, 0, count($arr) - 1);
}
 
/**
 * 采用递归算法的快速排序。
 *
 * @param array $arr 要排序的数组
 * @param int $low  最低的排序子段
 * @param int $high 最高的排序字段
 */
function _quick_sort(&$arr, $low, $high)
{
     $low_data = $arr[$low];
     $prev_low = $low;
     $prev_high = $high;
     while ($low < $high)
     {
            while ($arr[$high] >= $low_data && $low < $high) {
                $high--;
            }
            if ($low < $high) {
                $arr[$low] = $arr[$high];
                $low++;
            }
            while ($arr[$low] <= $low_data && $low < $high) {
                $low++;
            }
            if ($low < $high) {
                $arr[$high] = $arr[$low];
                $high--;
            }
     }
     $arr[$low] = $low_data;
     if ($prev_low < $low) {
         _quick_sort($arr, $prev_low, $low);
     }
     if ($low + 1 < $prev_high) {
         _quick_sort($arr, $low + 1, $prev_high);
     }
}
 
function quick_sort(&$arr)
{
    $stack = array();
    array_push($stack, 0);
    array_push($stack, count($arr) -1);
    while (!empty($stack)) {
        $high = array_pop($stack);
        $low = array_pop($stack);
        $low_data = $arr[$low];
        $prev_low = $low;
        $prev_high = $high;
        while ($low < $high)
        {
            while ($arr[$high] >= $low_data && $low < $high) {
                $high--;
            }
            if ($low < $high) {
                $arr[$low] = $arr[$high];
                $low++;
            }
            while ($arr[$low] <= $low_data && $low < $high) {
                $low++;
            }
            if ($low < $high) {
                $arr[$high] = $arr[$low];
                $high--;
            }
        }
        $arr[$low] = $low_data;
        if ($prev_low < $low) {
            array_push($stack, $prev_low);
            array_push($stack, $low);
        }
        if ($low + 1 < $prev_high) {
            array_push($stack, $low + 1);
            array_push($stack, $prev_high);
        }
    }
}