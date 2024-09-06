<?PHP

class Middleware{
    static function request(){
        $requestBody = array();
        
        $data = json_decode(file_get_contents('php://input'), true);

        $appContent = @$_SERVER["CONTENT_TYPE"]; ///puede ser NULL

        //TODO: OPCION 1 Libre sin post PUT ni nada mas que GET
        if ($data){
            $requestBody = $data;
        }

        //TODO: Para form-data
        if(!$requestBody){
            $data = fopen('php://input', 'r');
            $str = fread($data, 8192);
            
            if ($appContent){
                if ($appContent == "application/json"){
                    parse_str($str, $requestBody);
                } else{
                    $cnt = explode(";",$appContent);
                    if ($cnt[0] == "multipart/form-data"){
                        $vd = explode("=",$cnt[1])[1];
                        $str = str_replace($vd, "", $str);
                        $str = str_replace("-", "", $str);
                        $str = str_replace("ContentDisposition: formdata;", "", $str);
                        $str = str_replace(" ", "", $str);
                        $str = str_replace('"', "", $str);
                        $str = str_replace(chr(13), "", $str);
                        $str = str_replace(chr(27), "", $str);
                        $strArr = explode("\n", $str);
                        // die();
    
                        $arReq = [];
                        $old = "";
    
                        for ($i = 0 ; $i < count($strArr); $i++){
                            $v = $strArr[$i];
                            $pos = strpos($v, "name=");
                            if ($pos!=""){
                                $c = str_replace('name=', "", $v);
                                $arReq[$c] = "";
                                $old = $c;
                            } else{
                                if (ord($v) != 13 && ord($v) != 27 &&  ord($v) != 0){
                                    if ($old != ""){
                                        $arReq[$old] = $v;
                                        $old = "";
                                    }
                                }
                            }
                        }
                        $requestBody = $arReq;
                    } else if ($appContent == "application/x-www-form-urlencoded" || $cnt[0] == "application/x-www-form-urlencoded"){
                        //TODO: PAra x-www-form-urlencoded o PUT en formularios
                        parse_str($str, $requestBody);
                    } 
                }
            }
        }

        if(!$requestBody){
            $requestBody = $_POST;
        }

        if(!$requestBody){
            $requestBody = $_REQUEST;
        }

        if(!$requestBody){
            $requestBody = $_GET;
        }
        
        return $requestBody;
    }

}