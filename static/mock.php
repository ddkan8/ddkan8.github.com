<?php
/**
 * Mock Json for Javascript
 *
 * @author soulteary
 * @date 2014-06-15
 */
 
 
/**
 * 请求接口字段：字符集
 */
define('charset','charset');
 
/**
 * 请求接口字段：回调函数名
 */
define('callback','callback');
 
/**
 * 请求接口字段：跨域字段
 */
define('crossDomain','cross-domain');
 
 
/**
 * 输出mock数据
 * 如果存在mock.json文件，则数据从mock.js中获取
 *
 * @return string
 */
functionmockData()
{
    if(file_exists('mock.json')){
        $data=json_decode(file_get_contents('mock.json'));
    }else{
        $data=Array(
            'code'=>200,
            'desc'=>'Get the default data.',
            'login'=>true,
            'data'=>Array(
                'name'=>'test api.'
            )
        );
    }
    returnjson_encode($data);
}
 
 
/**
 * 输出字符集，允许结果为gbk、gb2312、utf-8
 * 如果非法或者未设置，输出utf-8
 *
 * @return string
 */
functioncharset()
{
    $ret='utf-8';
    if(empty($_REQUEST[charset])){
        return$ret;
    }else{
        $charset=strtolower($_REQUEST[charset]);
        if(in_array($charset,array('gbk','gb2312'),true)){
            return$charset;
        }else{
            return$ret;
        }
    }
}
 
 
/**
 * 拼装json数据
 *
 * @return string
 */
functionjsonGenerator()
{
    if(!empty($_REQUEST[callback])){
        header('Content-Type: application/javascript; charset='.charset());
        return$_REQUEST[callback]."(".mockData().");";
    }else{
        if(!empty($_REQUEST[crossDomain])){
            header("Access-Control-Allow-Origin: *");
        };
        header('Content-type: application/json; charset='.charset());
        returnmockData();
    }
}
 
/**
 * 输出结果
 */
die(jsonGenerator());
// {
//     "data":1,
//     "w":"测试"
// }
?>