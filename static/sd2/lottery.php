<?php
/*******************************************/
/**      author:  hoho                   **/
/**      http://www.thinkcart.net        **/
/******************************************/

//奖品配置
$award = array(
    // 奖品ID => array('奖品名称',概率)
    1 => array('神仙姐姐',0.1),
    2 => array('如花',0.2),
    3 => array('芙蓉姐姐',0.3),
    4 => array('凤姐',0.4),
);

$r =rand(1,100);
$num = 0;
$award_id = 0;
foreach($award as $k=>$v){
    $tmp = $num;
    $num += $v[1]*100;
    if($r>$tmp && $r<=$num){
        $award_id = $k;
        break;
    }
}

jsonBack(array('award_id'=>$award_id,'award_name'=>$award[$award_id][0]));

//
function jsonBack($data){
    header("Content-type: application/json");
    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($data).")";
    }else{
        echo json_encode($data);
    }
    exit();
}
?>